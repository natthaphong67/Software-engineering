"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import MyDatePicker from "./DataTime";

type CheckboxProps = {
  label: string;
};

function Checkbox({ label }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input type="checkbox" className="w-[18px] h-[18px] accent-[#1B2144]" />
      <span className="text-gray-500 text-sm">{label}</span>
    </label>
  );
}

export default function Box_file() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#000523] via-[#1B2144] to-[#000523] min-h-[40vh] w-full flex flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <div className="bg-[#CACACA]/30 border border-gray-600 rounded-full px-4 py-1 mb-4">
          <p className="text-white text-sm sm:text-base">List Your Camp</p>
        </div>
        {/* Title */}
        <h1 className="font-bold bg-gradient-to-r from-[#F3F4F6] to-[#9CA3AF] bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          Camp Submission
        </h1>
        {/* Subtitle */}
        <p className="text-white font-light mt-4 max-w-xl text-sm sm:text-base md:text-lg">
          กรอกข้อมูลรายละเอียดด้านล่าง เพื่อนำกิจกรรมของคุณขึ้นสู่แพลตฟอร์ม Fastcamp
        </p>
      </section>

      {/* Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-[#1B2044] font-bold text-3xl md:text-4xl">ส่งข้อมูลกิจกรรมทั่วไป</h1>
          <p className="text-gray-500 mt-3 max-w-3xl">
            สำหรับส่งข้อมูลกิจกรรมทั่วไป เช่น ค่ายแนะแนว ค่ายอาสา ค่ายพัฒนาทักษะ งานเปิดบ้าน
            นิทรรศการการศึกษา รวมถึงกิจกรรมออนไลน์รูปแบบ Live สด หรือ Zoom
            เพื่อนำไปเผยแพร่และประชาสัมพันธ์ผ่านช่องทางของ
            <span className="text-[#1B2044] font-semibold ml-1">Fastcamp</span>
          </p>

          {/* ✅ Flex wrapper เดียวครอบทุก section */}
          <div className="flex gap-12 mt-10">

            {/* SIDEBAR - sticky ครอบคลุมทุก section */}
            <div className="hidden lg:block w-[320px] flex-shrink-0">
              <div className="sticky top-[120px] space-y-4">
                <SidebarItem active icon="/Icon finger.png" text="Organizer Info" />
                <SidebarItem icon="/Icon social.png" text="Social Media Content" />
                <SidebarItem icon="/Icon calender.png" text="Activity Overview" />
                <SidebarItem icon="/Icon light.png" text="Full Activity Details" />
              </div>
            </div>

            {/* เนื้อหาทุก section */}
            <div className="flex-1">

              {/* Section 1 - Organizer Info */}
              <div className="w-full max-w-[820px] mb-16">
                <h2 className="text-xl md:text-2xl font-bold text-[#1B2044]">
                  ข้อมูลผู้ประสานงานกิจกรรม
                  <span className="text-[#1B2044] font-bold ml-2">(Organizer Info)</span>
                </h2>
                <p className="text-gray-500 mt-2 mb-6">
                  กรุณากรอกข้อมูลของผู้ประสานงานกิจกรรม
                  เพื่อใช้ในการติดต่อประสานงานและยืนยันข้อมูลที่เกี่ยวข้องกับกิจกรรม
                </p>
                {/* FORM BOX */}
                <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4 sm:p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* FIRST NAME */}
                    <div className="w-full max-w-[308px]">
                      <label className="text-sm font-medium text-[#1B2044]">First Name (ชื่อ)</label>
                      <input
                        className="w-full mt-2 px-3 border border-gray-300 rounded-md bg-white placeholder:text-xs placeholder:text-gray-400"
                        placeholder="กรอกชื่อ"
                      />
                    </div>
                    {/* LAST NAME */}
                    <div>
                      <label className="text-sm font-medium text-[#1B2044]">Last Name (นามสกุล)</label>
                      <input
                        className="w-full mt-2 px-3 border border-gray-300 rounded-md bg-white placeholder:text-xs placeholder:text-gray-400"
                        placeholder="กรอกนามสกุล"
                      />
                    </div>
                    {/* EMAIL */}
                    <div>
                      <label className="text-sm font-medium text-[#1B2044]">Email (อีเมล)</label>
                      <input
                        className="w-full mt-2 px-3 border border-gray-300 rounded-md bg-white placeholder:text-xs placeholder:text-gray-400"
                        placeholder="กรอกอีเมล"
                      />
                    </div>
                    {/* PHONE */}
                    <div>
                      <label className="text-sm font-medium text-[#1B2044]">Phone (เบอร์โทรศัพท์)</label>
                      <input
                        className="w-full mt-2 px-3 border border-gray-300 rounded-md bg-white placeholder:text-xs placeholder:text-gray-400"
                        placeholder="กรอกเบอร์โทรศัพท์"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 - Social Media Content */}
              <div className="w-full max-w-[820px] mb-16">
                <h2 className="text-2xl font-bold text-[#1B2144]">
                  ข้อความพาดหัวและรูปภาพสำหรับประชาสัมพันธ์
                  <span className="text-[#1B2144] font-normal ml-2">(Social Media Content)</span>
                </h2>
                <p className="text-gray-500 mt-2 mb-6 text-sm">
                  ส่วนนี้ใช้สำหรับกรอก ข้อความพาดหัว และแนบ รูปภาพประกอบกิจกรรม
                  ที่ต้องการนำไปประชาสัมพันธ์ผ่านช่องทางต่าง ๆ เช่น โซเชียลมีเดีย เว็บไซต์ หรือสื่อออนไลน์อื่น ๆ
                </p>
                {/* BOX */}
                <div className="w-full bg-[#F3F4F6] border border-gray-300 p-8 rounded-2xl">
                  {/* ROW 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[#1B2144] font-semibold mb-2 text-sm">
                        Activity Name<span className="font-normal ml-1">(ชื่อกิจกรรม)</span>
                      </p>
                      <input
                        placeholder="กรอกชื่อกิจกรรม"
                        className="w-full h-[36px] px-3 border border-gray-300 bg-white rounded-lg text-sm placeholder:text-xs placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <p className="text-[#1B2144] font-semibold mb-2 text-sm">
                        Tagline<span className="font-normal ml-1">(คำโปรยแนะนำกิจกรรม)</span>
                      </p>
                      <input
                        placeholder="ข้อความสั้น ๆ ที่ใช้แนะนำกิจกรรมให้เข้าใจง่าย และ ดึงดูดความสนใจ"
                        className="w-full h-[36px] px-3 border border-gray-300 bg-white rounded-lg text-sm placeholder:text-xs placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  {/* ROW 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div>
                      <p className="text-[#1B2144] font-semibold mb-4 text-sm">
                        Activity Type<span className="font-normal ml-1">(ประเภทของกิจกรรม)</span>
                      </p>
                      <div className="grid grid-cols-2 gap-y-3">
                        <Checkbox label="แนะแนวคณะ/อาชีพ" />
                        <Checkbox label="พัฒนาทักษะ/เวิร์กชอป" />
                        <Checkbox label="นิทรรศการ/เปิดบ้าน" />
                        <Checkbox label="เสวนา/สัมมนา/ทอล์คโชว์" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[#1B2144] font-semibold mb-2 text-sm">
                        Competition Format<span className="font-normal ml-1">(รูปแบบกิจกรรมการแข่งขัน)</span>
                      </p>
                      <select className="w-full h-[36px] px-3 border border-gray-300 bg-white rounded-lg text-sm text-gray-600">
                        <option>รูปแบบกิจกรรมการแข่งขัน</option>
                        <option>การแข่งขันที่จัดขึ้น ณ สถานที่จริง</option>
                        <option>การแข่งขันที่มีการนำเสนอผลงานผ่านสื่ออิเล็กทรอนิกส์</option>
                        <option>การแข่งขันที่ส่งผลงานเพื่อตรวจสอบและรอการประกาศผล</option>
                      </select>
                    </div>
                  </div>
                  {/* Upload */}
                  <div className="mt-10">
                    <p className="text-[#1B2144] font-semibold mb-3 text-sm">
                      Headline Image<span className="font-normal ml-1">(ภาพสำหรับประชาสัมพันธ์)</span>
                    </p>
                    <div className="bg-white border border-gray-300 rounded-xl p-6">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl h-[180px] flex flex-col items-center justify-center text-gray-400">
                        <Image src="/upload.png" width={50} height={50} alt="upload" />
                        <p className="text-sm mt-3 font-medium">Drag & drop files</p>
                        <p className="text-xs mt-1">Supported formats: JPEG, PNG, JPG</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 - Activity Overview */}
              <div className="w-full max-w-[820px] mb-16">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1B2044]">
                  รายละเอียดกิจกรรมทั้งหมด
                  <span className="text-[#1B2044] font-medium ml-2">(Full Activity Details)</span>
                </h2>
                <p className="text-gray-400 mt-2 mb-6">
                  ส่วนนี้ใช้สำหรับกรอก ข้อความพาดหัว และแนบ รูปภาพประกอบกิจกรรม
                  ที่ต้องการนำไปประชาสัมพันธ์ผ่านช่องทางต่าง ๆ เช่น โซเชียลมีเดีย เว็บไซต์ หรือสื่อออนไลน์อื่น ๆ
                </p>
                {/* BOX */}
                <div className="bg-[#F4F4F4] border border-gray-300 p-4 sm:p-6 md:p-8 rounded-2xl space-y-8">
                  {/* EVENT DATE */}
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-3 text-sm">Event Date(วันที่จัดกิจกรรม)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <MyDatePicker />
                    </div>
                  </div>
                  {/* EVENT FORMAT */}
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-4 text-sm">Event Format (รูปแบบกิจกรรม)</p>
                    <div className="space-y-3">
                      <Checkbox label="กิจกรรมในสถานที่จริง (วันเดียว)" />
                      <Checkbox label="กิจกรรมในสถานที่จริง (ไม่ค้างคืน)" />
                      <Checkbox label="กิจกรรมในสถานที่จริง (ค้างคืน)" />
                      <Checkbox label="กิจกรรมออนไลน์ (Live / Zoom)" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="w-full max-w-[269px]">
                      <p className="text-[#1B2044] font-semibold mb-2 text-sm">ข้อมูลเพิ่มเติมเกี่ยวกับวันจัดกิจกรรม</p>
                      <input
                        placeholder="ระบุข้อมูลเพิ่มเติมเกี่ยวกับช่วงเวลาการจัดกิจกรรม (ถ้ามี)"
                        className="placeholder:text-xs placeholder:text-gray-400 w-full h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-[#1B2144]"
                      />
                    </div>
                    <div className="w-full max-w-[269px]">
                      <p className="text-[#1B2044] font-semibold mb-2 text-sm">จำนวนที่รับสมัคร</p>
                      <input
                        placeholder="เช่น 50 คน, 120 คน,ไม่จำกัด"
                        className="placeholder:text-xs placeholder:text-gray-400 w-full h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-[#1B2144]"
                      />
                    </div>
                  </div>
                  {/* REGISTRATION TYPE */}
                  <div>
                    <p className="text-[#1B2144] font-semibold text-sm mb-3">
                      Registration Type<span className="font-normal ml-1">(รูปแบบการรับสมัคร)</span>
                    </p>
                    <div className="space-y-3">
                      <Checkbox label="ประเภทบุคคลเดี่ยว" />
                      <Checkbox label="ประเภททีม" />
                      <input
                        placeholder="ประเภททีม กรุณาระบุจำนวนสมาชิกในแต่ละทีม"
                        className="w-[269px] h-[29px] px-3 border border-gray-300 bg-white rounded-lg text-sm placeholder:text-xs placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#1B2144]"
                      />
                    </div>
                  </div>
                  {/* ของรางวัล */}
                  <div>
                    <p className="text-[#1B2144] font-semibold text-sm">ของรางวัล</p>
                    <p className="text-gray-400 text-xs mt-1 mb-3">
                      กรุณาระบุรายละเอียดของรางวัลที่จะมอบให้แก่ผู้ชนะหรือผู้เข้าร่วมกิจกรรม
                      เช่น เงินรางวัล เกียรติบัตร ของที่ระลึก หรือสิทธิพิเศษต่าง ๆ
                    </p>
                    <input
                      placeholder="เช่น เงินรางวัล 50,000 บาท"
                      className="w-[269px] h-[29px] px-3 border border-gray-300 bg-white rounded-lg text-sm placeholder:text-xs placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#1B2144]"
                    />
                  </div>
                  {/* ค่าใช้จ่ายในการเข้าร่วม */}
                  <div className="w-max">
                    <p className="text-[#1B2044] font-semibold mb-2 text-sm leading-snug">
                      ค่าใช้จ่ายในการเข้าร่วม
                      <span className="block sm:inline text-xs text-gray-500 sm:ml-1">
                        (กรอกเฉพาะราคาปกติสำหรับผู้สมัครทั่วไป 1 คน)
                      </span>
                    </p>
                    <input
                      placeholder="หากกิจกรรมฟรี ไม่ต้องกรอกราคา และเลือก ฟรี ด้านล่าง"
                      className="w-full h-[36px] sm:h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm placeholder:text-xs placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#1B2144]"
                    />
                  </div>
                  <div>
                    <div className="grid sm:grid-cols-1 gap-3">
                      <Checkbox label="ฟรี (Free)" />
                      <Checkbox label="ชำระเงินตอนสมัคร (Pay at Application)" />
                      <Checkbox label="ชำระเงินหลังประกาศรายชื่อ (Pay after Selection)" />
                    </div>
                  </div>
                  {/* ELIGIBILITY */}
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-4 text-sm">
                      Eligibility <span className="text-[#1B2044] font-semibold">(คุณสมบัติผู้สมัคร)</span>
                    </p>
                    <div className="grid sm:grid-cols-1 gap-3">
                      <p className="text-[#606060] font-light text-sm">Participant Level - ระดับผู้เข้าร่วม</p>
                      <Checkbox label="นักเรียนมัธยมปลาย (High School)" />
                      <Checkbox label="นักเรียนมัธยมต้น (Middle School)" />
                      <Checkbox label="นักเรียนประถม (Primary School)" />
                      <Checkbox label="นักศึกษา (College)" />
                      <Checkbox label="ผู้เรียนสายอาชีวะ(College / Vocational))" />
                      <Checkbox label="บุคคลทั่วไป (General)" />
                    </div>
                  </div>
                  {/* Age */}
                  <div>
                    <div className="grid sm:grid-cols-1 gap-3">
                      <p className="text-[#606060] font-light text-sm">Age - อายุ</p>
                      <Checkbox label="ต่ำกว่า 15 ปี" />
                      <Checkbox label="15–18 ปี" />
                      <Checkbox label="19–22 ปี" />
                      <Checkbox label="23 ปีขึ้นไป" />
                    </div>
                  </div>
                  {/* Academic Track */}
                  <div>
                    <div className="grid sm:grid-cols-1 gap-3">
                      <p className="text-[#606060] font-light text-sm">Academic Track - สายการเรียน</p>
                      <Checkbox label="สายวิทย์-คณิต (Science-Math)" />
                      <Checkbox label="สายศิลป์-ภาษา (Arts-Language)" />
                      <Checkbox label="ทุกสายการเรียน (Any Track)" />
                      <div className="flex items-center gap-4">
                        <Checkbox label="เงื่อนไขอื่น ๆ" />
                        <div className="w-full max-w-[138px]">
                          <input
                            placeholder="โปรดระบุ"
                            className="placeholder:text-xs placeholder:text-gray-400 w-full h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-[#1B2144]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Additional Requirements */}
                  <div>
                    <div className="grid sm:grid-cols-1 gap-3">
                      <p className="text-[#606060] font-light text-sm">Additional Requirements - เงื่อนไขเพิ่มเติม</p>
                      <div className="flex items-center gap-4">
                        <Checkbox label="เปิดรับเฉพาะภูมิภาค/จังหวัด (Specify region)" />
                        <div className="w-full max-w-[138px]">
                          <input
                            placeholder="โปรดระบุภูมิภาค หรือ จังหวัด"
                            className="placeholder:text-xs placeholder:text-gray-400 w-full h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-[#1B2144]"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Checkbox label="เกรดเฉลี่ยขั้นต่ำ (Specify GPA)" />
                        <div className="w-full max-w-[138px]">
                          <input
                            placeholder="โปรดระบุเกรดเฉลี่ยขั้นต่ำ"
                            className="placeholder:text-xs placeholder:text-gray-400 w-full h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-[#1B2144]"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Checkbox label="เงื่อนไขอื่น ๆ" />
                        <div className="w-full max-w-[138px]">
                          <input
                            placeholder="โปรดระบุ"
                            className="placeholder:text-xs placeholder:text-gray-400 w-full h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-[#1B2144]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* LOCATION */}
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-4 text-sm">Event Location (สถานที่จัดกิจกรรม)</p>
                    <div className="space-y-3">
                      <Checkbox label="กิจกรรมนอกสถานที่ (On-site Event)" />
                      <Checkbox label="กิจกรรมออนไลน์ (Online Event)" />
                    </div>
                    <div className="w-full max-w-[373px]">
                      <input
                        placeholder="กรอกสถานที่"
                        className="w-full h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm mt-3 outline-none focus:ring-1 focus:ring-[#1B2144]"
                      />
                    </div>
                  </div>
                  {/* ORGANIZER */}
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-2 text-sm">Organizer Information (ข้อมูลผู้จัดกิจกรรม)</p>
                    <div className="w-full max-w-[373px]">
                      <input
                        placeholder="ชื่อคณะ / สถาบัน / บริษัท / กลุ่ม"
                        className="w-full h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm mt-3 outline-none focus:ring-1 focus:ring-[#1B2144]"
                      />
                    </div>
                  </div>
                  {/* SOCIAL */}
                  <div>
                    <p className="text-[#1B2044] font-semibold mb-4 text-sm">
                      Social Media (ข้อมูลการติดต่อหรือโซเชียลมีเดีย)
                    </p>
                    <div className="flex flex-col space-y-3">
                      {[
                        { src: "/facebook.png", alt: "facebook" },
                        { src: "/x.png", alt: "x" },
                        { src: "/instagram.png", alt: "instagram" },
                        { src: "/google.png", alt: "google" },
                        { src: "/youtube.png", alt: "youtube" },
                        { src: "/discord.png", alt: "discord" },
                        { src: "/tiktok.png", alt: "tiktok" },
                      ].map((social) => (
                        <div key={social.alt} className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <Image src={social.src} width={31} height={31} alt={social.alt} className="w-[31px] h-[31px]" />
                          <div className="w-full max-w-[373px]">
                            <input
                              placeholder="สำหรับติดต่อสอบถาม (หากไม่มี สามารถเว้นว่างได้)"
                              className="w-full h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-[#1B2144]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Application Method */}
                  <div className="w-full max-w-[364px]">
                    <p className="text-[#1B2044] font-semibold mb-2 text-sm">Application Method (ลิงก์สมัคร)</p>
                    <input
                      placeholder="หากสมัครผ่านโซเชียลมีเดีย กรุณาใส่ลิงก์ช่องทางนั้น"
                      className="w-full h-[30px] px-3 border border-gray-300 bg-white rounded-md text-sm placeholder:text-xs placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#1B2144]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4 - Full Activity Details */}
              <div className="w-full max-w-[820px] mb-16">
                <h2 className="text-[28px] font-bold text-[#1B2144]">
                  ข้อมูลกิจกรรมโดยละเอียด
                  <span className="font-medium ml-2">(Full Activity Details)</span>
                </h2>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  กรอกข้อมูล กิจกรรมโดยละเอียด เพื่อให้ผู้สมัครเข้าใจภาพรวมทั้งหมดของกิจกรรม
                  ควรระบุเนื้อหากิจกรรม วัตถุประสงค์ เป้าหมาย กำหนดการ สถานที่จัด ค่าใช้จ่าย
                  ขั้นตอนการสมัคร และสิ่งที่ผู้เข้าร่วมจะได้รับ เช่น เกียรติบัตร เอกสารประกอบ
                  หรือของที่ระลึก เพื่อช่วยให้ผู้สมัครสามารถตัดสินใจเข้าร่วมกิจกรรมได้อย่างมั่นใจ
                </p>
                <div className="bg-[#F4F4F4] border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm mt-10">
                  <div>
                    <p className="text-[#1B2144] font-semibold text-sm mb-3">
                      Activity Description<span className="font-normal ml-1">(คำอธิบายกิจกรรม)</span>
                    </p>
                    <textarea
                      placeholder="กรอกรายละเอียดกิจกรรมอย่างละเอียด"
                      className="w-full h-[140px] px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm placeholder:text-xs placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#1B2144]"
                    />
                  </div>
                  {/* UPLOAD */}
                  <div className="mt-10">
                    <p className="text-[#1B2144] font-semibold text-sm">
                      Upload Camp Poster<span className="font-normal ml-1">(อัปโหลดภาพโปสเตอร์เพิ่มเติม)</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      หากคุณมีภาพโปสเตอร์กิจกรรมขนาด A2 หรือภาพสี่เหลี่ยมจัตุรัส สามารถอัปโหลดได้ที่นี่
                    </p>
                    <div className="mt-4 border border-gray-300 rounded-xl p-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl h-[150px] flex flex-col items-center justify-center text-gray-400">
                        <Image src="/upload.png" width={40} height={40} alt="upload" className="opacity-60" />
                        <p className="text-sm mt-2">Drag & drop files</p>
                        <p className="text-xs mt-1">Supported formats: JPEG, PNG, JPG</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SidebarItem({ icon, text, active }: any) {
  return (
    <div
      className={`w-[340px] h-[51px] flex items-center gap-3 px-6 rounded-2xl ${
        active ? "bg-[#1B2144] text-white" : "border"
      }`}
    >
      <Image src={icon} width={22} height={22} alt="" />
      {text}
    </div>
  );
}