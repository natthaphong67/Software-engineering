const Register = () => {
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

      {/* RIGHT */}
      <div className="relative flex w-full lg:w-1/2 items-center justify-center bg-white">
        {/* Close */}
        <button className="absolute top-6 right-6 text-gray-400 hover:text-black text-xl"> ✕ </button>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center">Get Started Now</h2>
          <p className="text-sm text-gray-500 text-center mb-8">Let’s create your account</p>

          <form className="space-y-4">
            {/* Full name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
                <label className="text-sm font-medium">User Roles</label>

                <select className="mt-1 w-full rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                    {/* Placeholder: ไม่โชว์หลังจากเลือกแล้ว */}
                    <option value="" disabled hidden >Select role</option>

                    <option value="student">นักเรียน/นักศึกษา/น้อง ๆ ที่อยากค้นหาค่าย</option>
                    <option value="organizer">ครู/อาจารย์</option>
                    <option value="company">ผู้ใช้งานทั่วไปที่ไม่ใช่ครูหรือนักเรียน</option>
                </select>
            </div>


            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Set your password"
                className="mt-1 w-full rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="mt-1 w-full rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-blue-500" />
              <span>
                I agree to <span className="text-blue-600 cursor-pointer">Term & Condition</span>
              </span>
            </div>

            {/* Submit */}
            <button className="w-full rounded-full bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition">
              Sign up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/Page/Login" className="text-blue-600 font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
