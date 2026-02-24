import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative bg-[#000523] overflow-hidden">
      {/* TEXT FAST CAMP */}
      <div className="relative md:absolute inset-0 flex justify-center pt-20 md:pt-40 z-10">
        <div className="flex gap-6 md:gap-50 font-black tracking-tighter leading-none text-[48px] sm:text-[72px] md:text-[200px]
          bg-gradient-to-r from-white via-gray-300  to-gray-400 bg-clip-text
          text-transparent mt-10 md:mt-35 drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">
          <h1>F A S T</h1><h1>C A M P</h1>
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
          <path fill="white" d="M 1 62 C 20 229 429 88 420 62 L 700 62 C 821 62 1081 134 1200 318 L 1200 320 L 0 320 Z"/>
        </svg>
      </div>
      <div className="text-white text-2xl font-bold pl-40 absolute mt-40">
        <h1>ประเภทของกิจกรรม</h1>
      </div>

      {/* WHITE SECTION */}
      <div className="bg-white mt-90 justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 p-2 justify-items-center">

          {/*BOX นิทรรศการ/เปิดบ้าน */}
          <div className="relative w-full max-w-[160px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[305px] aspect-[305/306] rounded-[20px] sm:rounded-[26px] lg:rounded-[32px] bg-gradient-to-b from-[#5f8fc5] to-[#3f6fa4] p-[8px] sm:p-[10px] lg:p-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="w-full h-full rounded-[16px] sm:rounded-[22px] lg:rounded-[26px] bg-gradient-to-b from-[#4f7fb5] to-[#224F82] border border-white/60 p-3 sm:p-4 lg:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-white text-[12px] sm:text-[16px] lg:text-[20px] font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow" width={26} height={26} className="w-[14px] sm:w-[18px] lg:w-[26px]"/>
              </div>
              <div className="flex justify-center items-center h-[70px] sm:h-[100px] lg:h-[150px]">
                <Image src="/นิทรรศการเปิดบ้าน.png" alt="png" width={132} height={129} className="w-[60px] sm:w-[90px] lg:w-[132px] h-auto object-contain"/>
              </div>
              <div>
                <h1 className="text-white text-[12px] sm:text-[15px] lg:text-[18px] font-semibold">นิทรรศการ/เปิดบ้าน</h1>
                <div className="mt-2 lg:mt-4 inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1 lg:py-2 border border-white/70 rounded-full text-white">
                  <Image src="/user.png" alt="user" width={18} height={18} className="w-[10px] lg:w-[18px]"/>
                  <span className="text-[10px] lg:text-[12px]">33 camp</span>
                </div>
              </div>
            </div>
          </div>

          {/*BOX พัฒนาการ/เวิร์กชอป */}
          <div className="relative w-full max-w-[160px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[305px] aspect-[305/306] rounded-[20px] sm:rounded-[26px] lg:rounded-[32px] bg-gradient-to-b from-[#bccee3] to-[#3b5b8b] p-[8px] sm:p-[10px] lg:p-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="w-full h-full rounded-[16px] sm:rounded-[22px] lg:rounded-[26px] bg-gradient-to-b from-[#9aaec6] to-[#3c5e88] border border-white/60 p-3 sm:p-4 lg:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-white text-[12px] sm:text-[16px] lg:text-[20px] font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow" width={26} height={26} className="w-[14px] sm:w-[18px] lg:w-[26px]"/>
              </div>
              <div className="flex justify-center items-center h-[70px] sm:h-[100px] lg:h-[150px]">
                <Image src="/พัฒนาการเวิร์กชอป.png" alt="png" width={132} height={129} className="w-[60px] sm:w-[90px] lg:w-[132px] h-auto object-contain"/>
              </div>
              <div>
                <h1 className="text-white text-[12px] sm:text-[15px] lg:text-[18px] font-semibold">พัฒนาการ/เวิร์กชอป</h1>
                <div className="mt-2 lg:mt-4 inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1 lg:py-2 border border-white/70 rounded-full text-white">
                  <Image src="/user.png" alt="user" width={18} height={18} className="w-[10px] lg:w-[18px]"/>
                  <span className="text-[10px] lg:text-[12px]">33 camp</span>
                </div>
              </div>
            </div>
          </div>

          {/*BOX แนะแนวคณะ/อาชีพ */}
          <div className="relative w-full max-w-[160px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[305px] aspect-[305/306] rounded-[20px] sm:rounded-[26px] lg:rounded-[32px] bg-gradient-to-b from-[#3a4588] via-[#c2cbf7] to-[#5d6cc5] p-[8px] sm:p-[10px] lg:p-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="w-full h-full rounded-[16px] sm:rounded-[22px] lg:rounded-[26px] bg-gradient-to-b from-[#353f81] to-[#4d5aaa] border border-white/60 p-3 sm:p-4 lg:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-white text-[12px] sm:text-[16px] lg:text-[20px] font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow" width={26} height={26} className="w-[14px] sm:w-[18px] lg:w-[26px]"/>
              </div>
              <div className="flex justify-center items-center h-[70px] sm:h-[100px] lg:h-[150px]">
                <Image src="/แนะแนวคณะอาชีพ.png" alt="png" width={132} height={129} className="w-[60px] sm:w-[90px] lg:w-[132px] h-auto object-contain"/>
              </div>
              <div>
                <h1 className="text-white text-[12px] sm:text-[15px] lg:text-[18px] font-semibold">แนะแนวคณะ/อาชีพ</h1>
                <div className="mt-2 lg:mt-4 inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1 lg:py-2 border border-white/70 rounded-full text-white">
                  <Image src="/user.png" alt="user" width={18} height={18} className="w-[10px] lg:w-[18px]"/>
                  <span className="text-[10px] lg:text-[12px]">33 camp</span>
                </div>
              </div>
            </div>
          </div>

          {/*BOX เสวนา/สัมนา/ทอล์คโชว์ */}
          <div className="relative w-full max-w-[160px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[305px] aspect-[305/306] rounded-[20px] sm:rounded-[26px] lg:rounded-[32px] bg-gradient-to-b from-[#3a4588] to-[#5a3784] p-[8px] sm:p-[10px] lg:p-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="w-full h-full rounded-[16px] sm:rounded-[22px] lg:rounded-[26px] bg-gradient-to-b from-[#5f75b5] to-[#614a91] border border-white/60 p-3 sm:p-4 lg:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-white text-[12px] sm:text-[16px] lg:text-[20px] font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow" width={26} height={26} className="w-[14px] sm:w-[18px] lg:w-[26px]"/>
              </div>
              <div className="flex justify-center items-center h-[70px] sm:h-[100px] lg:h-[150px]">
                <Image src="/เสวนาสัมนาทอล์คโชว์.png" alt="png" width={132} height={129} className="w-[60px] sm:w-[90px] lg:w-[132px] h-auto object-contain"/>
              </div>
              <div>
                <h1 className="text-white text-[12px] sm:text-[15px] lg:text-[18px] font-semibold">เสวนา/สัมนา/ทอล์คโชว์</h1>
                <div className="mt-2 lg:mt-4 inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1 lg:py-2 border border-white/70 rounded-full text-white">
                  <Image src="/user.png" alt="user" width={18} height={18} className="w-[10px] lg:w-[18px]"/>
                  <span className="text-[10px] lg:text-[12px]">33 camp</span>
                </div>
              </div>
            </div>
          </div>

          {/*BOX ประกวดแข่งขัน */}
          <div className="relative w-full max-w-[160px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[305px] aspect-[305/306] rounded-[20px] sm:rounded-[26px] lg:rounded-[32px] bg-gradient-to-b from-[#a2caf7] to-[#556d8c] p-[8px] sm:p-[10px] lg:p-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="w-full h-full rounded-[16px] sm:rounded-[22px] lg:rounded-[26px] bg-gradient-to-b from-[#a2c9f7] to-[#54759b] border border-white/60 p-3 sm:p-4 lg:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-white text-[12px] sm:text-[16px] lg:text-[20px] font-medium">Fastwork</p>
                <Image src="/Arrow Outward.png" alt="Arrow" width={26} height={26} className="w-[14px] sm:w-[18px] lg:w-[26px]"/>
              </div>
              <div className="flex justify-center items-center h-[70px] sm:h-[100px] lg:h-[150px]">
                <Image src="/ประกวดแข่งขัน.png" alt="png" width={132} height={129} className="w-[60px] sm:w-[90px] lg:w-[132px] h-auto object-contain"/>
              </div>
              <div>
                <h1 className="text-white text-[12px] sm:text-[15px] lg:text-[18px] font-semibold">ประกวดแข่งขัน</h1>
                <div className="mt-2 lg:mt-4 inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1 lg:py-2 border border-white/70 rounded-full text-white">
                  <Image src="/user.png" alt="user" width={18} height={18} className="w-[10px] lg:w-[18px]"/>
                  <span className="text-[10px] lg:text-[12px]">33 camp</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* กิจกรรมยอดนิยม */}
        <div className="w-full max-w-7xl mx-auto px-4 mt-23">
          <h1 className="text-2xl font-bold mb-8">กิจกรรมยอดนิยม</h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative w-full lg:w-1/2 h-[240px] sm:h-[300px] lg:h-[500px] rounded-3xl overflow-hidden">
              <Image src="/DIT Hackathn 2025.png" alt="" fill className="object-cover"/>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:w-1/2">
              <div className="relative h-[120px] sm:h-[160px] lg:h-[240px] rounded-2xl overflow-hidden">
                <Image src="/GTC Build Your Own.png" alt="" fill className="object-cover"/>
              </div>
              <div className="relative h-[120px] sm:h-[160px] lg:h-[240px] rounded-2xl overflow-hidden">
                <Image src="/IT Ladkrbng.png" alt="" fill className="object-cover"/>
              </div>
              <div className="relative h-[120px] sm:h-[160px] lg:h-[240px] rounded-2xl overflow-hidden">
                <Image src="/Extreme Game Development.png" alt="" fill className="object-cover"/>
              </div>
              <div className="relative h-[120px] sm:h-[160px] lg:h-[240px] rounded-2xl overflow-hidden">
                <Image src="/ComCamp.png" alt="" fill className="object-cover"/>
              </div>
            </div>
          </div>

          {/* ส่งกิจกรรมขึ้นเว็บ */}
          <div className="w-full flex justify-center my-12 px-4">
            <div className="relative w-full max-w-[1000px] aspect-[1000/127] flex items-center">
              <div className="relative z-10 w-[75%] md:w-[65%] lg:w-[60%] xl:w-[55%] h-full bg-gradient-to-r from-[#0b0f2b] to-[#1a2b6f] flex items-center px-[5%] pr-[8%] clip-diagonal">
                <div className="flex items-center gap-[5%] w-full">
                  <div className="text-white font-bold leading-tight">
                    <div className="flex gap-2">
                      <h1 className="text-[20px]">จุดเริ่มต้นที่ค่ายคุณจะ</h1>
                      <h1 className="text-[22px]">ทะยาน</h1>
                    </div>
                    <h1 className="text-[20px]">สู่ความสำเร็จบนเว็บเรา</h1>
                  </div>
                  <button className="border border-white rounded-full px-[clamp(8px,1.5vw,20px)] py-[clamp(3px,0.6vw,8px)] text-white text-[clamp(9px,1.5vw,16px)] whitespace-nowrap">
                    ส่งกิจกรรมขึ้นเว็บ
                  </button>
                </div>
              </div>
              <div className="absolute right-0 top-0 w-[70%] h-full">
                <Image src="/ส่งกิจกรรม.png" alt="#" fill className="object-cover"/>
              </div>
            </div>
          </div>
        </div>

        {/* Why Trust */}
        <div className="w-full bg-white py-[80px]">
          <h2 className="text-center text-[32px] md:text-[36px] font-bold text-[#0B0F2B]">Why Trust Our Platform?</h2>
          <div className="flex justify-center gap-[120px] mt-[60px] flex-wrap">
            <div className="flex flex-col items-center">
              <div className="w-[168px] h-[168px] rounded-[20px] bg-gradient-to-br flex items-center justify-center shadow-md">
                <Image src="/handshake-icon.png" alt="ทั้งหมด" width={168} height={168} className="w-[168px] h-[168px]"/>
              </div>
              <p className="mt-[18px] text-[18px] font-semibold text-[#0B0F2B]">ค่ายทั้งหมด</p>
              <p className="mt-[6px] text-[44px] font-bold text-[#0B0F2B]">89</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[168px] h-[168px] rounded-[20px] bg-gradient-to-br from-[#7FD8FF] to-[#4BA3FF] flex items-center justify-center shadow-md">
                <Image src="/Frame 1158.png" alt="เปิดรับ" width={168} height={168} className="w-[168px] h-[168px]"/>
              </div>
              <p className="mt-[18px] text-[18px] font-semibold text-[#0B0F2B]">ค่ายที่เปิดรับสมัคร</p>
              <p className="mt-[6px] text-[44px] font-bold text-[#1F7AE0]">67</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[168px] h-[168px] rounded-[20px] bg-gradient-to-br from-[#C9A7FF] to-[#8D63FF] flex items-center justify-center shadow-md">
                <Image src="/Frame 1159.png" alt="จัดแล้ว" width={168} height={168} className="w-[168px] h-[168px]"/>
              </div>
              <p className="mt-[18px] text-[18px] font-semibold text-[#0B0F2B]">ค่ายที่จัดแล้ว</p>
              <p className="mt-[6px] text-[44px] font-bold text-[#5B2BE0]">22</p>
            </div>
          </div>
        </div>

        {/* กิจกรรมล่าสุด */}
        <div className="py-12 ">
          <div className="max-w-6xl mx-auto px-4 mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">กิจกรรมล่าสุด</h1>
          </div>
          <div>
            {/* กิจกรรมที่ 1 */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-6xl mx-auto px-4">
              <div className="relative w-full md:w-[640px] h-[220px] md:h-[320px] mt-8 md:mt-15">
                <Image src="/Container1.png" alt="ส่งกิจกรรม" fill className="object-cover rounded-xl"/>
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-4 md:space-y-5 max-w-xl">
                  <div className="bg-[#FF5D4B] flex-col space-y-5 h-7 w-45 rounded-lg text-white text-sm font-medium flex items-center justify-center"><h1>สิ้นสุดรับสมัครใน 2 วัน</h1></div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold"><h1>AI Innovation Summit 2025</h1></div>
                <div className="flex space-x-10">
                  <div className="flex gap-2 items-center">
                    <Image src="/calendar-6D757F.png" alt="Calendar" width={18} height={18}/>
                    <h1 className="text-sm font-medium text-[#6D757F]">27 AUGUST, 2024</h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Image src="/star-6D757F.png" alt="Star" width={18} height={18}/>
                    <p className="text-sm font-medium text-[#6D757F]">5.0 Review</p>
                  </div>
                </div>
                <div className="text-[#A5A5A5] text-sm sm:text-base md:text-lg">
                  <h1>มาร่วมเปิดประสบการณ์สุดพิเศษกับงาน AI แห่งปี พบผู้นำระดับโลก นักนวัตกรรม</h1>
                  <h1>และผู้สร้างอนาคต ในวันที่รวม Keynote, Showcase และแรงบันดาลใจจากโลกจริง ไว้ในที่เดียว</h1>
                </div>
                <button className="w-[138px] h-[36px] inline-flex items-center justify-center gap-2 border-2 border-[#6D757F] rounded-full">
                  <span className="text-[14px] font-light text-[#92989F] leading-none">READ MORE</span>
                  <div className="relative w-[16px] h-[16px]">
                    <Image src="/arrow-6D757F.png" alt="Arrow" fill className="object-contain"/>
                  </div>
                </button>
              </div>
            </div>

            {/* กิจกรรมที่ 2 */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-6xl mx-auto px-4">
              <div className="relative w-full md:w-[640px] h-[220px] md:h-[320px] mt-8 md:mt-15">
                <Image src="/Container2.png" alt="ส่งกิจกรรม" fill className="object-cover rounded-xl"/>
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-4 md:space-y-5 max-w-xl">
                  <div className="bg-[#FFBD42] flex-col space-y-5 h-7 w-45 rounded-lg text-white text-sm font-medium flex items-center justify-center"><h1>สิ้นสุดรับสมัครใน 7 วัน</h1></div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold"><h1>Computer Engineering and Data Science</h1></div>
                <div className="flex space-x-10">
                  <div className="flex gap-2 items-center">
                    <Image src="/calendar-6D757F.png" alt="Calendar" width={18} height={18}/>
                    <h1 className="text-sm font-medium text-[#6D757F]">27 AUGUST, 2024</h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Image src="/star-6D757F.png" alt="Star" width={18} height={18}/>
                    <p className="text-sm font-medium text-[#6D757F]">4.8 Review</p>
                  </div>
                </div>
                <div className="text-[#A5A5A5] text-sm sm:text-base md:text-lg">
                  <h1>เปิดโลก วิศวะคอมและวิทย์คอม ให้เข้าใจง่ายและสนุกผ่านคลาสออนไลน์ 6 ชั่วโมง ที่จะพานักเรียนเรียนรู้ </h1>
                  <h1>ตั้งแต่การเขียนโปรแกรมสร้างระบบปฏิบัติการอย่างง่าย ไปจนถึงการจัดการและการวิเคราะห์ข้อมูล</h1>
                </div>
                <button className="w-[138px] h-[36px] inline-flex items-center justify-center gap-2 border-2 border-[#6D757F] rounded-full">
                  <span className="text-[14px] font-light text-[#92989F] leading-none">READ MORE</span>
                  <div className="relative w-[16px] h-[16px]">
                    <Image src="/arrow-6D757F.png" alt="Arrow" fill className="object-contain"/>
                  </div>
                </button>
              </div>
            </div>

            {/* กิจกรรมที่ 3 */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-6xl mx-auto px-4">
              <div className="relative w-full md:w-[640px] h-[220px] md:h-[320px] mt-8 md:mt-15">
                <Image src="/Container3.png" alt="ส่งกิจกรรม" fill className="object-cover rounded-xl"/>
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-4 md:space-y-5 max-w-xl">
                  <div className="bg-[#A1A1A1] flex-col space-y-5 h-7 w-45 rounded-lg text-white text-sm font-medium flex items-center justify-center"><h1>สิ้นสุดรับสมัครแล้ว</h1></div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold"><h1>AI Innovation Summit 2025</h1></div>
                <div className="flex space-x-10">
                  <div className="flex gap-2 items-center">
                    <Image src="/calendar-6D757F.png" alt="Calendar" width={18} height={18}/>
                    <h1 className="text-sm font-medium text-[#6D757F]">28 MARCH, 2026</h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Image src="/star-6D757F.png" alt="Star" width={18} height={18}/>
                    <p className="text-sm font-medium text-[#6D757F]">4.8 Review</p>
                  </div>
                </div>
                <div className="text-[#A5A5A5] text-sm sm:text-base md:text-lg">
                  <h1>เรียนรู้พื้นฐานการเขียนโปรแกรม ตั้งแต่โครงสร้างเบื้องต้น การสร้างระบบง่ายๆ ไปจนถึงการประยุกต์ใช้</h1>
                  <h1>Python ในชีวิตประจำวัน พร้อมสิทธิพิเศษเข้าร่วมแข่งขัน Python Best Mini Project</h1>
                </div>
                <button className="w-[138px] h-[36px] inline-flex items-center justify-center gap-2 border-2 border-[#6D757F] rounded-full">
                  <span className="text-[14px] font-light text-[#92989F] leading-none">READ MORE</span>
                  <div className="relative w-[16px] h-[16px]">
                    <Image src="/arrow-6D757F.png" alt="Arrow" fill className="object-contain"/>
                  </div>
                </button>
              </div>
            </div>

            {/* กิจกรรมที่ 4 */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-6xl mx-auto px-4">
              <div className="relative w-full md:w-[640px] h-[220px] md:h-[320px] mt-8 md:mt-15">
                <Image src="/Container4.png" alt="ส่งกิจกรรม" fill className="object-cover rounded-xl"/>
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-4 md:space-y-5 max-w-xl">
                  <div className="bg-[#A1A1A1] flex-col space-y-5 h-7 w-45 rounded-lg text-white text-sm font-medium flex items-center justify-center"><h1>สิ้นสุดรับสมัครแล้ว</h1></div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold"><h1>CE Camp Mahidol</h1></div>
                <div className="flex space-x-10">
                  <div className="flex gap-2 items-center">
                    <Image src="/calendar-6D757F.png" alt="Calendar" width={18} height={18}/>
                    <h1 className="text-sm font-medium text-[#6D757F]">28 MARCH, 2026</h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Image src="/star-6D757F.png" alt="Star" width={18} height={18}/>
                    <p className="text-sm font-medium text-[#6D757F]">4.3 Review</p>
                  </div>
                </div>
                <div className="text-[#A5A5A5] text-sm sm:text-base md:text-lg">
                  <h1>เปิดโลก วิศวะคอมและวิทย์คอม ให้เข้าใจง่ายและสนุกผ่านคลาสออนไลน์ 6 ชั่วโมง ที่จะพานักเรียนเรียนรู้</h1>
                  <h1>ตั้งแต่การเขียนโปรแกรมสร้างระบบปฏิบัติการอย่างง่าย ไปจนถึงการจัดการและการวิเคราะห์ข้อมูล</h1>
                </div>
                <button className="w-[138px] h-[36px] inline-flex items-center justify-center gap-2 border-2 border-[#6D757F] rounded-full">
                  <span className="text-[14px] font-light text-[#92989F] leading-none">READ MORE</span>
                  <div className="relative w-[16px] h-[16px]">
                    <Image src="/arrow-6D757F.png" alt="Arrow" fill className="object-contain"/>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Curved transition shape ก่อน Review section */}
        <div className="relative w-500 h-250 overflow-hidden -mt-90">
          <svg 
            viewBox="0 0 152 100" 
            /* preserveAspectRatio="none" สำคัญมากเพื่อให้ยืดเต็มความกว้าง div */
            preserveAspectRatio="none" 
            className="absolute bottom-0 left-0 w-full h-full block"
          >
            <path 
              fill="#000523" 
              /* พิกัดที่ปรับให้สมดุลตามรูป S-Curve ของคุณ */
              d="M 0 0 C 40 150, 110 -50, 152 100 L 152 100 L 0 100 Z" 
            />
          </svg>
        </div>

          {/* Review */}
          <div className="bg-[#000523] min-h-screen pb-20 flex flex-col items-center justify-center">
          {/* img */}
          <div className="relative">
              <Image src="/Section.png" alt="Section" width={1204} height={557} className="w-full h-[557px] object-contain"/>
          </div>
            {/* box comment */}
            <div>
              <div className="bg-gradient-to-r from-white/0 to-white/15 h-60 w-100 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Image src="/Profile.png" alt="Profile" height={48} width={48} className="rounded-full object-cover"/>
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
          <div className="bg-search min-h-screen flex items-center justify-center bg-[#000523]">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="text-6xl md:text-7xl font-extrabold tracking-tight flex">
                <h1 className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Fastcamp</h1>
                <h1 className="text-white/90">ให้อะไรกับคุณ ?</h1>
              </div>
              <div>
                <h1 className="text-white/50 text-lg">แชร์ประสบการณ์ของคุณหลังเข้าค่าย/ร่วมงานกับ Fastcamp</h1>
              </div>
              <div className="mt-6 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 w-105 max-w-full">
                <input type="text" placeholder="Enter your comment" className="bg-transparent flex-1 outline-none text-white placeholder-white/40"/>
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