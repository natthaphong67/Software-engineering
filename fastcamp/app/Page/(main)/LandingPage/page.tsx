"use client";

import { useEffect, useRef, useState } from "react";

const CARDS = [
  {
    icon: "🔗",
    color: "blue",
    title: "ช่องทางการส่งข้อมูล (Official Channel)",
    body: "พื้นที่นี้เปิดให้ผู้จัดงานทุกประเภทสามารถส่งข้อมูลค่ายผ่านช่องทางที่กำหนดเท่านั้น เพื่อให้มั่นใจว่าข้อมูลที่แสดงบนแพลตฟอร์มนั้นผ่านการตรวจสอบและมีคุณภาพครบถ้วน",
  },
  {
    icon: "✅",
    color: "green",
    title: "มาตรฐานการอนุมัติกิจกรรม (Approval Criteria)",
    body: "กิจกรรมทุกประเภทที่ถูกนำเข้าสู่ระบบจะต้องผ่านกระบวนการพิจารณาจากทีมงาน โดยพิจารณาจากความเหมาะสมของเนื้อหา ความน่าเชื่อถือของผู้จัด และความปลอดภัยของผู้เข้าร่วม",
  },
  {
    icon: "🔒",
    color: "purple",
    title: "การรองรับข้อมูล (Data Integrity & Privacy)",
    body: "ข้อมูลที่ถูกส่งเข้ามาจะได้รับการปกป้องตามนโยบายความเป็นส่วนตัวที่เข้มงวด (Privacy Policy) และจะไม่ถูกนำไปใช้เพื่อวัตถุประสงค์อื่นนอกจากการแสดงผลบนแพลตฟอร์ม",
  },
];

const iconColor: Record<string, string> = {
  blue: "rgba(59,130,246,0.2)",
  green: "rgba(34,197,94,0.2)",
  purple: "rgba(162,89,255,0.2)",
};

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.2,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "#fff",
            opacity: s.opacity,
          }}
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
    <div style={{ position: "relative", width: "min(280px, 44vw)", margin: "0 auto" }}>
      {/* Glow behind globe */}
      <div
        style={{
          position: "absolute",
          inset: "-40%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(130,70,255,0.45) 0%, rgba(80,30,200,0.2) 45%, transparent 70%)",
          filter: "blur(8px)",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/600px-The_Earth_seen_from_Apollo_17.jpg"
        alt="globe"
        style={{
          width: "100%",
          display: "block",
          borderRadius: "50%",
          position: "relative",
          transform: `translateY(${float}px)`,
          filter:
            "drop-shadow(0 0 36px rgba(140,80,255,0.8)) drop-shadow(0 0 70px rgba(100,50,220,0.4))",
          transition: "transform 0.05s linear",
        }}
      />
      {/* Ground ring */}
      <div
        style={{
          position: "absolute",
          bottom: -10,
          left: "50%",
          transform: "translateX(-50%)",
          width: "85%",
          height: 20,
          background: "radial-gradient(ellipse, rgba(160,100,255,0.4) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}

function CriteriaCard({
  icon,
  color,
  title,
  body,
  delay,
}: {
  icon: string;
  color: string;
  title: string;
  body: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(162,89,255,0.35)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16,
        padding: "20px 22px",
        marginBottom: 14,
        transition: "all 0.25s ease",
        animationDelay: `${delay}ms`,
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: iconColor[color],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{title}</span>
      </div>
      <div style={{ paddingLeft: 46 }}>
        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#a259ff", marginRight: 8, verticalAlign: "middle" }} />
        <span style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.8 }}>{body}</span>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div
      style={{
        background: "#07091a",
        color: "#e2e8f0",
        minHeight: "100vh",
        fontFamily: "'Noto Sans Thai', 'Sarabun', sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&family=Noto+Sans+Thai:wght@300;400;600;700;900&display=swap');
        @keyframes pulse {
          0%,100% { opacity:0.7; transform:scale(1); }
          50% { opacity:1; transform:scale(1.08); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px 24px 80px",
          overflow: "hidden",
        }}
      >
        <Stars />

        {/* Text block */}
        <div style={{ position: "relative", zIndex: 2, marginBottom: 40 }}>
          <p style={{ fontSize: "clamp(0.95rem,3vw,1.2rem)", fontWeight: 400, marginBottom: 8 }}>
            เพราะค่ายที่ดีที่สุด
          </p>
          <h1
            style={{
              fontSize: "clamp(1.5rem,5vw,2.6rem)",
              fontWeight: 700,
              color: "#f5c842",
              lineHeight: 1.35,
              marginBottom: 18,
            }}
          >
            คือค่ายที่ถูกค้นพบในเวลาที่ใช่ที่สุด
          </h1>
          <p style={{ fontSize: "clamp(0.8rem,2vw,0.92rem)", color: "#94a3b8", lineHeight: 1.85, maxWidth: 480, margin: "0 auto 6px" }}>
            ยกระดับการเข้าถึงกลุ่มเป้าหมายให้เหนือชั้นกว่าที่เคย{" "}
            <span style={{ color: "#3B0AFF", fontWeight: 600 }}>Fastcamp</span>
          </p>
          <p style={{ fontSize: "0.78rem", color: "#94a3b8", maxWidth: 400, margin: "0 auto 28px" }}>
            พื้นที่รวบรวมค่ายที่เปิดรับสมัครทุกประเภทในไทยไว้ครบ
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {["สมัครสมาชิกฟรี!", "สมัครกิจกรรมของเรา!"].map((label) => (
              <button
                key={label}
                style={{
                  padding: "10px 24px",
                  borderRadius: 999,
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#e2e8f0",
                  fontFamily: "inherit",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(162,89,255,0.2)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#a259ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Globe */}
        <GlobeSection />
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "20px 24px" }}>
        <div style={{ height: 1, width: 80, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)" }} />
        <span
          style={{
            background: "linear-gradient(135deg,#a259ff,#6366f1)",
            padding: "5px 18px",
            borderRadius: 999,
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#fff",
            textTransform: "uppercase",
          }}
        >
          Built For Camp
        </span>
        <div style={{ height: 1, width: 80, background: "linear-gradient(90deg,rgba(255,255,255,0.1),transparent)" }} />
      </div>

      {/* ── CRITERIA ── */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "16px 24px 80px" }}>
        <h2
          style={{
            fontSize: "clamp(1.15rem,3.5vw,1.5rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          ข้อกำหนดและมาตรฐานการจัดสรรข้อมูลกิจกรรม
        </h2>
        <p style={{ textAlign: "center", fontSize: "0.76rem", color: "#94a3b8", marginBottom: 32 }}>
          (Last Updated: 1 Jan 2025)
        </p>

        {CARDS.map((card, i) => (
          <CriteriaCard key={i} {...card} delay={i * 80} />
        ))}
      </section>
    </div>
  );
}