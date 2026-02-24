"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    text: "ชอบค่ายที่พัฒนาทักษะดำโค้ดจริง ๆ และได้เพื่อนใหม่เพิ่มอีกด้วย!",
  },
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    text: "Fastcamp ช่วยให้ผมหาค่าย IT ที่ตรงกับความสนใจได้ง่ายขึ้นมาก ได้เจอค่ายที่ใช่และได้ประสบการณ์จริง!",
  },
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    text: "ร่วมงานกับ Fastcamp แล้วรู้สึกว่าชุมชนคนเรียนดีขึ้นมาก — เหมือนมีพี่พี่ที่ของคนอยากพัฒนา!",
  },
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    text: "เข้าร่วมกับ Fastcamp เพราะเข้าถึงคนที่สนใจด้าน IT จริง ๆ ทำให้ผู้สมัครได้ดีเจน!",
  },
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    text: "ขอบคุณ Fastcamp ที่ช่วยเผยแพร่ค่ายของเรา ทำให้คนที่อยากเรียนรู้เข้าถึงเราได้มากขึ้น!",
  },
];

const testimonials2 = [
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    text: "Fastcamp ทำให้การหาค่ายเป็นเรื่องง่าย ไม่ต้องเสียเวลาค้นเอง เหมือนมีผู้ช่วยส่วนตัวเลย",
  },
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    text: "ขอบคุณ Fastcamp ที่ร่วมค่ายดี ๆ ไว้เยอะมาก เลือกสมัครได้สะดวกและไม่พลาดค่ายน่าสนใจเลย!",
  },
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    text: "Fastcamp ทำให้การโปรโมทค่ายของเราง่ายและเป็นมืออาชีพ ได้ผู้ร่วมกิจกรรมมากกว่าที่คาดไว้!",
  },
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    text: "ขอบคุณ Fastcamp ที่ช่วยให้ค่ายของเราเป็นที่รู้จัก ทำให้คนที่อยากเรียนรู้เข้าถึงเราได้มากขึ้น!",
  },
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    text: "ไม่เสียเวลาค้นเอง เหมือนมีผู้ช่วยส่วนตัวเลย ประทับใจมากกับระบบของ Fastcamp!",
  },
];

function TestimonialCard({
  name,
  handle,
  text,
}: {
  name: string;
  handle: string;
  text: string;
}) {
  return (
    <div className="flex-shrink-0 w-[504px] h-[236px] rounded-2xl p-6 text-white bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm mx-3">
      <div className="flex items-center gap-3 mb-3">
        <Image
          src="/Profile.png"
          alt="Profile"
          height={40}
          width={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm leading-tight">{name}</p>
          <p className="text-xs opacity-50">{handle}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed opacity-85">{text}</p>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof testimonials;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex ${reverse ? "animate-marquee-reverse" : "animate-marquee"} w-max`}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function Review() {
  return (
    <div className="bg-[#000523] min-h-screen pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Hero Image Section */}
      <div className="relative w-full flex justify-center">
        <Image
          src="/Section.png"
          alt="Section"
          width={1204}
          height={557}
          className="w-full h-[557px] object-contain"
        />
      </div>

      {/* Marquee rows */}
      <div className="relative w-full flex flex-col gap-4 mt-6">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#000523] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#000523] to-transparent z-10 pointer-events-none" />

        <MarqueeRow items={testimonials} />
        <MarqueeRow items={testimonials2} reverse />
      </div>

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