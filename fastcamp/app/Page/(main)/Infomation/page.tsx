import Image from 'next/image'
import Link from 'next/link'

const Infomation = () => {
  return (
    <div className="w-full">
        {/* Hero Section */}
        <section className="relative w-full aspect-[16/9] md:aspect-auto md:h-screen overflow-hidden bg-black">
            <Image src="/Ai Innovation Summit 2025.png" alt="Ai Innovation Summit 2025" fill priority className="object-contain md:object-cover"/>
        </section>

        {/* POPUP */}
        <section className="relative w-full">
            {/* POPUP */}
            <div className="relative md:absolute md:left-1/2 md:-bottom-20 md:-translate-x-1/2 w-full max-w-5xl px-4 md:px-0 z-30">
                <div className=" bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl border border-gray-200 p-4 md:p-6">
                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                        {/* LEFT */}
                        <div>
                            <h2 className="text-lg md:text-2xl font-bold text-gray-900">AI Innovation Summit 2025</h2>
                            <p className="text-gray-500 text-sm">เปิดบ้าน / นิทรรศการ / เสวนา</p>
                        </div>
                        {/* RIGHT */}
                        <div className="flex flex-col md:flex-row gap-3 md:gap-6 w-full md:w-auto">
                            {/* BUTTON */}
                            <button className="w-full md:w-auto border border-blue-500  text-blue-600 font-semibold px-6 py-2 rounded-full  hover:bg-blue-500  hover:text-white transition">ลงทะเบียน</button>
                            {/* RATING */}
                            <div className="flex items-center gap-2">
                                <span className="text-black text-base md:text-lg">★★★★★</span>
                                <span className="text-gray-600 text-sm">5.0</span>
                                <span className="text-gray-400 text-sm">(33) reviews</span>
                            </div>
                        </div>
                    </div>
                    {/* INFO CARD */}
                    <div className="mt-6 border border-gray-300 rounded-2xl md:rounded-full px-4 py-4 md:px-8 md:py-5">
                        {/* MOBILE */}
                        <div className="flex flex-col gap-6 md:hidden">
                            {/* ITEM 1 */}
                            <div className="flex items-center gap-4">
                                <Image src="/location.png" alt="location" width={28} height={28} />
                                <div>
                                    <p className="font-semibold text-sm text-gray-800">สถานที่จัดกิจกรรม</p>
                                    <p className="text-gray-500 text-sm">Club Siam Glowfish</p>
                                </div>
                            </div>
                            {/* DIVIDER */}
                            <div className="h-10 w-px bg-gray-300"></div>
                            {/* ITEM 2 */}
                            <div className="flex items-center gap-4">
                                <Image src="/calendar 2.png" alt="calendar" width={28} height={28} />
                                <div>
                                    <p className="font-semibold text-sm">สิ้นสุดวันรับสมัคร</p>
                                    <p className="text-gray-500 text-sm">11 / ธันวาคม / 2568</p>
                                </div>
                            </div>
                            {/* DIVIDER */}
                            <div className="h-10 w-px bg-gray-300"></div>

                            {/* ITEM 3 */}
                            <div className="flex items-center gap-4">
                                <Image src="/calendar 2.png" alt="calendar" width={28} height={28}/>
                                <div>
                                    <p className="font-semibold text-sm">วันที่จัดกิจกรรม<span className="text-red-500 text-sm">(วันเดียวจบ)</span></p>
                                    <p className="text-gray-500">12 / ธันวาคม / 2568</p>
                                </div>
                            </div>
                            {/* DIVIDER */}
                            <div className="h-10 w-px bg-gray-300"></div>

                            {/* ITEM 4 */}
                            <div className="flex items-center gap-4">
                                <Image src="/user.png" alt="user" width={28} height={28} />
                                <div>
                                    <p className="font-semibold text-sm">จำนวนรับสมัคร</p>
                                    <p className="text-gray-500">ไม่จำกัด</p>
                                </div>
                            </div>
                        </div>
                        {/* DESKTOP */}
                        <div className="hidden md:flex items-center justify-between">
                            {/* ITEM 1 */}
                            <div className="flex items-center gap-4">
                                <Image src="/location.png" alt="location" width={28} height={28} />
                                <div>
                                    <p className="font-semibold text-sm text-gray-800">สถานที่จัดกิจกรรม</p>
                                    <p className="text-gray-500 text-sm">Club Siam Glowfish</p>
                                </div>
                            </div>
                            {/* DIVIDER */}
                            <div className="h-10 w-px bg-gray-300"></div>


                            {/* ITEM 2 */}
                            <div className="flex items-center gap-4">
                                <Image src="/calendar 2.png" alt="calendar" width={28} height={28} />
                                <div>
                                    <p className="font-semibold text-sm">สิ้นสุดวันรับสมัคร</p>
                                    <p className="text-gray-500 text-sm">11 / ธันวาคม / 2568</p>
                                </div>
                            </div>
                            {/* DIVIDER */}
                            <div className="h-10 w-px bg-gray-300"></div>

                            {/* ITEM 3 */}
                            <div className="flex items-center gap-4">
                                <Image src="/calendar 2.png" alt="calendar" width={28} height={28}/>
                                <div>
                                    <p className="font-semibold text-sm">วันที่จัดกิจกรรม<span className="text-red-500 text-sm">(วันเดียวจบ)</span></p>
                                    <p className="text-gray-500">12 / ธันวาคม / 2568</p>
                                </div>
                            </div>
                            {/* DIVIDER */}
                            <div className="h-10 w-px bg-gray-300"></div>

                            {/* ITEM 4 */}
                            <div className="flex items-center gap-4">
                                <Image src="/user.png" alt="user" width={28} height={28} />
                                <div>
                                    <p className="font-semibold text-sm">จำนวนรับสมัคร</p>
                                    <p className="text-gray-500">ไม่จำกัด</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* Content Section */}
        <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10 md:py-16 mt-16 md:mt-32">
            <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-10 lg:gap-16">
                {/* LEFT (อยู่บนใน mobile) */}
                <div className="flex-1">
                    <h1 className="text-xl md:text-2xl font-bold mb-4">Descriptions</h1>
                    <p className="leading-relaxed text-gray-700 text-sm md:text-base">
                        วันที่ 12 ธันวาคม 2568 สถาบัน AI Engineering Institute (AIEI) ร่วมกับมหาวิทยาลัย CMKL เชิญคุณเข้าร่วมงาน AI Innovation Summit 2025 ณ Club Siam Glowfish กรุงเทพฯ 
                        เวทีรวมผู้นำจากภาครัฐ ภาคอุตสาหกรรม นักวิจัย สตาร์ทอัพ และ คนรุ่นใหม่ด้านเทคโนโลยี เพื่อพูดคุยเกี่ยวกับอนาคตของ AI ในประเทศไทยอย่างจริงจัง การเสวนาและเวทีระดับชาติว่าด้วยนโยบาย AI 
                        การยกระดับอุตสาหกรรม การพัฒนาทักษะแรงงาน และ อนาคตการศึกษาไทยในยุค AI เซสชันเนื้อหาลึกที่ครอบคลุมหัวข้อต่าง ๆ เช่น AI for Health, Trustworthy & Secure AI Systems, AI Cloud 
                        Engineering, Physical AI และ Creative AI & Digital MediaAI Project Showcase รวมผลงาน AI จริงจากนักศึกษา นักวิจัย และภาคอุตสาหกรรม ซึ่งถูกนำไปใช้ในโรงพยาบาล โรงงาน ระบบคลาวด์ 
                        ความมั่นคงไซเบอร์ และ สื่อสร้างสรรค์ AI Innovator Award เวทีสำหรับทีมนักเรียนมัธยมที่มีผลงานโดดเด่น Bangkok Demo Day เปิดพื้นที่ให้นักศึกษา และ ผู้ประกอบการรุ่นใหม่พรีเซนต์ไอเดีย AI ต่อกลุ่มนักลงทุน Tech 
                        Meetup & Networking Night ช่วงค่ำในบรรยากาศสบาย ๆ พร้อมเทคโชว์เคสและโอกาสเครือข่ายกับคนในแวดวงเทคโนโลยีสถานที่จัดงานอยู่ที่  Club Siam Glowfish กรุงเทพฯ (ชั้น 11 สยามปทุมวันเฮ้าส์)
                    </p>
                </div>
                {/* RIGHT (อยู่ล่างใน mobile) */}
                <div className="w-full lg:w-[535px] shrink-0">
                    {/* MAP */}
                    <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] rounded-3xl overflow-hidden shadow-lg">
                        <iframe src="https://www.google.com/maps/embed?pb=..." className="w-full h-full border-0" loading="lazy"/>
                    </div>
                    {/* CONTACT */}
                    <div className="space-y-6 mt-6">
                        <h1 className="text-xl md:text-2xl font-bold">ติดต่อผู้จัดกิจกรรม</h1>
                            <div className="flex gap-4">
                                <div className="bg-black w-16 h-16 md:w-20 md:h-20 rounded-full"></div>
                                <div>
                                    <p className="font-semibold">AI Engineering Institute</p>
                                    <p className="text-gray-500 text-sm">มหาวิทยาลัยซีเอ็มเคแอล</p>
                                    <div className="flex gap-3 mt-2">
                                        <Image src="/facebook.png" alt="" width={20} height={20} />
                                        <Image src="/internet.png" alt="" width={20} height={20} />
                                        <Image src="/instagram.png" alt="" width={20} height={20} />
                                        <Image src="/tiktok.png" alt="" width={20} height={20} />
                                        <Image src="/youtube.png" alt="" width={20} height={20} />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </section>
        {/* review */}
        <section className="w-full h-auto md:h-[568px] px-6 md:px-20 py-10 md:py-24 flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between gap-10 md:gap-20 bg-gradient-to-r from-[#2B2F47]  to-[#000523]">
            {/* LEFT */}
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">What Campers Said</h1>
            </div>
            {/* RIGHT */}
            <div className="w-full max-w-[520px] relative">
                {/* SHARE BUTTON */}
                <div className="absolute -top-2 right-0">
                    <button className="border border-white/30 text-white text-sm px-6 py-2 rounded-full hover:bg-white hover:text-black transition">Share your</button>
                </div>
                {/* REVIEW */}
                <div className="space-y-4">
                    <div className="text-xl md:text-2xl text-white">★★★★★</div>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">งานนี้รวมทั้งผู้เชี่ยวชาญ นักวิจัย และคนรุ่นใหม่มาแลกเปลี่ยนมุมมองเกี่ยวกับ AI ในหลายด้าน ทั้งการพัฒนาอุตสาหกรรม การศึกษา และการใช้งานจริง พร้อมโชว์ผลงานนวัตกรรมที่สร้างแรงบันดาลใจ</p>
                    <div className="flex items-center gap-3 pt-2">
                        <Image src="/profile.png" alt="profile" width={40} height={40} className="rounded-full"/><span className="text-white font-medium text-sm md:text-base">Paotung Ratchawang</span>
                    </div>
                </div>

                <div className="border-t border-white/20 my-10"></div>

                <div className="space-y-4">
                    <div className="text-xl md:text-2xl text-white">★★★★★</div>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">งานนี้รวมทั้งผู้เชี่ยวชาญ นักวิจัย และคนรุ่นใหม่มาแลกเปลี่ยนมุมมองเกี่ยวกับ AI ในหลายด้าน ทั้งการพัฒนาอุตสาหกรรม การศึกษา และการใช้งานจริง พร้อมโชว์ผลงานนวัตกรรมที่สร้างแรงบันดาลใจ</p>
                    <div className="flex items-center gap-3 pt-2">
                        <Image src="/profile.png" alt="profile" width={40} height={40} className="rounded-full"/><span className="text-white font-medium text-sm md:text-base">Paotung Ratchawang</span>
                    </div>
                </div>
                {/* BUTTON */}
                <div className="flex gap-4 justify-end mt-12">
                    <button className="w-10 h-10 md:w-12 md:h-12 border border-white/30 rounded-lg flex items-center justify-center text-white">‹</button>
                    <button className="w-10 h-10 md:w-12 md:h-12 border border-white/30 rounded-lg flex items-center justify-center text-white">›</button>
                </div>
            </div>
        </section>
        <section className="w-full bg-gray-100 px-16 py-16">
            {/* TITLE */}
            <h2 className="text-3xl font-bold text-[#1B2A4E] mb-10">กิจกรรมที่คล้ายกัน</h2>
            {/* CARD GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* CARD 1 */}
                <div className="group cursor-pointer">
                    <div className="rounded-2xl overflow-hidden shadow-md">
                        <Image src="/ITLadkrabangOpenHouse2025.png" alt="event" width={400} height={250} className="w-full h-[200px] object-cover group-hover:scale-105 transition"/>
                    </div>
                    <p className="mt-4 text-lg font-medium text-[#1B2A4E]">IT Ladkrabang Open House 2025</p>
                </div>
                {/* CARD 2 */}
                <div className="group cursor-pointer">
                    <div className="rounded-2xl overflow-hidden shadow-md">
                        <Image src="/ComCamp35ค่ายวิศวะคอมพิวเตอร์มจธ.png" alt="event" width={400} height={250} className="w-full h-[200px] object-cover group-hover:scale-105 transition"/>
                    </div>
                    <p className="mt-4 text-lg font-medium text-[#1B2A4E]">ComCamp 35 ค่ายวิศวะคอมพิวเตอร์ มจธ.</p>
                </div>
                {/* CARD 3 */}
                <div className="group cursor-pointer">
                    <div className="rounded-2xl overflow-hidden shadow-md">
                        <Image src="/WorldofDataCamp2025.png" alt="event" width={400} height={250} className="w-full h-[200px] object-cover group-hover:scale-105 transition"/>
                    </div>
                    <p className="mt-4 text-lg font-medium text-[#1B2A4E]">World of Data Camp 2025</p>
                </div>



                {/* CARD 4 */}
                <div className="group cursor-pointer">
                    <div className="rounded-2xl overflow-hidden shadow-md">
                        <Image src="/CE.png" alt="event" width={400} height={250} className="w-full h-[200px] object-cover group-hover:scale-105 transition" />
                    </div>
                    <p className="mt-4 text-lg font-medium text-[#1B2A4E]">CE Camp Mahidol</p>
                </div>
            </div>
        </section>
    </div>

  )
}

export default Infomation