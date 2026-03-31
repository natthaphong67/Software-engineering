"use client";

import { useState, useEffect, useRef } from "react";
import MapPicker from "./Mappick";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type UserData = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  avatar_url: string | null;
  created_at: string;
};

type Camp = {
  id: number;
  title: string;
  event_date: string;
  registration_deadline?: string | null;
  status: string;
  camp_status: string | null;
  poster_url: string | null;
  headline_image_url: string | null;
  organizer_name: string;
};

type EditForm = {
  title: string; tagline: string; description: string; location: string;
  event_date: string; registration_deadline: string;
  organizer_name: string; contact_name: string; contact_email: string;
  contact_phone: string; application_link: string;
  category: string; event_format: string[]; max_participants: string;
  price: string; price_type: string[];
  registration_type: string[]; team_size: string; prize: string;
  participant_level: string[]; age_range: string[]; academic_track: string[];
  academic_other: string; gpa_note: string; additional_other: string; region_note: string;
  facebook: string; instagram: string; twitter: string; website: string;
  youtube: string; discord: string; tiktok: string;
};

const INITIAL_EDIT: EditForm = {
  title: "", tagline: "", description: "", location: "",
  event_date: "", registration_deadline: "",
  organizer_name: "", contact_name: "", contact_email: "", contact_phone: "",
  application_link: "", category: "",
  event_format: [], max_participants: "",
  price: "", price_type: [],
  registration_type: [], team_size: "", prize: "",
  participant_level: [], age_range: [], academic_track: [],
  academic_other: "", gpa_note: "", additional_other: "", region_note: "",
  facebook: "", instagram: "", twitter: "", website: "", youtube: "", discord: "", tiktok: "",
};

const CAMPS_PER_PAGE = 3;

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" className="w-4 h-4 accent-[#1B2144]" checked={checked} onChange={onChange} />
      <span className="text-sm text-gray-600">{label}</span>
    </label>
  );
}

