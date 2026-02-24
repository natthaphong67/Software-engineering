import Image from "next/image"
import Link from "next/link"

const Reset_password = () => {
  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#000523] via-[#020833] to-[#000523] text-white px-16 py-12">
        <div className="flex flex-col justify-between w-full">
          {/* Logo */}
          <div className="text-xl font-semibold tracking-wide">FastCamp</div>
          {/* Center Content */}
          <div className="flex flex-col justify-center flex-1">
            <h1 className="text-[72px] font-semibold leading-[88px] text-white/90">
              Start Your <br />
              Journey <br />
              <span className="text-white/60">with Us</span>
            </h1>
          </div>
          {/* Description */}
          <div className="text-white/50 text-sm">
            <p className="mb-2">Description</p>
            <p className="text-white/70">
              Fastcamp — แพลตฟอร์มรวมค่าย IT สมัครง่าย โปรโมชั่นที่ใช่ให้คุณเห็นมากขึ้น
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 bg-[#f5f7fb] flex items-center justify-center relative">
        {/* CLOSE BUTTON */}
        <Link href="/Page/Login">
            <button className="absolute right-8 top-6 text-gray-400 hover:text-gray-600 text-2xl">×</button>
        </Link>
        
        {/* FORM BOX */}
        <div className="w-full max-w-md flex flex-col items-start">
          
          <div>
            {/* LOCK ICON */}
            <div className="w-[64px] h-[64px] bg-[#e9eef8] rounded-full flex items-center justify-center mb-6">
                <Image src="/lock.png" width={28} height={28} alt="lock"/>
            </div>
            {/* TITLE */}
            <h2 className="text-[26px] font-semibold text-gray-800 mb-2">Forgot Password?</h2>
            {/* SUBTITLE */}
            <p className="text-gray-500 text-sm mb-8">Enter your email to reset your password</p>
          </div>
          {/* FORM */}
          <form className="w-full">
            {/* EMAIL */}
            <div className="mb-6">
              <label className="text-sm text-gray-600">Email</label>
              <div className="relative mt-2">
                {/* EMAIL ICON */}
                <Image src="/email.png" width={18} height={18} alt="email" className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60"/>
                <input type="email" placeholder="@gmail.com" className="w-full pl-12 pr-4 py-3 rounded-full border border-indigo-400 outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent"/>
              </div>
            </div>
            {/* SUBMIT BUTTON */}
            <button className=" w-full py-3 ounded-full rounded-full  text-white font-medium bg-gradient-to-r  from-[#4f46e5] to-[#4338ca] hover:opacity-90 transition shadow-sm">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reset_password