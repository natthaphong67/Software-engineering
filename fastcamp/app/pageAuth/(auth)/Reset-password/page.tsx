"use client"
import Link from "next/link"
import { useState, useRef } from "react"

const API = "http://localhost:3001"

// ─── Left Panel ───────────────────────────────────────────────────────────────
const LeftPanel = () => (
  <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#000523] via-[#020833] to-[#000523] text-white px-16 py-12 flex-col justify-between">
    <div className="text-xl font-semibold">FastCamp</div>
    <h1 className="text-[72px] font-semibold leading-[88px] text-white/90">
      Start Your <br />Journey <br />
      <span className="text-white/60">with Us</span>
    </h1>
    <div className="text-white/50 text-sm">
      <p className="mb-2">Description</p>
      <p className="text-white/70">Fastcamp — แพลตฟอร์มรวมค่าย IT สมัครง่าย โปรโมชั่นที่ใช่ให้คุณเห็นมากขึ้น</p>
    </div>
  </div>
)

// ─── Shared icons ─────────────────────────────────────────────────────────────
const EyeOn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
)
const EyeOff = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

// ─── Step 1: Email ────────────────────────────────────────────────────────────
const StepEmail = ({ onNext }: { onNext: (email: string) => void }) => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email"); return }
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data || "Something went wrong"); return }
      onNext(email)
    } catch {
      setError("Cannot connect to server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[340px]">
      <div className="w-[52px] h-[52px] bg-[#e9eef8] rounded-full flex items-center justify-center mb-5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <h2 className="text-[20px] font-semibold text-gray-800 mb-1">Forgot Password?</h2>
      <p className="text-gray-400 text-sm mb-5">Enter your email to reset your password</p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1.5">Email</label>
          <div className={`flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border transition-all
            ${error ? "border-red-400" : "border-gray-300 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100"}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
            </svg>
            <input type="email" placeholder="Paotung@example.com" value={email}
              onChange={e => { setEmail(e.target.value); setError("") }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              className="flex-1 text-sm text-gray-800 placeholder-gray-300 bg-transparent outline-none" />
          </div>
          {error && <p className="text-xs text-red-400 mt-1 pl-1">{error}</p>}
        </div>
        <button onClick={handleSubmit} disabled={loading}
          className="w-full py-2.5 rounded-full text-white text-sm font-medium bg-[#4f46e5] hover:bg-[#4338ca] transition disabled:opacity-60">
          {loading ? "Sending..." : "Submit"}
        </button>
      </div>
    </div>
  )
}

// ─── Step 2: OTP ──────────────────────────────────────────────────────────────
const StepOtp = ({ email, onNext, onBack }: { email: string; onNext: (token: string) => void; onBack: () => void }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [resent, setResent] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]; next[idx] = val; setOtp(next); setError("")
    if (val && idx < 5) inputs.current[idx + 1]?.focus()
  }
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) inputs.current[idx - 1]?.focus()
  }
  const handleVerify = async () => {
    if (otp.some(d => d === "")) { setError("Please fill in all 6 digits"); return }
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otp.join("") }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data || "Invalid OTP"); return }
      onNext(data.reset_token)
    } catch {
      setError("Cannot connect to server")
    } finally {
      setLoading(false)
    }
  }
  const handleResend = async () => {
    await fetch(`${API}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    setResent(true)
    setTimeout(() => setResent(false), 3000)
  }

  return (
    <div className="w-full max-w-[340px]">
      <div className="w-[52px] h-[52px] bg-[#e9eef8] rounded-full flex items-center justify-center mb-5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
        </svg>
      </div>
      <h2 className="text-[20px] font-semibold text-gray-800 mb-1">OTP Verification</h2>
      <p className="text-gray-400 text-sm mb-5">Check your email to see the verification code</p>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2.5">
          {otp.map((digit, i) => (
            <input key={i} ref={el => { inputs.current[i] = el }}
              type="text" inputMode="numeric" maxLength={1} value={digit}
              onChange={e => handleChange(e.target.value, i)}
              onKeyDown={e => handleKeyDown(e, i)}
              className={`w-11 h-11 text-center text-base font-semibold rounded-full border-2 bg-white outline-none transition-all
                ${digit ? "border-indigo-500 text-indigo-600" : "border-gray-200"}
                focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`} />
          ))}
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}

        <button onClick={handleVerify} disabled={loading}
          className="w-full py-2.5 rounded-full text-white text-sm font-medium bg-[#4f46e5] hover:bg-[#4338ca] transition disabled:opacity-60">
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Didn't receive the code?{" "}
          <button onClick={handleResend} className={`font-medium ${resent ? "text-emerald-500" : "text-indigo-500 hover:underline"}`}>
            {resent ? "Sent!" : "Resend code"}
          </button>
        </p>
      </div>
    </div>
  )
}