function toggleArr(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

// ── Image Upload Box ──────────────────────────────────────────────────────────
function ImageUploadBox({
  label, current, file, onChange,
}: {
  label: string;
  current: string | null;
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const preview = file ? URL.createObjectURL(file) : current ? (current.startsWith("http") ? current : `${API_URL}/uploads/${current}`) : null;
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 block mb-1">{label}</label>
      <div
        className="relative w-full h-32 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden cursor-pointer bg-gray-50 hover:bg-gray-100 transition flex items-center justify-center"
        onClick={() => ref.current?.click()}
      >
        {preview ? (
          <>
            <img src={preview} alt={label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
              <span className="text-white text-xs font-medium">เปลี่ยนรูป</span>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400">
            <p className="text-2xl mb-1">📷</p>
            <p className="text-xs">คลิกเพื่ออัปโหลด</p>
          </div>
        )}
      </div>
      <input ref={ref} type="file" accept=".jpg,.jpeg,.png" className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
      {file && <p className="text-xs text-green-600 mt-1">✅ {file.name}</p>}
    </div>
  );
}

export default function EditProfile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  const [showPwModal, setShowPwModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState<string | null>(null);
  const [pwLoading, setPwLoading] = useState(false);

  const [myCamps, setMyCamps] = useState<Camp[]>([]);
  const [closingId, setClosingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editCamp, setEditCamp] = useState<Camp | null>(null);
  const [editForm, setEditForm] = useState<EditForm>(INITIAL_EDIT);
  const [editLoading, setEditLoading] = useState(false);
  const [editMsg, setEditMsg] = useState<string | null>(null);
  const [campPage, setCampPage] = useState(0);
  const [activeTab, setActiveTab] = useState<"basic" | "activity" | "eligibility" | "social" | "images">("basic");

  // ✅ รูปภาพค่าย
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [headlineFile, setHeadlineFile] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const getToken = () =>
    document.cookie.split("; ").find((r) => r.startsWith("token="))?.split("=")[1] ?? null;

  const getUserId = () => {
    const token = getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || payload.userId || payload.user_id;
    } catch { return null; }
  };

  useEffect(() => {
    const id = getUserId();
    const token = getToken();
    if (!id || !token) return;
    fetch(`${API_URL}/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json()).then((data) => { if (data?.id) setUser(data); });
    fetch(`${API_URL}/api/camps/my`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json()).then((data) => { if (Array.isArray(data)) setMyCamps(data); }).catch(() => {});
  }, []);

  const avatarSrc = avatarPreview
    ?? (user?.avatar_url
      ? (user.avatar_url.startsWith("http") ? user.avatar_url : `${API_URL}/uploads/${user.avatar_url}`)
      : null);

  const initial = (user?.full_name || "?").charAt(0).toUpperCase();

  const campImg = (camp: Camp) => {
    const url = camp.headline_image_url || camp.poster_url;
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${API_URL}/uploads/${url}`;
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile || !user) return;
    setUploading(true); setUploadMsg(null);
    try {
      const fd = new FormData();
      fd.append("avatar", avatarFile);
      const res = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: "PUT", headers: { Authorization: `Bearer ${getToken()}` }, body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setUser((prev) => prev ? { ...prev, avatar_url: data.avatar_url } : prev);
        setUploadMsg("✅ อัพโหลดรูปสำเร็จ!"); setAvatarFile(null);
      } else { setUploadMsg(`❌ ${data.message}`); }
    } catch { setUploadMsg("❌ เชื่อมต่อ server ไม่ได้"); }
    finally { setUploading(false); }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword || !oldPassword) { setPwMsg("❌ กรอกข้อมูลให้ครบ"); return; }
    if (newPassword !== confirmPassword) { setPwMsg("❌ รหัสผ่านใหม่ไม่ตรงกัน"); return; }
    if (newPassword.length < 6) { setPwMsg("❌ รหัสผ่านต้องมีอย่างน้อย 6 ตัว"); return; }
    setPwLoading(true); setPwMsg(null);
    try {
      const res = await fetch(`${API_URL}/api/users/${user?.id}/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwMsg("✅ เปลี่ยนรหัสผ่านสำเร็จ!");
        setOldPassword(""); setNewPassword(""); setConfirmPassword("");
        setTimeout(() => setShowPwModal(false), 1500);
      } else { setPwMsg(`❌ ${data.message}`); }
    } catch { setPwMsg("❌ เชื่อมต่อ server ไม่ได้"); }
    finally { setPwLoading(false); }
  };

  const handleCloseCamp = async (campId: number) => {
    if (!confirm("ต้องการปิดรับสมัครค่ายนี้?")) return;
    setClosingId(campId);
    try {
      const res = await fetch(`${API_URL}/api/camps/${campId}/close`, {
        method: "PUT", headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) setMyCamps((prev) => prev.map((c) => c.id === campId ? { ...c, camp_status: "closed" } : c));
    } catch {} finally { setClosingId(null); }
  };

  const handleDeleteCamp = async (campId: number) => {
    if (!confirm("ต้องการลบค่ายนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้")) return;
    setDeletingId(campId);
    try {
      const res = await fetch(`${API_URL}/api/camps/${campId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        setMyCamps((prev) => prev.filter((c) => c.id !== campId));
        if (visibleCamps.length === 1 && campPage > 0) setCampPage((p) => p - 1);
      }
    } catch {} finally { setDeletingId(null); }
  };

  const openEdit = (camp: Camp) => {
    setEditCamp(camp);
    setEditMsg(null);
    setActiveTab("basic");
    setPosterFile(null);
    setHeadlineFile(null);
    const c = camp as any;
    const eligParts = (c.eligibility || "").split(",").filter(Boolean);
    const levels = eligParts.filter((p: string) => ["highschool","middleschool","primary","college","vocational","general"].includes(p));
    const ages = eligParts.filter((p: string) => ["u15","15-18","19-22","23+"].includes(p));
    const academics = eligParts.filter((p: string) => ["science","arts","any","other"].includes(p));
    setEditForm({
      title: c.title || "", tagline: c.tagline || "", description: c.description || "",
      location: c.location || "",
      event_date: camp.event_date ? new Date(camp.event_date).toISOString().split("T")[0] : "",
      registration_deadline: camp.registration_deadline ? new Date(camp.registration_deadline).toISOString().split("T")[0] : "",
      organizer_name: c.organizer_name || "", contact_name: c.contact_name || "",
      contact_email: c.contact_email || "", contact_phone: c.contact_phone || "",
      application_link: c.application_link || "", category: c.category || "",
      event_format: c.event_format ? c.event_format.split(",").filter(Boolean) : [],
      max_participants: c.max_participants ? String(c.max_participants) : "",
      price: c.price ? String(c.price) : "",
      price_type: c.price_type ? c.price_type.split(",").filter(Boolean) : [],
      registration_type: c.registration_type ? c.registration_type.split(",").filter(Boolean) : [],
      team_size: c.team_size || "", prize: c.prize || "",
      participant_level: levels, age_range: ages, academic_track: academics,
      academic_other: eligParts.find((p: string) => p.startsWith("academic_other:"))?.slice(15) || "",
      gpa_note: eligParts.find((p: string) => p.startsWith("gpa:"))?.slice(4) || "",
      additional_other: eligParts.find((p: string) => p.startsWith("additional:"))?.slice(11) || "",
      region_note: eligParts.find((p: string) => p.startsWith("region:"))?.slice(7) || "",
      facebook: c.facebook || "", instagram: c.instagram || "", twitter: c.twitter || "",
      website: c.website || "", youtube: c.youtube || "", discord: c.discord || "", tiktok: c.tiktok || "",
    });
  };

  const handleEditCamp = async () => {
    if (!editCamp) return;
    setEditLoading(true); setEditMsg(null);
    try {
      const fd = new FormData();
      fd.append("title", editForm.title);
      fd.append("tagline", editForm.tagline);
      fd.append("description", editForm.description);
      fd.append("location", editForm.location);
      fd.append("event_date", editForm.event_date);
      fd.append("registration_deadline", editForm.registration_deadline);
      fd.append("organizer_name", editForm.organizer_name);
      fd.append("contact_name", editForm.contact_name || editForm.organizer_name);
      fd.append("contact_email", editForm.contact_email);
      fd.append("contact_phone", editForm.contact_phone);
      fd.append("application_link", editForm.application_link);
      fd.append("category", editForm.category);
      fd.append("event_format", editForm.event_format.join(","));
      fd.append("max_participants", editForm.max_participants);
      fd.append("price", editForm.price);
      fd.append("price_type", editForm.price_type.join(","));
      fd.append("registration_type", editForm.registration_type.join(","));
      fd.append("team_size", editForm.team_size);
      fd.append("prize", editForm.prize);
      const eligParts = [
        ...editForm.participant_level, ...editForm.age_range, ...editForm.academic_track,
        editForm.academic_other ? `academic_other:${editForm.academic_other}` : "",
        editForm.gpa_note ? `gpa:${editForm.gpa_note}` : "",
        editForm.additional_other ? `additional:${editForm.additional_other}` : "",
        editForm.region_note ? `region:${editForm.region_note}` : "",
      ].filter(Boolean);
      fd.append("eligibility", eligParts.join(","));
      fd.append("facebook", editForm.facebook);
      fd.append("instagram", editForm.instagram);
      fd.append("twitter", editForm.twitter);
      fd.append("website", editForm.website);
      fd.append("youtube", editForm.youtube);
      fd.append("discord", editForm.discord);
      fd.append("tiktok", editForm.tiktok);
      // ✅ รูปภาพค่าย
      if (posterFile) fd.append("poster", posterFile);
      if (headlineFile) fd.append("headline", headlineFile);

      const res = await fetch(`${API_URL}/api/camps/${editCamp.id}/edit`, {
        method: "PUT", headers: { Authorization: `Bearer ${getToken()}` }, body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setEditMsg("✅ แก้ไขสำเร็จ รอแอดมินอนุมัติใหม่");
        setMyCamps((prev) => prev.map((c) => c.id === editCamp.id ? { ...c, title: editForm.title || c.title, status: "pending" } : c));
        setTimeout(() => { setEditCamp(null); setEditMsg(null); }, 1500);
      } else { setEditMsg(`❌ ${data.message}`); }
    } catch { setEditMsg("❌ เชื่อมต่อ server ไม่ได้"); }
    finally { setEditLoading(false); }
  };

  const set = (key: keyof EditForm) => (val: string) => setEditForm((prev) => ({ ...prev, [key]: val }));
  const toggle = (key: keyof EditForm, val: string) =>
    setEditForm((prev) => ({ ...prev, [key]: toggleArr(prev[key] as string[], val) }));

  const formatDate = (d: string) => new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" });
  const totalPages = Math.ceil(myCamps.length / CAMPS_PER_PAGE);
  const visibleCamps = myCamps.slice(campPage * CAMPS_PER_PAGE, (campPage + 1) * CAMPS_PER_PAGE);
  const inputCls = "w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white outline-none focus:ring-1 focus:ring-[#1B2144]";

  const TABS = [
    { key: "basic",       label: "📋 พื้นฐาน"   },
    { key: "activity",    label: "🎯 กิจกรรม"   },
    { key: "eligibility", label: "👤 คุณสมบัติ" },
    { key: "social",      label: "🔗 โซเชียล"   },
    { key: "images",      label: "🖼️ รูปภาพ"    },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">

        {/* ── Profile Card ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer" onClick={() => fileRef.current?.click()}>
                {avatarSrc ? (
                  <img src={avatarSrc} alt="avatar" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-gray-200"/>
                ) : (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1B2144] flex items-center justify-center text-white text-xl font-bold ring-2 ring-gray-200">{initial}</div>
                )}
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white text-xs">แก้ไข</span>
                </div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange}/>
              <div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{user?.full_name || "—"}</p>
                <p className="text-xs sm:text-sm text-gray-400">{user?.email || "—"}</p>
              </div>
            </div>
            <button onClick={() => setShowPwModal(true)}
              className="self-start sm:self-auto bg-gray-900 text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-gray-700 transition">
              เปลี่ยนรหัสผ่าน
            </button>
          </div>

          {avatarFile && (
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sm text-gray-500 truncate max-w-[180px]">{avatarFile.name}</span>
              <button onClick={handleUploadAvatar} disabled={uploading}
                className="px-4 py-1.5 bg-[#1B2144] text-white text-sm rounded-lg disabled:opacity-50">
                {uploading ? "กำลังอัพโหลด..." : "บันทึกรูป"}
              </button>
            </div>
          )}
          {uploadMsg && <p className="text-sm mb-4">{uploadMsg}</p>}

          <hr className="border-gray-100 mb-5 sm:mb-8"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[["Full Name", user?.full_name], ["E-mail", user?.email], ["Role", user?.role]].map(([label, val]) => (
              <div key={label as string}>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">{label as string}</label>
                <input type="text" value={val || ""} readOnly
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-gray-500 text-sm cursor-not-allowed"/>
              </div>
            ))}
          </div>
        </div>

        {/* ── My Camps ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">ค่ายที่ฉันส่ง</h2>
            <span className="text-xs sm:text-sm text-gray-400">{myCamps.length} ค่าย</span>
          </div>
          {myCamps.length === 0 ? (
            <p className="text-gray-400 text-sm">ยังไม่มีค่าย</p>
          ) : (
            <>
              <div className="space-y-3 sm:space-y-4">
                {visibleCamps.map((camp) => {
                  const img = campImg(camp);
                  const deadlinePassed = camp.registration_deadline ? new Date(camp.registration_deadline) < new Date() : false;
                  const isClosed = camp.camp_status === "closed" || deadlinePassed;
                  return (
                    <div key={camp.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition">
                      {/* รูป */}
                      <div className="w-full sm:w-20 h-40 sm:h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {img ? <img src={img} alt={camp.title} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">📷</div>}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate text-sm sm:text-base">{camp.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(camp.event_date)}</p>
                        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${camp.status === "approved" ? "bg-green-100 text-green-700" : camp.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-600"}`}>
                            {camp.status === "approved" ? "อนุมัติแล้ว" : camp.status === "pending" ? "รอการอนุมัติ" : camp.status}
                          </span>
                          {isClosed && <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500">🔴 ปิดรับสมัครแล้ว</span>}
                        </div>
                      </div>
                      {/* Buttons */}
                      <div className="flex items-center gap-2 flex-wrap sm:flex-shrink-0">
                        <button onClick={() => openEdit(camp)} className="flex-1 sm:flex-none px-3 py-1.5 text-xs border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition whitespace-nowrap">✏️ แก้ไข</button>
                        {!isClosed && camp.status === "approved" && (
                          <button onClick={() => handleCloseCamp(camp.id)} disabled={closingId === camp.id}
                            className="flex-1 sm:flex-none px-3 py-1.5 text-xs border border-orange-300 text-orange-500 rounded-lg hover:bg-orange-50 disabled:opacity-50 transition whitespace-nowrap">
                            {closingId === camp.id ? "กำลังปิด..." : "ปิดรับสมัคร"}
                          </button>
                        )}
                        <button onClick={() => handleDeleteCamp(camp.id)} disabled={deletingId === camp.id}
                          className="flex-1 sm:flex-none px-3 py-1.5 text-xs border border-red-300 text-red-500 rounded-lg hover:bg-red-50 disabled:opacity-50 transition whitespace-nowrap">
                          {deletingId === camp.id ? "กำลังลบ..." : "🗑️ ลบ"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-5 sm:mt-6 pt-4 border-t border-gray-100">
                  <button onClick={() => setCampPage((p) => Math.max(0, p - 1))} disabled={campPage === 0}
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition">← ก่อนหน้า</button>
                  <span className="text-xs sm:text-sm text-gray-400">{campPage + 1} / {totalPages}</span>
                  <button onClick={() => setCampPage((p) => Math.min(totalPages - 1, p + 1))} disabled={campPage === totalPages - 1}
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition">ถัดไป →</button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* ── Change Password Modal ─────────────────────────────────────────────── */}
      {showPwModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-sm shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-5">เปลี่ยนรหัสผ่าน</h3>
            <div className="space-y-4">
              {[["รหัสผ่านเดิม", oldPassword, setOldPassword], ["รหัสผ่านใหม่", newPassword, setNewPassword], ["ยืนยันรหัสผ่านใหม่", confirmPassword, setConfirmPassword]].map(([label, val, setter]: any) => (
                <div key={label}>
                  <label className="text-sm font-medium text-gray-600">{label}</label>
                  <input type="password" value={val} onChange={(e) => setter(e.target.value)}
                    className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-gray-900"/>
                </div>
              ))}
            </div>
            {pwMsg && <p className="text-sm mt-3">{pwMsg}</p>}
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowPwModal(false); setPwMsg(null); setOldPassword(""); setNewPassword(""); setConfirmPassword(""); }}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">ยกเลิก</button>
              <button onClick={handleChangePassword} disabled={pwLoading}
                className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 disabled:opacity-50">
                {pwLoading ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Camp Modal ───────────────────────────────────────────────────── */}
      {editCamp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4 sm:py-6">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh]">

            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 pt-5 sm:pt-6 pb-3 border-b border-gray-100 flex-shrink-0">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">แก้ไขค่าย: <span className="text-[#1B2144] truncate">{editCamp.title}</span></h3>
              <button onClick={() => setEditCamp(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none p-1">✕</button>
            </div>

            {/* Warning */}
            <div className="px-5 sm:px-6 py-2 flex-shrink-0">
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                ⚠️ หลังแก้ไข สถานะค่ายจะเปลี่ยนเป็น "รอแอดมินอนุมัติ" ใหม่
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-5 sm:px-6 pb-2 flex-shrink-0 overflow-x-auto scrollbar-hide">
              {TABS.map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition flex-shrink-0 ${activeTab === tab.key ? "bg-[#1B2144] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-4 space-y-4">

              {/* Tab: Basic */}
              {activeTab === "basic" && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ชื่อค่าย</label>
                    <input value={editForm.title} onChange={(e) => set("title")(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tagline (คำโปรย)</label>
                    <input value={editForm.tagline} onChange={(e) => set("tagline")(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">รายละเอียด</label>
                    <textarea value={editForm.description} onChange={(e) => set("description")(e.target.value)} rows={4} className={`${inputCls} resize-none`} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">สถานที่</label>
                    <div className="mt-1"><MapPicker value={editForm.location} onChange={(loc) => set("location")(loc)} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">วันที่จัดกิจกรรม</label>
                      <input type="date" value={editForm.event_date} onChange={(e) => set("event_date")(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">วันปิดรับสมัคร</label>
                      <input type="date" value={editForm.registration_deadline} onChange={(e) => set("registration_deadline")(e.target.value)} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ชื่อผู้จัด / องค์กร</label>
                    <input value={editForm.organizer_name} onChange={(e) => set("organizer_name")(e.target.value)} className={inputCls} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">อีเมลติดต่อ</label>
                      <input value={editForm.contact_email} onChange={(e) => set("contact_email")(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">เบอร์โทร</label>
                      <input value={editForm.contact_phone} onChange={(e) => set("contact_phone")(e.target.value)} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ลิงค์สมัคร</label>
                    <input value={editForm.application_link} onChange={(e) => set("application_link")(e.target.value)} placeholder="https://..." className={inputCls} />
                  </div>
                </>
              )}

              {/* Tab: Activity */}
              {activeTab === "activity" && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">ประเภทกิจกรรม</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {["แนะแนวคณะ/อาชีพ","พัฒนาทักษะ/เวิร์กชอป","นิทรรศการ/เปิดบ้าน","เสวนา/สัมมนา/ทอล์คโชว์"].map((t) => (
                        <Checkbox key={t} label={t} checked={editForm.category.includes(t)}
                          onChange={() => { const cats = editForm.category.split(",").filter(Boolean); set("category")(toggleArr(cats, t).join(",")); }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">รูปแบบกิจกรรม</label>
                    <div className="space-y-2">
                      {["กิจกรรมในสถานที่จริง (วันเดียว)","กิจกรรมในสถานที่จริง (ไม่ค้างคืน)","กิจกรรมในสถานที่จริง (ค้างคืน)","กิจกรรมออนไลน์ (Live / Zoom)"].map((f) => (
                        <Checkbox key={f} label={f} checked={editForm.event_format.includes(f)} onChange={() => toggle("event_format", f)} />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">จำนวนรับสมัคร</label>
                      <input value={editForm.max_participants} onChange={(e) => set("max_participants")(e.target.value)} placeholder="เช่น 50" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">ค่าใช้จ่าย (บาท)</label>
                      <input value={editForm.price} onChange={(e) => set("price")(e.target.value)} placeholder="0 = ฟรี" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">รูปแบบการชำระเงิน</label>
                    <div className="space-y-2">
                      {[{label:"ฟรี",val:"free"},{label:"ชำระตอนสมัคร",val:"pay_at_apply"},{label:"ชำระหลังประกาศรายชื่อ",val:"pay_after"}].map(({label,val}) => (
                        <Checkbox key={val} label={label} checked={editForm.price_type.includes(val)} onChange={() => toggle("price_type", val)} />
                      ))}
                    </div>
                  </div>
                  <hr className="border-gray-100" />
                  <p className="text-sm font-semibold text-gray-700">สำหรับกิจกรรมการแข่งขัน</p>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">รูปแบบการรับสมัคร</label>
                    <div className="space-y-2">
                      <Checkbox label="บุคคลเดี่ยว" checked={editForm.registration_type.includes("individual")} onChange={() => toggle("registration_type", "individual")} />
                      <Checkbox label="ทีม" checked={editForm.registration_type.includes("team")} onChange={() => toggle("registration_type", "team")} />
                    </div>
                    {editForm.registration_type.includes("team") && (
                      <input value={editForm.team_size} onChange={(e) => set("team_size")(e.target.value)} placeholder="จำนวนสมาชิกต่อทีม" className={`${inputCls} mt-2 max-w-xs`} />
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">รางวัล</label>
                    <input value={editForm.prize} onChange={(e) => set("prize")(e.target.value)} placeholder="เช่น เงินรางวัล 50,000 บาท" className={inputCls} />
                  </div>
                </>
              )}

              {/* Tab: Eligibility */}
              {activeTab === "eligibility" && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">ระดับผู้เข้าร่วม</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[{label:"นักเรียนมัธยมปลาย",val:"highschool"},{label:"นักเรียนมัธยมต้น",val:"middleschool"},{label:"นักเรียนประถม",val:"primary"},{label:"นักศึกษา",val:"college"},{label:"ผู้เรียนสายอาชีวะ",val:"vocational"},{label:"บุคคลทั่วไป",val:"general"}].map(({label,val}) => (
                        <Checkbox key={val} label={label} checked={editForm.participant_level.includes(val)} onChange={() => toggle("participant_level", val)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">ช่วงอายุ</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[{label:"ต่ำกว่า 15 ปี",val:"u15"},{label:"15–18 ปี",val:"15-18"},{label:"19–22 ปี",val:"19-22"},{label:"23 ปีขึ้นไป",val:"23+"}].map(({label,val}) => (
                        <Checkbox key={val} label={label} checked={editForm.age_range.includes(val)} onChange={() => toggle("age_range", val)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">สายการเรียน</label>
                    <div className="space-y-2">
                      {[{label:"สายวิทย์-คณิต",val:"science"},{label:"สายศิลป์-ภาษา",val:"arts"},{label:"ทุกสายการเรียน",val:"any"}].map(({label,val}) => (
                        <Checkbox key={val} label={label} checked={editForm.academic_track.includes(val)} onChange={() => toggle("academic_track", val)} />
                      ))}
                      <div className="flex items-center gap-2 flex-wrap">
                        <Checkbox label="อื่นๆ" checked={editForm.academic_track.includes("other")} onChange={() => toggle("academic_track", "other")} />
                        {editForm.academic_track.includes("other") && (
                          <input value={editForm.academic_other} onChange={(e) => set("academic_other")(e.target.value)}
                            placeholder="ระบุสายการเรียน" className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[#1B2144]" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">เกรดเฉลี่ยขั้นต่ำ (GPA)</label>
                    <input value={editForm.gpa_note} onChange={(e) => set("gpa_note")(e.target.value)} placeholder="เช่น 2.50 หรือ ไม่กำหนด" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">คุณสมบัติเพิ่มเติม</label>
                    <input value={editForm.additional_other} onChange={(e) => set("additional_other")(e.target.value)} placeholder="เช่น ต้องมีพอร์ตโฟลิโอ" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">หมายเหตุภูมิภาค / จังหวัด</label>
                    <input value={editForm.region_note} onChange={(e) => set("region_note")(e.target.value)} placeholder="เช่น จัดเฉพาะในกรุงเทพฯ" className={inputCls} />
                  </div>
                </>
              )}

              {/* Tab: Social */}
              {activeTab === "social" && (
                <>
                  {(["facebook","instagram","twitter","website","youtube","discord","tiktok"] as const).map((key) => (
                    <div key={key}>
                      <label className="text-sm font-medium text-gray-600 capitalize">{key === "twitter" ? "Twitter / X" : key.charAt(0).toUpperCase() + key.slice(1)}</label>
                      <input value={editForm[key]} onChange={(e) => set(key)(e.target.value)} placeholder="ลิงค์หรือ username" className={inputCls} />
                    </div>
                  ))}
                </>
              )}

              {/* ✅ Tab: Images */}
              {activeTab === "images" && (
                <div className="space-y-6">
                  <p className="text-xs text-gray-500">อัปโหลดรูปใหม่เพื่อแทนที่รูปเดิม รองรับ JPEG, PNG, JPG</p>
                  <ImageUploadBox
                    label="Headline Image (ภาพหลักสำหรับประชาสัมพันธ์)"
                    current={editCamp.headline_image_url}
                    file={headlineFile}
                    onChange={setHeadlineFile}
                  />
                  <ImageUploadBox
                    label="Poster (โปสเตอร์กิจกรรม)"
                    current={editCamp.poster_url}
                    file={posterFile}
                    onChange={setPosterFile}
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            {editMsg && <p className="text-sm px-5 sm:px-6 py-2 flex-shrink-0">{editMsg}</p>}
            <div className="flex gap-3 px-5 sm:px-6 py-4 border-t border-gray-100 flex-shrink-0">
              <button onClick={() => setEditCamp(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">ยกเลิก</button>
              <button onClick={handleEditCamp} disabled={editLoading}
                className="flex-1 py-2.5 bg-[#1B2144] text-white rounded-xl text-sm font-medium hover:bg-[#111830] disabled:opacity-50">
                {editLoading ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}