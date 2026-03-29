"use client";

import { useState } from "react";

const PRIVACY_CONTENT = `บริษัท ฟาสต์แคมป์ จำกัด (ซึ่งต่อไปนี้จะเรียกว่า "บริษัท") ในฐานะผู้ให้บริการเว็บไซต์ www.fastcamp.in.th ตระหนัก และ ให้ความสำคัญอย่างยิ่งต่อการคุ้มครองข้อมูลส่วนบุคคล และ การรักษาความปลอดภัยของข้อมูลส่วนบุคคลของผู้ใช้งาน นโยบายความเป็นส่วนตัวฉบับนี้จึงถูกจัดทำขึ้นเพื่อชี้แจง รายละเอียด วัตถุประสงค์ วิธีการจัดเก็บรวบรวม ใช้ และ เปิดเผย ข้อมูลส่วนบุคคล รวมถึงสิทธิต่าง ๆ ของเจ้าของข้อมูลส่วนบุคคล

การเข้าใช้งานเว็บไซต์ การรับบริการ หรือ การส่งข้อมูลกิจกรรมใด ๆ ให้แก่บริษัท ถือเป็นการแสดงเจตนายอมรับข้อกำหนด และ เงื่อนไขการใช้บริการ ตลอดจนนโยบายความเป็นส่วนตัวฉบับนี้โดยสมบูรณ์

นิยามข้อมูลส่วนบุคคล
"ข้อมูลส่วนบุคคล" หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อม แต่ไม่รวมถึงข้อมูลของผู้ถึงแก่กรรมโดยเฉพาะ

ข้อมูลส่วนบุคคลที่บริษัทจัดเก็บรวบรวม
• ข้อมูลระบุตัวตน: ชื่อ และนามสกุล
• ข้อมูลการติดต่อ: ที่อยู่อีเมล และหมายเลขโทรศัพท์
• ข้อมูลอื่น ๆ: ข้อมูลที่เกี่ยวเนื่องกับการใช้บริการ การติดต่อสื่อสาร และข้อมูลเชิงเทคนิคที่รวบรวมผ่านระบบคุกกี้ (Cookies)

แหล่งที่มาของข้อมูลส่วนบุคคล
บริษัทอาจได้รับข้อมูลส่วนบุคคลจาก 2 ช่องทาง ดังนี้:
• จากเจ้าของข้อมูลส่วนบุคคลโดยตรง: ผ่านกระบวนการลงทะเบียนสมัครใช้บริการ การส่งข้อมูลกิจกรรม การยื่นคำร้องขอใช้สิทธิ์ ตลอดจนการสื่อสารผ่านช่องทางต่าง ๆ ของบริษัท
• จากการใช้บริการเว็บไซต์: ผ่านการจัดเก็บข้อมูลการเข้าชมและพฤติกรรมการใช้งานด้วยคุกกี้ (Cookies) ในเบราว์เซอร์ของผู้ใช้งาน

วัตถุประสงค์ในการประมวลผลข้อมูล
• เพื่อการบริหารจัดการและให้บริการในฐานะผู้ใช้งานเว็บไซต์และผู้ส่งข้อมูลกิจกรรม
• เพื่อการสื่อสาร ให้ข้อมูลข่าวสาร และประชาสัมพันธ์เกี่ยวกับบริการของบริษัท
• เพื่อการวิเคราะห์ข้อมูล การทำวิจัยเชิงสถิติ และการพัฒนาปรับปรุงประสิทธิภาพการให้บริการและการส่งเสริมการตลาด

การรักษาความปลอดภัยและระยะเวลาการจัดเก็บข้อมูล
• รูปแบบการจัดเก็บ: จัดเก็บในรูปแบบข้อมูลอิเล็กทรอนิกส์ (Soft Copy) บนระบบ Cloud ที่มีมาตรฐานความปลอดภัยระดับสากล
• ระยะเวลาการจัดเก็บ: สูงสุดไม่เกิน 10 ปี นับแต่วันที่สิ้นสุดความสัมพันธ์
• การดำเนินการหลังสิ้นสุดระยะเวลา: บริษัทจะดำเนินการลบ ทำลาย หรือทำให้ข้อมูลไม่สามารถระบุตัวบุคคลได้ ภายใน 90 วัน

สิทธิของเจ้าของข้อมูลส่วนบุคคล
• สิทธิในการเพิกถอนความยินยอม
• สิทธิในการเข้าถึงข้อมูล
• สิทธิในการแก้ไขข้อมูล
• สิทธิในการลบข้อมูล
• สิทธิในการระงับการใช้ข้อมูล
• สิทธิในการโอนย้ายข้อมูล
• สิทธิในการคัดค้าน

บริษัทจะพิจารณาและแจ้งผลการดำเนินการตามคำร้องขอภายใน 30 วัน โดยไม่มีค่าธรรมเนียม

ข้อมูลการติดต่อ
ผู้ควบคุมข้อมูลส่วนบุคคล: คุณเป๋าตุง ราชฉวาง
สถานที่ติดต่อ: บริษัท ฟาสต์แคมป์ จำกัด เลขที่ 11/1 ถนนวงศ์สว่าง 11 แขวงบางซื่อ เขตบางซื่อ กรุงเทพมหานคร 10800
อีเมล: privacy@fastcamp.in.th`;

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="bg-[#000523] text-white px-10 md:px-20 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-white">FastCamp</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              ส่งค่ายของคุณมาที่เรา<br />แล้วคนจะรู้จักคุณมากขึ้น
            </p>
            <button onClick={() => window.location.href = "/Page/LandingPage"}
              className="w-fit border border-gray-500 text-gray-300 text-sm px-6 py-2.5 rounded-full hover:bg-white hover:text-[#0d1526] transition-all duration-200">
              ส่งกิจกรรมขึ้นเว็บ
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {["กิจกรรมทั้งหมด", "กิจกรรมยอดนิยม", "ลงประกาศกิจกรรม"].map((link) => (
                <li key={link}>
                  <a href="/Page/Home" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5">Contact Info</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-400">Email : FastCamp@gmail.com</li>
              <li className="text-sm text-gray-400">Phone : 092-673-6791</li>
            </ul>
          </div>

          {/* Legals */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5">Legals</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-150 text-left">
                  นโยบายความเป็นส่วนตัว
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 border-t border-gray-700/50" />

        <div className="max-w-7xl mx-auto mt-6 flex justify-end items-center gap-4">
          <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
          <a href="#" aria-label="Discord" className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
          </a>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">นโยบายความเป็นส่วนตัว</h3>
              <button onClick={() => setShowPrivacy(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{PRIVACY_CONTENT}</p>
            </div>
            <div className="px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowPrivacy(false)}
                className="w-full py-2.5 bg-[#000523] text-white rounded-xl text-sm font-medium hover:bg-[#050a3a] transition">
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}