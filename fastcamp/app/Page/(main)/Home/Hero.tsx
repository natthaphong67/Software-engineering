import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-[#000523] overflow-hidden">
      {/* TEXT FAST CAMP */}
      <div className="relative md:absolute inset-0 flex justify-center pt-20 md:pt-40 z-10">
        <div className="flex gap-6 md:gap-50 font-black tracking-tighter leading-none text-[48px] sm:text-[72px] md:text-[200px]
          bg-gradient-to-r from-white via-gray-300  to-gray-400 bg-clip-text
          text-transparent mt-10 md:mt-35 drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">
          <h1>F A S T</h1>

          <h1>C A M P</h1>
        </div>
      </div>

      {/* AI IMAGE */}
      <div className="hidden md:flex absolute inset-0 justify-center items-start z-30 -mt-2.5">
        <div className="relative w-[720px] h-[520px] translate-y-40">
          <Image src="/Ai.png" alt="AI Model" fill priority className="object-contain"/>
        </div>
      </div>


      {/* WAVE */}
      <div className="relative bg-[#000523] h-130">
        <svg viewBox="0 0 1200 320" preserveAspectRatio="none" className="absolute bottom-0 translate-y-90 w-full h-65">
          <path fill="white" d="M 1 62 C 19 235 465 82 443 62 L 700 62 C 898 63 1103 121 1200 318 L 1200 320 L 0 320 Z"/>
        </svg>
      </div>
      <div className="text-white text-2xl font-bold pl-40 absolute mt-40">
        <h1>ประเภทของกิจกรรม</h1>
      </div>


      {/* WHITE SECTION */}
      <div className="bg-white min-h-screen mt-90 justify-center items-center">
        <div className="flex gap-8 p-2">
          {/*BOX นิทรรศการ/เปิดบ้าน */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-square rounded-4xl bg-linear-to-t from-[#073870] to-[#3F8BE2] p-4 sm:p-5 shadow-xl flex items-center justify-center">
            <div className="relative w-full h-full rounded-4xl bg-linear-to-t from-[#073870] to-[#3F8BE2] p-5 sm:p-6 border border-white/70 flex flex-col shadow-xl">
              {/* top */}
              <div className="flex items-center justify-between">
                <p className="text-white text-base sm:text-lg font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow Outward" width={28} height={28} className="rounded-full object-cover sm:w-8 sm:h-8"/>
              </div>

              {/* mid */}
              <div className="relative flex-1 flex items-center justify-center">
                <div className="relative w-24 sm:w-28 lg:w-32 aspect-square">
                  <Image
                    src="/นิทรรศการเปิดบ้าน.png"
                    alt="นิทรรศการเปิดบ้าน"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* bottom */}
              <div>
                <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">นิทรรศการ/เปิดบ้าน</h1>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 border border-white/80 rounded-full text-white">
                  <p className="font-bold">33</p>
                  <p className="text-sm">camp</p>
                </div>
              </div>
            </div>
          </div>


          {/*BOX พัฒนาการ/เวิร์กชอป */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-square rounded-4xl bg-linear-to-t from-[#002C6B] to-[#A6BEDB] p-4 sm:p-5 shadow-xl flex items-center justify-center">
            <div className="relative w-full h-full rounded-4xl bg-linear-to-t from-[#002C6B] to-[#A6BEDB] p-5 sm:p-6 border border-white/70 flex flex-col shadow-xl">
              {/* top */}
              <div className="flex items-center justify-between">
                <p className="text-white text-base sm:text-lg font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow Outward" width={28} height={28} className="rounded-full object-cover sm:w-8 sm:h-8"/>
              </div>

              {/* mid */}
              <div className="relative flex-1 flex items-center justify-center">
                <div className="relative w-24 sm:w-28 lg:w-32 aspect-square">
                  <Image
                    src="/นิทรรศการเปิดบ้าน.png"
                    alt="นิทรรศการเปิดบ้าน"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* bottom */}
              <div>
                <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">นิทรรศการ/เปิดบ้าน</h1>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 border border-white/80 rounded-full text-white">
                  <p className="font-bold">33</p>
                  <p className="text-sm">camp</p>
                </div>
              </div>
            </div>
          </div>



          {/*BOX แนะแนวคณะ/อาชีพ */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-square rounded-4xl bg-linear-to-t from-[#1F32AB] vin-[#BFC8FF] to-[#000E63] p-4 sm:p-5 shadow-xl flex items-center justify-center">
            <div className="relative w-full h-full rounded-4xl bg-linear-to-t from-[#000A43]/50 to-[#000E63]/50 p-5 sm:p-6 border border-white/70 flex flex-col shadow-xl">
              {/* top */}
              <div className="flex items-center justify-between">
                <p className="text-white text-base sm:text-lg font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow Outward" width={28} height={28} className="rounded-full object-cover sm:w-8 sm:h-8"/>
              </div>

              {/* mid */}
              <div className="relative flex-1 flex items-center justify-center">
                <div className="relative w-24 sm:w-28 lg:w-32 aspect-square">
                  <Image
                    src="/นิทรรศการเปิดบ้าน.png"
                    alt="นิทรรศการเปิดบ้าน"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* bottom */}
              <div>
                <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">นิทรรศการ/เปิดบ้าน</h1>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 border border-white/80 rounded-full text-white">
                  <p className="font-bold">33</p>
                  <p className="text-sm">camp</p>
                </div>
              </div>
            </div>
          </div>



          {/*BOX เสวนา/สัมนา/ทอล์คโชว์ */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-square rounded-4xl bg-linear-to-t from-[#7293cf] to-[#3a5383]p-4 sm:p-5 shadow-xl flex items-center justify-center">
            <div className="relative w-full h-full rounded-4xl bg-linear-to-t from-[#7293cf] to-[#3a5383] p-5 sm:p-6 border border-white/70 flex flex-col shadow-xl">
              {/* top */}
              <div className="flex items-center justify-between">
                <p className="text-white text-base sm:text-lg font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow Outward" width={28} height={28} className="rounded-full object-cover sm:w-8 sm:h-8"/>
              </div>

              {/* mid */}
              <div className="relative flex-1 flex items-center justify-center">
                <div className="relative w-24 sm:w-28 lg:w-32 aspect-square">
                  <Image
                    src="/นิทรรศการเปิดบ้าน.png"
                    alt="นิทรรศการเปิดบ้าน"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* bottom */}
              <div>
                <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">นิทรรศการ/เปิดบ้าน</h1>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 border border-white/80 rounded-full text-white">
                  <p className="font-bold">33</p>
                  <p className="text-sm">camp</p>
                </div>
              </div>
            </div>
          </div>



          {/*BOX ประกวดแข่งขัน */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-square rounded-4xl bg-linear-to-t from-[#7293cf] to-[#3a5383]p-4 sm:p-5 shadow-xl flex items-center justify-center">
            <div className="relative w-full h-full rounded-4xl bg-linear-to-t from-[#7293cf] to-[#3a5383] p-5 sm:p-6 border border-white/70 flex flex-col shadow-xl">
              {/* top */}
              <div className="flex items-center justify-between">
                <p className="text-white text-base sm:text-lg font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow Outward" width={28} height={28} className="rounded-full object-cover sm:w-8 sm:h-8"/>
              </div>

              {/* mid */}
              <div className="relative flex-1 flex items-center justify-center">
                <div className="relative w-24 sm:w-28 lg:w-32 aspect-square">
                  <Image
                    src="/นิทรรศการเปิดบ้าน.png"
                    alt="นิทรรศการเปิดบ้าน"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* bottom */}
              <div>
                <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">นิทรรศการ/เปิดบ้าน</h1>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 border border-white/80 rounded-full text-white">
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
            <div className="h-120 w-175 rounded-4xl relative">
              <Image src="/DIT Hackathn 2025.png" alt="DIT Hackathn 2025" fill className="object-cover" />
            </div>
            <div className="flex gap-5">
              {/* 4 box ทางด้านขา */}
              <div>
                <div className="h-60 w-87 rounded-2xl mb-5 relative">
                  <Image src="/GTC Build Your Own.png" alt="GTC Build Your Own" fill className="object-cover" />
                </div>

                <div className="bg-gray-700 h-60 w-87 rounded-2xl mb-5 relative">
                  <Image src="/IT Ladkrbng.png" alt="IT Ladkrbng" fill className="object-cover" />
                </div>
              </div>

              <div>
                <div className="bg-gray-700 h-60 w-87 rounded-2xl mb-5 relative">
                  <Image src="/Extreme Game Development.png" alt="Extreme Game Development" fill className="object-cover" />
                </div>

                <div className="bg-gray-700 h-60 w-87 rounded-2xl mb-5 relative">
                  <Image src="/ComCamp.png" alt="ComCamp" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
          {/* ส่งกิจกรรมขึ้นเว็บ */}
          <div className="flex items-center">
            <div className="relative z-10 w-200 h-75 bg-linear-to-r from-[#0b0f2b] to-[#1a2b6f] px-12 bg_clip ml-50 my-25 flex">
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
          {/* review */}
          <div className="bg-[#000523] min-h-screen mt-5 justify-center items-center">
            {/* wave */}
            <div className="relative bg-[white]">
              <svg viewBox="0 0 1200 320" preserveAspectRatio="none" className="absolute  w-full h-50">
                <path fill="white" transform="scale(1,-1) translate(0,-320)" d="M 1 62 C 19 235 347 54 475 62 L 700 62 C 898 63 1103 121 1200 318 L 1200 320 L 0 320 Z"/>
              </svg>
            </div>
            {/* Image */}
            <div className="relative h-120 w-240 items-center justify-center ml-135 ">
              <Image src="/Section.png" alt="Section" fill className="object-cover mt-60 "/>
            </div>
            {/* Box review top*/}
            <div className="flex items-center justify-center space-x-15 mt-15">
              {/* Box review 1 */}
              <div className="bg-linear-to-r from-white/0 to-white/15 h-60 w-100 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Image src="/Profile.png" alt="Profile" height="48" width="48" className="rounded-full object-cover"/>
                  <div>
                    <h1 className="font-semibold">Fabrizio Rinaldi</h1>
                    <p className="text-sm opacity-70">@linuz90</p>
                  </div>
                </div>
                <h1>ขอบคุณ Fastcamp ที่ช่วยเผยแพร่ค่ายของเรา ทำให้คนที่อยากเรียนรู้เข้าถึงเราได้มากขึ้น!</h1>
              </div>
              {/* Box review 2 */}
              <div className="bg-white/15 h-60 w-100 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Image src="/Profile.png" alt="Profile" height="48" width="48" className="rounded-full object-cover"/>
                  <div>
                    <h1 className="font-semibold">Fabrizio Rinaldi</h1>
                    <p className="text-sm opacity-70">@linuz90</p>
                  </div>
                </div>
                <h1>ขอบคุณ Fastcamp ที่ช่วยเผยแพร่ค่ายของเรา ทำให้คนที่อยากเรียนรู้เข้าถึงเราได้มากขึ้น!</h1>
              </div>
              {/* Box review 3 */}
              <div className="bg-white/15 h-60 w-100 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Image src="/Profile.png" alt="Profile" height="48" width="48" className="rounded-full object-cover"/>
                  <div>
                    <h1 className="font-semibold">Fabrizio Rinaldi</h1>
                    <p className="text-sm opacity-70">@linuz90</p>
                  </div>
                </div>
                <h1>ขอบคุณ Fastcamp ที่ช่วยเผยแพร่ค่ายของเรา ทำให้คนที่อยากเรียนรู้เข้าถึงเราได้มากขึ้น!</h1>
              </div>
              {/* Box review 4 */}
              <div className="bg-linear-to-r from-white/15 to-white/0 h-60 w-100 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Image src="/Profile.png" alt="Profile" height="48" width="48" className="rounded-full object-cover"/>
                  <div>
                    <h1 className="font-semibold">Fabrizio Rinaldi</h1>
                    <p className="text-sm opacity-70">@linuz90</p>
                  </div>
                </div>
                <h1>ขอบคุณ Fastcamp ที่ช่วยเผยแพร่ค่ายของเรา ทำให้คนที่อยากเรียนรู้เข้าถึงเราได้มากขึ้น!</h1>
              </div>
            </div>
            {/* Box review low*/}
            <div className="flex items-center justify-center space-x-15 mt-10">
              {/* Box review 1 */}
              <div className="bg-linear-to-r from-white/0 to-white/15 h-60 w-100 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Image src="/Profile.png" alt="Profile" height="48" width="48" className="rounded-full object-cover"/>
                  <div>
                    <h1 className="font-semibold">Fabrizio Rinaldi</h1>
                    <p className="text-sm opacity-70">@linuz90</p>
                  </div>
                </div>
                <h1>ขอบคุณ Fastcamp ที่ช่วยเผยแพร่ค่ายของเรา ทำให้คนที่อยากเรียนรู้เข้าถึงเราได้มากขึ้น!</h1>
              </div>

              {/* Box review 2 */}
              <div className="bg-white/15 h-60 w-100 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Image src="/Profile.png" alt="Profile" height="48" width="48" className="rounded-full object-cover"/>
                  <div>
                    <h1 className="font-semibold">Fabrizio Rinaldi</h1>
                    <p className="text-sm opacity-70">@linuz90</p>
                  </div>
                </div>
                <h1>ขอบคุณ Fastcamp ที่ช่วยเผยแพร่ค่ายของเรา ทำให้คนที่อยากเรียนรู้เข้าถึงเราได้มากขึ้น!</h1>
              </div>

              {/* Box review 3 */}
              <div className="bg-linear-to-r from-white/15 to-white/0 h-60 w-100 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Image src="/Profile.png" alt="Profile" height="48" width="48" className="rounded-full object-cover"/>
                  <div>
                    <h1 className="font-semibold">Fabrizio Rinaldi</h1>
                    <p className="text-sm opacity-70">@linuz90</p>
                  </div>
                </div>
                <h1>ขอบคุณ Fastcamp ที่ช่วยเผยแพร่ค่ายของเรา ทำให้คนที่อยากเรียนรู้เข้าถึงเราได้มากขึ้น!</h1>
              </div>
            </div>
          </div>
          {/* Box search */}
          <div className="bg-search min-h-screen flex items-center justify-center bg-[#000523] ">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="text-6xl md:text-7xl font-extrabold tracking-tight flex">
                <h1 className="bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent">Fastcamp</h1>
                <h1 className="text-white/90">ให้อะไรกับคุณ ?</h1>
              </div>
              <div>
                <h1 className="text-white/50 text-lg">แชร์ประสบการณ์ของคุณหลังเข้าค่าย/ร่วมงานกับ Fastcamp</h1>
              </div>
              <div className="mt-6 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 w-105 max-w-full">
                <input type="text" placeholder="Enter your comment" className="bg-transparent flex-1 outline-none text-white placeholder-white/40 "/>
                <button className="bg-white/20 hover:bg-white/30 transition px-6 py-2 rounded-full text-white font-medium">Submit</button>
              </div>
              <div>
                <h1 className="text-white/40 text-sm">โปรดล็อกอินก่อนแสดงความคิดเห็น</h1>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
