"use client"
import { useState, useRef } from "react"
import Image from "next/image"
import axios from "axios"
import { useRouter } from 'next/navigation'

const PRIVACY_POLICY = `บริษัท ฟาสต์แคมป์ จำกัด (ซึ่งต่อไปนี้จะเรียกว่า "บริษัท") ในฐานะผู้ให้บริการเว็บไซต์ www.fastcamp.in.th ตระหนัก และ ให้ความสำคัญอย่างยิ่งต่อการคุ้มครองข้อมูลส่วนบุคคล และ การรักษาความปลอดภัยของข้อมูลส่วนบุคคลของผู้ใช้งาน นโยบายความเป็นส่วนตัวฉบับนี้จึงถูกจัดทำขึ้นเพื่อชี้แจง รายละเอียด วัตถุประสงค์ วิธีการจัดเก็บรวบรวม ใช้ และ เปิดเผย ข้อมูลส่วนบุคคล รวมถึงสิทธิต่าง ๆ ของเจ้าของข้อมูลส่วนบุคคล

การเข้าใช้งานเว็บไซต์ การรับบริการ หรือ การส่งข้อมูลกิจกรรมใด ๆ ให้แก่บริษัท ถือเป็นการแสดงเจตนายอมรับข้อกำหนด และ เงื่อนไขการใช้บริการ ตลอดจนนโยบายความเป็นส่วนตัวฉบับนี้โดยสมบูรณ์

นิยามข้อมูลส่วนบุคคล
"ข้อมูลส่วนบุคคล" หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อม แต่ไม่รวมถึงข้อมูลของผู้ถึงแก่กรรมโดยเฉพาะ

ข้อมูลส่วนบุคคลที่บริษัทจัดเก็บรวบรวม
บริษัทจะดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลเท่าที่จำเป็นภายใต้วัตถุประสงค์อันชอบด้วยกฎหมาย ดังต่อไปนี้:
• ข้อมูลระบุตัวตน: ชื่อ และนามสกุล
• ข้อมูลการติดต่อ: ที่อยู่อีเมล และหมายเลขโทรศัพท์
• ข้อมูลอื่น ๆ: ข้อมูลที่เกี่ยวเนื่องกับการใช้บริการ การติดต่อสื่อสาร และข้อมูลเชิงเทคนิคที่รวบรวมผ่านระบบคุกกี้ (Cookies)

วัตถุประสงค์ในการประมวลผลข้อมูล
• เพื่อการบริหารจัดการและให้บริการในฐานะผู้ใช้งานเว็บไซต์และผู้ส่งข้อมูลกิจกรรม
• เพื่อการสื่อสาร ให้ข้อมูลข่าวสาร และประชาสัมพันธ์เกี่ยวกับบริการของบริษัท
• เพื่อการวิเคราะห์ข้อมูล การทำวิจัยเชิงสถิติ และการพัฒนาปรับปรุงประสิทธิภาพการให้บริการ

การรักษาความปลอดภัยและระยะเวลาการจัดเก็บข้อมูล
• จัดเก็บในรูปแบบข้อมูลอิเล็กทรอนิกส์บนระบบ Cloud ที่มีมาตรฐานความปลอดภัยระดับสากล
• ระยะเวลาการจัดเก็บ: ไม่เกิน 10 ปี นับแต่วันที่สิ้นสุดความสัมพันธ์
• เมื่อพ้นกำหนด บริษัทจะลบหรือทำลายข้อมูลภายใน 90 วัน

สิทธิของเจ้าของข้อมูลส่วนบุคคล
ท่านมีสิทธิ: เพิกถอนความยินยอม / เข้าถึงข้อมูล / แก้ไขข้อมูล / ลบข้อมูล / ระงับการใช้ข้อมูล / โอนย้ายข้อมูล / คัดค้านการประมวลผล
บริษัทจะแจ้งผลภายใน 30 วัน โดยไม่มีค่าธรรมเนียม

ข้อมูลการติดต่อ
ผู้ควบคุมข้อมูลส่วนบุคคล: คุณเป๋าตุง ราชฉวาง
บริษัท ฟาสต์แคมป์ จำกัด เลขที่ 11/1 ถนนวงศ์สว่าง 11 แขวงบางซื่อ เขตบางซื่อ กรุงเทพมหานคร 10800
อีเมล: privacy@fastcamp.in.th`

