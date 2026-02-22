import Image from "next/image";

const Category = () => {
  return (
    <div >
      {/* Hero */}
      <div className="relative mt-10 mx-auto w-full max-w-[1866px] aspect-[1866/918] overflow-hidden rounded-4xl bg-gradient-to-r from-[#280C3C] via-[#000523] to-[#003376]">
        {/* TEXT */}
        <div className="absolute top-16 md:top-28 lg:top-32 left-1/2 -translate-x-1/2 text-center z-20 px-4">
          <h1 className="font-black bg-gradient-to-r from-white via-neutral-400 to-gray-600 bg-clip-text text-transparent text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] leading-none">CATEGORY</h1>
          <h2 className="mt-2 font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-sm sm:text-base md:text-2xl lg:text-3xl">ค่ายที่ใช่สำหรับความสนใจของคุณ</h2>
        </div>
          {/* IMAGE */}
          <Image src="/2.png" alt="Hero" width={1883} height={733} priority className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 max-w-none z-10"/>
      <div className="h-180 mt-10 mx-4 md:mx-8 relative flex flex-col items-center justify-center overflow-visible rounded-4xl bg-linear-to-r from-[#280C3C] via-[#000523] to-[#003376]">
        <div className="text-center -mt-20"> 
          {/*  */}
          <h1 className="relative z-10 -translate-y-10 text-[10rem] font-black bg-linear-to-r from-white via-neutral-600 to-gray-900 bg-clip-text text-transparent">
            CATEGORY
          </h1>
          <h1 className="relative z-10 -translate-y-10 text-3xl font-black bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
            ค่ายที่ใช่สำหรับความสนใจของคุณ
          </h1> 
        </div> 
        <Image src="/2.png" alt="Hero" fill className="absolute inset-0 mt-60 object-contain z-20" priority /> 
      </div>
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-10">
        <div className="mt-10 mx-auto flex flex-col gap-6 rounded-4xl border p-4 md:p-8 w-full max-w-7xl">
          {/* content zone */}
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
            {/* ซ้าย Category */}
            <div className="w-full md:w-auto shrink-0">
              <h1 className="mb-4 text-xl md:text-3xl font-semibold">Category</h1>
              <div className="flex flex-col gap-3 md:gap-5">
                {["กิจกรรมล่าสุด","กิจกรรมยอดนิยม","กิจกรรมทั้งหมด","นิทรรศการ/เปิดบ้าน","พัฒนาการ/เวิร์กชอป","แนะแนวคณะ/อาชีพ","เสวนา/สัมนา/ทอล์คโชว์","ประกวดแข่งขัน",].map((text, i) => (
                  <button key={i} className="h-11 md:h-12 w-full md:w-90 rounded-2xl border text-sm md:text-base  first:bg-[#1B2044] first:text-white">{text}</button>))}
                </div>
              </div>
              {/* ขวา Category */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  "/Group 1000005981.png",
                  "/Group 1000005982.png",
                  "/Group 1000005983.png",
                  "/Group 1000005984.png",
                  "/Group 1000005985.png",
                  "/Group 1000005986.png",
                  "/Group 1000005987.png",
                  "/Group 1000005988.png",
                  "/Group 1000005989.png",
                  "/Group 1000005990.png",
                ].map((src, i) => (
                  <div key={i} className="relative w-full h-[220px] md:h-[300px] overflow-hidden rounded-xl">
                    <Image src={src} alt="กิจกรรม" fill className="object-cover"/>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button className="h-9 w-9 rounded-xl border">‹</button>
              <button className="h-9 w-9 rounded-xl border">›</button>
            </div>
          </div>
      </div>
      {/* ส่งกิจกรรมขึ้นเว็บ */}
      <div className="w-full bg-white py-6 md:py-10">
        <div className="mx-auto w-full max-w-7xl rounded-3xl bg-gradient-to-r from-[#220163] to-[#074C89] p-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl border border-white/40 px-5 py-6 md:px-10 md:py-8">
            {/* TEXT */}
            <div className="max-w-2xl">
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-white">เพราะค่ายที่ดีที่สุด คือค่ายที่ถูกค้นพบในเวลาที่ใช่ที่สุด</h2>
              <p className="mt-2 text-sm md:text-base text-white/80">ส่งข้อมูลค่ายของคุณเข้ามา แล้วให้เราเป็นสื่อกลางในการเผยแพร่สู่ผู้เข้าร่วมที่ใช่</p>
            </div>
            {/* BUTTON */}
            <button
              className="w-full md:w-auto shrink-0 rounded-full border border-white/70 px-6 py-3 md:px-8 md:py-3 text-sm md:text-base text-white  hover:bg-white hover:text-[#5B3F8C] transition">ส่งกิจกรรมขึ้นเว็บ</button>
          </div>
        </div>
    </div>
  </div>
  );
};

export default Category
