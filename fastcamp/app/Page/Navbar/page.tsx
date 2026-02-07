"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // คลิกนอก popup ให้ปิด
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-[#000523] h-[10vh] w-full sticky top-0 z-50 flex items-center px-4 md:px-10">

      {/* Logo */}
      <h1 className="text-white text-2xl md:text-3xl font-bold">
        Fast Camp
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 text-white text-xl gap-10 font-bold">
        <p className="cursor-pointer">Home</p>
        <p className="cursor-pointer">Category</p>
        <p className="cursor-pointer">ส่งกิจกรรมเข้าร่วม</p>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden ml-auto text-white text-3xl"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        ☰
      </button>

      {/* Profile / Popup */}
      <div className="hidden md:flex ml-auto items-center gap-4 relative" ref={ref}>
        {!open ? (
          /* ===== PROFILE VIEW ===== */
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/Profile.png" alt="Profile" fill className="rounded-full object-cover" />
            </div>

            <div className="hidden lg:block text-white">
              <p>Paotung Ratchawang</p>
              <p className="text-sm opacity-70">Paotung@gmail.com</p>
            </div>

            <button
              className="relative w-5 h-5"
              onClick={() => setOpen(true)}
            >
              <Image src="/arrow.png" alt="Arrow" fill />
            </button>
          </div>
        ) : (
          /* ===== POPUP VIEW ===== */
          <div
            className="
              absolute
              top-16
              right-0
              bg-white
              text-black
              rounded-2xl
              w-[90vw] max-w-md
              shadow-xl
              overflow-hidden
              z-50
              p-6
            "
          >
            {/* Profile header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-14 h-14">
                <Image src="/Profile.png" alt="Profile" fill className="rounded-full object-cover" />
              </div>

              <div>
                <p className="font-semibold">Paotung Ratchawang</p>
                <p className="text-sm text-gray-500">Paotung@gmail.com</p>
              </div>
            </div>

            {/* Menu */}
            <div className="flex flex-col">
              <button className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 rounded-lg">
                <span>Edit Profile</span>
                <span className="text-gray-400">›</span>
              </button>

              <button className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 rounded-lg">
                <span>Settings</span>
                <span className="text-gray-400">›</span>
              </button>

              <button className="flex items-center px-4 py-3 hover:bg-red-50 text-red-500 rounded-lg">
                Log Out
              </button>
            </div>

            {/* Close */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full text-xl text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-black transition"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden absolute top-[10vh] left-0 w-full bg-[#000523] text-white flex flex-col items-center gap-6 py-6 z-40">
          <p className="cursor-pointer">Home</p>
          <p className="cursor-pointer">Category</p>
          <p className="cursor-pointer">ส่งกิจกรรมเข้าร่วม</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
