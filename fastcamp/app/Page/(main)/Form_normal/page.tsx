"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import MyDatePicker from "./DataTime";
import MapPicker from "./Mappick";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type FormState = {
  first_name: string; last_name: string; contact_email: string; contact_phone: string;
  title: string; tagline: string; activity_types: string[];
  event_date: Date | null; registration_deadline: Date | null; event_format: string[]; event_date_note: string; capacity: string;
  entry_fee: string; fee_type: string[]; participant_level: string[]; age_range: string[];
  academic_track: string[]; academic_other: string; location_type: string[]; location: string;
  region_note: string; gpa_note: string; additional_other: string; organizer_name: string;
  facebook: string; twitter: string; instagram: string; website: string;
  youtube: string; discord: string; tiktok: string; application_link: string; description: string;
};

const INITIAL_STATE: FormState = {
  first_name: "", last_name: "", contact_email: "", contact_phone: "",
  title: "", tagline: "", activity_types: [],
  event_date: null, registration_deadline: null, event_format: [], event_date_note: "", capacity: "",
  entry_fee: "", fee_type: [], participant_level: [], age_range: [],
  academic_track: [], academic_other: "", location_type: [], location: "",
  region_note: "", gpa_note: "", additional_other: "", organizer_name: "",
  facebook: "", twitter: "", instagram: "", website: "",
  youtube: "", discord: "", tiktok: "", application_link: "", description: "",
};

function toggleArray(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input type="checkbox" className="w-[18px] h-[18px] accent-[#1B2144]" checked={checked} onChange={onChange} />
      <span className="text-gray-500 text-sm">{label}</span>
    </label>
  );
}

function FileUpload({ file, onChange }: { file: File | null; onChange: (file: File | null) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) onChange(dropped);
  }, [onChange]);
  return (
    <div className="mt-4 border border-gray-300 rounded-xl p-4 cursor-pointer"
      onClick={() => inputRef.current?.click()} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png" className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
      <div className="border-2 border-dashed border-gray-300 rounded-xl h-[150px] flex flex-col items-center justify-center text-gray-400">
        {file ? (
          <><p className="text-sm font-medium text-[#1B2144]">✅ {file.name}</p>
          <p className="text-xs mt-1 text-gray-400">{(file.size / 1024).toFixed(1)} KB</p></>
        ) : (
          <><Image src="/upload.png" width={40} height={40} alt="upload" className="opacity-60" />
          <p className="text-sm mt-2">Drag & drop files</p>
          <p className="text-xs mt-1">Supported formats: JPEG, PNG, JPG</p></>
        )}
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, active, onClick }: any) {
  return (
    <div onClick={onClick}
      className={`w-[340px] h-[51px] flex items-center gap-3 px-6 rounded-2xl cursor-pointer transition-colors ${
        active ? "bg-[#1B2144] text-white" : "border hover:bg-gray-50"
      }`}>
      <Image src={icon} width={22} height={22} alt="" />
      {text}
    </div>
  );
}

export default function Box_file() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [headlineFile, setHeadlineFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [activeSection, setActiveSection] = useState("organizer");

  const sectionRefs = {
    organizer: useRef<HTMLDivElement>(null),
    social: useRef<HTMLDivElement>(null),
    overview: useRef<HTMLDivElement>(null),
    details: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(key); },
        { threshold: 0.3 }
      );
      observer.observe(ref.current);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const set = (key: keyof FormState) => (value: any) => setForm((prev) => ({ ...prev, [key]: value }));
  const toggle = (key: keyof FormState, val: string) =>
    setForm((prev) => ({ ...prev, [key]: toggleArray(prev[key] as string[], val) }));

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitResult(null);
    try {
      const fd = new FormData();
      fd.append("camp_type", "general");
      fd.append("title", form.title); fd.append("tagline", form.tagline);
      fd.append("description", form.description); fd.append("location", form.location);
      fd.append("event_date", form.event_date ? form.event_date.toISOString() : "");
      fd.append("registration_deadline", form.registration_deadline ? form.registration_deadline.toISOString() : "");
      fd.append("organizer_name", form.organizer_name || `${form.first_name} ${form.last_name}`.trim());
      fd.append("contact_email", form.contact_email); fd.append("contact_phone", form.contact_phone);
      fd.append("activity_types", form.activity_types.join(","));
      fd.append("event_format", form.event_format.join(","));
      fd.append("event_date_note", form.event_date_note); fd.append("capacity", form.capacity);
      fd.append("entry_fee", form.entry_fee); fd.append("fee_type", form.fee_type.join(","));
      fd.append("participant_level", form.participant_level.join(","));
      fd.append("age_range", form.age_range.join(","));
      fd.append("academic_track", form.academic_track.join(","));
      fd.append("academic_other", form.academic_other);
      fd.append("location_type", form.location_type.join(","));
      fd.append("region_note", form.region_note); fd.append("gpa_note", form.gpa_note);
      fd.append("additional_other", form.additional_other);
      fd.append("facebook", form.facebook); fd.append("twitter", form.twitter);
      fd.append("instagram", form.instagram); fd.append("website", form.website);
      fd.append("youtube", form.youtube); fd.append("discord", form.discord);
      fd.append("tiktok", form.tiktok); fd.append("application_link", form.application_link);
      if (posterFile) fd.append("poster", posterFile);
      if (headlineFile) fd.append("headline", headlineFile);
      const token = document.cookie.split("; ").find((r) => r.startsWith("token="))?.split("=")[1] ?? null;
      const res = await fetch(`${API_URL}/api/camps`, {
        method: "POST", headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitResult({ ok: true, message: `✅ ส่งข้อมูลสำเร็จ! Camp ID: ${data.camp_id}` });
        setForm(INITIAL_STATE); setPosterFile(null); setHeadlineFile(null);
      } else {
        setSubmitResult({ ok: false, message: `❌ เกิดข้อผิดพลาด: ${data.message}` });
      }
    } catch {
      setSubmitResult({ ok: false, message: "❌ ไม่สามารถเชื่อมต่อ server ได้" });
    } finally { setSubmitting(false); }
  };

  return (
    <div>
      <section className="bg-[#000523] bg-[radial-gradient(circle,_#ffffff33_0%,_#000523_70%)] pt-30 rounded-b-[55px] min-h-[40vh] w-full flex flex-col items-center justify-center px-4 pb-20 text-center">
        <div className="bg-[#CACACA]/30 border border-gray-600 rounded-full px-4 py-1 mb-15">
          <p className="text-white text-sm">List Your Camp</p>
        </div>
        <h1 className="font-bold bg-gradient-to-r mb-5 from-[#F3F4F6] to-[#9CA3AF] bg-clip-text text-transparent text-3xl sm:text-5xl md:text-7xl">
          Camp Submission
        </h1>
        <p className="text-white font-light mt-4 mb-5 text-sm sm:text-base md:text-lg">
          กรอกข้อมูลรายละเอียดด้านล่าง เพื่อนำกิจกรรมของคุณขึ้นสู่แพลตฟอร์ม Fastcamp
        </p>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-[#1B2044] font-bold text-3xl md:text-4xl">ส่งข้อมูลกิจกรรมทั่วไป</h1>
          <p className="text-gray-500 mt-3 max-w-3xl">
            สำหรับส่งข้อมูลกิจกรรมทั่วไป เช่น ค่ายแนะแนว ค่ายอาสา ค่ายพัฒนาทักษะ งานเปิดบ้าน
            <span className="text-[#1B2044] font-semibold ml-1">Fastcamp</span>
          </p>

          <div className="flex gap-12 mt-10">
            {/* Sidebar */}
            <div className="hidden lg:block w-[320px] flex-shrink-0">
              <div className="sticky top-[120px] space-y-4">
                <SidebarItem active={activeSection === "organizer"} icon="/Icon finger.png" text="Organizer Info"
                  onClick={() => sectionRefs.organizer.current?.scrollIntoView({ behavior: "smooth" })} />
                <SidebarItem active={activeSection === "social"} icon="/Icon social.png" text="Social Media Content"
                  onClick={() => sectionRefs.social.current?.scrollIntoView({ behavior: "smooth" })} />
                <SidebarItem active={activeSection === "overview"} icon="/Icon calender.png" text="Activity Overview"
                  onClick={() => sectionRefs.overview.current?.scrollIntoView({ behavior: "smooth" })} />
                <SidebarItem active={activeSection === "details"} icon="/Icon light.png" text="Full Activity Details"
                  onClick={() => sectionRefs.details.current?.scrollIntoView({ behavior: "smooth" })} />
              </div>
            </div>

            <div className="flex-1">
              {/* Section 1 */}
              <div ref={sectionRefs.organizer} className="w-full max-w-[820px] mb-16">
                <h2 className="text-xl md:text-2xl font-bold text-[#1B2044]">ข้อมูลผู้ประสานงานกิจกรรม <span className="font-bold ml-2">(Organizer Info)</span></h2>
                <p className="text-gray-500 mt-2 mb-6">กรุณากรอกข้อมูลของผู้ประสานงานกิจกรรม</p>
                <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4 sm:p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[["first_name","First Name (ชื่อ)","กรอกชื่อ"],["last_name","Last Name (นามสกุล)","กรอกนามสกุล"],["contact_email","Email (อีเมล)","กรอกอีเมล"],["contact_phone","Phone (เบอร์โทรศัพท์)","กรอกเบอร์โทรศัพท์"]].map(([k,l,p]) => (
                      <div key={k}>
                        <label className="text-sm font-medium text-[#1B2044]">{l}</label>
                        <input value={(form as any)[k]} onChange={(e) => set(k as keyof FormState)(e.target.value)}
                          className="w-full mt-2 h-[36px] px-3 border border-gray-300 rounded-md bg-white placeholder:text-xs placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#1B2144]"
                          placeholder={p} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div ref={sectionRefs.social} className="w-full max-w-[820px] mb-16">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1B2044]">ข้อความพาดหัวและรูปภาพสำหรับประชาสัมพันธ์ <span className="font-medium ml-2">(Social Media Content)</span></h2>
                <p className="text-gray-400 mt-2 mb-6 text-sm">ส่วนนี้ใช้สำหรับกรอกข้อความพาดหัวและแนบรูปภาพประกอบกิจกรรม</p>
                <div className="w-full bg-gray-100 border border-gray-300 p-8 rounded-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <p className="text-[#1B2144] font-semibold mb-2 text-sm">Activity Name <span className="font-normal">(ชื่อกิจกรรม)</span></p>
                      <input value={form.title} onChange={(e) => set("title")(e.target.value)} placeholder="กรอกชื่อกิจกรรม"
                        className="placeholder:text-xs placeholder:text-gray-400 w-full h-[36px] px-3 border bg-white border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#1B2144]" />
                    </div>
                    <div>
                      <p className="text-[#1B2144] font-semibold mb-2 text-sm">Tagline <span className="font-normal">(คำโปรยแนะนำกิจกรรม)</span></p>
                      <input value={form.tagline} onChange={(e) => set("tagline")(e.target.value)} placeholder="ข้อความสั้น ๆ ที่ใช้แนะนำกิจกรรม"
                        className="w-full h-[36px] bg-white px-4 border border-gray-300 rounded-lg text-sm placeholder:text-xs placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#1B2144]" />
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-[#1B2144] font-semibold mb-4 text-sm">Activity Type <span className="font-normal">(ประเภทของกิจกรรม)</span></p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                      {["แนะแนวคณะ/อาชีพ","พัฒนาทักษะ/เวิร์กชอป","นิทรรศการ/เปิดบ้าน","เสวนา/สัมมนา/ทอล์คโชว์"].map((t) => (
                        <Checkbox key={t} label={t} checked={form.activity_types.includes(t)} onChange={() => toggle("activity_types", t)} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-[#1B2144] font-semibold mb-2 text-sm">Headline Image <span className="text-gray-400 font-normal">(ภาพสำหรับประชาสัมพันธ์)</span></p>
                    <div className="bg-white border rounded-xl p-4 sm:p-6">
                      <FileUpload file={headlineFile} onChange={setHeadlineFile} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div ref={sectionRefs.overview} className="w-full max-w-[820px] mb-16">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1B2044]">รายละเอียดกิจกรรมทั้งหมด <span className="font-medium ml-2">(Full Activity Details)</span></h2>
                <p className="text-gray-400 mt-2 mb-6 text-sm">ส่วนนี้ใช้สำหรับกรอกข้อมูลรายละเอียดกิจกรรม สถานที่จัด การสมัคร และข้อมูลผู้จัดงาน</p>
                <div className="bg-[#F4F4F4] border border-gray-300 p-4 sm:p-6 md:p-8 rounded-2xl space-y-8">
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-3 text-sm">Event Date <span className="font-normal">(วันที่จัดกิจกรรม)</span></p>
                    <MyDatePicker selected={form.event_date} onChange={(date: Date | null) => setForm((prev) => ({ ...prev, event_date: date }))} />
                  </div>
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-1 text-sm">Registration Deadline <span className="font-normal">(วันปิดรับสมัคร)</span></p>
                    <p className="text-gray-400 text-xs mb-3">กรุณาระบุวันสุดท้ายที่เปิดรับสมัคร</p>
                    <MyDatePicker selected={form.registration_deadline} onChange={(date: Date | null) => setForm((prev) => ({ ...prev, registration_deadline: date }))} />
                  </div>
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-4 text-sm">Event Format (รูปแบบกิจกรรม)</p>
                    <div className="space-y-3">
                      {["กิจกรรมในสถานที่จริง (วันเดียว)","กิจกรรมในสถานที่จริง (ไม่ค้างคืน)","กิจกรรมในสถานที่จริง (ค้างคืน)","กิจกรรมออนไลน์ (Live / Zoom)"].map((f) => (
                        <Checkbox key={f} label={f} checked={form.event_format.includes(f)} onChange={() => toggle("event_format", f)} />
                      ))}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[#1B2044] font-semibold mb-2 text-sm">ข้อมูลเพิ่มเติมเกี่ยวกับวันจัดกิจกรรม</p>
                      <select value={form.event_date_note} onChange={(e) => set("event_date_note")(e.target.value)}
                        className="w-full h-[36px] px-3 border border-gray-300 bg-white rounded-lg text-sm text-gray-600 outline-none focus:ring-1 focus:ring-[#1B2144]">
                        <option value="">เลือกช่วงเวลา</option>
                        {["ช่วงเช้า (08:00 – 12:00)","ช่วงบ่าย (12:00 – 17:00)","ช่วงเย็น (17:00 – 20:00)","ทั้งวัน (08:00 – 17:00)","เต็มวันและค่ำ (08:00 – 20:00)"].map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <p className="text-[#1B2044] font-semibold mb-2 text-sm">จำนวนที่รับสมัคร</p>
                      <input value={form.capacity} onChange={(e) => set("capacity")(e.target.value)} placeholder="เช่น 50 คน, ไม่จำกัด"
                        className="placeholder:text-xs placeholder:text-gray-400 w-full h-[36px] px-3 border border-gray-300 bg-white rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#1B2144]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-2 text-sm">ค่าใช้จ่ายในการเข้าร่วม</p>
                    <input value={form.entry_fee} onChange={(e) => set("entry_fee")(e.target.value)} placeholder="หากกิจกรรมฟรี ไม่ต้องกรอกราคา"
                      className="w-full h-[36px] px-3 border border-gray-300 bg-white rounded-lg text-sm placeholder:text-xs placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#1B2144]" />
                  </div>
                  <div className="space-y-3">
                    {[{label:"ฟรี (Free)",val:"free"},{label:"ชำระเงินตอนสมัคร",val:"pay_at_apply"},{label:"ชำระเงินหลังประกาศรายชื่อ",val:"pay_after"}].map(({label,val}) => (
                      <Checkbox key={val} label={label} checked={form.fee_type.includes(val)} onChange={() => toggle("fee_type", val)} />
                    ))}
                  </div>
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-4 text-sm">Eligibility (คุณสมบัติผู้สมัคร)</p>
                    <p className="text-[#606060] text-sm mb-3">Participant Level - ระดับผู้เข้าร่วม</p>
                    <div className="space-y-3">
                      {[{label:"นักเรียนมัธยมปลาย",val:"highschool"},{label:"นักเรียนมัธยมต้น",val:"middleschool"},{label:"นักเรียนประถม",val:"primary"},{label:"นักศึกษา",val:"college"},{label:"ผู้เรียนสายอาชีวะ",val:"vocational"},{label:"บุคคลทั่วไป",val:"general"}].map(({label,val}) => (
                        <Checkbox key={val} label={label} checked={form.participant_level.includes(val)} onChange={() => toggle("participant_level", val)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[#606060] text-sm mb-3">Age - อายุ</p>
                    <div className="space-y-3">
                      {[{label:"ต่ำกว่า 15 ปี",val:"u15"},{label:"15–18 ปี",val:"15-18"},{label:"19–22 ปี",val:"19-22"},{label:"23 ปีขึ้นไป",val:"23+"}].map(({label,val}) => (
                        <Checkbox key={val} label={label} checked={form.age_range.includes(val)} onChange={() => toggle("age_range", val)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[#606060] text-sm mb-3">Academic Track - สายการเรียน</p>
                    <div className="space-y-3">
                      {[{label:"สายวิทย์-คณิต",val:"science"},{label:"สายศิลป์-ภาษา",val:"arts"},{label:"ทุกสายการเรียน",val:"any"}].map(({label,val}) => (
                        <Checkbox key={val} label={label} checked={form.academic_track.includes(val)} onChange={() => toggle("academic_track", val)} />
                      ))}
                    </div>
                  </div>

                  {/* Event Location — MapPicker */}
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-4 text-sm">Event Location (สถานที่จัดกิจกรรม)</p>
                    <div className="space-y-3 mb-4">
                      <Checkbox label="กิจกรรมนอกสถานที่ (On-site Event)" checked={form.location_type.includes("onsite")} onChange={() => toggle("location_type", "onsite")} />
                      <Checkbox label="กิจกรรมออนไลน์ (Online Event)" checked={form.location_type.includes("online")} onChange={() => toggle("location_type", "online")} />
                    </div>
                    <MapPicker
                      value={form.location}
                      onChange={(loc) => set("location")(loc)}
                    />
                  </div>

                  <div>
                    <p className="text-[#1B2044] font-semibold mb-2 text-sm">Organizer Information (ข้อมูลผู้จัดกิจกรรม)</p>
                    <input value={form.organizer_name} onChange={(e) => set("organizer_name")(e.target.value)} placeholder="ชื่อคณะ / สถาบัน / บริษัท / กลุ่ม"
                      className="w-full max-w-[373px] h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm mt-3 outline-none focus:ring-1 focus:ring-[#1B2144]" />
                  </div>
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-4 text-sm">Social Media (ข้อมูลการติดต่อหรือโซเชียลมีเดีย)</p>
                    <div className="flex flex-col space-y-3">
                      {([{src:"/facebook.png",alt:"facebook",key:"facebook"},{src:"/x.png",alt:"twitter",key:"twitter"},{src:"/instagram.png",alt:"instagram",key:"instagram"},{src:"/google.png",alt:"website",key:"website"},{src:"/youtube.png",alt:"youtube",key:"youtube"},{src:"/discord.png",alt:"discord",key:"discord"},{src:"/tiktok.png",alt:"tiktok",key:"tiktok"}] as const).map((s) => (
                        <div key={s.alt} className="flex items-center gap-3">
                          <Image src={s.src} width={31} height={31} alt={s.alt} />
                          <input value={form[s.key]} onChange={(e) => set(s.key)(e.target.value)} placeholder="ลิงก์หรือ username"
                            className="w-full max-w-[373px] h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-[#1B2144]" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-2 text-sm">Application Method (ลิงก์สมัคร)</p>
                    <input value={form.application_link} onChange={(e) => set("application_link")(e.target.value)} placeholder="ลิงก์สมัครเข้าร่วมกิจกรรม"
                      className="w-full max-w-[364px] h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm placeholder:text-xs placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#1B2144]" />
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div ref={sectionRefs.details} className="w-full max-w-[820px] mb-16">
                <h2 className="text-[28px] font-bold text-[#1B2144]">ข้อมูลกิจกรรมโดยละเอียด <span className="font-medium ml-2">(Full Activity Details)</span></h2>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">กรอกข้อมูลกิจกรรมโดยละเอียด เพื่อให้ผู้สมัครเข้าใจภาพรวมทั้งหมดของกิจกรรม</p>
                <div className="bg-[#F4F4F4] border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm mt-10">
                  <div>
                    <p className="text-[#1B2144] font-semibold text-sm mb-3">Activity Description <span className="font-normal">(คำอธิบายกิจกรรม)</span></p>
                    <textarea value={form.description} onChange={(e) => set("description")(e.target.value)} placeholder="กรอกรายละเอียดกิจกรรมอย่างละเอียด"
                      className="w-full h-[140px] px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm placeholder:text-xs placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#1B2144]" />
                  </div>
                  <div className="mt-10">
                    <p className="text-[#1B2144] font-semibold text-sm">Upload Camp Poster <span className="font-normal">(อัปโหลดภาพโปสเตอร์เพิ่มเติม)</span></p>
                    <p className="text-xs text-gray-400 mt-1">หากคุณมีภาพโปสเตอร์กิจกรรม สามารถอัปโหลดได้ที่นี่</p>
                    <FileUpload file={posterFile} onChange={setPosterFile} />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="w-full max-w-[820px]">
                {submitResult && (
                  <div className={`mb-6 px-5 py-4 rounded-xl text-sm font-medium ${submitResult.ok ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {submitResult.message}
                  </div>
                )}
                <button onClick={handleSubmit} disabled={submitting}
                  className="w-full h-[52px] bg-[#1B2144] text-white font-semibold rounded-2xl hover:bg-[#111830] transition-colors disabled:opacity-60 text-sm">
                  {submitting ? "⏳ กำลังส่งข้อมูล..." : "ส่งข้อมูลกิจกรรม →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}