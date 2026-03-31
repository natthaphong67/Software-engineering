"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Review from "./review";
import Footer from "@/components/footer/Footer";
import { useRouter } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Camp = {
  id: number;
  title: string;
  tagline: string;
  location: string;
  event_date: string;
  registration_deadline?: string | null;
  organizer_name: string;
  poster_url: string | null;
  headline_image_url: string | null;
  created_at: string;
  avg_rating?: string | null;
  review_count?: number;
  camp_status?: string | null;
};

function campImage(url: string | null, fallback: string) {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${API_URL}/uploads/${url}`;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase();
}

function getDeadlineBadge(eventDate: string) {
  if (!eventDate) return null;
  const now = new Date();
  const event = new Date(eventDate);
  const diffDays = Math.ceil((event.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return { text: "สิ้นสุดรับสมัครแล้ว", color: "bg-gray-400 text-white" };
  if (diffDays === 1) return { text: "ปิดรับสมัครพรุ่งนี้", color: "bg-red-500 text-white" };
  if (diffDays <= 3) return { text: `สิ้นสุดรับสมัครใน ${diffDays} วัน`, color: "bg-red-500 text-white" };
  if (diffDays <= 7) return { text: `สิ้นสุดรับสมัครใน ${diffDays} วัน`, color: "bg-orange-400 text-white" };
  return { text: `สิ้นสุดรับสมัครใน ${diffDays} วัน`, color: "bg-green-500 text-white" };
}

function sortByPopularity(camps: Camp[]): Camp[] {
  return [...camps].sort((a, b) => {
    const reviewDiff = (b.review_count ?? 0) - (a.review_count ?? 0);
    if (reviewDiff !== 0) return reviewDiff;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
}

function isClosedCamp(camp: Camp): boolean {
  if (camp.camp_status === "closed") return true;
  const deadline = camp.registration_deadline || camp.event_date;
  if (!deadline) return false;
  return new Date(deadline) < new Date();
}

function sortOpenFirst(camps: Camp[]): Camp[] {
  return [...camps].sort((a, b) => {
    const aClosed = isClosedCamp(a) ? 1 : 0;
    const bClosed = isClosedCamp(b) ? 1 : 0;
    return aClosed - bClosed;
  });
}

const Hero = () => {
  const router = useRouter()
  const [recentCamps, setRecentCamps] = useState<Camp[]>([]);
  const [popularCamps, setPopularCamps] = useState<Camp[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, open: 0, ended: 0 });
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});

  const [reviewLoggedIn, setReviewLoggedIn] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewMsg, setReviewMsg] = useState<string | null>(null);

  useEffect(() => {
    const token = document.cookie.split("; ").find((r) => r.startsWith("token="))?.split("=")[1];
    setReviewLoggedIn(!!token);
  }, []);

  const submitReview = async () => {
    if (!reviewComment.trim() || reviewSubmitting) return;
    setReviewSubmitting(true);
    setReviewMsg(null);
    try {
      const token = document.cookie.split("; ").find((r) => r.startsWith("token="))?.split("=")[1];
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ comment: reviewComment }),
      });
      const data = await res.json();
      if (res.ok) {
        setReviewComment("");
        setReviewMsg("ขอบคุณสำหรับความคิดเห็น!");
      } else {
        setReviewMsg(`❌ ${data.message}`);
      }
    } catch {
      setReviewMsg("❌ ไม่สามารถเชื่อมต่อ server ได้");
    } finally {
      setReviewSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const [recentRes, allRes, statsRes, typeRes] = await Promise.all([
          fetch(`${API_URL}/api/camps/recent?limit=10`),
          fetch(`${API_URL}/api/camps/popular?limit=5`).catch(() => null),
          fetch(`${API_URL}/api/camps/stats`),
          fetch(`${API_URL}/api/camps/count-by-type`),
        ]);

        const recent = await recentRes.json();
        const statsData = await statsRes.json();
        const typeData = await typeRes.json();

        setRecentCamps(sortOpenFirst(Array.isArray(recent) ? recent : []).slice(0, 4));
        setStats(statsData);
        setTypeCounts(typeData);

        if (allRes && allRes.ok) {
          const popular = await allRes.json();
          setPopularCamps(Array.isArray(popular) ? popular.slice(0, 5) : []);
        } else {
          const fallbackRes = await fetch(`${API_URL}/api/camps`);
          const all = await fallbackRes.json();
          const sorted = sortByPopularity(Array.isArray(all) ? all : []);
          setPopularCamps(sorted.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to fetch camps:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCamps();
  }, []);

  return (
    <div className="relative bg-[#000523] overflow-hidden">

      {/* ===== HERO SECTION ===== */}

      {/* TEXT FAST CAMP — Mobile: simple centered title only, MD+: absolute overlay */}
      <div className="relative md:absolute inset-0 flex justify-center
        pt-10 md:pt-40 z-20 pointer-events-none
        md:h-auto">
        <div className="flex gap-4 sm:gap-8 md:gap-50 font-black tracking-tighter leading-none
          text-[40px] sm:text-[72px] md:text-[200px]
          bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text
          text-transparent md:mt-35 drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">
          <h1>F A S T</h1><h1>C A M P</h1>
        </div>
      </div>

      {/* AI IMAGE — desktop only */}
      <div className="hidden md:flex absolute inset-0 justify-center items-start z-30 -mt-2.5 pointer-events-none">
        <div className="relative w-[720px] h-[520px] translate-y-40">
          <Image src="/Ai.png" alt="AI Model" fill priority className="object-contain"/>
        </div>
      </div>

      {/* WAVE + dark spacer — desktop/tablet only */}
      <div className="hidden md:block relative bg-[#000523] h-130">
        <svg viewBox="0 0 1200 320" preserveAspectRatio="none" className="absolute bottom-0 translate-y-90 w-full h-65">
          <path fill="white" d="M 1 62 C 20 229 429 88 420 62 L 700 62 C 821 62 1081 134 1200 318 L 1200 320 L 0 320 Z"/>
        </svg>
      </div>

      {/* หัวข้อประเภทกิจกรรม — desktop/tablet only (absolute positioned) */}
      <div className="hidden md:block text-white text-2xl font-bold pl-10 md:pl-40 absolute mt-40 z-10">
        <h1>ประเภทของกิจกรรม</h1>
      </div>

      {/* ===== WHITE SECTION ===== */}
      {/* Mobile: ต่อจาก title ทันที, MD+: มี margin เพื่อรองรับ wave */}
      <div className="relative bg-white mt-4 md:mt-90 overflow-hidden pb-0">

        {/* หัวข้อประเภทกิจกรรม — mobile only (in-flow) */}
        <div className="block md:hidden text-[#0B0F2B] text-lg font-bold px-4 pt-4 pb-2">
          <h1>ประเภทของกิจกรรม</h1>
        </div>

        {/* ---- TYPE CARDS GRID ---- */}
        {/* ใช้ grid 2 cols บนมือถือ, 3 cols tablet, 5 cols desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 justify-items-center">

          {/* Card 1: นิทรรศการ/เปิดบ้าน */}
          <div className="relative w-full max-w-[160px] sm:max-w-[220px] lg:max-w-[305px] aspect-[305/306]
            rounded-[16px] sm:rounded-[24px] lg:rounded-[32px]
            bg-gradient-to-b from-[#5f8fc5] to-[#3f6fa4]
            p-[6px] sm:p-[10px] lg:p-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="w-full h-full rounded-[12px] sm:rounded-[20px] lg:rounded-[26px] bg-gradient-to-b from-[#4f7fb5] to-[#224F82] border border-white/60 p-2 sm:p-4 lg:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-white text-[10px] sm:text-[14px] lg:text-[20px] font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow" width={26} height={26} className="w-[10px] sm:w-[16px] lg:w-[26px]"/>
              </div>
              <div className="flex justify-center items-center h-[50px] sm:h-[90px] lg:h-[150px]">
                <Image src="/นิทรรศการเปิดบ้าน.png" alt="png" width={132} height={129} className="w-[44px] sm:w-[80px] lg:w-[132px] h-auto object-contain"/>
              </div>
              <div>
                <h1 className="text-white text-[10px] sm:text-[13px] lg:text-[18px] font-semibold leading-tight">นิทรรศการ/เปิดบ้าน</h1>
                <div className="mt-1 sm:mt-2 lg:mt-4 inline-flex items-center gap-1 px-2 py-1 border border-white/70 rounded-full text-white">
                  <Image src="/user.png" alt="user" width={18} height={18} className="w-[8px] sm:w-[12px] lg:w-[18px]"/>
                  <span className="text-[8px] sm:text-[10px] lg:text-[12px]">{typeCounts["นิทรรศการ/เปิดบ้าน"] ?? 0} camp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: พัฒนาการ/เวิร์กชอป */}
          <div className="relative w-full max-w-[160px] sm:max-w-[220px] lg:max-w-[305px] aspect-[305/306]
            rounded-[16px] sm:rounded-[24px] lg:rounded-[32px]
            bg-gradient-to-b from-[#bccee3] to-[#3b5b8b]
            p-[6px] sm:p-[10px] lg:p-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="w-full h-full rounded-[12px] sm:rounded-[20px] lg:rounded-[26px] bg-gradient-to-b from-[#9aaec6] to-[#3c5e88] border border-white/60 p-2 sm:p-4 lg:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-white text-[10px] sm:text-[14px] lg:text-[20px] font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow" width={26} height={26} className="w-[10px] sm:w-[16px] lg:w-[26px]"/>
              </div>
              <div className="flex justify-center items-center h-[50px] sm:h-[90px] lg:h-[150px]">
                <Image src="/พัฒนาการเวิร์กชอป.png" alt="png" width={132} height={129} className="w-[44px] sm:w-[80px] lg:w-[132px] h-auto object-contain"/>
              </div>
              <div>
                <h1 className="text-white text-[10px] sm:text-[13px] lg:text-[18px] font-semibold leading-tight">พัฒนาการ/เวิร์กชอป</h1>
                <div className="mt-1 sm:mt-2 lg:mt-4 inline-flex items-center gap-1 px-2 py-1 border border-white/70 rounded-full text-white">
                  <Image src="/user.png" alt="user" width={18} height={18} className="w-[8px] sm:w-[12px] lg:w-[18px]"/>
                  <span className="text-[8px] sm:text-[10px] lg:text-[12px]">{typeCounts["พัฒนาทักษะ/เวิร์กชอป"] ?? 0} camp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: แนะแนวคณะ/อาชีพ */}
          <div className="relative w-full max-w-[160px] sm:max-w-[220px] lg:max-w-[305px] aspect-[305/306]
            rounded-[16px] sm:rounded-[24px] lg:rounded-[32px]
            bg-gradient-to-b from-[#3a4588] via-[#c2cbf7] to-[#5d6cc5]
            p-[6px] sm:p-[10px] lg:p-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="w-full h-full rounded-[12px] sm:rounded-[20px] lg:rounded-[26px] bg-gradient-to-b from-[#353f81] to-[#4d5aaa] border border-white/60 p-2 sm:p-4 lg:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-white text-[10px] sm:text-[14px] lg:text-[20px] font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow" width={26} height={26} className="w-[10px] sm:w-[16px] lg:w-[26px]"/>
              </div>
              <div className="flex justify-center items-center h-[50px] sm:h-[90px] lg:h-[150px]">
                <Image src="/แนะแนวคณะอาชีพ.png" alt="png" width={132} height={129} className="w-[44px] sm:w-[80px] lg:w-[132px] h-auto object-contain"/>
              </div>
              <div>
                <h1 className="text-white text-[10px] sm:text-[13px] lg:text-[18px] font-semibold leading-tight">แนะแนวคณะ/อาชีพ</h1>
                <div className="mt-1 sm:mt-2 lg:mt-4 inline-flex items-center gap-1 px-2 py-1 border border-white/70 rounded-full text-white">
                  <Image src="/user.png" alt="user" width={18} height={18} className="w-[8px] sm:w-[12px] lg:w-[18px]"/>
                  <span className="text-[8px] sm:text-[10px] lg:text-[12px]">{typeCounts["แนะแนวคณะ/อาชีพ"] ?? 0} camp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: เสวนา/สัมนา/ทอล์คโชว์ */}
          <div className="relative w-full max-w-[160px] sm:max-w-[220px] lg:max-w-[305px] aspect-[305/306]
            rounded-[16px] sm:rounded-[24px] lg:rounded-[32px]
            bg-gradient-to-b from-[#3a4588] to-[#5a3784]
            p-[6px] sm:p-[10px] lg:p-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="w-full h-full rounded-[12px] sm:rounded-[20px] lg:rounded-[26px] bg-gradient-to-b from-[#5f75b5] to-[#614a91] border border-white/60 p-2 sm:p-4 lg:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-white text-[10px] sm:text-[14px] lg:text-[20px] font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow" width={26} height={26} className="w-[10px] sm:w-[16px] lg:w-[26px]"/>
              </div>
              <div className="flex justify-center items-center h-[50px] sm:h-[90px] lg:h-[150px]">
                <Image src="/เสวนาสัมนาทอล์คโชว์.png" alt="png" width={132} height={129} className="w-[44px] sm:w-[80px] lg:w-[132px] h-auto object-contain"/>
              </div>
              <div>
                <h1 className="text-white text-[10px] sm:text-[13px] lg:text-[18px] font-semibold leading-tight">เสวนา/สัมนา/ทอล์คโชว์</h1>
                <div className="mt-1 sm:mt-2 lg:mt-4 inline-flex items-center gap-1 px-2 py-1 border border-white/70 rounded-full text-white">
                  <Image src="/user.png" alt="user" width={18} height={18} className="w-[8px] sm:w-[12px] lg:w-[18px]"/>
                  <span className="text-[8px] sm:text-[10px] lg:text-[12px]">{typeCounts["เสวนา/สัมมนา/ทอล์คโชว์"] ?? 0} camp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: ประกวดแข่งขัน */}
          <div className="relative w-full max-w-[160px] sm:max-w-[220px] lg:max-w-[305px] aspect-[305/306]
            rounded-[16px] sm:rounded-[24px] lg:rounded-[32px]
            bg-gradient-to-b from-[#a2caf7] to-[#556d8c]
            p-[6px] sm:p-[10px] lg:p-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]
            col-span-2 sm:col-span-1 justify-self-center sm:justify-self-auto">
            <div className="w-full h-full rounded-[12px] sm:rounded-[20px] lg:rounded-[26px] bg-gradient-to-b from-[#a2c9f7] to-[#54759b] border border-white/60 p-2 sm:p-4 lg:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-white text-[10px] sm:text-[14px] lg:text-[20px] font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow" width={26} height={26} className="w-[10px] sm:w-[16px] lg:w-[26px]"/>
              </div>
              <div className="flex justify-center items-center h-[50px] sm:h-[90px] lg:h-[150px]">
                <Image src="/ประกวดแข่งขัน.png" alt="png" width={132} height={129} className="w-[44px] sm:w-[80px] lg:w-[132px] h-auto object-contain"/>
              </div>
              <div>
                <h1 className="text-white text-[10px] sm:text-[13px] lg:text-[18px] font-semibold leading-tight">ประกวดแข่งขัน</h1>
                <div className="mt-1 sm:mt-2 lg:mt-4 inline-flex items-center gap-1 px-2 py-1 border border-white/70 rounded-full text-white">
                  <Image src="/user.png" alt="user" width={18} height={18} className="w-[8px] sm:w-[12px] lg:w-[18px]"/>
                  <span className="text-[8px] sm:text-[10px] lg:text-[12px]">{typeCounts["ประกวดแข่งขัน"] ?? 0} camp</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- กิจกรรมยอดนิยม ---- */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-16 lg:mt-23">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8">กิจกรรมยอดนิยม</h1>
          {loading ? (
            <div className="text-gray-400 text-sm">กำลังโหลด...</div>
          ) : popularCamps.length === 0 ? (
            <div className="text-gray-400 text-sm">ยังไม่มีกิจกรรม</div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Featured camp — full width บนมือถือ */}
              <Link href={`/Page/Infomation/${popularCamps[0]?.id}`}
                className="relative w-full lg:w-1/2 h-[200px] sm:h-[260px] lg:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden block">
                <Image
                  src={campImage(popularCamps[0]?.headline_image_url ?? null, "/DIT Hackathn 2025.png")}
                  alt={popularCamps[0]?.title || ""} fill
                  className="object-cover hover:scale-105 transition-transform duration-300"/>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                  <p className="text-white font-semibold text-sm">{popularCamps[0]?.title}</p>
                  {(popularCamps[0]?.review_count ?? 0) > 0 &&
                    <p className="text-white/60 text-xs mt-0.5">{popularCamps[0].review_count} รีวิว</p>}
                </div>
              </Link>

              {/* Sub camps grid — 2x2 */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-1/2">
                {[null, null, null, null].map((_, i) => {
                  const camp = popularCamps[i + 1] ?? null;
                  const fallbacks = ["/GTC Build Your Own.png", "/IT Ladkrbng.png", "/Extreme Game Development.png", "/ComCamp.png"];
                  return camp ? (
                    <Link key={i} href={`/Page/Infomation/${camp.id}`}
                      className="relative h-[100px] sm:h-[140px] lg:h-[240px] rounded-xl lg:rounded-2xl overflow-hidden bg-gray-100 block">
                      <Image src={campImage(camp.headline_image_url ?? null, fallbacks[i])} alt={camp.title} fill
                        className="object-cover hover:scale-105 transition-transform duration-300"/>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs font-medium truncate">{camp.title}</p>
                        {(camp.review_count ?? 0) > 0 &&
                          <p className="text-white/60 text-[10px]">{camp.review_count} รีวิว</p>}
                      </div>
                    </Link>
                  ) : (
                    <div key={i} className="relative h-[100px] sm:h-[140px] lg:h-[240px] rounded-xl lg:rounded-2xl overflow-hidden bg-gray-100">
                      <Image src={fallbacks[i]} alt="" fill className="object-cover"/>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---- ส่งกิจกรรมขึ้นเว็บ Banner ---- */}
          {/* ปรับให้ stack บนมือถือ แทน clip-diagonal */}
          <div className="w-full flex justify-center my-8 sm:my-10 lg:my-12 px-0">
            {/* Mobile: simple banner */}
            <div className="block sm:hidden w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#0b0f2b] to-[#1a2b6f] px-6 py-5 flex-row items-center justify-between gap-4">
              <div className="text-white font-bold leading-tight mb-3">
                <h1 className="text-[15px]">จุดเริ่มต้นที่ค่ายคุณจะ <span className="text-[20px] font-extrabold">ทะยาน</span></h1>
                <h1 className="text-[15px]">สู่ความสำเร็จบนเว็บเรา</h1>
              </div>
              <button
                onClick={() => router.push('/Page/LandingPage')}
                className="border border-white rounded-full px-5 py-2 text-white text-[13px] whitespace-nowrap transition-all duration-300 hover:bg-white hover:text-[#0b0f2b]">
                ส่งกิจกรรมขึ้นเว็บ
              </button>
            </div>

            {/* Tablet+: original design */}
            <div className="hidden sm:flex relative w-full max-w-[1000px] aspect-[1000/127] items-center">
              <div className="relative z-10 w-[75%] md:w-[65%] lg:w-[60%] xl:w-[55%] h-full bg-gradient-to-r from-[#0b0f2b] to-[#1a2b6f] flex items-center px-[5%] pr-[8%] clip-diagonal">
                <div className="flex items-center gap-[5%] w-full">
                  <div className="text-white font-bold leading-tight">
                    <h1 className="text-[16px] whitespace-nowrap">จุดเริ่มต้นที่ค่ายคุณจะ <span className="text-[23px] font-extrabold">ทะยาน</span></h1>
                    <h1 className="text-[16px]">สู่ความสำเร็จบนเว็บเรา</h1>
                  </div>
                  <button
                    onClick={() => router.push('/Page/LandingPage')}
                    className="border border-white rounded-full px-[clamp(8px,1.5vw,20px)] py-[clamp(3px,0.6vw,8px)] text-white text-[clamp(9px,1.5vw,16px)] whitespace-nowrap transition-all duration-300 hover:bg-white hover:text-[#0b0f2b] hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    ส่งกิจกรรมขึ้นเว็บ
                  </button>
                </div>
              </div>
              <div className="absolute right-0 top-0 w-[70%] h-full">
                <Image src="/ส่งกิจกรรม.png" alt="#" fill className="object-cover"/>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Why Trust ---- */}
        <div className="w-full py-12 sm:py-16 lg:py-[80px]">
          <h2 className="text-center text-[22px] sm:text-[28px] md:text-[36px] font-bold text-[#0B0F2B]">Why Trust Our Platform?</h2>
          {/* ปรับเป็น 3 cols บนทุก breakpoint แต่ลด gap บนมือถือ */}
          <div className="flex justify-center gap-6 sm:gap-10 lg:gap-[120px] mt-8 sm:mt-10 lg:mt-[60px] flex-wrap px-4">
            <div className="flex flex-col items-center">
              <div className="w-[80px] sm:w-[120px] lg:w-[168px] h-[80px] sm:h-[120px] lg:h-[168px] rounded-[14px] lg:rounded-[20px] flex items-center justify-center shadow-md">
                <Image src="/handshake-icon.png" alt="ทั้งหมด" width={168} height={168} className="w-[80px] sm:w-[120px] lg:w-[168px] h-auto"/>
              </div>
              <p className="mt-3 lg:mt-[18px] text-[13px] sm:text-[15px] lg:text-[18px] font-semibold text-[#0B0F2B]">ค่ายทั้งหมด</p>
              <p className="mt-1 lg:mt-[6px] text-[28px] sm:text-[36px] lg:text-[44px] font-bold text-[#0B0F2B]">{stats.total}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[80px] sm:w-[120px] lg:w-[168px] h-[80px] sm:h-[120px] lg:h-[168px] rounded-[14px] lg:rounded-[20px] bg-gradient-to-br from-[#7FD8FF] to-[#4BA3FF] flex items-center justify-center shadow-md">
                <Image src="/Frame 1158.png" alt="เปิดรับ" width={168} height={168} className="w-[80px] sm:w-[120px] lg:w-[168px] h-auto"/>
              </div>
              <p className="mt-3 lg:mt-[18px] text-[13px] sm:text-[15px] lg:text-[18px] font-semibold text-[#0B0F2B]">ค่ายที่เปิดรับสมัคร</p>
              <p className="mt-1 lg:mt-[6px] text-[28px] sm:text-[36px] lg:text-[44px] font-bold text-[#1F7AE0]">{stats.open}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[80px] sm:w-[120px] lg:w-[168px] h-[80px] sm:h-[120px] lg:h-[168px] rounded-[14px] lg:rounded-[20px] bg-gradient-to-br from-[#C9A7FF] to-[#8D63FF] flex items-center justify-center shadow-md">
                <Image src="/Frame 1159.png" alt="จัดแล้ว" width={168} height={168} className="w-[80px] sm:w-[120px] lg:w-[168px] h-auto"/>
              </div>
              <p className="mt-3 lg:mt-[18px] text-[13px] sm:text-[15px] lg:text-[18px] font-semibold text-[#0B0F2B]">ค่ายที่จัดแล้ว</p>
              <p className="mt-1 lg:mt-[6px] text-[28px] sm:text-[36px] lg:text-[44px] font-bold text-[#5B2BE0]">{stats.ended}</p>
            </div>
          </div>
        </div>

        {/* ---- กิจกรรมล่าสุด ---- */}
        <div className="py-8 sm:py-12 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">กิจกรรมล่าสุด</h1>
          </div>
          {loading ? (
            <div className="max-w-6xl mx-auto px-4 text-gray-400 text-sm">กำลังโหลด...</div>
          ) : recentCamps.length === 0 ? (
            <div className="max-w-6xl mx-auto px-4 text-gray-400 text-sm">ยังไม่มีกิจกรรม</div>
          ) : (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 divide-y divide-gray-200">
              {recentCamps.map((camp) => {
                const badge = camp.camp_status === "closed"
                  ? { text: "ปิดรับสมัครแล้ว", color: "bg-gray-400 text-white" }
                  : getDeadlineBadge(camp.registration_deadline || camp.event_date);
                return (
                  <div key={camp.id} className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 md:gap-10 py-6 sm:py-8 md:py-10">
                    {/* รูปภาพ — ใช้ full width บนมือถือ */}
                    <div className="relative w-full md:w-[480px] h-[200px] sm:h-[240px] md:h-[260px] flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      <Image src={campImage(camp.poster_url ?? null, "/Container1.png")} alt={camp.title} fill className="object-cover"/>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3 min-w-0 w-full">
                      {badge && (
                        <span className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>{badge.text}</span>
                      )}
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold line-clamp-2 leading-snug">{camp.title}</h2>
                      <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs sm:text-sm text-[#6D757F]">
                        <div className="flex gap-1.5 items-center">
                          <Image src="/calendar-6D757F.png" alt="Calendar" width={16} height={16} className="w-[14px] sm:w-[16px]"/>
                          <span className="font-medium">{formatDate(camp.event_date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span>{camp.avg_rating ?? "—"} REVIEW</span>
                        </div>
                      </div>
                      <p className="text-[#A5A5A5] text-sm line-clamp-2 leading-relaxed">{camp.tagline}</p>
                      <Link href={`/Page/Infomation/${camp.id}`}
                        className="mt-1 w-[120px] sm:w-[138px] h-[32px] sm:h-[36px] inline-flex items-center justify-center gap-1.5 sm:gap-2 border-2 border-[#6D757F] rounded-full hover:bg-gray-50 transition">
                        <span className="text-[12px] sm:text-[14px] font-light text-[#92989F] leading-none">READ MORE</span>
                        <div className="relative w-[14px] sm:w-[16px] h-[14px] sm:h-[16px]">
                          <Image src="/arrow-6D757F.png" alt="Arrow" fill className="object-contain"/>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Curved transition */}
        <div className="absolute left-0 w-[2200px] h-[500px] z-0 pointer-events-none -mt-75">
          <svg viewBox="0 0 152 100" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full block z-[-1]">
            <path fill="#000523" d="M 0 0 C 40 150, 110 -50, 152 100 L 152 100 L 0 100 Z"/>
          </svg>
        </div>
      </div>

      {/* ===== REVIEW SECTION ===== */}
      <Review/>

      {/* ===== BOX SEARCH / COMMENT SECTION ===== */}
      <div className="relative z-50 bg-search min-h-screen flex items-center justify-center bg-[#000523] px-4">
        <div className="relative z-50 flex flex-col items-center text-center gap-4 sm:gap-6 w-full max-w-xl">
          {/* หัวข้อ — 1 บรรทัด ปรับขนาดให้พอดีทุก breakpoint */}
          <h1 className="font-extrabold tracking-tight whitespace-nowrap
            text-[7vw] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Fastcamp</span>
            <span className="text-white/90"> ให้อะไรกับคุณ ?</span>
          </h1>
          <h1 className="text-white/50 text-sm sm:text-base sm:text-lg px-2">แชร์ประสบการณ์ของคุณหลังเข้าค่าย/ร่วมงานกับ Fastcamp</h1>

          {reviewLoggedIn ? (
            <>
              <div className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-4 py-2.5 sm:py-3 w-full max-w-[420px]">
                <input
                  type="text" value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitReview()}
                  placeholder="Enter your comment"
                  className="bg-transparent flex-1 outline-none text-white placeholder-white/40 text-sm sm:text-base min-w-0"/>
                <button onClick={submitReview} disabled={reviewSubmitting || !reviewComment.trim()}
                  className="bg-white/20 hover:bg-white/30 transition px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-white font-medium disabled:opacity-40 text-sm sm:text-base flex-shrink-0">
                  {reviewSubmitting ? "..." : "Submit"}
                </button>
              </div>
              {reviewMsg && <p className="text-white/50 text-sm">{reviewMsg}</p>}
            </>
          ) : (
            <>
              <div className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-4 py-2.5 sm:py-3 w-full max-w-[420px] opacity-50">
                <input disabled placeholder="Enter your comment"
                  className="bg-transparent flex-1 outline-none text-white placeholder-white/40 cursor-not-allowed text-sm sm:text-base min-w-0"/>
                <button disabled
                  className="bg-white/20 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-white font-medium opacity-40 text-sm sm:text-base flex-shrink-0">
                  Submit
                </button>
              </div>
              <h1 className="text-white/40 text-xs sm:text-sm">โปรดล็อกอินก่อนแสดงความคิดเห็น</h1>
            </>
          )}
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Hero;