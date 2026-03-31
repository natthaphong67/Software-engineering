"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Camp = {
  id: number;
  title: string;
  tagline: string;
  description: string;
  location: string;
  event_date: string;
  registration_deadline: string | null;
  organizer_name: string;
  contact_name: string | null;
  contact_email: string;
  contact_phone: string | null;
  poster_url: string | null;
  headline_image_url: string | null;
  type: string | null;
  category: string | null;
  event_format: string | null;
  max_participants: number | null;
  price: number | null;
  price_type: string | null;
  eligibility: string | null;
  camp_status: string | null;
  status: string;
  application_link: string | null;
  prizes: string | null;
};

type Social = {
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  discord: string | null;
  tiktok: string | null;
};

type Review = {
  id: number;
  rating: number;
  comment: string;
  name: string | null;
  avatar_url: string | null;  // ✅ เพิ่ม
};

function campImage(url: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_URL}/uploads/${url}`;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("th-TH", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function formatPrice(price: number | null, priceType: string | null) {
  if (!price || price === 0) return "ฟรี";
  return `${price.toLocaleString()} บาท`;
}

function parseEligibility(eligibility: string | null) {
  if (!eligibility) return null;
  const parts = eligibility.split(",").filter(Boolean);
  const result: Record<string, string[]> = { level: [], age: [], academic: [], location: [], other: [] };
  const levelMap: Record<string, string> = {
    highschool: "นักเรียนมัธยมปลาย", middleschool: "นักเรียนมัธยมต้น",
    primary: "นักเรียนประถม", college: "นักศึกษา",
    vocational: "ผู้เรียนสายอาชีวะ", general: "บุคคลทั่วไป",
  };
  const ageMap: Record<string, string> = {
    "u15": "ต่ำกว่า 15 ปี", "15-18": "15–18 ปี", "19-22": "19–22 ปี", "23+": "23 ปีขึ้นไป",
  };
  const academicMap: Record<string, string> = {
    science: "สายวิทย์-คณิต", arts: "สายศิลป์-ภาษา", any: "ทุกสายการเรียน", other: "อื่นๆ",
  };
  const locationMap: Record<string, string> = {
    onsite: "กิจกรรมนอกสถานที่", online: "กิจกรรมออนไลน์",
  };
  parts.forEach((p) => {
    if (p.startsWith("gpa:")) result.other.push(`GPA: ${p.slice(4)}`);
    else if (p.startsWith("additional:")) result.other.push(p.slice(11));
    else if (p.startsWith("region:")) result.other.push(`ภูมิภาค: ${p.slice(7)}`);
    else if (p.startsWith("time:")) result.other.push(`เวลา: ${p.slice(5)}`);
    else if (p.startsWith("academic_other:")) result.academic.push(p.slice(15));
    else if (levelMap[p]) result.level.push(levelMap[p]);
    else if (ageMap[p]) result.age.push(ageMap[p]);
    else if (academicMap[p]) result.academic.push(academicMap[p]);
    else if (locationMap[p]) result.location.push(locationMap[p]);
  });
  return result;
}

const SOCIAL_ICONS: { key: keyof Social; src: string; label: string }[] = [
  { key: "facebook",  src: "/facebook.png",  label: "Facebook"  },
  { key: "instagram", src: "/instagram.png", label: "Instagram" },
  { key: "twitter",   src: "/x.png",         label: "Twitter/X" },
  { key: "website",   src: "/internet.png",  label: "Website"   },
  { key: "youtube",   src: "/youtube.png",   label: "YouTube"   },
  { key: "tiktok",    src: "/tiktok.png",    label: "TikTok"    },
  { key: "discord",   src: "/discord.png",   label: "Discord"   },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ fontSize: size }} className={rating >= s ? "text-yellow-400" : "text-gray-300"}>★</span>
      ))}
    </div>
  );
}

export default function InformationPage() {
  const params = useParams();
  const id = params?.id;

  const [camp, setCamp] = useState<Camp | null>(null);
  const [social, setSocial] = useState<Social | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentCamps, setRecentCamps] = useState<Camp[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewPage, setReviewPage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie.split("; ").find((r) => r.startsWith("token="))?.split("=")[1];
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      fetch(`${API_URL}/api/camps/${id}`).then((r) => r.json()),
      fetch(`${API_URL}/api/social/${id}`).then((r) => r.json()).catch(() => null),
      fetch(`${API_URL}/api/camps/recent?limit=5`).then((r) => r.json()).catch(() => []),
      fetch(`${API_URL}/api/camps/${id}/reviews`).then((r) => r.json()).catch(() => []),
    ]).then(([campData, socialData, recentData, reviewData]) => {
      setCamp(campData);
      setSocial(socialData);
      setRecentCamps(Array.isArray(recentData) ? recentData.filter((c: Camp) => c.id !== Number(id)) : []);
      setReviews(Array.isArray(reviewData) ? reviewData : []);
      setLoading(false);
    });
  }, [id]);

  const submitReview = async () => {
    if (!rating || !reviewComment.trim() || submitting) return;
    setSubmitting(true);
    try {
      const token = document.cookie.split("; ").find((r) => r.startsWith("token="))?.split("=")[1];
      const res = await fetch(`${API_URL}/api/camps/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ rating, comment: reviewComment }),
      });
      if (res.ok) {
        const updated = await fetch(`${API_URL}/api/camps/${id}/reviews`).then((r) => r.json());
        setReviews(Array.isArray(updated) ? updated : []);
        setShowPopup(false); setRating(0); setReviewComment("");
      }
    } catch {}
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">กำลังโหลด...</div>;
  if (!camp) return <div className="min-h-screen flex items-center justify-center text-gray-400">ไม่พบข้อมูลค่าย</div>;

  const heroImg = campImage(camp.headline_image_url) ?? campImage(camp.poster_url);
  const eligibility = parseEligibility(camp.eligibility);

  // คำนวณ rating summary
  const avgRating = reviews.length > 0
    ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
    : null;

  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative w-full aspect-[16/9] md:aspect-auto md:h-screen overflow-hidden bg-black">
        {heroImg ? (
          <Image src={heroImg} alt={camp.title} fill priority className="object-contain md:object-cover" />
        ) : (
          <div className="w-full h-full bg-[#1B2144]" />
        )}
      </section>

      {/* ── POPUP Card (เหมือนเดิม + rating + ปุ่ม disabled) ────────────────── */}
      <section className="relative w-full">
        <div className="relative md:absolute md:left-1/2 md:-bottom-20 md:-translate-x-1/2 w-full max-w-5xl px-4 md:px-0 z-30">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl border border-gray-200 p-4 md:p-6">

            {/* Title + ปุ่มลงทะเบียน */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-900">{camp.title}</h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  {[camp.category, camp.type === "competition" ? "การแข่งขัน" : camp.type === "general" ? "กิจกรรมทั่วไป" : null]
                    .filter(Boolean).join(" · ")}
                </p>

                {/* ✅ Rating summary — เพิ่มใหม่ */}
                {avgRating !== null && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <StarRating rating={avgRating} size={16} />
                    <span className="text-sm font-semibold text-gray-800">{avgRating.toFixed(1)}</span>
                    <span className="text-sm text-gray-400">({reviews.length} reviews)</span>
                  </div>
                )}
              </div>

              {/* ✅ ปุ่มลงทะเบียน — disabled ถ้าไม่มี link */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-6 w-full md:w-auto">
                {camp.application_link ? (
                  <a
                    href={camp.application_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto border border-blue-500 text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition text-center text-sm"
                  >
                    ลงทะเบียน
                  </a>
                ) : (
                  <span className="w-full md:w-auto border border-gray-300 text-gray-400 font-semibold px-6 py-2 rounded-full text-center text-sm cursor-not-allowed">
                    ลิงค์ไม่พร้อมใช้งาน
                  </span>
                )}
              </div>
            </div>

            {/* INFO CARD — เหมือนเดิมทุกอย่าง */}
            <div className="mt-6 border border-gray-300 rounded-2xl md:rounded-full px-4 py-4 md:px-8 md:py-5">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">

                {/* สถานที่ */}
                <div className="flex items-center gap-4">
                  <Image src="/location.png" alt="location" width={28} height={28} />
                  <div>
                    <p className="font-semibold text-sm text-gray-800">สถานที่จัดกิจกรรม</p>
                    <p className="text-gray-500 text-sm">{camp.location || "—"}</p>
                  </div>
                </div>

                <div className="hidden md:block h-10 w-px bg-gray-300" />

                {/* วันปิดรับสมัคร */}
                <div className="flex items-center gap-4">
                  <Image src="/calendar 2.png" alt="deadline" width={28} height={28} />
                  <div>
                    <p className="font-semibold text-sm">สิ้นสุดวันรับสมัคร</p>
                    <p className="text-gray-500 text-sm">{formatDate(camp.registration_deadline)}</p>
                  </div>
                </div>

                <div className="hidden md:block h-10 w-px bg-gray-300" />

                {/* วันจัดกิจกรรม + รูปแบบ */}
                <div className="flex items-center gap-4">
                  <Image src="/calendar 2.png" alt="calendar" width={28} height={28} />
                  <div>
                    <p className="font-semibold text-sm">วันที่จัดกิจกรรม</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-gray-500 text-sm">{formatDate(camp.event_date)}</p>
                      {camp.event_format && (
                        <span className="text-orange-500 text-xs font-medium">
                          ({camp.event_format.includes("วันเดียว") ? "วันเดียวจบ"
                            : camp.event_format.includes("ค้างคืน") ? "ค้างคืน"
                            : camp.event_format.includes("ออนไลน์") ? "ออนไลน์"
                            : camp.event_format.split(",")[0]})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block h-10 w-px bg-gray-300" />

                {/* จำนวนที่รับสมัคร */}
                <div className="flex items-center gap-4">
                  <Image src="/user.png" alt="user" width={28} height={28} />
                  <div>
                    <p className="font-semibold text-sm">จำนวนรับสมัคร</p>
                    <p className="text-gray-500 text-sm">
                      {camp.max_participants ? `${Number(camp.max_participants).toLocaleString()} คน` : "ไม่จำกัด"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ✅ Prize + Price badge — ใต้ info row */}
            {(camp.prizes || camp.price !== null || camp.price_type) && (
              <div className="mt-4 flex flex-wrap gap-3">
                {camp.prizes && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2 flex items-center gap-2">
                    <span className="text-yellow-700 text-xs font-semibold">🏆 รางวัล</span>
                    <span className="text-yellow-800 text-sm font-bold">{camp.prizes}</span>
                  </div>
                )}
                {(camp.price !== null || camp.price_type) && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-2">
                    <span className="text-gray-500 text-xs font-semibold">💳 ค่าใช้จ่าย</span>
                    <span className="text-gray-800 text-sm font-bold">
                      {camp.price_type?.includes("free") ? "ฟรี"
                        : camp.price ? `${Number(camp.price).toLocaleString()} บาท`
                        : "ฟรี"}
                    </span>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10 md:py-16 mt-16 md:mt-32">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* LEFT */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Descriptions</h1>
            <p className="leading-relaxed text-gray-700 text-sm md:text-base whitespace-pre-line">
              {camp.description || "ไม่มีคำอธิบาย"}
            </p>

            {/* Eligibility */}
            {eligibility && Object.values(eligibility).some((v) => v.length > 0) && (
              <div className="mt-10">
                <h2 className="text-lg font-bold text-gray-900 mb-4">คุณสมบัติผู้สมัคร</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {eligibility.level.length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">ระดับผู้เข้าร่วม</p>
                      <div className="flex flex-wrap gap-2">
                        {eligibility.level.map((l) => <span key={l} className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">{l}</span>)}
                      </div>
                    </div>
                  )}
                  {eligibility.age.length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">ช่วงอายุ</p>
                      <div className="flex flex-wrap gap-2">
                        {eligibility.age.map((a) => <span key={a} className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">{a}</span>)}
                      </div>
                    </div>
                  )}
                  {eligibility.academic.length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">สายการเรียน</p>
                      <div className="flex flex-wrap gap-2">
                        {eligibility.academic.map((a) => <span key={a} className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">{a}</span>)}
                      </div>
                    </div>
                  )}
                  {eligibility.other.length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">เพิ่มเติม</p>
                      <div className="flex flex-wrap gap-2">
                        {eligibility.other.map((o) => <span key={o} className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">{o}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[535px] shrink-0 space-y-6">
            {/* Map */}
            {camp.location && (
              <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] rounded-3xl overflow-hidden shadow-lg">
                {camp.location.match(/^-?\d+\.\d+,-?\d+\.\d+$/) ? (
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                      (() => { const [la, ln] = camp.location.split(",").map(Number); return `${ln - 0.01},${la - 0.01},${ln + 0.01},${la + 0.01}`; })()
                    }&layer=mapnik&marker=${camp.location.replace(",", "%2C")}`}
                    className="w-full h-full border-0" loading="lazy"
                  />
                ) : (
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(camp.location)}&output=embed`}
                    className="w-full h-full border-0" loading="lazy"
                  />
                )}
              </div>
            )}

            {/* Contact */}
            <div className="space-y-6">
              <h1 className="text-xl md:text-2xl font-bold">ติดต่อผู้จัดกิจกรรม</h1>
              <div className="flex gap-4">
                <div className="bg-[#1B2144] w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {(camp.contact_name || camp.organizer_name)?.charAt(0) || "?"}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold">{camp.contact_name || camp.organizer_name}</p>
                  <p className="text-gray-500 text-sm truncate">{camp.contact_email}</p>
                  {camp.contact_phone && <p className="text-gray-500 text-sm">{camp.contact_phone}</p>}
                  {/* ✅ Social ครบทุก platform รวม twitter + discord */}
                  <div className="flex gap-3 mt-2 flex-wrap">
                    {social && SOCIAL_ICONS.map(({ key, src, label }) =>
                      social[key] ? (
                        <a key={key} href={social[key]!} target="_blank" rel="noopener noreferrer" title={label}>
                          <Image src={src} alt={label} width={20} height={20} />
                        </a>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>




          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────────── */}
      <section className="w-full px-6 md:px-20 py-10 md:py-24 flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between gap-10 md:gap-20 bg-gradient-to-r from-[#2B2F47] to-[#000523]">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">What Campers Said</h1>
          {avgRating !== null && (
            <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
              <StarRating rating={avgRating} size={22} />
              <span className="text-white font-bold text-2xl">{avgRating.toFixed(1)}</span>
              <span className="text-white/50 text-sm">({reviews.length} รีวิว)</span>
            </div>
          )}
        </div>
        <div className="w-full max-w-[520px] relative">
          <div className="flex justify-end mb-6">
            {isLoggedIn ? (
              <button onClick={() => setShowPopup(true)}
                className="border border-white/30 text-white text-sm px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
                Share your
              </button>
            ) : (
              <a href="/pageAuth/Login"
                className="border border-white/30 text-white text-sm px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
                Login เพื่อรีวิว
              </a>
            )}
          </div>
          {reviews.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-10">ยังไม่มีรีวิว — เป็นคนแรกที่รีวิวค่ายนี้!</p>
          ) : (
            <>
              {reviews.slice(reviewPage * 2, reviewPage * 2 + 2).map((r, i) => (
                <div key={r.id}>
                  {i > 0 && <div className="border-t border-white/20 my-10" />}
                  <div className="space-y-4">
                    <StarRating rating={r.rating} size={20} />
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">{r.comment}</p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 shrink-0">
                        {r.avatar_url ? (
                          <img
                            src={r.avatar_url.startsWith("http") ? r.avatar_url : `${API_URL}/uploads/${r.avatar_url}`}
                            alt={r.name || "user"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
                            {(r.name || "?").charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className="text-white font-medium text-sm">{r.name || "ผู้ใช้งาน"}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex gap-4 justify-end mt-12">
                <button onClick={() => setReviewPage((p) => Math.max(0, p - 1))} disabled={reviewPage === 0}
                  className="w-10 h-10 md:w-12 md:h-12 border border-white/30 rounded-lg flex items-center justify-center text-white disabled:opacity-30">‹</button>
                <button onClick={() => setReviewPage((p) => p + 1)} disabled={(reviewPage + 1) * 2 >= reviews.length}
                  className="w-10 h-10 md:w-12 md:h-12 border border-white/30 rounded-lg flex items-center justify-center text-white disabled:opacity-30">›</button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Review Popup ─────────────────────────────────────────────────────── */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-bold text-[#1B2144] mb-4">Popup</h3>
            <div className="flex gap-2 mb-4">
              {[1,2,3,4,5].map((s) => (
                <button key={s}
                  onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)} className="text-3xl transition-colors">
                  <span className={(hoverRating || rating) >= s ? "text-[#1B2144]" : "text-gray-300"}>★</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-2">Can you tell us more?</p>
            <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Add feedback"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm h-24 outline-none focus:ring-1 focus:ring-[#1B2144] resize-none" />
            <div className="flex gap-3 mt-4">
              <button onClick={() => { setShowPopup(false); setRating(0); setReviewComment(""); }}
                className="flex-1 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button onClick={submitReview} disabled={submitting || !rating || !reviewComment.trim()}
                className="flex-1 py-2 bg-[#1B2144] text-white rounded-xl text-sm font-medium hover:bg-[#111830] disabled:opacity-40 transition">
                {submitting ? "..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Similar Camps ────────────────────────────────────────────────────── */}
      {recentCamps.length > 0 && (
        <section className="w-full bg-gray-100 px-4 sm:px-8 md:px-16 py-16">
          <h2 className="text-3xl font-bold text-[#1B2A4E] mb-10">กิจกรรมที่คล้ายกัน</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {recentCamps.slice(0, 4).map((c) => (
              <a key={c.id} href={`/Page/Infomation/${c.id}`} className="group cursor-pointer">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                  <div className="relative w-full h-full">
                    <Image
                      src={campImage(c.headline_image_url) ?? campImage(c.poster_url) ?? "/Group 1000005981.png"}
                      alt={c.title} fill className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                </div>
                <p className="mt-4 text-sm md:text-lg font-medium text-[#1B2A4E] line-clamp-2">{c.title}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}