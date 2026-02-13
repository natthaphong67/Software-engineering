import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-[#000523] overflow-hidden">
      {/* TEXT FAST CAMP */}
      <div className="absolute inset-0 flex justify-center pt-40 z-10">
        <div
          className="
            flex gap-40 text-[160px] font-black tracking-tighter leading-none
            bg-linear-to-r from-white via-gray-300 to-gray-400
            bg-clip-text text-transparent
            drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]
          "
        >
          <h1>FAST</h1>
          <h1>CAMP</h1>
        </div>
      </div>

      {/* AI IMAGE */}
      <div className="absolute inset-0 flex justify-center items-start z-30">
        <div className="relative w-130 h-130 translate-y-40">
          <Image src="/Ai.png" alt="AI Model" fill className="object-contain"priority/>
        </div>
      </div>


      {/* WAVE */}
      <div className="relative bg-[#000523] h-130">
        <svg viewBox="0 0 1200 320" preserveAspectRatio="none" className="absolute bottom-0 translate-y-90 w-full h-65">
          <path fill="white" d="M 1 62 C 19 235 465 82 475 62 L 700 62 C 898 63 1103 121 1200 318 L 1200 320 L 0 320 Z"/>
        </svg>
      </div>
      <div className="text-white text-2xl font-bold pl-40 absolute mt-40">
        <h1>ประเภทของกิจกรรม</h1>
      </div>


      {/* WHITE SECTION */}
      <div className="bg-white min-h-screen mt-90 justify-center">
        <div className="flex gap-8 p-2 pl-25">
          {/*BOX นิทรรศการ/เปิดบ้าน */}
          <div className="relative w-85 h-85 rounded-4xl bg-linear-to-t from-[#7293cf] to-[#3a5383] p-5 shadow-xl items-center justify-center">
            <div className="relative w-75 h-75 rounded-4xl bg-linear-to-t from-[#7293cf] to-[#3a5383] p-6 border border-white/70 flex flex-col shadow-xl">
              {/* top */}
              <div className="flex items-center justify-between">
                <p className="text-white text-lg font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow Outward" width="32" height="32" className="rounded-full object-cover" />
              </div>
              {/* mid */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image src="/นิทรรศการเปิดบ้าน.png" alt="นิทรรศการเปิดบ้าน" fill className=" object-contain" />
              </div>
              
              {/* Low */}
              <div className="mt-auto pb-2">
                <h1 className="text-white text-2xl font-semibold leading-tight">นิทรรศการ/เปิดบ้าน</h1>
                <div className="mt-3 inline-flex items-center gap-2 px-5 py-2 border border-white/80 rounded-full text-white">
                  <p className="font-bold">33</p>
                  <p className="text-sm">camp</p>
                </div>
              </div>
            </div>
          </div>

          {/*BOX พัฒนาการ/เวิร์กชอป */}
          <div className="relative w-85 h-85 rounded-4xl bg-linear-to-t from-[##c2cdde] to-[#425681] p-5 shadow-xl items-center justify-center">
            <div className="relative w-75 h-75 rounded-4xl bg-linear-to-t from-[##a2acbe] to-[#425271] p-6 border border-white/70 flex flex-col shadow-xl">
              {/* top */}
              <div className="flex items-center justify-between">
                <p className="text-white text-lg font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow Outward" width="32" height="32" className="rounded-full object-cover" />
              </div>
              {/* mid */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image src="/พัฒนาการเวิร์กชอป.png" alt="พัฒนาการ/เวิร์กชอป" fill className=" object-contain" />
              </div>
              
              {/* Low */}
              <div className="mt-auto pb-2">
                <h1 className="text-white text-2xl font-semibold leading-tight">พัฒนาการ/เวิร์กชอป</h1>
                <div className="mt-3 inline-flex items-center gap-2 px-5 py-2 border border-white/80 rounded-full text-white">
                  <p className="font-bold">33</p>
                  <p className="text-sm">camp</p>
                </div>
              </div>
            </div>
          </div>

          {/*BOX แนะแนวคณะ/อาชีพ */}
          <div className="relative w-85 h-85 rounded-4xl bg-linear-to-t from-[#323a69] to-[#626bb9] p-5 shadow-xl items-center justify-center">
            <div className="relative w-75 h-75 rounded-4xl bg-linear-to-t from-[#353364] to-[##787fb8] p-6 border border-white/70 flex flex-col shadow-xl">
              {/* top */}
              <div className="flex items-center justify-between">
                <p className="text-white text-lg font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow Outward" width="32" height="32" className="rounded-full object-cover" />
              </div>
              {/* mid */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image src="/แนะแนวคณะอาชีพ.png" alt="แนะแนวคณะ/อาชีพ" fill className=" object-contain" />
              </div>
              
              {/* Low */}
              <div className="mt-auto pb-2">
                <h1 className="text-white text-2xl font-semibold leading-tight">แนะแนวคณะ/อาชีพ</h1>
                <div className="mt-3 inline-flex items-center gap-2 px-5 py-2 border border-white/80 rounded-full text-white">
                  <p className="font-bold">33</p>
                  <p className="text-sm">camp</p>
                </div>
              </div>
            </div>
          </div>

          {/*BOX เสวนา/สัมนา/ทอล์คโชว์ */}
          <div className="relative w-85 h-85 rounded-4xl bg-linear-to-t from-[#6c8ac6] to-[#503b7d] p-5 shadow-xl items-center justify-center">
            <div className="relative w-75 h-75 rounded-4xl bg-linear-to-t from-[#7b8dbb] to-[#584a87] p-6 border border-white/70 flex flex-col shadow-xl">
              {/* top */}
              <div className="flex items-center justify-between">
                <p className="text-white text-lg font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow Outward" width="32" height="32" className="rounded-full object-cover" />
              </div>
              {/* mid */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image src="/เสวนาสัมนาทอล์คโชว์.png" alt="เสวนา/สัมนา/ทอล์คโชว์" fill className=" object-contain" />
              </div>
              
              {/* Low */}
              <div className="mt-auto pb-2">
                <h1 className="text-white text-2xl font-semibold leading-tight">เสวนา/สัมนา/ทอล์คโชว์</h1>
                <div className="mt-3 inline-flex items-center gap-2 px-5 py-2 border border-white/80 rounded-full text-white">
                  <p className="font-bold">33</p>
                  <p className="text-sm">camp</p>
                </div>
              </div>
            </div>
          </div>

          {/*BOX ประกวดแข่งขัน */}
          <div className="relative w-85 h-85 rounded-4xl bg-linear-to-t from-[#b1c9f0] to-[#192542] p-5 shadow-xl items-center justify-center">
            <div className="relative w-75 h-75 rounded-4xl bg-linear-to-t from-[#aac1e9] to-[#43506b] p-6 border border-white/70 flex flex-col shadow-xl">
              {/* top */}
              <div className="flex items-center justify-between">
                <p className="text-white text-lg font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow Outward" width="32" height="32" className="rounded-full object-cover" />
              </div>
              {/* mid */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image src="/ประกวดแข่งขัน.png" alt="ประกวดแข่งขัน" fill className=" object-contain" />
              </div>
              
              {/* Low */}
              <div className="mt-auto pb-2">
                <h1 className="text-white text-2xl font-semibold leading-tight">ประกวดแข่งขัน</h1>
                <div className="mt-3 inline-flex items-center gap-2 px-5 py-2 border border-white/80 rounded-full text-white">
                  <p className="font-bold">33</p>
                  <p className="text-sm">camp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* กิจกรรมยอดนิยม */}
        <div className="relative">
          {/* ข้อความ */}
          <div className="relative z-10 text-black text-2xl font-bold pl-75 mt-50">
            <h1>กิจกรรมยอดนิยม</h1>
          </div>

          <div className="relative z-10 flex justify-center items-center gap-5 mt-10">
            {/* box ทางด้านซ้าย */}
            <div className="bg-gray-700 h-120 w-175 rounded-4xl relative">
              {/* icon มุมขวาบน */}
              <Image src="/Arrow Outward.png" alt="Arrow Outward" width="32" height="32" className="absolute top-4 right-4 rounded-full object-cover"/>
              {/* กล่อง text ล่างซ้าย */}
              <div className="absolute bottom-6 left-6 space-y-3">
                <div className="bg-white/50 h-8 w-75 rounded-xl flex items-center px-3">
                  <h1 className="text-[#BACCE1] font-bold text-sm">เสวนา/สัมนา/ทอล์คโชว์</h1>
                </div>

                <h1 className="font-semibold text-[#BACCE1]">DIT Hackathon 2025 : Unlock Your Future Skill</h1>

                <div className="flex space-x-10">
                  <div className="flex gap-2 items-center">
                    <Image src="/Calendar.png" alt="Calendar" width="24" height="24" />
                    <h1 className="font-bold text-[#BACCE1]">1 JANUARY, 2026</h1>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Image src="/Star.png" alt="Star" width="24" height="24" />
                    <h1 className="font-bold text-[#BACCE1]">5.0 Review</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              {/* 4 box ทางด้านขา */}
              <div>
                <div className="bg-gray-700 h-60 w-87 rounded-4xl mb-5 relative">
                  <Image src="/Arrow Outward.png" alt="Arrow Outward" width="32" height="32" className="absolute top-4 right-4 rounded-full object-cover" />
                  <div className="absolute bottom-6 left-6 space-y-1">
                    <div className="bg-white/50 h-ุ w-50 rounded-xl flex items-center px-3">
                      <h1 className="text-[#BACCE1] font-bold text-sm">พัฒนาการ/เวิร์กชอป</h1>
                    </div>

                    <p className="text-sm font-semibold text-[#BACCE1]">GTC : Build Your Own AI #3</p>

                    <div className="flex space-x-10">
                      <div className="flex gap-2 items-center">
                        <Image src="/Calendar.png" alt="Calendar" width="18" height="18" />
                        <h1 className="text-sm font-bold text-[#BACCE1]">1 JANUARY, 2026</h1>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Image src="/Star.png" alt="Star" width="18" height="18" />
                        <h1 className="text-sm font-bold text-[#BACCE1]">4.6 Review</h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 h-60 w-87 rounded-4xl mb-5 relative">
                  <Image src="/Arrow Outward.png" alt="Arrow Outward" width="32" height="32" className="absolute top-4 right-4 rounded-full object-cover" />
                  <div className="absolute bottom-6 left-6 space-y-1">
                    <div className="bg-white/50 h-ุ w-50 rounded-xl flex items-center px-3">
                      <h1 className="text-[#BACCE1] font-bold text-sm">นิทรรศการ/เปิดบ้าน</h1>
                    </div>

                    <p className="text-sm font-semibold text-[#BACCE1]">IT Ladkrabang Open House 2025</p>

                    <div className="flex space-x-10">
                      <div className="flex gap-2 items-center">
                        <Image src="/Calendar.png" alt="Calendar" width="18" height="18" />
                        <h1 className="text-sm font-bold text-[#BACCE1]">14 FEBRUARY, 2026</h1>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Image src="/Star.png" alt="Star" width="18" height="18" />
                        <h1 className="text-sm font-bold text-[#BACCE1]">4.8 Review</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-700 h-60 w-87 rounded-4xl mb-5 relative">
                  <Image src="/Arrow Outward.png" alt="Arrow Outward" width="32" height="32" className="absolute top-4 right-4 rounded-full object-cover" />
                  <div className="absolute bottom-6 left-6 space-y-1">
                    <div className="bg-white/50 h-ุ w-50 rounded-xl flex items-center px-3">
                      <h1 className="text-[#BACCE1] font-bold text-sm">แนะแนวคณะ/อาชีพ</h1>
                    </div>

                    <p className="text-sm font-semibold text-[#BACCE1]">Extreme Game Development Camp</p>

                    <div className="flex space-x-10">
                      <div className="flex gap-2 items-center">
                        <Image src="/Calendar.png" alt="Calendar" width="18" height="18" />
                        <h1 className="text-sm font-bold text-[#BACCE1]">15 MARCH, 2026</h1>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Image src="/Star.png" alt="Star" width="18" height="18" />
                        <h1 className="text-sm font-bold text-[#BACCE1]">4.9 Review</h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 h-60 w-87 rounded-4xl mb-5 relative">
                  <Image src="/Arrow Outward.png" alt="Arrow Outward" width="32" height="32" className="absolute top-4 right-4 rounded-full object-cover" />
                  <div className="absolute bottom-6 left-6 space-y-1">
                    <div className="bg-white/50 h-ุ w-50 rounded-xl flex items-center px-3">
                      <h1 className="text-[#BACCE1] font-bold text-sm">กิจกรรมออนไลน์</h1>
                    </div>

                    <p className="text-sm font-semibold text-[#BACCE1]">ComCamp 35 ค่ายวิศวะคอมพิวเตอร์ มจธ.</p>

                    <div className="flex space-x-10">
                      <div className="flex gap-2 items-center">
                        <Image src="/Calendar.png" alt="Calendar" width="18" height="18" />
                        <h1 className="text-sm font-bold text-[#BACCE1]">28 MARCH, 2026</h1>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Image src="/Star.png" alt="Star" width="18" height="18" />
                        <p className="text-sm font-bold text-[#BACCE1]">4.3 Review</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white min-h-screen mt-90">
          
        </div>
      </div>
    </div>
  );
};

export default Hero;
