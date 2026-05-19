"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Fund {
  id: number;
  fund_name: string;
  category: string;
  amount: number;
  returns_percent: number;
  risk_level: string;
  description: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await fetch("/api/fund");
        const data = await res.json();
        if (data.funds) {
          setFunds(data.funds);
        } else {
          setError("Failed to load funds");
        }
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchFunds();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f6f7fb]">

      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* MOBILE SIDEBAR */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white border-r px-6 py-6 flex flex-col justify-between z-50 transform transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <h1 className="text-xl font-bold mb-10 flex items-center gap-2">🪙 GFS</h1>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg font-medium">🔍 Explore</li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">👤 Profile</li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">📞 Contact us</li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">⚙️ Admin Panel</li>
          </ul>
        </div>
        <button onClick={() => router.push("/")} className="text-red-500 text-sm font-medium">Logout</button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex w-64 bg-white border-r px-6 py-6 flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-10 flex items-center gap-2">🪙 GFS</h1>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg font-medium">🔍 Explore</li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">👤 Profile</li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">📞 Contact us</li>
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg">⚙️ Admin Panel</li>
          </ul>
        </div>
        <button onClick={() => router.push("/")} className="text-red-500 text-sm font-medium">Logout</button>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <div className="flex justify-between items-center px-4 md:px-8 py-4 bg-white border-b">
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setMenuOpen(true)} className="text-2xl font-bold text-black">☰</button>
            <h1 className="font-bold">🪙 GFS</h1>
          </div>
          <div className="hidden md:block">
            <h1 className="font-bold">🪙 GFS</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg">🔔</span>
            <div className="w-8 h-8 md:w-9 md:h-9 bg-black text-white rounded-full flex items-center justify-center text-xs md:text-sm font-semibold">TC</div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col md:flex-row">

          {/* CENTER */}
          <div className="flex-1 px-4 md:px-10 py-6 md:py-8">

            <h1 className="text-2xl md:text-3xl font-bold mb-2">All Funds</h1>
            <p className="text-gray-500 mb-6 text-sm md:text-base">Live fund data from our database</p>

            {/* TABS */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
              <button className="bg-[#0f172a] text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium">All Funds</button>
              <button className="border px-4 md:px-6 py-2 rounded-full text-gray-500 text-xs md:text-sm">Equity</button>
              <button className="border px-4 md:px-6 py-2 rounded-full text-gray-500 text-xs md:text-sm">Debt</button>
              <button className="border px-4 md:px-6 py-2 rounded-full text-gray-500 text-xs md:text-sm">Hybrid</button>
            </div>

            {/* FILTERS */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-xs md:text-sm mb-6">
              <p className="font-semibold">{funds.length} funds</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-500">Sort by:</span>
                <select className="border px-2 py-1 rounded-md bg-white">
                  <option>Returns</option>
                </select>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-500">Risk Level:</span>
                <select className="border px-2 py-1 rounded-md bg-white">
                  <option>All</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            {/* LOADING / ERROR */}
            {loading && <p className="text-blue-500">Loading funds...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* FUND CARDS - DYNAMIC */}
            {funds.map((fund) => (
              <div key={fund.id} className="bg-white rounded-2xl p-4 md:p-6 mb-5 border shadow-sm flex flex-col md:flex-row gap-4 md:justify-between">
                <div className="flex gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center text-sm md:text-lg">📊</div>
                  <div>
                    <h2 className="font-semibold text-sm md:text-lg">{fund.fund_name}</h2>
                    <p className="text-gray-500 text-xs md:text-sm mb-1">{fund.description}</p>
                    <p className="text-xs text-gray-400 mb-3">Category: {fund.category}</p>

                    <div className="grid grid-cols-2 gap-y-3 md:grid-cols-4 md:gap-10 text-xs md:text-sm mb-4">
                      <div>
                        <p className="text-gray-400">Risk</p>
                        <p className={`font-semibold ${fund.risk_level === "High" ? "text-red-500" : fund.risk_level === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                          {fund.risk_level}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Returns</p>
                        <p className="text-green-500 font-semibold">{fund.returns_percent}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Fund Size</p>
                        <p className="font-semibold">${Number(fund.amount).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Category</p>
                        <p className="font-semibold">{fund.category}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-3">
                      <button className="border px-3 py-1.5 rounded-full text-xs md:text-sm">View</button>
                      <button onClick={() => router.push("/fund")} className="bg-[#0f172a] text-white px-3 py-1.5 rounded-full text-xs md:text-sm">Invest</button>
                      <button className="border w-8 h-8 rounded-full flex items-center justify-center text-xs">🔖</button>
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
              <img src="https://images.unsplash.com/photo-1674027444485-cec3da58eef4" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/60 via-orange-200/60 to-yellow-200/60"></div>
              <div className="relative z-10 p-4 md:p-6">
                <h3 className="font-semibold text-sm md:text-lg mb-1">Real-time analysis</h3>
                <p className="text-xs md:text-sm mb-3">AI insights</p>
                <button className="bg-white px-4 py-1.5 rounded-full text-xs md:text-sm shadow">Learn</button>
              </div>
            </div>

            {/* TOP MOVERS - DYNAMIC */}
            <div className="bg-white p-4 md:p-5 rounded-2xl border shadow-sm">
              <h3 className="font-semibold mb-1 text-sm md:text-base">Top Movers</h3>
              <p className="text-gray-400 text-xs md:text-sm mb-3">Highest returns</p>
              <div className="space-y-3 text-xs md:text-sm">
                {funds
                  .sort((a, b) => b.returns_percent - a.returns_percent)
                  .slice(0, 3)
                  .map((fund) => (
                    <div key={fund.id} className="flex justify-between">
                      <span>{fund.fund_name.split(" ")[0]}</span>
                      <span className="text-green-500">+{fund.returns_percent}%</span>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}