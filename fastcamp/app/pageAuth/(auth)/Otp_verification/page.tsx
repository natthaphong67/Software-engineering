"use client";

import Image from "next/image";
import { useRef, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

// ✅ แยก component ที่ใช้ useSearchParams ออกมา
function OtpForm() {
  const length = 6;
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (!email) { alert("ไม่พบ email"); return; }
    if (otpCode.length < 6) { alert("กรอก OTP ให้ครบ"); return; }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
        email,
        otp: otpCode,
      });
      alert("ยืนยันสำเร็จ 🎉");
      window.location.href = "/pageAuth/Login";
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data || "OTP ไม่ถูกต้อง");
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <div className="w-full max-w-[420px] flex flex-col items-start">
      <div>
        <div className="w-[64px] h-[64px] bg-[#e9eef8] rounded-full flex items-center justify-center mb-4">
          <Image src="/email.png" width={28} height={28} alt="email" />
        </div>
        <h2 className="text-[26px] font-semibold text-gray-800 mb-2">OTP Verification</h2>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Check your email to see the verification code
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el: HTMLInputElement | null) => { inputs.current[index] = el; }}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            className="w-[48px] h-[48px] rounded-full border border-indigo-300 text-center text-lg outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-[#4f46e5] to-[#4338ca] hover:opacity-90 transition mb-6"
      >
        Verify
      </button>
    </div>
  );
}

// ✅ Page หลักห่อด้วย Suspense
export default function Otp_verification() {
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#000523] via-[#020833] to-[#000523] text-white px-16 py-12">
        <div className="flex flex-col justify-between w-full">
          <div className="text-xl font-semibold">FastCamp</div>
          <h1 className="text-[72px] font-semibold leading-[88px] text-white/90">
            Start Your <br />Journey <br />
            <span className="text-white/60">with Us</span>
          </h1>
          <div>
            <p className="text-white/50 mb-2">Description</p>
            <p className="text-white/70 text-sm">
              Fastcamp — แพลตฟอร์มรวมค่าย IT สมัครง่าย โปรโมชั่นที่ใช่ให้คุณเห็นมากขึ้น
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 bg-[#f5f7fb] flex items-center justify-center relative">
        <button className="absolute top-6 right-8 text-gray-400 text-2xl">×</button>

        {/* ✅ ห่อด้วย Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <OtpForm />
        </Suspense>
      </div>
    </div>
  );
}