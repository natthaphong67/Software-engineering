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
  const [popupOpen, setPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // hamburger
  const popupRef = useRef<HTMLDivElement | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false); // mobile search overlay
  const searchRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);
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

  // ปิด menu เมื่อเปลี่ยนหน้า
  useEffect(() => {
    setMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  // ล็อค scroll เมื่อ menu เปิด
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // focus input เมื่อ mobile search เปิด
  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => mobileInputRef.current?.focus(), 100);
    }
  }, [mobileSearchOpen]);

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
    { name: "Home", href: "/Page/Home" },
    { name: "Category", href: "/Page/Category" },
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

  // Search handler (shared)
  const doSearch = (q: string) => {
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
    setMobileSearchOpen(false);
    router.push(`/Page/Infomation/${id}`);
  };

  const campImg = (r: SearchResult) => {
    const url = r.headline_image_url || r.poster_url;
    if (!url) return null;
    if (url.startsWith("http")) return url;
    if (url.startsWith("http")) return url;
    return null;
  };

  const AvatarDisplay = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  const dim = size === "lg" ? "w-16 h-16 text-xl" : "w-9 h-9 text-sm";
  const avatarUrl = user?.avatar_url || null;
  const initial = (user?.full_name || "?").charAt(0).toUpperCase();

  return avatarUrl ? (
    <img src={avatarUrl} alt="avatar" className={`${dim} rounded-full object-cover ring-2 ring-white/20`} />
  ) : (
    <div className={`${dim} rounded-full bg-[#1B2144] flex items-center justify-center text-white font-bold ring-2 ring-white/20`}>
      {initial}
    </div>
  );
};

  // Search results dropdown (reusable)
  const SearchDropdown = () => (
    searchOpen && searchResults.length >= 0 ? (
      <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100">
        {searchResults.length === 0 ? (
          <div className="px-4 py-4 text-sm text-gray-400 text-center">ไม่พบค่ายที่ตรงกัน</div>
        ) : (
          searchResults.map((r) => {
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
          })
        )}
      </div>
    ) : null
  );

  return (
    <>
      {/* ====== NAVBAR ====== */}
      <nav className={`absolute border-b border-white/5 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between top-0 left-0 right-0 z-50 gap-3 ${bgClass}`}>

        {/* Logo */}
        <Link href="/Page/Home">
          <span className="text-lg sm:text-xl font-semibold text-white flex-shrink-0 sm:ml-10">FastCamp</span>
        </Link>

        {/* Nav links — desktop only */}
        <ul className="hidden md:flex items-center gap-10 flex-shrink-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <span className={`text-sm cursor-pointer transition-colors duration-150 ${
                    isActive ? "font-bold text-white" : "text-gray-400 hover:text-gray-200"
                  }`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Search Bar — desktop only */}
        <div className="hidden md:flex flex-1 max-w-xs relative" ref={searchRef}>
          <div className="flex items-center w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 gap-2">
            <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" value={searchQuery} onChange={(e) => doSearch(e.target.value)}
              placeholder="ค้นหาค่าย..."
              className="bg-transparent flex-1 outline-none text-white text-sm placeholder-white/40 min-w-0"/>
            {searching && <span className="text-white/40 text-xs">...</span>}
          </div>
          <SearchDropdown/>
        </div>

        {/* Right section — desktop */}
        <div className="hidden md:flex relative flex-shrink-0 mr-10" ref={popupRef}>
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
                <AvatarDisplay size="sm"/>
                <div className="hidden sm:block text-left leading-tight">
                  <p className="text-sm font-semibold text-white">{user?.full_name || "Loading..."}</p>
                  <p className="text-xs text-gray-400">{user?.email || ""}</p>
                </div>
              </button>
              {popupOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="flex items-center gap-4 px-6 py-6">
                    <AvatarDisplay size="lg"/>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{user?.full_name || "—"}</p>
                      <p className="text-sm text-gray-400">{user?.email || ""}</p>
                    </div>
                  </div>
                  <hr className="border-gray-100 mx-4"/>
                  <div className="px-3 py-3 space-y-1">
                    <Link href="/Page/EditProfile" className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-sm text-gray-700">Edit Profile</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-sm text-gray-700">Log Out</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ====== MOBILE RIGHT ICONS ====== */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          {/* Search icon */}
          <button onClick={() => setMobileSearchOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>

          {/* Avatar (ถ้า login) หรือ Login button */}
          {isLoggedIn ? (
            <button onClick={() => setMenuOpen((v) => !v)}>
              <AvatarDisplay size="sm"/>
            </button>
          ) : (
            <Link href="/pageAuth/Login">
              <button className="px-3 py-1.5 rounded-full border border-white/30 text-white text-xs hover:bg-white/10 transition">Login</button>
            </Link>
          )}

          {/* Hamburger */}
          <button onClick={() => setMenuOpen((v) => !v)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white">
            {menuOpen ? (
              // X icon
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ====== MOBILE SEARCH OVERLAY ====== */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-[#000523]/95 backdrop-blur-md flex flex-col md:hidden">
          <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-white/10">
            <div className="flex-1 flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2.5 gap-2" ref={mobileSearchRef}>
              <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                ref={mobileInputRef}
                type="text" value={searchQuery}
                onChange={(e) => doSearch(e.target.value)}
                placeholder="ค้นหาค่าย..."
                className="bg-transparent flex-1 outline-none text-white text-sm placeholder-white/40"/>
              {searching && <span className="text-white/40 text-xs">...</span>}
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setSearchResults([]); setSearchOpen(false); }}
                  className="text-white/40 hover:text-white/70">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
            <button onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); setSearchResults([]); setSearchOpen(false); }}
              className="text-white/60 hover:text-white text-sm flex-shrink-0">
              ยกเลิก
            </button>
          </div>

          {/* Search results */}
          <div className="flex-1 overflow-y-auto">
            {searchQuery && searchResults.length === 0 && !searching && (
              <div className="px-4 py-8 text-sm text-white/40 text-center">ไม่พบค่ายที่ตรงกัน</div>
            )}
            {searchResults.map((r) => {
              const img = campImg(r);
              return (
                <button key={r.id} onClick={() => handleSelectResult(r.id)}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-white/5 transition text-left border-b border-white/5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                    {img ? (
                      <img src={img} alt={r.title} className="w-full h-full object-cover"/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30 text-xl">🏕️</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{r.title}</p>
                    <p className="text-xs text-white/40 truncate mt-0.5">{r.tagline}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ====== MOBILE DRAWER MENU ====== */}
      {/* Backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] bg-black/40 md:hidden" onClick={() => setMenuOpen(false)}/>
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[280px] z-[60] bg-[#0b0f2b] shadow-2xl flex flex-col md:hidden
        transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-white font-semibold">เมนู</span>
          <button onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* User info (ถ้า login) */}
        {isLoggedIn && (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
            <AvatarDisplay size="sm"/>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.full_name || "Loading..."}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.name} href={item.href} onClick={() => setMenuOpen(false)}>
                <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 transition
                  ${isActive ? "bg-white/10 text-white font-semibold" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                  <span className="text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom auth buttons */}
        <div className="px-4 py-4 border-t border-white/10 space-y-2">
          {!isLoggedIn ? (
            <>
              <Link href="/pageAuth/Login" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-2.5 rounded-full border border-white/30 text-white text-sm hover:bg-white/10 transition">Login</button>
              </Link>
              <Link href="/pageAuth/Register" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition">Sign Up</button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/Page/EditProfile" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-2.5 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition">Edit Profile</button>
              </Link>
              <button onClick={handleLogout}
                className="w-full py-2.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/30 transition">
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}