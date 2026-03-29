"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";




const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert("Login failed");
          return;
        }

        // ✅ set cookie
        document.cookie = `token=${data.token}; path=/`;

        // ✅ redirect
        router.push("/Page/Home");

      } catch (err) {
        console.error(err);
        alert("Error");
      }
    };

    
  return (
    <div className="min-h-screen w-full flex">
      {/* ซ้าย */}
      <div className="relative hidden lg:flex w-1/2 bg-linear-to-br from-[#000523] via-[#050a3a] to-[#000523] text-white p-12">
        <div className="flex flex-col justify-between w-full">
          <div className="text-xl font-semibold">FastCamp</div>
          
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col justify-between h-200 w-180 bg-linear-to-br from-[#000523] to-[#000940]">
              
              {/* TEXT  */}
              <h1 className="text-8xl font-semibold leading-tight">
                Start Your <br />
                Journey <br />
                <span className="text-white/70">with Us</span>
              </h1>

              {/* DESCRIPTION  */}
              <div className="text-sm text-white/50 max-w-md px-6 pb-8 whitespace-nowrap">
                <p className="font-medium mb-1">Description</p>
                <p>
                  Fastcamp — แพลตฟอร์มรวมค่าย IT สมัครง่าย โปรโมชั่นที่ใช่ให้คุณเห็นมากขึ้น</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ขวา */}
      <div className="relative flex w-full lg:w-1/2 items-center justify-center bg-white">
        {/* Close Button */}
        <button onClick={() => router.push('/Page/Home')} className="absolute top-6 right-6 text-gray-400 hover:text-black text-xl">✕</button>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Sign in to your account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              
              <label className="text-sm font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your Email"
                className="mt-1 w-full rounded-full border border-blue-200 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full rounded-full border border-blue-200 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <a href="/pageAuth/Reset-password" className="text-blue-500 hover:underline">
                Forgot Password
              </a>
            </div>

            {/* Button */}
            <button className="w-full rounded-full bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a href="/pageAuth/Register" className="text-blue-500 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Login