"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Toast ────────────────────────────────────────────────────────────────────
type ToastType = "error" | "success";

const Toast = ({ message, type, onClose }: { message: string; type: ToastType; onClose: () => void }) => (
  <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl text-white text-sm font-medium
    animate-[slideIn_0.3s_ease_forwards]
    ${type === "error" ? "bg-red-500" : "bg-emerald-500"}`}>
    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
      {type === "error" ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
    <span>{message}</span>
    <button onClick={onClose} className="ml-2 text-white/70 hover:text-white text-lg leading-none">×</button>
  </div>
);

// ─── Login ────────────────────────────────────────────────────────────────────
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [loading, setLoading] = useState(false);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data?.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง", "error");
        return;
      }

      document.cookie = `token=${data.token}; path=/`;
      showToast("เข้าสู่ระบบสำเร็จ!", "success");
      setTimeout(() => router.push("/Page/Home"), 800);
    } catch (err) {
      console.error(err);
      showToast("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="min-h-screen w-full flex flex-col lg:flex-row">

        {/* ซ้าย — hero panel, ซ่อนบน mobile แสดงบน lg */}
        <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#000523] via-[#050a3a] to-[#000523] text-white p-12 flex-col justify-between">
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

        {/* ขวา — form */}
        <div className="relative flex w-full lg:w-1/2 min-h-screen items-center justify-center bg-white px-6 py-12">

          {/* ปุ่มกลับ */}
          <button
            onClick={() => router.push('/Page/Home')}
            className="absolute top-5 right-5 text-gray-400 hover:text-black text-xl"
          >✕</button>

          {/* Logo บน mobile */}
          <div className="absolute top-5 left-5 text-base font-bold text-[#000523] lg:hidden">
            FastCamp
          </div>

          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
            <p className="text-sm text-gray-500 text-center mb-8">Sign in to your account</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your Email"
                  className="mt-1 w-full rounded-full border border-blue-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full rounded-full border border-blue-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <a href="/pageAuth/Reset-password" className="text-blue-500 hover:underline">Forgot Password</a>
              </div>
              <button
                disabled={loading}
                className="w-full rounded-full bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 transition disabled:opacity-60 text-sm"
              >
                {loading ? "กำลังเข้าสู่ระบบ..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <a href="/pageAuth/Register" className="text-blue-500 font-medium hover:underline">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;