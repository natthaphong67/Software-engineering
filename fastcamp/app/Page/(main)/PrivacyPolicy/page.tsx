"use client";

import { useState, useEffect } from "react";

export default function PrivacyPolicy() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#000523] text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+Thai:wght@300;400;500;700&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-body { font-family: 'Noto Sans Thai', sans-serif; }
      `}</style>

      {/* Hero Banner */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(to right, #000523, rgba(255, 255, 255, 0.2), #000523)",
          minHeight: "100vh",
        }}
      >
        {/* FASTAMP Title - top left */}
        <div className="absolute top-0 left-0 right-0 z-20 px-6 pt-4">
          <h1 className="font-display text-white leading-none w-full" style={{ fontSize: "clamp(1rem, 21.5vw, 99rem)", letterSpacing: "-0.02em" }}>
            FASTCAMP
          </h1>
          <p className="font-body text-white/50 text-xs mt-1 max-w-2xl">
            ข้อมูลส่วนบุคคล หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้
            ไม่ว่าทางตรง หรือ ทางอ้อม แต่ไม่รวมถึงข้อมูลของผู้ถึงแก่กรรมโดยเฉพาะ
          </p>
        </div>

        {/* POLICY - กลาง พื้นหลัง */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <span
            className="font-display text-white/10 whitespace-nowrap"
            style={{ fontSize: "clamp(6rem, 22vw, 20rem)", letterSpacing: "0.1em" }}
          >
            POLICY
          </span>
        </div>

        {/* Robot image - กลาง */}
        <img
          src="/Image/policypage/robot.png"
          alt="robot"
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full object-contain pointer-events-none z-10"
        />

        {/* PRIVACY POLICY - ล่างซ้าย */}
        <div className="absolute bottom-16 left-6 md:left-10 z-20">
          <h2
            className="font-display text-white leading-none"
            style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
          >
            PRIVACY
            <br />
            POLICY
          </h2>
        </div>

        {/* Footer text - ล่างสุด */}
        <div className="absolute bottom-4 left-6 z-20">
          <p className="font-body text-white/40 text-xs">
            บริษัท ฟาสต์แคมป์ จำกัด <span className="text-white/60">เป็นผู้ให้บริการเว็บไซต์</span>{" "}
            <a href="https://www.fastcamp.in.th" className="text-blue-400 underline text-xs">
              www.fastcamp.in.th
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}