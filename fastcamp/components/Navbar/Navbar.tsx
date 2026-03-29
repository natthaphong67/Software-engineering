"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type UserInfo = {
  id: number;
  full_name: string;
  email: string;
  avatar_url?: string | null;
};

type SearchResult = {
  id: number;
  title: string;
  tagline: string;
  poster_url: string | null;
  headline_image_url: string | null;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("ส่งกิจกรรมขึ้นเว็บ");
  const [popupOpen, setPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const token = document.cookie.split("; ").find((r) => r.startsWith("token="))?.split("=")[1];
    if (!token) { setIsLoggedIn(false); return; }
    setIsLoggedIn(true);
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id || payload.userId || payload.user_id;
      if (userId) {
        fetch(`${API_URL}/api/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
          .then((r) => r.json())
          .then((data) => { if (data?.id) setUser(data); })
          .catch(() => {});
      }
    } catch {}
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/pageAuth/Login";
  };

  const navBg: Record<string, string> = {
    "/": "bg-transparent",
    "/Page/Category": "bg-transparent mt-5",
    "/Page/LandingPage": "bg-transparent",
  };

  const isInfoPage = pathname.startsWith("/Page/Infomation");
  const isSolidPage = isInfoPage || pathname.startsWith("/Page/EditProfile") || pathname.startsWith("/Page/EditCamp");
  const bgClass = isSolidPage ? "bg-[#0f1325]/90 backdrop-blur-md" : (navBg[pathname] ?? "");

  const navItems = [
    { name: "Home", href: "/" },
    { name: "category", href: "/Page/Category" },
    { name: "ส่งกิจกรรมขึ้นเว็บ", href: "/Page/LandingPage" },
  ];

  // Click outside — popup & search
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) setPopupOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (!q.trim()) { setSearchResults([]); setSearchOpen(false); return; }
    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`${API_URL}/api/camps/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setSearchResults(Array.isArray(data) ? data.slice(0, 6) : []);
        setSearchOpen(true);
      } catch {} finally { setSearching(false); }
    }, 300);
  };

  const handleSelectResult = (id: number) => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchOpen(false);
    router.push(`/Page/Infomation/${id}`);
  };

  const campImg = (r: SearchResult) => {
    const url = r.headline_image_url || r.poster_url;
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${API_URL}/uploads/${url}`;
  };

  const AvatarDisplay = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
    const dim = size === "lg" ? "w-16 h-16 text-xl" : "w-9 h-9 text-sm";
    const avatarUrl = user?.avatar_url
      ? (user.avatar_url.startsWith("http") ? user.avatar_url : `${API_URL}/uploads/${user.avatar_url}`)
      : null;
    const initial = (user?.full_name || "?").charAt(0).toUpperCase();
    return avatarUrl ? (
      <img src={avatarUrl} alt="avatar" className={`${dim} rounded-full object-cover ring-2 ring-white/20`} />
    ) : (
      <div className={`${dim} rounded-full bg-[#1B2144] flex items-center justify-center text-white font-bold ring-2 ring-white/20`}>
        {initial}
      </div>
    );
  };

  return (
    <nav className={`absolute border-b border-white/5 px-6 py-4 flex items-center justify-between top-0 left-0 right-0 z-50 gap-4 ${bgClass}`}>
      {/* Logo */}
      <span className="text-xl font-semibold text-white flex-shrink-0">FastCamp</span>

      {/* Nav links */}
      <ul className="hidden md:flex items-center gap-10 flex-shrink-0">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>
              <span onClick={() => setActiveNav(item.name)}
                className={`text-sm cursor-pointer transition-colors duration-150 ${
                  activeNav === item.name ? "font-bold text-white" : "text-gray-400 hover:text-gray-200"
                }`}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Search Bar */}
      <div className="flex-1 max-w-xs relative" ref={searchRef}>
        <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 gap-2">
          <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="ค้นหาค่าย..."
            className="bg-transparent flex-1 outline-none text-white text-sm placeholder-white/40 min-w-0"
          />
          {searching && <span className="text-white/40 text-xs">...</span>}
        </div>

        {/* Dropdown results */}
        {searchOpen && (
          <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100">
            {searchResults.length === 0 ? (
              <div className="px-4 py-4 text-sm text-gray-400 text-center">ไม่พบค่ายที่ตรงกัน</div>
            ) : (
              <>
                {searchResults.map((r) => {
                  const img = campImg(r);
                  return (
                    <button key={r.id} onClick={() => handleSelectResult(r.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left border-b border-gray-50 last:border-0">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {img ? (
                          <img src={img} alt={r.title} className="w-full h-full object-cover"/>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">🏕️</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{r.title}</p>
                        <p className="text-xs text-gray-400 truncate">{r.tagline}</p>
                      </div>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="relative flex-shrink-0" ref={popupRef}>
        {!isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Link href="/pageAuth/Login">
              <button className="px-5 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition">Login</button>
            </Link>
            <Link href="/pageAuth/Register">
              <button className="px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition">Sign Up</button>
            </Link>
          </div>
        ) : (
          <>
            <button onClick={() => setPopupOpen((prev) => !prev)} className="flex items-center gap-3 group">
              <AvatarDisplay size="sm" />
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-sm font-semibold text-white">{user?.full_name || "Loading..."}</p>
                <p className="text-xs text-gray-400">{user?.email || ""}</p>
              </div>
            </button>

            {popupOpen && (
              <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="flex items-center gap-4 px-6 py-6">
                  <AvatarDisplay size="lg" />
                  <div>
                    <p className="text-lg font-bold text-gray-900">{user?.full_name || "—"}</p>
                    <p className="text-sm text-gray-400">{user?.email || ""}</p>
                  </div>
                </div>
                <hr className="border-gray-100 mx-4" />
                <div className="px-3 py-3 space-y-1">
                  <Link href="/Page/EditProfile" className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-sm text-gray-700">Edit Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-sm text-gray-700">Log Out</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}