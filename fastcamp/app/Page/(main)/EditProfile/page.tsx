"use client";

import { useState, useEffect, useRef } from "react";

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

const CAMPS_PER_PAGE = 3;

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
  const [editForm, setEditForm] = useState({ title: "", tagline: "", description: "", location: "", event_date: "", registration_deadline: "", organizer_name: "", contact_email: "", contact_phone: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [editMsg, setEditMsg] = useState<string | null>(null);
  const [campPage, setCampPage] = useState(0);

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

    fetch(`${API_URL}/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()).then((data) => {
      if (data?.id) setUser(data);
    });

    fetch(`${API_URL}/api/camps/my`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setMyCamps(data);
    }).catch(() => {});
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
        method: "PUT",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setUser((prev) => prev ? { ...prev, avatar_url: data.avatar_url } : prev);
        setUploadMsg("✅ อัพโหลดรูปสำเร็จ!");
        setAvatarFile(null);
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
        method: "PUT",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        setMyCamps((prev) => prev.map((c) => c.id === campId ? { ...c, camp_status: "closed" } : c));
      }
    } catch {}
    finally { setClosingId(null); }
  };

  const handleDeleteCamp = async (campId: number) => {
    if (!confirm("ต้องการลบค่ายนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้")) return;
    setDeletingId(campId);
    try {
      const res = await fetch(`${API_URL}/api/camps/${campId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        setMyCamps((prev) => prev.filter((c) => c.id !== campId));
        if (visibleCamps.length === 1 && campPage > 0) setCampPage((p) => p - 1);
      }
    } catch {}
    finally { setDeletingId(null); }
  };

  const openEdit = (camp: Camp) => {
    setEditCamp(camp);
    setEditMsg(null);
    setEditForm({
      title: camp.title || "",
      tagline: "",
      description: "",
      location: "",
      event_date: camp.event_date ? camp.event_date.split("T")[0] : "",
      registration_deadline: camp.registration_deadline ? camp.registration_deadline.split("T")[0] : "",
      organizer_name: camp.organizer_name || "",
      contact_email: "",
      contact_phone: "",
    });
  };

  const handleEditCamp = async () => {
    if (!editCamp) return;
    setEditLoading(true); setEditMsg(null);
    try {
      const fd = new FormData();
      Object.entries(editForm).forEach(([k, v]) => { if (v) fd.append(k, v); });
      const res = await fetch(`${API_URL}/api/camps/${editCamp.id}/edit`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
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

  const formatDate = (d: string) => new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" });

  const totalPages = Math.ceil(myCamps.length / CAMPS_PER_PAGE);
  const visibleCamps = myCamps.slice(campPage * CAMPS_PER_PAGE, (campPage + 1) * CAMPS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-20">
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer" onClick={() => fileRef.current?.click()}>
                {avatarSrc ? (
                  <img src={avatarSrc} alt="avatar" className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200"/>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#1B2144] flex items-center justify-center text-white text-xl font-bold ring-2 ring-gray-200">
                    {initial}
                  </div>
                )}
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white text-xs">แก้ไข</span>
                </div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange}/>
              <div>
                <p className="font-semibold text-gray-900">{user?.full_name || "—"}</p>
                <p className="text-sm text-gray-400">{user?.email || "—"}</p>
              </div>
            </div>
            <button onClick={() => setShowPwModal(true)}
              className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-700 transition">
              เปลี่ยนรหัสผ่าน
            </button>
          </div>

          {avatarFile && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-gray-500">รูปใหม่: {avatarFile.name}</span>
              <button onClick={handleUploadAvatar} disabled={uploading}
                className="px-4 py-1.5 bg-[#1B2144] text-white text-sm rounded-lg disabled:opacity-50">
                {uploading ? "กำลังอัพโหลด..." : "บันทึกรูป"}
              </button>
            </div>
          )}
          {uploadMsg && <p className="text-sm mb-4">{uploadMsg}</p>}

          <hr className="border-gray-100 mb-8"/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
              <input type="text" value={user?.full_name || ""} readOnly
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">E-mail</label>
              <input type="email" value={user?.email || ""} readOnly
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Role</label>
              <input type="text" value={user?.role || ""} readOnly
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed"/>
            </div>
          </div>
        </div>

        {/* My Camps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">ค่ายที่ฉันส่ง</h2>
            <span className="text-sm text-gray-400">{myCamps.length} ค่าย</span>
          </div>

          {myCamps.length === 0 ? (
            <p className="text-gray-400 text-sm">ยังไม่มีค่าย</p>
          ) : (
            <>
              <div className="space-y-4">
                {visibleCamps.map((camp) => {
                  const img = campImg(camp);
                  const deadlinePassed = camp.registration_deadline
                    ? new Date(camp.registration_deadline) < new Date()
                    : false;
                  const isClosed = camp.camp_status === "closed" || deadlinePassed;
                  return (
                    <div key={camp.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition">
                      {/* รูป */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {img ? (
                          <img src={img} alt={camp.title} className="w-full h-full object-cover"/>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">📷</div>
                        )}
                      </div>

                      {/* ข้อมูล */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{camp.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(camp.event_date)}</p>
                        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                            camp.status === "approved" ? "bg-green-100 text-green-700" :
                            camp.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-600"
                          }`}>
                            {camp.status === "approved" ? "อนุมัติแล้ว" : camp.status === "pending" ? "รอการอนุมัติ" : camp.status}
                          </span>
                          {isClosed && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500">
                              🔴 ปิดรับสมัครแล้ว
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ปุ่มต่างๆ */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* ปุ่มแก้ไข */}
                        <button
                          onClick={() => openEdit(camp)}
                          className="px-3 py-1.5 text-xs border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
                          ✏️ แก้ไข
                        </button>

                        {/* ปุ่มปิดรับสมัคร */}
                        {!isClosed && camp.status === "approved" && (
                          <button onClick={() => handleCloseCamp(camp.id)} disabled={closingId === camp.id}
                            className="px-3 py-1.5 text-xs border border-orange-300 text-orange-500 rounded-lg hover:bg-orange-50 disabled:opacity-50 transition whitespace-nowrap">
                            {closingId === camp.id ? "กำลังปิด..." : "ปิดรับสมัคร"}
                          </button>
                        )}

                        {/* ปุ่มลบ */}
                        <button onClick={() => handleDeleteCamp(camp.id)} disabled={deletingId === camp.id}
                          className="px-3 py-1.5 text-xs border border-red-300 text-red-500 rounded-lg hover:bg-red-50 disabled:opacity-50 transition whitespace-nowrap">
                          {deletingId === camp.id ? "กำลังลบ..." : "🗑️ ลบ"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <button onClick={() => setCampPage((p) => Math.max(0, p - 1))} disabled={campPage === 0}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition">
                    ← ก่อนหน้า
                  </button>
                  <span className="text-sm text-gray-400">{campPage + 1} / {totalPages}</span>
                  <button onClick={() => setCampPage((p) => Math.min(totalPages - 1, p + 1))} disabled={campPage === totalPages - 1}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition">
                    ถัดไป →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Change Password Modal */}
      {showPwModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-5">เปลี่ยนรหัสผ่าน</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">รหัสผ่านเดิม</label>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-gray-900"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">รหัสผ่านใหม่</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-gray-900"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ยืนยันรหัสผ่านใหม่</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-gray-900"/>
              </div>
            </div>
            {pwMsg && <p className="text-sm mt-3">{pwMsg}</p>}
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowPwModal(false); setPwMsg(null); setOldPassword(""); setNewPassword(""); setConfirmPassword(""); }}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
                ยกเลิก
              </button>
              <button onClick={handleChangePassword} disabled={pwLoading}
                className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 disabled:opacity-50">
                {pwLoading ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Camp Modal */}
      {editCamp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl my-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">แก้ไขค่าย</h3>
              <button onClick={() => setEditCamp(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-5">
              ⚠️ หลังแก้ไข สถานะค่ายจะเปลี่ยนเป็น "รอแอดมินอนุมัติ" ใหม่
            </p>
            <div className="space-y-4">
              {[
                { key: "title", label: "ชื่อค่าย" },
                { key: "tagline", label: "Tagline (คำโปรย)" },
                { key: "organizer_name", label: "ชื่อผู้จัด" },
                { key: "contact_email", label: "อีเมลติดต่อ" },
                { key: "contact_phone", label: "เบอร์โทร" },
                { key: "location", label: "สถานที่" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="text-sm font-medium text-gray-600">{label}</label>
                  <input
                    type="text"
                    value={(editForm as any)[key]}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-gray-900"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">วันที่จัดกิจกรรม</label>
                  <input type="date" value={editForm.event_date}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, event_date: e.target.value }))}
                    className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-gray-900"/>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">วันปิดรับสมัคร</label>
                  <input type="date" value={editForm.registration_deadline}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, registration_deadline: e.target.value }))}
                    className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-gray-900"/>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">รายละเอียด</label>
                <textarea value={editForm.description}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-gray-900 resize-none"/>
              </div>
            </div>
            {editMsg && <p className="text-sm mt-3">{editMsg}</p>}
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditCamp(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
                ยกเลิก
              </button>
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