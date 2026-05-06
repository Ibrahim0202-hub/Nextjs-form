"use client";

import { useRouter } from "next/navigation";
import { useState } from "react"; // ✅ added

export default function Dashboard() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false); // ✅ added

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f6f7fb]">

      {/* ✅ MOBILE OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ✅ MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r px-6 py-6 flex flex-col justify-between z-50 transform transition-transform duration-300 md:hidden
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <h1 className="text-xl font-bold mb-10 flex items-center gap-2">
            🪙 GFS
          </h1>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg font-medium">
              🔍 Explore
            </li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">
              👤 Profile
            </li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">
              📞 Contact us
            </li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">
              ⚙️ Admin Panel
            </li>
          </ul>
        </div>

        <button
          onClick={() => router.push("/")}
          className="text-red-500 text-sm font-medium"
        >
          Logout
        </button>
      </div>

      {/* SIDEBAR (DESKTOP ONLY) */}
      <div className="hidden md:flex w-64 bg-white border-r px-6 py-6 flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-10 flex items-center gap-2">
            🪙 GFS
          </h1>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg font-medium">
              🔍 Explore
            </li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">
              👤 Profile
            </li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">
              📞 Contact us
            </li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">
              ⚙️ Admin Panel
            </li>
          </ul>
        </div>

        <button
          onClick={() => router.push("/")}
          className="text-red-500 text-sm font-medium"
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* ✅ UPDATED TOPBAR (ONLY CHANGE) */}
        <div className="flex justify-between items-center px-4 md:px-8 py-4 bg-white border-b">

          {/* MOBILE MENU + LOGO */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-2xl font-bold text-black"
            >
              ☰
            </button>

            <h1 className="font-bold">🪙 GFS</h1>
          </div>

          {/* DESKTOP LOGO */}
          <div className="hidden md:block">
            <h1 className="font-bold">🪙 GFS</h1>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <span className="text-lg">🔔</span>
            <div className="w-8 h-8 md:w-9 md:h-9 bg-black text-white rounded-full flex items-center justify-center text-xs md:text-sm font-semibold">
              TC
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col md:flex-row">

          {/* CENTER */}
          <div className="flex-1 px-4 md:px-10 py-6 md:py-8">

            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              All Funds
            </h1>

            <p className="text-gray-500 mb-6 text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>

            {/* TABS */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
              <button className="bg-[#0f172a] text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium">
                All Funds
              </button>
              <button className="border px-4 md:px-6 py-2 rounded-full text-gray-500 text-xs md:text-sm">
                TCG
              </button>
              <button className="border px-4 md:px-6 py-2 rounded-full text-gray-500 text-xs md:text-sm">
                TGPL
              </button>
              <button className="border px-4 md:px-6 py-2 rounded-full text-gray-500 text-xs md:text-sm">
                TIWCG
              </button>
            </div>

            {/* FILTERS */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-xs md:text-sm mb-6">
              <p className="font-semibold">10 funds</p>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-500">Sort by:</span>
                <select className="border px-2 py-1 rounded-md bg-white">
                  <option>Returns (5Y)</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-500">Risk Level:</span>
                <select className="border px-2 py-1 rounded-md bg-white">
                  <option>All</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-500">Returns for:</span>
                <select className="border px-2 py-1 rounded-md bg-white">
                  <option>5 Years</option>
                </select>
              </div>
            </div>

            {/* CARDS */}
            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 md:p-6 mb-5 border shadow-sm flex flex-col md:flex-row gap-4 md:justify-between"
              >
                <div className="flex gap-3">

                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center text-sm md:text-lg">
                    📊
                  </div>

                  <div>
                    <h2 className="font-semibold text-sm md:text-lg">
                      {i === 0
                        ? "TCG - Fund Builder"
                        : "TCG Global Income Fund Limited - FRF"}
                    </h2>

                    <p className="text-gray-500 text-xs md:text-sm mb-1">
                      Medium risk fund with $1.2k minimum investment.
                    </p>

                    <p className="text-xs text-gray-400 mb-3">
                      NAV as of Apr {i === 0 ? "3" : "6"}, 2026
                    </p>

                    <div className="grid grid-cols-2 gap-y-3 md:grid-cols-5 md:gap-10 text-xs md:text-sm mb-4">
                      <div>
                        <p className="text-gray-400">NAV</p>
                        <p className="font-semibold">$100.00</p>
                      </div>

                      <div>
                        <p className="text-gray-400">Risk</p>
                        <p className="text-yellow-500 font-semibold">Medium</p>
                      </div>

                      <div>
                        <p className="text-gray-400">5yr Return</p>
                        <p className="text-green-500 font-semibold">
                          {i === 0 ? "80000%" : "12000%"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">Min</p>
                        <p className="font-semibold">
                          {i === 0 ? "$1.2k" : "$12k"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">Size</p>
                        <p className="font-semibold">$0</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-3">
                      <button className="border px-3 py-1.5 rounded-full text-xs md:text-sm">
                        View
                      </button>
                    <button
  onClick={() => router.push("/fund")}
  className="bg-[#0f172a] text-white px-3 py-1.5 rounded-full text-xs md:text-sm"
>
  Invest
</button>
                      <button className="border w-8 h-8 rounded-full flex items-center justify-center text-xs">
                        🔖
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-14 h-14 md:w-24 md:h-24 bg-orange-200 rounded-full self-center"></div>
              </div>
            ))}
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full md:w-80 px-4 md:px-6 py-6 md:py-8 space-y-5">

            <div className="relative rounded-2xl overflow-hidden h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1674027444485-cec3da58eef4"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/60 via-orange-200/60 to-yellow-200/60"></div>

              <div className="relative z-10 p-4 md:p-6">
                <h3 className="font-semibold text-sm md:text-lg mb-1">
                  Real-time analysis
                </h3>
                <p className="text-xs md:text-sm mb-3">
                  AI insights
                </p>
                <button className="bg-white px-4 py-1.5 rounded-full text-xs md:text-sm shadow">
                  Learn
                </button>
              </div>
            </div>

            <div className="bg-white p-4 md:p-5 rounded-2xl border shadow-sm">
              <h3 className="font-semibold mb-1 text-sm md:text-base">
                Top Movers
              </h3>
              <p className="text-gray-400 text-xs md:text-sm mb-3">
                Highest returns
              </p>

              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span>TCG</span>
                  <span className="text-green-500">+24000%</span>
                </div>
                <div className="flex justify-between">
                  <span>Global</span>
                  <span className="text-green-500">+500%</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden h-[160px]">
              <img
                src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d1"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-purple-200/70"></div>

              <div className="relative z-10 p-4 md:p-6">
                <p className="text-xs md:text-sm mb-3">
                  Financial guidance
                </p>
                <button className="bg-white px-4 py-1.5 rounded-full text-xs md:text-sm shadow">
                  Explore
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}