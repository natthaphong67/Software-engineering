"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Camp = {
  id: number;
  title: string;
  tagline: string;
  description: string;
  organizer_name: string;
  contact_email: string;
  contact_phone: string;
  location: string;
  event_date: string;
  registration_deadline: string | null;
  status: "pending" | "approved" | "rejected";
  type: string | null;
  created_at: string;
  poster_url: string | null;
  headline_image_url: string | null;
};

type User = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
};

type Review = {
  id: number;
  user_id: number | null;
  comment: string;
  created_at: string;
  name?: string | null;
};

type Tab = "camps" | "users" | "reviews";

const STATUS_STYLE = {
  pending:  { label: "รอตรวจสอบ", bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-400"   },
  approved: { label: "อนุมัติแล้ว", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-400" },
  rejected: { label: "ปฏิเสธแล้ว", bg: "bg-red-50",    text: "text-red-600",     border: "border-red-200",     dot: "bg-red-400"     },
};

function parseJwt(token: string) {
  try {
    const base64 = token.split(".")[1];
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

function formatDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("th-TH", { day: "2-digit", month: "short", year: "numeric" });
}

function Avatar({ name }: { name: string }) {
  const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div className="w-8 h-8 rounded-full bg-[#1B2144] text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
      {initials}
    </div>
  );
}

function campImageUrl(url: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_URL}/uploads/${url}`;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState<Tab>("camps");

  const [camps, setCamps] = useState<Camp[]>([]);
  const [campsLoading, setCampsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const getToken = () =>
    document.cookie.split("; ").find((r) => r.startsWith("token="))?.split("=")[1] ?? "";

  // 🔒 เช็ค role ก่อน render
  useEffect(() => {
    const token = document.cookie.split("; ").find((r) => r.startsWith("token="))?.split("=")[1];
    if (!token) return void router.replace("/pageAuth/Login");
    const payload = parseJwt(token);
    if (!payload || payload.role !== "admin") return void router.replace("/");
    setAuthorized(true);
  }, []);

  const fetchCamps = async () => {
    setCampsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/camps`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setCamps(Array.isArray(data) ? data : []);
    } catch {
      setMessage({ ok: false, text: "ไม่สามารถโหลดข้อมูลได้" });
    } finally {
      setCampsLoading(false);
    }
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {} finally { setUsersLoading(false); }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch {} finally { setReviewsLoading(false); }
  };

  useEffect(() => { if (authorized) fetchCamps(); }, [authorized]);
  useEffect(() => {
    if (!authorized) return;
    if (tab === "users" && users.length === 0) fetchUsers();
    if (tab === "reviews" && reviews.length === 0) fetchReviews();
  }, [tab, authorized]);

  const updateStatus = async (id: number, action: "approve" | "reject") => {
    setActionLoading(id); setMessage(null);
    try {
      const res = await fetch(`${API_URL}/api/admin/${action}/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ ok: true, text: action === "approve" ? "✅ อนุมัติค่ายเรียบร้อย" : "❌ ปฏิเสธค่ายเรียบร้อย" });
        setCamps((prev) => prev.map((c) => c.id === id ? { ...c, status: action === "approve" ? "approved" : "rejected" } : c));
        if (selectedCamp?.id === id) setSelectedCamp((prev) => prev ? { ...prev, status: action === "approve" ? "approved" : "rejected" } : prev);
      } else { setMessage({ ok: false, text: data.message }); }
    } catch { setMessage({ ok: false, text: "เกิดข้อผิดพลาด" }); }
    finally { setActionLoading(null); }
  };

  const deleteCamp = async (id: number) => {
    if (!confirm("ต้องการลบค่ายนี้?")) return;
    try {
      await fetch(`${API_URL}/api/admin/camps/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setCamps((prev) => prev.filter((c) => c.id !== id));
      if (selectedCamp?.id === id) setSelectedCamp(null);
    } catch {}
  };

  const deleteUser = async (id: number) => {
    if (!confirm("ต้องการลบผู้ใช้นี้?")) return;
    try {
      await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {}
  };

  const deleteReview = async (id: number) => {
    if (!confirm("ต้องการลบรีวิวนี้?")) return;
    try {
      await fetch(`${API_URL}/api/admin/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {}
  };

  const filtered = filter === "all" ? camps : camps.filter((c) => c.status === filter);
  const counts = {
    all: camps.length,
    pending: camps.filter((c) => c.status === "pending").length,
    approved: camps.filter((c) => c.status === "approved").length,
    rejected: camps.filter((c) => c.status === "rejected").length,
  };

  // 🔒 ยังไม่ผ่านการเช็ค ไม่ render อะไรเลย
  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-[#1B2144]">

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-[220px] bg-white border-r border-gray-100 flex flex-col p-6 z-10">
        <div className="text-lg font-bold text-[#1B2144] mb-1">FastCamp</div>
        <div className="text-xs text-gray-400 mb-8">Admin Panel</div>
        <nav className="space-y-1">
          {([
            { key: "camps",   label: "ค่ายกิจกรรม" },
            { key: "users",   label: "ผู้ใช้งาน" },
            { key: "reviews", label: "รีวิวเว็บ" },
          ] as const).map((item) => (
            <div key={item.key} onClick={() => setTab(item.key)}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                tab === item.key ? "bg-[#1B2144] text-white font-medium" : "text-gray-400 hover:text-[#1B2144] hover:bg-gray-50"
              }`}>
              {item.label}
            </div>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="ml-[220px] p-8">

        {/* CAMPS TAB */}
        {tab === "camps" && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-semibold text-[#1B2144]">จัดการค่ายกิจกรรม</h1>
                <p className="text-sm text-gray-400 mt-0.5">อนุมัติหรือปฏิเสธค่ายที่ส่งเข้ามา</p>
              </div>
              <button onClick={fetchCamps} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-100 transition-colors">รีเฟรช</button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {([
                { key: "all",      label: "ทั้งหมด",     color: "text-[#1B2144]",   bg: "bg-white"      },
                { key: "pending",  label: "รอตรวจสอบ",   color: "text-amber-600",   bg: "bg-amber-50"   },
                { key: "approved", label: "อนุมัติแล้ว", color: "text-emerald-600", bg: "bg-emerald-50" },
                { key: "rejected", label: "ปฏิเสธแล้ว", color: "text-red-600",     bg: "bg-red-50"     },
              ] as const).map((s) => (
                <div key={s.key} onClick={() => setFilter(s.key)}
                  className={`${s.bg} rounded-2xl p-5 cursor-pointer border transition-all ${filter === s.key ? "border-[#1B2144]/30 shadow-sm" : "border-transparent hover:border-gray-200"}`}>
                  <p className="text-xs text-gray-400 mb-2">{s.label}</p>
                  <p className={`text-3xl font-bold ${s.color}`}>{counts[s.key]}</p>
                </div>
              ))}
            </div>

            {message && (
              <div className={`mb-4 px-4 py-3 rounded-xl text-sm border ${message.ok ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                {message.text}
              </div>
            )}

            <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1 w-fit">
              {(["all", "pending", "approved", "rejected"] as const).map((s) => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${filter === s ? "bg-[#1B2144] text-white font-medium" : "text-gray-500 hover:text-gray-700"}`}>
                  {{ all: "ทั้งหมด", pending: "รอตรวจสอบ", approved: "อนุมัติ", rejected: "ปฏิเสธ" }[s]}
                  <span className="ml-1.5 text-xs opacity-60">({counts[s]})</span>
                </button>
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              {campsLoading ? (
                <div className="p-12 text-center text-gray-400 text-sm">กำลังโหลด...</div>
              ) : filtered.length === 0 ? (
                <div className="p-12 text-center text-gray-400 text-sm">ไม่มีค่ายในหมวดนี้</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">ค่าย</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">ผู้จัด</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">ประเภท</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">วันที่จัด</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">สถานะ</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((camp) => {
                      const s = STATUS_STYLE[camp.status] ?? STATUS_STYLE.pending;
                      return (
                        <tr key={camp.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4">
                            <button onClick={() => setSelectedCamp(camp)} className="text-left">
                              <p className="font-medium text-[#1B2144] truncate max-w-[200px] hover:underline">{camp.title}</p>
                              <p className="text-xs text-gray-400 truncate max-w-[200px] mt-0.5">{camp.tagline}</p>
                            </button>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2.5">
                              <Avatar name={camp.organizer_name} />
                              <div>
                                <p className="text-[#1B2144] text-xs font-medium">{camp.organizer_name}</p>
                                <p className="text-gray-400 text-xs">{camp.contact_email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-gray-400 text-xs">{camp.type || "—"}</td>
                          <td className="px-5 py-4 text-gray-500 text-xs">{formatDate(camp.event_date)}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.text} ${s.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                              {s.label}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex gap-2 flex-wrap">
                              <button onClick={() => setSelectedCamp(camp)}
                                className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                ดูรายละเอียด
                              </button>
                              {camp.status !== "approved" && (
                                <button onClick={() => updateStatus(camp.id, "approve")} disabled={actionLoading === camp.id}
                                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200 hover:bg-emerald-100 disabled:opacity-40 transition-colors">
                                  {actionLoading === camp.id ? "..." : "อนุมัติ"}
                                </button>
                              )}
                              {camp.status !== "rejected" && (
                                <button onClick={() => updateStatus(camp.id, "reject")} disabled={actionLoading === camp.id}
                                  className="px-3 py-1.5 bg-red-50 text-red-600 text-xs rounded-lg border border-red-200 hover:bg-red-100 disabled:opacity-40 transition-colors">
                                  {actionLoading === camp.id ? "..." : "ปฏิเสธ"}
                                </button>
                              )}
                              <button onClick={() => deleteCamp(camp.id)}
                                className="px-3 py-1.5 bg-red-50 text-red-500 text-xs rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                                ลบ
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* USERS TAB */}
        {tab === "users" && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-semibold text-[#1B2144]">จัดการผู้ใช้งาน</h1>
                <p className="text-sm text-gray-400 mt-0.5">ดูและจัดการข้อมูลผู้ใช้ทั้งหมด</p>
              </div>
              <button onClick={fetchUsers} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-100 transition-colors">รีเฟรช</button>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              {usersLoading ? (
                <div className="p-12 text-center text-gray-400 text-sm">กำลังโหลด...</div>
              ) : users.length === 0 ? (
                <div className="p-12 text-center text-gray-400 text-sm">ไม่มีข้อมูลผู้ใช้</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">ผู้ใช้</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">Role</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">สถานะ</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">สมัครเมื่อ</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={user.full_name} />
                            <div>
                              <p className="text-[#1B2144] text-xs font-medium">{user.full_name}</p>
                              <p className="text-gray-400 text-xs">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-500 text-xs">{user.role}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${user.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-xs">{formatDate(user.created_at)}</td>
                        <td className="px-5 py-4">
                          <button onClick={() => deleteUser(user.id)}
                            className="px-3 py-1.5 bg-red-50 text-red-500 text-xs rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                            ลบ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* REVIEWS TAB */}
        {tab === "reviews" && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-semibold text-[#1B2144]">จัดการรีวิวเว็บ</h1>
                <p className="text-sm text-gray-400 mt-0.5">ดูและลบรีวิวจากผู้ใช้งาน</p>
              </div>
              <button onClick={fetchReviews} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-100 transition-colors">รีเฟรช</button>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              {reviewsLoading ? (
                <div className="p-12 text-center text-gray-400 text-sm">กำลังโหลด...</div>
              ) : reviews.length === 0 ? (
                <div className="p-12 text-center text-gray-400 text-sm">ไม่มีรีวิว</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">ผู้รีวิว</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">ความคิดเห็น</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">วันที่</th>
                      <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {reviews.map((review) => (
                      <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={review.name || "?"} />
                            <p className="text-xs font-medium text-[#1B2144]">{review.name || "ผู้ใช้งาน"}</p>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600 text-xs max-w-[400px]">{review.comment}</td>
                        <td className="px-5 py-4 text-gray-400 text-xs">{formatDate(review.created_at)}</td>
                        <td className="px-5 py-4">
                          <button onClick={() => deleteReview(review.id)}
                            className="px-3 py-1.5 bg-red-50 text-red-500 text-xs rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                            ลบ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>

      {/* CAMP DETAIL MODAL */}
      {selectedCamp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8">
            <div className="relative h-48 rounded-t-2xl overflow-hidden bg-gray-100">
              {campImageUrl(selectedCamp.headline_image_url || selectedCamp.poster_url) ? (
                <img src={campImageUrl(selectedCamp.headline_image_url || selectedCamp.poster_url)!}
                  alt={selectedCamp.title} className="w-full h-full object-cover"/>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">📷</div>
              )}
              <button onClick={() => setSelectedCamp(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition">✕</button>
            </div>

            <div className="p-6">
              {(() => { const s = STATUS_STYLE[selectedCamp.status] ?? STATUS_STYLE.pending; return (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border mb-3 ${s.bg} ${s.text} ${s.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                </span>
              ); })()}

              <h2 className="text-xl font-bold text-[#1B2144] mb-1">{selectedCamp.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{selectedCamp.tagline}</p>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">ผู้จัด</p>
                  <p className="font-medium text-[#1B2144]">{selectedCamp.organizer_name}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">อีเมล</p>
                  <p className="font-medium text-[#1B2144]">{selectedCamp.contact_email}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">เบอร์โทร</p>
                  <p className="font-medium text-[#1B2144]">{selectedCamp.contact_phone || "—"}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">ประเภท</p>
                  <p className="font-medium text-[#1B2144]">{selectedCamp.type || "—"}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">วันที่จัดกิจกรรม</p>
                  <p className="font-medium text-[#1B2144]">{formatDate(selectedCamp.event_date)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">วันปิดรับสมัคร</p>
                  <p className="font-medium text-[#1B2144]">{selectedCamp.registration_deadline ? formatDate(selectedCamp.registration_deadline) : "—"}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                  <p className="text-xs text-gray-400 mb-0.5">สถานที่</p>
                  <p className="font-medium text-[#1B2144]">{selectedCamp.location || "—"}</p>
                </div>
              </div>

              {selectedCamp.description && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-1">รายละเอียด</p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{selectedCamp.description}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={() => setSelectedCamp(null)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
                  ปิด
                </button>
                {selectedCamp.status !== "approved" && (
                  <button onClick={() => updateStatus(selectedCamp.id, "approve")} disabled={actionLoading === selectedCamp.id}
                    className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 disabled:opacity-50">
                    {actionLoading === selectedCamp.id ? "..." : "✅ อนุมัติ"}
                  </button>
                )}
                {selectedCamp.status !== "rejected" && (
                  <button onClick={() => updateStatus(selectedCamp.id, "reject")} disabled={actionLoading === selectedCamp.id}
                    className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 disabled:opacity-50">
                    {actionLoading === selectedCamp.id ? "..." : "❌ ปฏิเสธ"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}