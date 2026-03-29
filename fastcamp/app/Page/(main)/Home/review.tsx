"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Item = { name: string; handle: string; text: string; avatar_url: string | null };

function TestimonialCard({ name, handle, text, avatar_url }: Item) {
  const avatarSrc = avatar_url
    ? (avatar_url.startsWith("http") ? avatar_url : `${API_URL}/uploads/${avatar_url}`)
    : null;
  const initial = (name || "?").charAt(0).toUpperCase();

  return (
    <div className="flex-shrink-0 w-[504px] h-[236px] rounded-2xl p-6 text-white bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm mx-3">
      <div className="flex items-center gap-3 mb-3">
        {avatarSrc ? (
          <img src={avatarSrc} alt={name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#1B2144] border border-white/20 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {initial}
          </div>
        )}
        <div>
          <p className="font-semibold text-sm leading-tight">{name}</p>
          <p className="text-xs opacity-50">{handle}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed opacity-85">{text}</p>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: Item[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div className={`flex ${reverse ? "animate-marquee-reverse" : "animate-marquee"} w-max`}>
        {doubled.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function Review() {
  const [row1, setRow1] = useState<Item[]>([]);
  const [row2, setRow2] = useState<Item[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/reviews`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const mapped: Item[] = data.map((r: any) => ({
          name: r.name || "ผู้ใช้งาน",
          handle: "@" + (r.name || "user").split(" ")[0].toLowerCase(),
          text: r.comment,
          avatar_url: r.avatar_url || null,
        }));
        const shuffle = (arr: Item[]) => [...arr].sort(() => Math.random() - 0.5);
        setRow1(shuffle(mapped));
        setRow2(shuffle(mapped));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-[#000523] pb-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full flex justify-center">
        <Image src="/Section.png" alt="Section" width={1204} height={557} className="w-full h-[557px] object-contain" />
      </div>

      {(row1.length > 0 || row2.length > 0) && (
        <div className="relative w-full flex flex-col gap-4 mt-6">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#000523] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#000523] to-transparent z-10 pointer-events-none" />
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
      `}</style>
    </div>
  );
}