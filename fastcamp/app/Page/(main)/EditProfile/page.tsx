"use client";

import { useState } from "react";

// Mock user data
const user = {
  firstName: "Paotung",
  lastName: "Ratchawang",
  email: "Paotung@gmail.com",
  role: "หมาอ้วน",
  avatar: "https://i.pravatar.cc/150?img=12",
  date: "Tue, 07 June 2022",
};

export default function EditProfile() {
  const [activeNav, setActiveNav] = useState("ส่งกิจกรรมขึ้นเว็บ");

  const navItems = ["Home", "category", "ส่งกิจกรรมขึ้นเว็บ"];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Main ── */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-2xl font-light text-gray-700">
              Welcome, <span className="font-bold text-gray-900">{user.firstName}</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">{user.date}</p>
          </div>
          <img
            src={user.avatar}
            alt="profile large"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
          />
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Card header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div>
                <p className="font-semibold text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            <button className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-700 active:scale-95 transition-all duration-150">
              Cheang Passwprd
            </button>
          </div>

          {/* Divider */}
          <hr className="border-gray-100 mb-8" />

          {/* Form grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={user.firstName}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              />
            </div>

            {/* Surname */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Surname</label>
              <input
                type="text"
                defaultValue={user.lastName}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              />
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">E-mail</label>
              <input
                type="email"
                defaultValue={user.email}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              />
            </div>

            {/* Roles */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Roles</label>
              <input
                type="text"
                defaultValue={user.role}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              />
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end mt-8">
            <button className="bg-gray-900 text-white text-sm font-medium px-8 py-2.5 rounded-xl hover:bg-gray-700 active:scale-95 transition-all duration-150">
              Save Changes
            </button>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-20 bg-white border-t border-gray-100 px-10 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">FastCamp</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              ส่งค่ายของคุณมาที่เรา<br />แล้วคนจะรู้จักคุณมากขึ้น
            </p>
            <button className="border border-gray-900 text-gray-900 text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-200">
              ส่งกิจกรรมขึ้นเว็บ
            </button>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Product</h3>
            <ul className="space-y-2">
              {["Wiki", "Pricing"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legals 1 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Legals</h3>
            <ul className="space-y-2">
              {["Terms of Services", "Privacy Policy"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legals 2 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Legals</h3>
            <ul className="space-y-2">
              {["Terms of Services", "Privacy Policy"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}