// ─── Step 3: Set New Password ─────────────────────────────────────────────────
const StepSetPassword = ({ resetToken, onBack, onDone }: { resetToken: string; onBack: () => void; onDone: () => void }) => {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showP, setShowP] = useState(false)
  const [showC, setShowC] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const mismatch = confirm.length > 0 && password !== confirm
  const canSubmit = password.length >= 6 && password === confirm

  const handleSave = async () => {
    if (!canSubmit) return
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset_token: resetToken, new_password: password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data || "Something went wrong"); return }
      onDone()
    } catch {
      setError("Cannot connect to server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[340px]">
      <div className="w-[52px] h-[52px] bg-[#e9eef8] rounded-full flex items-center justify-center mb-5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <h2 className="text-[20px] font-semibold text-gray-800 mb-1">Set New Password</h2>
      <p className="text-gray-400 text-sm mb-5">Enter your new password to complete the reset process</p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1.5">New Password</label>
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border border-gray-300 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <LockIcon />
            <input type={showP ? "text" : "password"} placeholder="••••••••••••••" value={password}
              onChange={e => { setPassword(e.target.value); setError("") }}
              className="flex-1 text-sm text-gray-800 placeholder-gray-300 bg-transparent outline-none" />
            <button type="button" onClick={() => setShowP(!showP)} className="text-gray-400 hover:text-gray-600 shrink-0">
              {showP ? <EyeOff /> : <EyeOn />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1.5">Confirm New Password</label>
          <div className={`flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border transition-all
            ${mismatch ? "border-red-400" : "border-gray-300 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100"}`}>
            <LockIcon />
            <input type={showC ? "text" : "password"} placeholder="Confirm new password" value={confirm}
              onChange={e => { setConfirm(e.target.value); setError("") }}
              className="flex-1 text-sm text-gray-800 placeholder-gray-300 bg-transparent outline-none" />
            <button type="button" onClick={() => setShowC(!showC)} className="text-gray-400 hover:text-gray-600 shrink-0">
              {showC ? <EyeOff /> : <EyeOn />}
            </button>
          </div>
          {mismatch && <p className="text-xs text-red-400 mt-1 pl-1">Passwords do not match</p>}
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button onClick={handleSave} disabled={!canSubmit || loading}
          className="w-full py-2.5 rounded-full text-white text-sm font-medium bg-[#4f46e5] hover:bg-[#4338ca] transition disabled:opacity-40 disabled:cursor-not-allowed">
          {loading ? "Saving..." : "Save New Password"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Remember old password?{" "}
          <Link href="/pageAuth/Login" className="text-indigo-500 hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

// ─── Success Screen ───────────────────────────────────────────────────────────
const SuccessScreen = () => (
  <div className="w-full max-w-[340px]">
    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-5">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
    <h2 className="text-[20px] font-semibold text-gray-800 mb-1">Your Password<br />Successfully Changed</h2>
    <p className="text-gray-400 text-sm mb-5">Sign in to your account with your new password</p>
    <Link href="/pageAuth/Login" className="block">
      <button className="w-full py-2.5 rounded-full text-white text-sm font-medium bg-[#4f46e5] hover:bg-[#4338ca] transition">
        Sign in
      </button>
    </Link>
  </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────
const ResetPasswordFlow = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [resetToken, setResetToken] = useState("")
  const [done, setDone] = useState(false)

  return (
    <div className="min-h-screen flex">
      <LeftPanel />
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center relative">
        <Link href="/pageAuth/Login">
          <button className="absolute right-8 top-6 text-gray-400 hover:text-gray-600 text-xl">×</button>
        </Link>
        <div className="w-full flex justify-center px-8">
          {done ? (
            <SuccessScreen />
          ) : step === 1 ? (
            <StepEmail onNext={e => { setEmail(e); setStep(2) }} />
          ) : step === 2 ? (
            <StepOtp email={email} onNext={token => { setResetToken(token); setStep(3) }} onBack={() => setStep(1)} />
          ) : (
            <StepSetPassword resetToken={resetToken} onBack={() => setStep(2)} onDone={() => setDone(true)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordFlow