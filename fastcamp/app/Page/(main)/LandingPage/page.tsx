"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Footer from "@/components/footer/Footer";

const CARDS = [
  {
    title: "ช่องทางการส่งข้อมูล (Official Channel)",
    items: [
      "เพื่อประสิทธิภาพสูงสุดในการจัดการข้อมูล Fastcamp รับข้อมูลผ่านแบบฟอร์มบนเว็บไซต์เท่านั้น เราขอสงวนสิทธิ์ไม่พิจารณาข้อมูลที่ส่งผ่านช่องทางอื่น เพื่อรักษามาตรฐานความถูกต้องของระบบ",
    ],
  },
  {
    title: "มาตรฐานการอนุมัติกิจกรรม (Approval Criteria)",
    items: [
      "กิจกรรมที่จะได้รับการเผยแพร่ต้องมีรายละเอียดที่ชัดเจนและครบถ้วนสมบูรณ์ ทีมงานขอสงวนสิทธิ์ไม่อนุมัติกิจกรรมที่มีข้อมูลไม่เพียงพอ โดยอาจไม่ได้แจ้งให้ทราบล่วงหน้า เพื่อให้ทุกกิจกรรมบนแพลตฟอร์มของเรามีคุณภาพระดับสูงสุด",
    ],
  },
  {
    title: "การยอมรับข้อตกลง (Data Integrity & Privacy)",
    items: [
      "การส่งข้อมูลผ่านแบบฟอร์มนี้ ถือเป็นการยืนยันว่าคุณยอมรับนโยบายความเป็นส่วนตัว (Privacy Policy) ของ Fastcamp โดยให้มีผลบังคับใช้ในทันที",
    ],
  },
];

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.2,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity }}
        />
      ))}
    </div>
  );
}

function GlobeSection() {
  const [float, setFloat] = useState(0);
  const raf = useRef<number>(0);
  const start = useRef<number>(0);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!start.current) start.current = ts;
      const t = (ts - start.current) / 1000;
      setFloat(Math.sin(t * 1.2) * 12);
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (

      <img
        src="/Image/4.หน้าส่งค่ายขึ้นเว็บ/image (1).png"
        alt="globe"
        className="w-full block relative"
        style={{
          transform: `translateY(${float}px)`,
          width: `70%`,
        }}
      />
  );
}

function CriteriaSection() {
  return (
    <div 
      className="rounded-2xl p-8 border border-white/[0.08]"
      style={{
        // ผสมสี RGBA เพื่อให้ได้ความเข้ม 16% (0.16)
        background: "linear-gradient(135deg, rgba(97, 16, 159, 0.16) 0%, rgba(129, 202, 255, 0.1) 100%)"
      }}
    >
      {CARDS.map((card, i) => (
        <div key={i} className="flex gap-5 relative">
          {/* Timeline column */}
          <div className="flex flex-col items-center shrink-0">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 z-10"
              style={{
                background: "linear-gradient(135deg, #61109F, #1a1aff)",
                boxShadow: "0 0 16px rgba(80,100,255,0.3)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
                <path d="M6 4l6 6 6-6" />
              </svg>
            </div>
            {i < CARDS.length - 1 && (
              <div
                className="w-0.5 flex-1 my-1"
                style={{
                  minHeight: 40,
                  background: "linear-gradient(180deg, rgba(129, 202, 255, 0.4), rgba(255,255,255,0.05))",
                }}
              />
            )}
          </div>

          {/* Content */}
          <div className={`flex-1 ${i < CARDS.length - 1 ? "pb-7" : ""}`}>
            <h3 className="font-bold text-slate-100 mb-2 pt-2.5" style={{ fontSize: "clamp(0.95rem,2vw,1.1rem)" }}>
              {card.title}
            </h3>
            
            {/* กล่องเนื้อหาแบบโปร่งแสงเล็กน้อย */}
            <div className="flex gap-3.5 items-start bg-white/[0.04] border border-white/[0.06] rounded-xl p-4">
              <div
                className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[0.7rem] font-bold text-white mt-0.5"
                style={{
                  background: "rgba(97, 16, 159, 0.5)", 
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {i + 1}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed m-0">
                {card.items[0]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-[#000622] text-slate-200 min-h-screen overflow-x-hidden" style={{ fontFamily: "'Noto Sans Thai', 'Sarabun', sans-serif" }}>
      <style>{`
        @keyframes pulse {
          0%,100% { opacity:0.7; transform:scale(1); }
          50% { opacity:1; transform:scale(1.08); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-[60px] overflow-hidden">
        <Stars />

        {/* Text block */}
        <div className="relative z-10 mt-10 mb-10">
          <p className="font-bold mb-2" style={{ fontSize: "50px" }}>
            เพราะค่ายที่ดีที่สุด
          </p>
          <h1
            className="font-bold text-[#0024FF] leading-snug mb-[18px]"
            style={{ fontSize: "clamp(1.5rem,5vw,2.6rem)" }}
          >
            คือค่ายที่ถูกค้นพบในเวลาที่ใช่ที่สุด
          </h1>
<p
            className="text-slate-400 leading-tight max-w-max mx-auto mb-1"
            style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)" }}
          >
            ยกระดับการเข้าถึงกลุ่มเป้าหมายให้เหนือชั้นกว่าที่เคย
          </p>
          <p 
            className="text-slate-400 max-w-max mx-auto mb-1"
            style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)" }}
          >
            ส่งค่ายของคุณมาที่{" "}
            <span 
              className="text-[#0024FF] font-bold" 
              style={{ fontSize: "1.2em" }}
            >
              Fastcamp
            </span>
          </p>          
          <p 
            className="text-slate-400 max-w-max mx-auto mb-1 whitespace-nowrap"
            style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)" }}
          >
            พื้นที่รวบรวมค่ายชั้นนำเพื่อสร้างมาตรฐานใหม่ให้โลกแห่งการเรียนรู้ที่ไม่มีวันสิ้นสุด
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            {[
              { label: "ส่งข้อมูลกิจกรรมทั่วไป", href: "/Page/Form_competition" },
              { label: "ส่งข้อมูลกิจกรรมแข่งขัน!", href: "/Page/Form_competition" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="no-underline">
                <button
                  className="px-6 py-2.5 rounded-full border border-white/[0.12] bg-white/[0.06] text-slate-200 text-[0.82rem] cursor-pointer backdrop-blur-[8px] transition-all duration-200 hover:bg-purple-500/20 hover:border-purple-400"
                  style={{ fontFamily: "inherit" }}
                >
                  {label}
                </button>
              </Link>
            ))}
          </div>
        </div>

        <GlobeSection />
      </section>

      {/* ── DIVIDER ── */}
      <div className="flex items-center justify-center gap-3 py-5 px-6">
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span
          className="px-[18px] py-[5px] rounded-full text-[0.7rem] font-semibold tracking-[0.08em] text-white uppercase"
          style={{ background: "linear-gradient(135deg,#a259ff,#6366f1)" }}
        >
          How to List Your Camp
        </span>
        <div className="h-px w-20 bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      {/* ── CRITERIA ── */}
      <section className="max-w-[720px] mx-auto px-6 pb-20 pt-4">
        <h2
          className="font-bold text-center mb-1.5"
          style={{ fontSize: "clamp(1.15rem,3.5vw,1.5rem)" }}
        >
          ข้อกำหนดและมาตรฐานการจัดสรรข้อมูลกิจกรรม
        </h2>
        <p className="text-center text-xs text-slate-400 mb-8">
          (Last Updated: 1 Jan 2025)
        </p>
        <CriteriaSection />
      </section>
      <Footer/>
    </div>
  );
}