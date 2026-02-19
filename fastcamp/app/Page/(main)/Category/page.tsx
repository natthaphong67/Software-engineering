import Image from "next/image";

const Category = () => {
  return (
    <div >
      {/* Hero */}
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
        <div className="mt-10 mx-auto flex flex-col gap-6 rounded-4xl border p-8 w-full max-w-7xl">
          {/* content zone */}
          <div className="flex items-start gap-12">
            {/* ซ้าย Category */}
            <div className="shrink-0">
              <h1 className="mb-4 text-3xl font-semibold">Category</h1>
              <div className="flex flex-col gap-5">
                <button className="bg-[#1B2044] rounded-2xl h-12 w-90 text-white">กิจกรรมล่าสุด</button>
                <button className="rounded-2xl h-12 w-90 border">กิจกรรมยอดนิยม</button>
                <button className="rounded-2xl h-12 w-90 border">กิจกรรมทั้งหมด</button>
                <button className="rounded-2xl h-12 w-90 border">นิทรรศการ/เปิดบ้าน</button>
                <button className="rounded-2xl h-12 w-90 border">พัฒนาการ/เวิร์กชอป</button>
                <button className="rounded-2xl h-12 w-90 border">แนะแนวคณะ/อาชีพ</button>
                <button className="rounded-2xl h-12 w-90 border">เสวนา/สัมนา/ทอล์คโชว์</button>
                <button className="rounded-2xl h-12 w-90 border">ประกวดแข่งขัน</button>
              </div>
            </div>
            {/* ขวา Category */}
            <div className="grid grid-cols-2 gap-y-6">
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
                <div key={i} className="relative h-75 w-100 overflow-hidden rounded-xl">
                  <Image src={src} alt="กิจกรรม" fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
          {/* footer zone (ปุ่มจะถูกครอบโดย border) */}
          <div className="flex justify-end gap-2 pt-2">
            <button className="h-9 w-9 rounded-xl border flex items-center justify-center">‹</button>
            <button className="h-9 w-9 rounded-xl border flex items-center justify-center">›</button>
          </div>
        </div>
      </div>
      {/* ส่งกิจกรรมขึ้นเว็บ */}
      <div className="w-full bg-white py-10">
        <div className="mx-auto h-60 w-full max-w-7xl rounded-3xl bg-linear-to-r from-[#220163] to-[#074C89] p-3">
          <div className="flex h-full w-full items-center justify-between rounded-2xl border border-white/40 px-10">
            
            {/* Text */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                เพราะค่ายที่ดีที่สุด คือค่ายที่ถูกค้นพบในเวลาที่ใช่ที่สุด
              </h2>
              <p className="mt-2 text-white/80">
                ส่งข้อมูลค่ายของคุณเข้ามา แล้วให้เราเป็นสื่อกลางในการเผยแพร่สู่ผู้เข้าร่วมที่ใช่
              </p>
            </div>

            {/* Button */}
            <button className="shrink-0 rounded-full border border-white/70 px-8 py-3 text-white hover:bg-white hover:text-[#5B3F8C] transition">
              ส่งกิจกรรมขึ้นเว็บ
            </button>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Category