import Image from "next/image"

const Hero = () => {
  return (
    <section className="relative h-screen bg-[#050B2E] overflow-hidden">

      {/* TEXT FAST CAMP */}
      <div className="absolute inset-0 flex justify-center pt-40 z-10">
        <div className="flex gap-40 text-[160px] font-black tracking-tighter leading-none
          bg-linear-to-r from-white via-gray-300 to-gray-400
          bg-clip-text text-transparent
          drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]
        ">
          <h1>FAST</h1>
          <h1>CAMP</h1>
        </div>
      </div>

      {/* AI IMAGE */}
      <div className="absolute inset-0 flex justify-center items-start z-30">
        <div className="relative w-130 h-130 translate-y-32">
          <Image
            src="/Ai.png"
            alt="AI Model"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* WAVE */}
      <div className="absolute bottom-60 left-0 w-full">
        <svg viewBox="0 0 1440 320" className="block w-full" preserveAspectRatio="none">
          <path fill="#ffffff" d=" M0,90 C10,120 90,220 510,120 C800,120 800,100 1000,150 C1200,200 1320,260 1440,300 L1440,320 L0,320 Z "/>
        </svg>
      </div>

    </section>
  )
}

export default Hero
