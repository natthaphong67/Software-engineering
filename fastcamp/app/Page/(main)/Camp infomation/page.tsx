import Image from 'next/image'
import Link from 'next/link'

const Infomation = () => {
  return (
    <div className="w-full">
        {/* Hero Section */}
        <section className="relative w-full h-screen overflow-hidden bg-black">
            <Image src="/Ai Innovation Summit 2025.png" alt="Ai Innovation Summit 2025" fill className="object-contain"/>
        </section>

        {/* POPUP */}
        <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-full max-w-4xl shadow-2xl rounded-3xl border">
            <div className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-between">
                <div className="flex justify-between items-center w-full max-w-2xl mx-auto">
                    {/* LEFT */}
                    <div>
                        <h2 className="text-2xl font-bold">AI Innovation Summit 2025</h2>
                        <p className="text-gray-500">เปิดบ้าน / นิทรรศการ / เสวนา</p>
                    </div>
                    {/* RIGHT BUTTON */}
                    <div className='items-center flex flex-col gap-2'>
                        <button className="border border-blue-500 text-black font-black px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
                            ลงทะเบียน
                        </button>

                        <div className='flex gap-2'>
                            <div className='text-xl'>★★★★★</div>
                            <div className='text-gray-500'>5.0</div>
                            <div className='text-gray-400'>(33) reviws</div>
                        </div>
                    </div>
                    
                </div>
                <div className="mt-6 w-full border border-gray-300 rounded-full px-10 py-5 flex items-center justify-between shadow-sm">
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

        {/* Content Section */}
        <section className="min-h-screen w-full bg-white px-6 py-16 flex mt-32">
            <div className="mx-auto w-200 rounded-4xl p-8">
                {/* LEFT */}

                <div className='flex-1'>
                    <h1 className="text-2xl font-bold mb-4">Descriptions</h1>
                    <p className="leading-relaxed text-gray-700">
                        วันที่ 12 ธันวาคม 2568 สถาบัน AI Engineering Institute (AIEI) ร่วมกับมหาวิทยาลัย CMKL เชิญคุณเข้าร่วมงาน AI Innovation 
                        Summit 2025 ณ Club Siam Glowfish กรุงเทพฯ เวทีรวมผู้นำจากภาครัฐ ภาคอุตสาหกรรม นักวิจัย สตาร์ทอัพ และ คนรุ่นใหม่ด้านเทคโนโลยี 
                        เพื่อพูดคุยเกี่ยวกับอนาคตของ AI ในประเทศไทยอย่างจริงจัง การเสวนาและเวทีระดับชาติว่าด้วยนโยบาย AI การยกระดับอุตสาหกรรม การพัฒนาทักษะแรงงาน 
                        และ อนาคตการศึกษาไทยในยุค AI เซสชันเนื้อหาลึกที่ครอบคลุมหัวข้อต่าง ๆ เช่น AI for Health, Trustworthy & Secure AI Systems, AI Cloud 
                        Engineering, Physical AI และ Creative AI & Digital MediaAI Project Showcase รวมผลงาน AI จริงจากนักศึกษา นักวิจัย และภาคอุตสาหกรรม
                        ซึ่งถูกนำไปใช้ในโรงพยาบาล โรงงาน ระบบคลาวด์ ความมั่นคงไซเบอร์ และ สื่อสร้างสรรค์ AI Innovator Award เวทีสำหรับทีมนักเรียนมัธยมที่มีผลงานโดดเด่น 
                        Bangkok Demo Day เปิดพื้นที่ให้นักศึกษา และ ผู้ประกอบการรุ่นใหม่พรีเซนต์ไอเดีย AI ต่อกลุ่มนักลงทุน Tech Meetup & Networking Night 
                        ช่วงค่ำในบรรยากาศสบาย ๆ พร้อมเทคโชว์เคสและโอกาสเครือข่ายกับคนในแวดวงเทคโนโลยีสถานที่จัดงานอยู่ที่ Club Siam Glowfish กรุงเทพฯ (ชั้น 11 สยามปทุมวันเฮ้าส์)
                    </p>
                </div>
                
            </div>
            {/* RIGHT */}
            <div className='w-[535px]'>
                <div className="h-[313px] w-[543px] rounded-3xl overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.331165951856!2d100.51171287537267!3d13.819142195730288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29b877800c9af%3A0xd754c571fc7177b!2sKing%20Mongkut's%20University%20of%20Technology%20North%20Bangkok%20(KMUTNB)!5e0!3m2!1sen!2sth!4v1771517834391!5m2!1sen!2sth"
                        className="w-full h-[400px] border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                <div className='space-y-10'>
                    <h1 className="text-2xl font-bold mt-4">ติดต่อผู้จัดกิจกรรม</h1>
                    <div className='flex space-x-5'>
                       <div className="bg-black w-20 h-20 rounded-full"></div>
                       <div>
                            <p className="font-semibold">AI Engineering Institute</p>
                            <p className="text-gray-500 text-sm">มหาวิทยาลัยซีเอ็มเคแอล</p>
                            <div>
                                <Link href="#" >
                                    <Image src="/facebook.png" alt="Facebook" width={20} height={20} className="inline-block mr-2"/>
                                </Link>

                                <Link href="#" >
                                    <Image src="/internet.png" alt="Internet" width={20} height={20} className="inline-block mr-2"/>
                                </Link>

                                <Link href="#" >
                                    <Image src="/instagram.png" alt="intagram" width={20} height={20} className="inline-block mr-2"/>
                                </Link>

                                <Link href="#" >
                                    <Image src="/tiktok.png" alt="TikTok" width={20} height={20} className="inline-block mr-2"/>
                                </Link>

                                <Link href="#" >
                                    <Image src="/youtube.png" alt="YouTube" width={20} height={20} className="inline-block mr-2"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {}
        <section className="min-h-screen w-full px-20 py-24 flex justify-between bg-gradient-to-r from-[#2B2F47] to-[#000523]">
            {/* LEFT */}
            <div className="w-1/2"><h1 className="text-5xl font-semibold text-white">What Campers Said</h1></div>

            {/* RIGHT */}
            <div className="w-[520px] relative">
                {/* SHARE BUTTON */}
                <div className="absolute -top-2 right-0">
                    <button className="border border-white/30 text-white text-sm px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
                        Share your
                    </button>
                </div>

                {/* REVIEW 1 */}
                <div className="space-y-4">
                    {/* STARS */}
                    <div className="text-2xl text-white">★★★★★</div>
                    {/* TEXT */}
                    <p className="text-gray-300 leading-relaxed">
                        งานนี้รวมทั้งผู้เชี่ยวชาญ นักวิจัย และคนรุ่นใหม่มาแลกเปลี่ยนมุมมองเกี่ยวกับ AI ในหลายด้าน
                        ทั้งการพัฒนาอุตสาหกรรม การศึกษา และการใช้งานจริง พร้อมโชว์ผลงานนวัตกรรมที่สร้างแรงบันดาลใจ
                    </p>
                    {/* PROFILE */}
                    <div className="flex items-center gap-3 pt-2">
                        <Image
                            src="/profile.png" alt="profile" width={40} height={40} className="rounded-full"/>
                        <span className="text-white font-medium">Paotung Ratchawang</span>
                    </div>
                </div>
                {/* --------- */}
                <div className="border-t border-white/20 my-10"></div>



                {/* REVIEW 2 */}
                <div className="space-y-4">
                    <div className="text-2xl text-white">★★★★☆</div>
                        <p className="text-gray-300 leading-relaxed">
                            บรรยากาศเต็มไปด้วยความรู้และเครือข่ายดี ๆ ตั้งแต่เวทีเสวนาเชิงนโยบายจนถึงการแสดงผลงานจากนักศึกษา
                            และสตาร์ทอัพ ทำให้เห็นทิศทาง AI ในไทยที่กำลังเติบโตอย่างรวดเร็ว
                        </p>
                    <div className="flex items-center gap-3 pt-2">
                        <Image
                            src="/profile.png" alt="profile" width={40} height={40} className="rounded-full"/>
                        <span className="text-white font-medium">Eso kurobuta</span>
                    </div>
                </div>
                {/* button next */}
                <div className="flex gap-4 justify-end mt-12">

                    <button className="w-12 h-12 border border-white/30 rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-black transition">‹</button>

                    <button className="w-12 h-12 border border-white/30 rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-black transition">›</button>
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