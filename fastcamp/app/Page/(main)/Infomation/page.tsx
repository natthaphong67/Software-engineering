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
  organizer_name: string;
  contact_email: string;
  contact_phone: string;
  poster_url: string | null;
  headline_image_url: string | null;
  type: string | null;
  status: string;
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

function campImage(url: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_URL}/uploads/${url}`;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("th-TH", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function InformationPage() {
  const params = useParams();
  const id = params?.id;

  const [camp, setCamp] = useState<Camp | null>(null);
  const [social, setSocial] = useState<Social | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentCamps, setRecentCamps] = useState<Camp[]>([]);
  const [reviews, setReviews] = useState<{ id: number; rating: number; comment: string; name: string | null }[]>([]);
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
    const fetchReviews = () =>
      fetch(`${API_URL}/api/camps/${id}/reviews`).then((r) => r.json()).catch(() => []);

    Promise.all([
      fetch(`${API_URL}/api/camps/${id}`).then((r) => r.json()),
      fetch(`${API_URL}/api/social/${id}`).then((r) => r.json()).catch(() => null),
      fetch(`${API_URL}/api/camps/recent?limit=4`).then((r) => r.json()).catch(() => []),
      fetchReviews(),
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
        setShowPopup(false);
        setRating(0);
        setReviewComment("");
      }
    } catch {}
    finally { setSubmitting(false); }
  };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">กำลังโหลด...</div>;
  if (!camp) return <div className="min-h-screen flex items-center justify-center text-gray-400">ไม่พบข้อมูลค่าย</div>;

  const heroImg = campImage(camp.headline_image_url) ?? campImage(camp.poster_url);
  const posterImg = campImage(camp.poster_url) ?? campImage(camp.headline_image_url);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full aspect-[16/9] md:aspect-auto md:h-screen overflow-hidden bg-black">
        {heroImg ? (
          <Image src={heroImg} alt={camp.title} fill priority className="object-contain md:object-cover"/>
        ) : (
          <div className="w-full h-full bg-[#1B2144]" />
        )}
      </section>

      {/* POPUP */}
      <section className="relative w-full">
        <div className="relative md:absolute md:left-1/2 md:-bottom-20 md:-translate-x-1/2 w-full max-w-5xl px-4 md:px-0 z-30">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl border border-gray-200 p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-900">{camp.title}</h2>
                <p className="text-gray-500 text-sm">{camp.type || "—"}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-3 md:gap-6 w-full md:w-auto">
                {social?.website && (
                  <a href={social.website} target="_blank" rel="noopener noreferrer"
                    className="w-full md:w-auto border border-blue-500 text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition text-center">
                    ลงทะเบียน
                  </a>
                )}
              </div>
            </div>
            {/* INFO CARD */}
            <div className="mt-6 border border-gray-300 rounded-2xl md:rounded-full px-4 py-4 md:px-8 md:py-5">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                <div className="flex items-center gap-4">
                  <Image src="/location.png" alt="location" width={28} height={28}/>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">สถานที่จัดกิจกรรม</p>
                    <p className="text-gray-500 text-sm">{camp.location || "—"}</p>
                  </div>
                </div>
                <div className="hidden md:block h-10 w-px bg-gray-300"/>
                <div className="flex items-center gap-4">
                  <Image src="/calendar 2.png" alt="calendar" width={28} height={28}/>
                  <div>
                    <p className="font-semibold text-sm">วันที่จัดกิจกรรม</p>
                    <p className="text-gray-500 text-sm">{formatDate(camp.event_date)}</p>
                  </div>
                </div>
                <div className="hidden md:block h-10 w-px bg-gray-300"/>
                <div className="flex items-center gap-4">
                  <Image src="/user.png" alt="user" width={28} height={28}/>
                  <div>
                    <p className="font-semibold text-sm">ผู้จัดกิจกรรม</p>
                    <p className="text-gray-500 text-sm">{camp.organizer_name || "—"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10 md:py-16 mt-16 md:mt-32">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* LEFT */}
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Descriptions</h1>
            <p className="leading-relaxed text-gray-700 text-sm md:text-base whitespace-pre-line">
              {camp.description || "ไม่มีคำอธิบาย"}
            </p>
          </div>
          {/* RIGHT */}
          <div className="w-full lg:w-[535px] shrink-0">
            {/* MAP */}
            {camp.location && (
              <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] rounded-3xl overflow-hidden shadow-lg">
                {camp.location.match(/^-?\d+\.\d+,-?\d+\.\d+$/) ? (
                  // lat,lng format — ใช้ OpenStreetMap embed
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                      (() => { const [la,ln] = camp.location.split(",").map(Number); return `${ln-0.01},${la-0.01},${ln+0.01},${la+0.01}`; })()
                    }&layer=mapnik&marker=${camp.location.replace(",", "%2C")}`}
                    className="w-full h-full border-0" loading="lazy"
                  />
                ) : (
                  // text format — ใช้ Google Maps
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(camp.location)}&output=embed`}
                    className="w-full h-full border-0" loading="lazy"
                  />
                )}
              </div>
            )}
            {/* CONTACT */}
            <div className="space-y-6 mt-6">
              <h1 className="text-xl md:text-2xl font-bold">ติดต่อผู้จัดกิจกรรม</h1>
              <div className="flex gap-4">
                <div className="bg-[#1B2144] w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {camp.organizer_name?.charAt(0) || "?"}
                </div>
                <div>
                  <p className="font-semibold">{camp.organizer_name}</p>
                  <p className="text-gray-500 text-sm">{camp.contact_email}</p>
                  <div className="flex gap-3 mt-2">
                    {social?.facebook && <a href={social.facebook} target="_blank"><Image src="/facebook.png" alt="fb" width={20} height={20}/></a>}
                    {social?.website && <a href={social.website} target="_blank"><Image src="/internet.png" alt="web" width={20} height={20}/></a>}
                    {social?.instagram && <a href={social.instagram} target="_blank"><Image src="/instagram.png" alt="ig" width={20} height={20}/></a>}
                    {social?.tiktok && <a href={social.tiktok} target="_blank"><Image src="/tiktok.png" alt="tt" width={20} height={20}/></a>}
                    {social?.youtube && <a href={social.youtube} target="_blank"><Image src="/youtube.png" alt="yt" width={20} height={20}/></a>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* What Campers Said */}
      <section className="w-full px-6 md:px-20 py-10 md:py-24 flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between gap-10 md:gap-20 bg-gradient-to-r from-[#2B2F47] to-[#000523]">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">What Campers Said</h1>
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
                    <div className="text-xl text-yellow-400">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">{r.comment}</p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
                        {(r.name || "?").charAt(0).toUpperCase()}
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

      {/* Review Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-bold text-[#1B2144] mb-4">Popup</h3>
            <div className="flex gap-2 mb-4">
              {[1,2,3,4,5].map((s) => (
                <button key={s}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                  className="text-3xl transition-colors">
                  <span className={(hoverRating || rating) >= s ? "text-[#1B2144]" : "text-gray-300"}>★</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-2">Can you tell us more?</p>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Add feedback"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm h-24 outline-none focus:ring-1 focus:ring-[#1B2144] resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={() => { setShowPopup(false); setRating(0); setReviewComment(""); }}
                className="flex-1 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={submitReview} disabled={submitting || !rating || !reviewComment.trim()}
                className="flex-1 py-2 bg-[#1B2144] text-white rounded-xl text-sm font-medium hover:bg-[#111830] disabled:opacity-40 transition">
                {submitting ? "..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* กิจกรรมที่คล้ายกัน */}
      {recentCamps.length > 0 && (
        <section className="w-full bg-gray-100 px-16 py-16">
          <h2 className="text-3xl font-bold text-[#1B2A4E] mb-10">กิจกรรมที่คล้ายกัน</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentCamps.slice(0, 4).map((c) => (
              <a key={c.id} href={`/Page/Infomation/${c.id}`} className="group cursor-pointer">
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={campImage(c.headline_image_url) ?? campImage(c.poster_url) ?? "/Group 1000005981.png"}
                      alt={c.title} fill className="object-cover group-hover:scale-105 transition"
                    />
                  </div>
                </div>
                <p className="mt-4 text-lg font-medium text-[#1B2A4E]">{c.title}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}