// ─── Privacy Policy Modal ─────────────────────────────────────────────────────
const PrivacyModal = ({ onClose, onAccept }: { onClose: () => void; onAccept: () => void }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">นโยบายความเป็นส่วนตัว</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
      </div>
      <div className="overflow-y-auto flex-1 px-6 py-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
        {PRIVACY_POLICY}
      </div>
      <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
        <button onClick={onClose}
          className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
          ปิด
        </button>
        <button onClick={onAccept}
          className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition">
          ยอมรับ
        </button>
      </div>
    </div>
  </div>
)

// ─── Left Panel ───────────────────────────────────────────────────────────────
const LeftPanel = () => (
  <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#000523] via-[#050a3a] to-[#000523] text-white p-12 flex-col justify-between">
    <div className="text-xl font-semibold">FastCamp</div>
    <div className="flex flex-1 items-center justify-center">
      <div>
        <h1 className="text-7xl xl:text-8xl font-semibold leading-tight">
          Start Your <br />Journey <br />
          <span className="text-white/70">with Us</span>
        </h1>
        <div className="text-sm text-white/50 mt-10 max-w-md">
          <p className="font-medium mb-1">Description</p>
          <p>Fastcamp — แพลตฟอร์มรวมค่าย IT สมัครง่าย โปรโมชั่นที่ใช่ให้คุณเห็นมากขึ้น</p>
        </div>
      </div>
    </div>
  </div>
)

