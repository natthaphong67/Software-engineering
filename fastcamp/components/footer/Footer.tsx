export default function Footer() {
  return (
    <footer className="bg-[#000523] text-white px-10 md:px-20 py-16">
      {/* Top grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-white">FastCamp</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            ส่งค่ายของคุณมาที่เรา<br />แล้วคนจะรู้จักคุณมากขึ้น
          </p>
          <button className="w-fit border border-gray-500 text-gray-300 text-sm px-6 py-2.5 rounded-full hover:bg-white hover:text-[#0d1526] transition-all duration-200">
            ส่งกิจกรรมขึ้นเว็บ
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-5">Quick Links</h3>
          <ul className="space-y-3">
            {["กิจกรรมทั้งหมด", "กิจกรรมยอดนิยม", "ลงประกาศกิจกรรม"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-5">Contact Info</h3>
          <ul className="space-y-3">
            <li className="text-sm text-gray-400">Email : FastCamp@gmail.com</li>
            <li className="text-sm text-gray-400">Phone : 092-673-6791</li>
          </ul>
        </div>

        {/* Legals */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-5">Legals</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
                นโยบายความเป็นส่วนตัว
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-gray-700/50" />

      {/* Bottom row */}
      <div className="max-w-7xl mx-auto mt-6 flex justify-end items-center gap-4">
        {/* Instagram */}
        <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
          </svg>
        </a>

        {/* Discord */}
        <a href="#" aria-label="Discord" className="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}