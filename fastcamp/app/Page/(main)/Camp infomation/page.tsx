import React from 'react'
import Image from 'next/image'

const Infomation = () => {
  return (
    <div className="w-full">
        {/* Hero Section */}
        <section className="relative w-full h-screen overflow-hidden bg-black">
            <Image src="/Ai Innovation Summit 2025.png" alt="Ai Innovation Summit 2025" fill className="object-contain"/>
        </section>


        {/* Content Section */}
        <section className="bg-white px-6 py-16">
            <div className="mx-auto max-w-7xl rounded-4xl border p-8">
            <h1 className="text-2xl font-bold mb-4">Descriptions</h1>
            <p className="leading-relaxed text-gray-700">
                วันที่ 12 ธันวาคม 2568 สถาบัน AI Engineering Institute (AIEI) ร่วมกับมหาวิทยาลัย CMKL
                เชิญคุณเข้าร่วมงาน AI Innovation Summit 2025 ณ Club Siam Glowfish กรุงเทพฯ ...
            </p>
            </div>
        </section>
    </div>

  )
}

export default Infomation