// ─── Step 1: Register ─────────────────────────────────────────────────────────
const StepRegister = ({ onNext }: { onNext: (email: string) => void }) => {
  const router = useRouter()
  const [agree, setAgree] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "", role: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    if (!agree) { setError("กรุณายอมรับ Term & Condition"); return }
    if (form.password !== form.confirmPassword) { setError("Password ไม่ตรงกัน"); return }
    setLoading(true)
    try {
      await axios.post(`http://localhost:3001/auth/register`, {
        fullName: form.fullName, email: form.email,
        password: form.password, role: form.role || "student",
      })
      onNext(form.email)
    } catch (err) {
      if (axios.isAxiosError(err)) setError(err.response?.data?.message || "Register failed")
      else setError("Cannot connect to server")
    } finally { setLoading(false) }
  }

  return (
    <>
      {showPrivacy && (
        <PrivacyModal
          onClose={() => setShowPrivacy(false)}
          onAccept={() => { setAgree(true); setShowPrivacy(false) }}
        />
      )}
      <div className="relative flex w-full lg:w-1/2 min-h-screen items-center justify-center bg-white px-6 py-12">
        {/* ปุ่มกลับ */}
        <button onClick={() => router.push('/Page/Home')} className="absolute top-5 right-5 text-gray-400 hover:text-black text-xl">✕</button>
        {/* Logo บน mobile */}
        <div className="absolute top-5 left-5 text-base font-bold text-[#000523] lg:hidden">FastCamp</div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center">Get Started Now</h2>
          <p className="text-sm text-gray-500 text-center mb-6">Let&apos;s create your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input type="text" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })}
                className="mt-1 w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-sm font-medium">User Roles</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                className="mt-1 w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                <option value="" disabled hidden>Select role</option>
                <option value="student">นักเรียน/นักศึกษา/น้อง ๆ ที่อยากค้นหาค่าย</option>
                <option value="organizer">ผู้จัดค่าย</option>
                {/* <option value="student">ผู้ใช้งานทั่วไปที่ไม่ใช่ผู้จัดค่ายหรือนักเรียน</option> */}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input type="password" placeholder="Set your password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="mt-1 w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <input type="password" placeholder="Confirm your password" value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                className="mt-1 w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-blue-500" checked={agree}
                onChange={e => setAgree(e.target.checked)} />
              <span>
                I agree to{" "}
                <button type="button" onClick={() => setShowPrivacy(true)}
                  className="text-blue-600 cursor-pointer hover:underline font-medium">
                  Term &amp; Condition
                </button>
              </span>
            </div>
            {error && <p className="text-xs text-red-500 text-center">{error}</p>}
            <button type="submit" disabled={!agree || loading}
              className={`w-full rounded-full py-2.5 text-sm font-medium transition ${agree ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/pageAuth/Login" className="text-blue-600 font-medium hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </>
  )
}

// ─── Success Screen ───────────────────────────────────────────────────────────
const SuccessScreen = () => (
  <div className="w-full lg:w-1/2 min-h-screen bg-white flex items-center justify-center relative px-6">
    <a href="/pageAuth/Login">
      <button className="absolute top-5 right-5 text-gray-400 hover:text-black text-xl">✕</button>
    </a>
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Account<br />Successfully Created</h2>
      <p className="text-gray-400 text-sm mb-8">Let&apos;s start your journey</p>
      <a href="/pageAuth/Login"
        className="w-full max-w-xs py-2.5 rounded-full text-white font-medium bg-blue-600 hover:bg-blue-700 transition text-center text-sm">
        Go to Login
      </a>
    </div>
  </div>
)

// ─── Step 2: OTP ──────────────────────────────────────────────────────────────
const StepOtp = ({ email, onDone }: { email: string; onDone: () => void }) => {
  const length = 6
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
  const [otpError, setOtpError] = useState("")
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return
    const newOtp = [...otp]; newOtp[index] = value; setOtp(newOtp); setOtpError("")
    if (value && index < length - 1) inputs.current[index + 1]?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) inputs.current[index - 1]?.focus()
  }

  const handleVerify = async () => {
    const otpCode = otp.join("")
    if (otpCode.length < 6) { setOtpError("กรอก OTP ให้ครบ"); return }
    try {
      await axios.post("http://localhost:3001/auth/verify-otp", { email, otp: otpCode })
      onDone()
    } catch (err) {
      if (axios.isAxiosError(err)) setOtpError(err.response?.data || "OTP ไม่ถูกต้อง")
      else setOtpError("Cannot connect to server")
    }
  }

  return (
    <div className="w-full lg:w-1/2 min-h-screen bg-[#f5f7fb] flex items-center justify-center relative px-6 py-12">
      <button className="absolute top-5 right-5 text-gray-400 text-2xl">×</button>
      <div className="w-full max-w-sm">
        <div className="w-16 h-16 bg-[#e9eef8] rounded-full flex items-center justify-center mb-4">
          <Image src="/email.png" width={28} height={28} alt="email" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">OTP Verification</h2>
        <p className="text-gray-500 text-sm mb-1">Check your email to see the verification code</p>
        <p className="text-indigo-500 text-sm font-medium mb-8 break-all">{email}</p>

        {/* OTP inputs — gap ยืดหยุ่นบน mobile */}
        <div className="flex gap-2 sm:gap-4 mb-8">
          {otp.map((digit, index) => (
            <input key={index} ref={el => { inputs.current[index] = el }}
              type="text" inputMode="numeric" value={digit} maxLength={1}
              onChange={e => handleChange(e.target.value, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              className="flex-1 min-w-0 h-12 rounded-full border border-indigo-300 text-center text-lg outline-none focus:ring-2 focus:ring-indigo-400" />
          ))}
        </div>

        {otpError && <p className="text-xs text-red-500 mb-2">{otpError}</p>}
        <button onClick={handleVerify}
          className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-[#4f46e5] to-[#4338ca] hover:opacity-90 transition">
          Verify
        </button>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const RegisterFlow = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      <LeftPanel />
      {step === 1
        ? <StepRegister onNext={e => { setEmail(e); setStep(2) }} />
        : step === 2
        ? <StepOtp email={email} onDone={() => setStep(3)} />
        : <SuccessScreen />
      }
    </div>
  )
}

export default RegisterFlow