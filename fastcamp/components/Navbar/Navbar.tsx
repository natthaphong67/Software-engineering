"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
const user = {
  firstName: "Paotung",
  lastName: "Ratchawang",
  email: "Paotung@gmail.com",
  avatar: "https://i.pravatar.cc/150?img=12",
};

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("ส่งกิจกรรมขึ้นเว็บ");
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
  { name: "Home", href: "/" },
  { name: "category", href: "/Category" },
  { name: "ส่งกิจกรรมขึ้นเว็บ", href: "/Form" },
];

  // Close popup when clicking outside
  useEffect(() => {

  function handleClickOutside(e: MouseEvent) {

    if (
      popupRef.current &&
      !popupRef.current.contains(e.target as Node)
    ) {
      setPopupOpen(false);
    }

  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };

}, []);

  return (
    <nav className="bg-transparent border-b border-white/5 px-10 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <span className="text-xl font-semibold text-white tracking-tight">FastCamp</span>

      {/* Nav links */}
      <ul className="hidden md:flex items-center gap-14">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>
              <span
                onClick={() => setActiveNav(item.name)}
                className={`text-sm cursor-pointer transition-colors duration-150 ${
                  activeNav === item.name
                    ? "font-bold text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Profile area */}
      <div className="relative" ref={popupRef}>
        <button
          onClick={() => setPopupOpen((prev) => !prev)}
          className="flex items-center gap-3 group"
        >
          <img
            src={user.avatar}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-white/50 transition"
          />
          <div className="hidden sm:block text-left leading-tight">
            <p className="text-sm font-semibold text-white">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${popupOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Popup dropdown */}
        {popupOpen && (
          <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in">
            {/* User header */}
            <div className="flex items-center gap-4 px-6 py-6">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div>
                <p className="text-lg font-bold text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
                <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
              </div>
            </div>

            <hr className="border-gray-100 mx-4" />

            {/* Menu items */}
            <div className="px-3 py-3 space-y-1">
              {/* Edit Profile */}
              <Link href="/Page/EditProfile">
                <button className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="text-base font-medium text-gray-800">Edit Profile</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>

              {/* Settings */}
              <Link href="/Page/EditProfile"> 
                <button className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a6.932 6.932 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-base font-medium text-gray-800">Settings</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>

              {/* Log Out */}
              <Link href="/Page/Login"> 
                <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  <span className="text-base font-medium text-gray-800">Log Out</span>
                </button>
              </Link>
            </div>
            

            <div className="pb-3" />
          </div>
        )}
      </div>

      {/* Fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.18s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}