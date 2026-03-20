import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-black">

      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">

          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-semibold text-lg">GFS</h1>
            <p className="text-sm">
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer">Log in</span>
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold mb-2">
            Explore our funds today
          </h2>
          <p className="mb-6">
            Create your free account and view our funds in just a few steps.
          </p>

          {/* FORM */}
          <form className="space-y-4">

            {/* First + Last Name */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-sm mb-1 block">First Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-1/2">
                <label className="text-sm mb-1 block">Last Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="text-sm mb-1 block">Country</label>
              <select className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm mb-1 block">Email Address</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm mb-1 block">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Sign up
            </button>

            {/* Terms */}
            <p className="text-xs">
              I have read and agree to Terms of Service and Privacy Notice.
            </p>

            {/* Referral */}
            <p className="text-sm">
              Have a Kristal referral code?
            </p>

          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-10 bg-gray-50">
        <div className="max-w-md">

          {/* Image */}
          <Image
            src="/my-image.jpg"
            alt="finance"
            width={500}
            height={300}
            className="rounded-2xl shadow-lg mb-6"
          />

          {/* Text */}
          <h3 className="text-xl font-semibold mb-4">
            Consistently Performing Portfolios
          </h3>

          <ul className="space-y-2">
            <li>✔ Lorem ipsum dolor sit amet</li>
            <li>✔ Lorem ipsum dolor sit amet</li>
            <li>✔ Lorem ipsum dolor sit amet</li>
          </ul>

        </div>
      </div>

    </div>
  );
}