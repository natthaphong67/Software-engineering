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
      <div className="bg-white min-h-screen mt-90 justify-center items-center">
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
        <div className="relative items-center justify-center">
          {/* ข้อความ */}
          <div className="relative z-10 text-black text-2xl font-bold pl-75 mt-50"><h1>กิจกรรมยอดนิยม</h1></div>

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
                    <h1 className="text-sm font-medium text-[#BACCE1]">1 JANUARY, 2026</h1>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Image src="/Star.png" alt="Star" width="24" height="24" />
                    <h1 className="text-sm font-medium text-[#BACCE1]">5.0 Review</h1>
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
                        <h1 className="text-sm font-medium text-[#BACCE1]">1 JANUARY, 2026</h1>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Image src="/Star.png" alt="Star" width="18" height="18" />
                        <h1 className="text-sm font-medium text-[#BACCE1]">4.6 Review</h1>
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
                        <h1 className="text-sm font-medium text-[#BACCE1]">14 FEBRUARY, 2026</h1>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Image src="/Star.png" alt="Star" width="18" height="18" />
                        <h1 className="text-sm font-medium text-[#BACCE1]">4.8 Review</h1>
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
                        <h1 className="text-sm font-medium text-[#BACCE1]">15 MARCH, 2026</h1>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Image src="/Star.png" alt="Star" width="18" height="18" />
                        <h1 className="text-sm font-medium text-[#BACCE1]">4.9 Review</h1>
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
                        <h1 className="text-sm font-medium text-[#BACCE1]">28 MARCH, 2026</h1>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Image src="/Star.png" alt="Star" width="18" height="18" />
                        <p className="text-sm font-medium text-[#BACCE1]">4.3 Review</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ส่งกิจกรรมขึ้นเว็บ */}
          <div className="flex items-center">
            <div className="relative z-10 w-200 h-75 bg-linear-to-r from-[#0b0f2b] to-[#1a2b6f] px-12 bg_clip ml-85 my-25 flex">
              <div className="flex  mt-15 gap-15">
                <div className="text-white font-bold text-2xl">
                  <div className="flex gap-2">
                    <h1>จุดเริ่มต้นที่ค่ายคุณจะ</h1>
                    <h1 className="text-3xl">ทะยาน</h1>
                  </div>
                  <div><h1>สู่ความสำเร็จบนเว็บเรา</h1></div>
                </div>
                <div className="h-12 w-50 border border-white rounded-3xl flex items-center justify-center mt-5">
                  <h1 className="text-white text-xl font-medium">ส่งกิจกรรมขึ้นเว็บ</h1>
                </div>
              </div>
            </div>
            <div className="relative w-[40%] h-45 -ml-50 -mt-30 z-0">
              <Image src="/ส่งกิจกรรม.png" alt="ส่งกิจกรรมขึ้นเว็บ" fill className="object-cover" />
            </div>
          </div>
        </div>
        {/* กิจกรรมล่าสุด */}
        <div className="bg-white min-h-screen">
          {/* ข้อความ */}
          <div className="relative z-10 text-black text-2xl font-bold pl-75 -mt-25"><h1>กิจกรรมล่าสุด</h1></div>
          
          <div>
            {/* กิจกรรมที่ 1 */}
            <div className="flex items-center justify-center gap-10">
              <div className="h-80 w-160 relative mt-15">
                <Image src="/Container1.png" alt="ส่งกิจกรรม" fill className="object-cover rounded-xl" />
              </div>
              <div className="flex flex-col space-y-5">
                <div className="bg-[#FF5D4B] flex-col space--5 h-7 w-45 rounded-lg text-white text-sm font-medium flex items-center justify-center"><h1>สิ้นสุดรับสมัครใน 2 วัน</h1></div>
                <div className="text-3xl font-bold"><h1>AI Innovation Summit 2025</h1></div>
                  <div className="flex space-x-10">
                    <div className="flex gap-2 items-center">
                      <Image src="/calendar-6D757F.png" alt="Calendar" width="18" height="18" />
                      <h1 className="text-sm font-medium text-[#6D757F]">27 AUGUST, 2024</h1>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Image src="/star-6D757F.png" alt="Star" width="18" height="18" />
                        <p className="text-sm font-medium text-[#6D757F]">5.0 Review</p>
                    </div>
                  </div>
                <div className="text-[#A5A5A5] text-lg">
                  <h1>มาร่วมเปิดประสบการณ์สุดพิเศษกับงาน AI แห่งปี พบผู้นำระดับโลก นักนวัตกรรม</h1>
                  <h1>และผู้สร้างอนาคต ในวันที่รวม Keynote, Showcase และแรงบันดาลใจจากโลกจริง ไว้ในที่เดียว</h1>
                </div>
                <div className="flex items-center justify-center border-2 border-[#6D757F] h-8 w-30 gap-2 rounded-3xl">
                  <h1 className="text-sm font-medium text-[#92989F]">READ MORE</h1>
                  <div className="relative h-4 w-4"><Image src="/arrow-6D757F.png" alt="Arrow Outward" fill className="object-cover" /></div>
                </div>
              </div>
            </div>

            {/* กิจกรรมที่ 2 */}
            <div className="flex items-center justify-center gap-10">
              <div className="h-80 w-160 relative mt-15 ml-15">
                <Image src="/Container2.png" alt="ส่งกิจกรรม" fill className="object-cover rounded-xl" />
              </div>
              <div className="flex flex-col space-y-5">
                <div className="bg-[#FFBD42] flex-col space--5 h-7 w-45 rounded-lg text-white text-sm font-medium flex items-center justify-center"><h1>สิ้นสุดรับสมัครใน 7 วัน</h1></div>
                <div className="text-3xl font-bold"><h1>Computer Engineering and Data Science</h1></div>
                  <div className="flex space-x-10">
                    <div className="flex gap-2 items-center">
                      <Image src="/calendar-6D757F.png" alt="Calendar" width="18" height="18" />
                      <h1 className="text-sm font-medium text-[#6D757F]">27 AUGUST, 2024</h1>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Image src="/star-6D757F.png" alt="Star" width="18" height="18" />
                        <p className="text-sm font-medium text-[#6D757F]">4.8 Review</p>
                    </div>
                  </div>
                <div className="text-[#A5A5A5] text-lg">
                  <h1>เปิดโลก วิศวะคอมและวิทย์คอม ให้เข้าใจง่ายและสนุกผ่านคลาสออนไลน์ 6 ชั่วโมง ที่จะพานักเรียนเรียนรู้ </h1>
                  <h1>ตั้งแต่การเขียนโปรแกรมสร้างระบบปฏิบัติการอย่างง่าย ไปจนถึงการจัดการและการวิเคราะห์ข้อมูล</h1>
                </div>
                <div className="flex items-center justify-center border-2 border-[#6D757F] h-8 w-30 gap-2 rounded-3xl">
                  <h1 className="text-sm font-medium text-[#92989F]">READ MORE</h1>
                  <div className="relative h-4 w-4"><Image src="/arrow-6D757F.png" alt="Arrow Outward" fill className="object-cover" /></div>
                </div>
              </div>
            </div>

            {/* กิจกรรมที่ 3 */}
            <div className="flex items-center justify-center gap-10">
              <div className="h-80 w-160 relative mt-15 ml-10">
                <Image src="/Container3.png" alt="ส่งกิจกรรม" fill className="object-cover rounded-xl" />
              </div>
              <div className="flex flex-col space-y-5">
                <div className="bg-[#A1A1A1] flex-col space--5 h-7 w-45 rounded-lg text-white text-sm font-medium flex items-center justify-center"><h1>สิ้นสุดรับสมัครแล้ว</h1></div>
                <div className="text-3xl font-bold"><h1>AI Innovation Summit 2025</h1></div>
                  <div className="flex space-x-10">
                    <div className="flex gap-2 items-center">
                      <Image src="/calendar-6D757F.png" alt="Calendar" width="18" height="18" />
                      <h1 className="text-sm font-medium text-[#6D757F]">28 MARCH, 2026</h1>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Image src="/star-6D757F.png" alt="Star" width="18" height="18" />
                        <p className="text-sm font-medium text-[#6D757F]">4.8 Review</p>
                    </div>
                  </div>
                <div className="text-[#A5A5A5] text-lg">
                  <h1>เรียนรู้พื้นฐานการเขียนโปรแกรม ตั้งแต่โครงสร้างเบื้องต้น การสร้างระบบง่ายๆ ไปจนถึงการประยุกต์ใช้</h1>
                  <h1>Python ในชีวิตประจำวัน พร้อมสิทธิพิเศษเข้าร่วมแข่งขัน Python Best Mini Project</h1>
                </div>
                <div className="flex items-center justify-center border-2 border-[#6D757F] h-8 w-30 gap-2 rounded-3xl">
                  <h1 className="text-sm font-medium text-[#92989F]">READ MORE</h1>
                  <div className="relative h-4 w-4"><Image src="/arrow-6D757F.png" alt="Arrow Outward" fill className="object-cover" /></div>
                </div>
              </div>
            </div>

            {/* กิจกรรมที่ 4 */}
            <div className="flex items-center justify-center gap-10">
              <div className="h-80 w-160 relative mt-15 ml-15">
                <Image src="/Container4.png" alt="ส่งกิจกรรม" fill className="object-cover rounded-xl" />
              </div>
              <div className="flex flex-col space-y-5">
                <div className="bg-[#A1A1A1] flex-col space--5 h-7 w-45 rounded-lg text-white text-sm font-medium flex items-center justify-center"><h1>สิ้นสุดรับสมัครแล้ว</h1></div>
                <div className="text-3xl font-bold"><h1>CE Camp Mahidol</h1></div>
                  <div className="flex space-x-10">
                    <div className="flex gap-2 items-center">
                      <Image src="/calendar-6D757F.png" alt="Calendar" width="18" height="18" />
                      <h1 className="text-sm font-medium text-[#6D757F]">28 MARCH, 2026</h1>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Image src="/star-6D757F.png" alt="Star" width="18" height="18" />
                        <p className="text-sm font-medium text-[#6D757F]">4.3 Review</p>
                    </div>
                  </div>
                <div className="text-[#A5A5A5] text-lg">
                  <h1>เปิดโลก วิศวะคอมและวิทย์คอม ให้เข้าใจง่ายและสนุกผ่านคลาสออนไลน์ 6 ชั่วโมง ที่จะพานักเรียนเรียนรู้</h1>
                  <h1>ตั้งแต่การเขียนโปรแกรมสร้างระบบปฏิบัติการอย่างง่าย ไปจนถึงการจัดการและการวิเคราะห์ข้อมูล</h1>
                </div>
                <div className="flex items-center justify-center border-2 border-[#6D757F] h-8 w-30 gap-2 rounded-3xl">
                  <h1 className="text-sm font-medium text-[#92989F]">READ MORE</h1>
                  <div className="relative h-4 w-4"><Image src="/arrow-6D757F.png" alt="Arrow Outward" fill className="object-cover" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
