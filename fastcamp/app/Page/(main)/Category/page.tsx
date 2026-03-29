"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "@/components/footer/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Camp = {
  id: number;
  title: string;
  tagline: string;
  location: string;
  event_date: string;
  organizer_name: string;
  poster_url: string | null;
  headline_image_url: string | null;
  type: string | null;
  registration_deadline?: string | null;
  camp_status?: string | null;
};

function campImage(url: string | null, fallback: string) {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${API_URL}/uploads/${url}`;
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

const CATEGORIES = [
  { label: "กิจกรรมล่าสุด", value: "recent" },
  { label: "กิจกรรมยอดนิยม", value: "popular" },
  { label: "กิจกรรมทั้งหมด", value: "all" },
  { label: "นิทรรศการ/เปิดบ้าน", value: "นิทรรศการ/เปิดบ้าน" },
  { label: "พัฒนาการ/เวิร์กชอป", value: "พัฒนาทักษะ/เวิร์กชอป" },
  { label: "แนะแนวคณะ/อาชีพ", value: "แนะแนวคณะ/อาชีพ" },
  { label: "เสวนา/สัมนา/ทอล์คโชว์", value: "เสวนา/สัมนา/ทอล์คโชว์" },
  { label: "ประกวดแข่งขัน", value: "ประกวดแข่งขัน" },
];

const PAGE_SIZE = 10;

const Category = () => {
  const [allCamps, setAllCamps] = useState<Camp[]>([]);
  const [filtered, setFiltered] = useState<Camp[]>([]);
  const [active, setActive] = useState("recent");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/camps`)
      .then((res) => res.json())
      .then((data) => {
        setAllCamps(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPage(1);
    if (active === "recent") {
      setFiltered([...allCamps].sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime()));
    } else if (active === "popular" || active === "all") {
      setFiltered(allCamps);
    } else {
      setFiltered(allCamps.filter((c) => c.type === active));
    }
  }, [active, allCamps]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      {/* Hero */}
      <div className="relative mt-5 mx-auto max-w-[97%] aspect-[1866/918] overflow-hidden rounded-4xl bg-gradient-to-r from-[#280C3C] via-[#000523] to-[#003376]">
        <div className="absolute top-16 md:top-28 lg:top-32 left-1/2 -translate-x-1/2 text-center z-20 px-4">
          <h1 className="font-black bg-gradient-to-r from-white via-neutral-400 to-gray-600 bg-clip-text text-transparent text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] leading-none">
            CATEGORY
          </h1>
          <h2 className="mt-2 font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-sm sm:text-base md:text-2xl lg:text-3xl">
            ค่ายที่ใช่สำหรับความสนใจของคุณ
          </h2>
        </div>
        <div>
          <Image src="/2.png" alt="Hero" width={1883} height={733} priority className="absolute bottom-0 left-1/2 -translate-x-1/2 max-w-none z-10"/>
        </div>
      </div>

      {/* Content Section */}
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-10">
        <div className="mt-10 mx-auto flex flex-col gap-6 rounded-4xl border p-4 md:p-8 w-full max-w-7xl">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">

            {/* ซ้าย — Category filter */}
            <div className="w-full md:w-auto shrink-0">
              <h1 className="mb-4 text-xl md:text-3xl font-semibold">Category</h1>
              <div className="flex flex-col gap-3 md:gap-5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActive(cat.value)}
                    className={`h-11 md:h-12 w-full md:w-[360px] rounded-2xl border text-sm md:text-base transition-colors ${
                      active === cat.value ? "bg-[#1B2044] text-white" : "hover:bg-gray-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ขวา — รูปภาพ + pagination */}
            <div className="w-full flex flex-col gap-4">
              {loading ? (
                <div className="text-gray-400 text-sm">กำลังโหลด...</div>
              ) : paginated.length === 0 ? (
                <div className="text-gray-400 text-sm">ไม่มีกิจกรรมในหมวดนี้</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {paginated.map((camp) => {
                    const badge = camp.camp_status === "closed"
                      ? { text: "ปิดรับสมัครแล้ว", color: "bg-gray-400 text-white" }
                      : getDeadlineBadge(camp.registration_deadline || camp.event_date);
                    return (
                      <Link key={camp.id} href={`/Page/Infomation/${camp.id}`}>
                        <div className="relative w-full h-[220px] md:h-[300px] overflow-hidden rounded-xl group cursor-pointer">
                          <Image
                            src={campImage(camp.headline_image_url ?? camp.poster_url, "/Group 1000005981.png")}
                            alt={camp.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {badge && (
                            <div className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                              {badge.text}
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <p className="text-white font-semibold text-sm">{camp.title}</p>
                            <p className="text-white/60 text-xs mt-0.5 line-clamp-1">{camp.tagline}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="h-9 w-9 rounded-xl border disabled:opacity-40"
                  >
                    ‹
                  </button>
                  <span className="h-9 px-3 flex items-center text-sm text-gray-500">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="h-9 w-9 rounded-xl border disabled:opacity-40"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ส่งกิจกรรมขึ้นเว็บ */}
      <div className="w-full bg-white py-6 md:py-10">
        <div className="mx-auto w-full max-w-7xl rounded-3xl bg-gradient-to-r from-[#220163] to-[#074C89] p-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl border border-white/40 px-5 py-6 md:px-10 md:py-8">
            <div className="max-w-2xl">
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-white">
                เพราะค่ายที่ดีที่สุด คือค่ายที่ถูกค้นพบในเวลาที่ใช่ที่สุด
              </h2>
              <p className="mt-2 text-sm md:text-base text-white/80">
                ส่งข้อมูลค่ายของคุณเข้ามา แล้วให้เราเป็นสื่อกลางในการเผยแพร่สู่ผู้เข้าร่วมที่ใช่
              </p>
            </div>
            <button onClick={() => window.location.href = "/Page/LandingPage"} className="w-full md:w-auto shrink-0 rounded-full border border-white/70 px-6 py-3 md:px-8 md:py-3 text-sm md:text-base text-white hover:bg-white hover:text-[#5B3F8C] transition">
              ส่งกิจกรรมขึ้นเว็บ
            </button>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Category;