"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Fund {
  id: number;
  fund_name: string;
  category: string;
  amount: number;
  returns_percent: number;
  risk_level: string;
  description: string;
  created_at: string;
}

// ✅ Added Performance interface
interface Performance {
  year: string;
  value: number;
}

export default function FundDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [menuOpen, setMenuOpen] = useState(false);
  const [amount, setAmount] = useState(5000);
  const [fund, setFund] = useState<Fund | null>(null);
  const [allFunds, setAllFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // ✅ Dynamic chart data
  const [chartData, setChartData] = useState<Performance[]>([]);

  const years = 5;
  const finalAmount = fund
    ? Math.round(amount * Math.pow(1 + fund.returns_percent / 100, years))
    : 0;

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // ✅ Auth check
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/me");
      if (!res.ok) router.push("/login");
    };
    checkAuth();
  }, []);

  // ✅ Fetch fund + all funds + performance data
  useEffect(() => {
    const fetchFund = async () => {
      try {
        const [fundRes, allFundsRes, perfRes] = await Promise.all([
          fetch(`/api/fund/${id}`),
          fetch("/api/fund"),
          fetch(`/api/fund/${id}/performance`),
        ]);

        const fundData = await fundRes.json();
        const allFundsData = await allFundsRes.json();
        const perfData = await perfRes.json();

        if (fundData.fund) {
          setFund(fundData.fund);
        } else {
          setError("Fund not found");
        }

        if (allFundsData.funds) {
          setAllFunds(allFundsData.funds);
        }

        if (perfData.performance) {
          setChartData(perfData.performance);
        }

      } catch (err) {
        setError("Failed to load fund data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFund();
  }, [id]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-blue-500">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">

      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* MOBILE SIDEBAR */}
      <div className={`fixed top-0 left-0 h-full w-[220px] bg-white z-50 p-5 transform transition-all duration-300 md:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <h1 className="font-semibold text-sm mb-8">🟡 GFS</h1>
        <ul className="space-y-2 text-[13px] text-gray-500">
          <li onClick={() => router.push("/dashboard")} className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">🔍 Explore</li>
          <li className="px-3 py-2 rounded-lg hover:bg-gray-100">👤 Profile</li>
          <li className="px-3 py-2 rounded-lg hover:bg-gray-100">📞 Contact Us</li>
          <li className="px-3 py-2 rounded-lg hover:bg-gray-100">⚙️ Admin Panel</li>
        </ul>
        <button onClick={handleLogout} className="absolute bottom-6 left-5 text-red-500 text-xs">Logout</button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex w-[220px] bg-white border-r border-gray-200 flex-col justify-between px-5 py-6">
        <div>
          <h1 className="font-semibold text-sm mb-8">🟡 GFS</h1>
          <ul className="space-y-2 text-[13px] text-gray-500">
            <li onClick={() => router.push("/dashboard")} className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">🔍 Explore</li>
            <li className="px-3 py-2 rounded-lg hover:bg-gray-100">👤 Profile</li>
            <li className="px-3 py-2 rounded-lg hover:bg-gray-100">📞 Contact Us</li>
            <li className="px-3 py-2 rounded-lg hover:bg-gray-100">⚙️ Admin Panel</li>
          </ul>
        </div>
        <button onClick={handleLogout} className="text-red-500 text-xs">Logout</button>
      </div>

      {/* MAIN */}
      <div className="flex-1 min-w-0">

        {/* TOPBAR */}
        <div className="h-[58px] bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setMenuOpen(true)}>☰</button>
            <h1 className="text-sm font-semibold">GFS</h1>
          </div>
          <div className="hidden md:block text-[12px] text-gray-400">
            Dashboard &gt; Funds &gt;
            <span className="text-black font-medium"> {fund?.fund_name}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">🔔</span>
            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-[10px]">TC</div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="max-w-[980px] mx-auto p-3 md:p-5">

          {/* FUND HEADER */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-sm">💎</div>
                <div>
                  <h2 className="text-sm font-semibold">{fund?.fund_name}</h2>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-[10px]">{fund?.category}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-[10px]">{fund?.risk_level} Risk</span>
                  </div>
                </div>
              </div>
              <button className="bg-blue-600 text-white text-[11px] px-4 h-8 rounded-full">Invest Now</button>
            </div>

            {/* RETURN BANNER */}
            <div className="mt-4 bg-[#f7f8fc] border border-gray-100 rounded-xl px-3 py-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-gray-400">Returns since inception</p>
                <p className="text-green-600 text-sm font-semibold">{fund?.returns_percent}% ↗</p>
              </div>
              <div className="text-[11px] text-gray-400">
                Fund Size: ${Number(fund?.amount).toLocaleString()}
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 mt-4 border border-gray-100 rounded-xl overflow-hidden">
              <div className="p-3 border-r border-gray-100">
                <p className="text-[10px] text-gray-400">Category</p>
                <p className="text-sm font-semibold mt-1">{fund?.category}</p>
              </div>
              <div className="p-3 border-r border-gray-100">
                <p className="text-[10px] text-gray-400">Risk Level</p>
                <p className="text-sm font-semibold mt-1">{fund?.risk_level}</p>
              </div>
              <div className="p-3">
                <p className="text-[10px] text-gray-400">Fund Size</p>
                <p className="text-sm font-semibold mt-1">${Number(fund?.amount).toLocaleString()}</p>
              </div>
            </div>

            {/* TABS */}
            <div className="flex gap-2 overflow-x-auto mt-4 pb-1">
              {["Returns", "Performance", "Key Metrics", "Fund Details", "Investment Details", "About", "Documents"].map((tab, i) => (
                <button key={i} className={`whitespace-nowrap px-3 h-8 rounded-full text-[11px] ${i === 0 ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* GRAPH - ✅ Now dynamic */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] text-gray-400">RETURNS</p>
                <p className="text-[12px] text-gray-500 mt-1">Returns performance based on historical NAV data.</p>
              </div>
              <div className="flex gap-2">
                <button className="border border-gray-200 text-[10px] rounded-full px-3 h-7">💬 CHAT</button>
                <button className="border border-gray-200 text-[10px] rounded-full px-3 h-7">↗ WEB STORY</button>
              </div>
            </div>
            <div className="h-44 md:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CALCULATOR */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
            <p className="text-[11px] font-semibold mb-3">RETURNS CALCULATOR</p>
            <div className="flex gap-2 mb-4">
              <button className="bg-black text-white text-[10px] rounded-full px-3 h-7">1 year</button>
              <button className="bg-gray-100 text-gray-500 text-[10px] rounded-full px-3 h-7">3 years</button>
              <button className="bg-gray-100 text-gray-500 text-[10px] rounded-full px-3 h-7">5 years</button>
            </div>
            <p className="text-[11px] text-gray-400 mb-2">USD 5,000 to start</p>
            <input type="range" min="1000" max="100000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full" />
            <div className="mt-4">
              <p className="text-[12px] text-gray-400">Would have become</p>
              <p className="text-xl font-semibold">${finalAmount.toLocaleString()}</p>
              <p className="text-green-600 text-sm font-semibold">{fund?.returns_percent}% p.a.</p>
            </div>
          </div>

          {/* MONTH TABLE */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
            <p className="text-[11px] font-semibold mb-4">MONTH ON MONTH RETURNS</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] border border-gray-100 rounded-xl overflow-hidden">
                <thead className="bg-[#fafafa]">
                  <tr>
                    <th className="p-2 text-left">Month</th>
                    <th className="p-2">2025</th>
                    <th className="p-2">2024</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((month, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-2 text-left">{month}</td>
                      <td className="p-2 text-gray-300 text-center">—</td>
                      <td className="p-2 text-gray-300 text-center">—</td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-100 bg-[#fafafa]">
                    <td className="p-2 font-medium">YTD</td>
                    <td className="p-2 text-gray-300 text-center">—</td>
                    <td className="p-2 text-gray-300 text-center">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* KEY METRICS */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
            <p className="text-[11px] font-semibold mb-4">KEY METRICS</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-[#f7f7f7] rounded-xl p-4">
                <p className="text-[10px] text-gray-400">Returns</p>
                <p className="text-base font-semibold mt-1">{fund?.returns_percent}%</p>
              </div>
              <div className="bg-[#f7f7f7] rounded-xl p-4">
                <p className="text-[10px] text-gray-400">Risk Level</p>
                <p className="text-base font-semibold mt-1">{fund?.risk_level}</p>
              </div>
              <div className="bg-[#f7f7f7] rounded-xl p-4">
                <p className="text-[10px] text-gray-400">Fund Size</p>
                <p className="text-base font-semibold mt-1">${Number(fund?.amount).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* FUND DETAILS */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
            <p className="text-[11px] font-semibold mb-4">FUND DETAILS</p>
            <div className="grid md:grid-cols-2 gap-5 text-[12px]">
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400">Category</p>
                  <p>{fund?.category}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p>Active</p>
                </div>
                <div>
                  <p className="text-gray-400">Risk Level</p>
                  <p>{fund?.risk_level}</p>
                </div>
                <div>
                  <p className="text-gray-400">Inception date</p>
                  <p>{fund?.created_at ? new Date(fund.created_at).toDateString() : "Not specified"}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400">Fund AUM</p>
                  <p>${Number(fund?.amount).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Returns</p>
                  <p className="text-green-600">{fund?.returns_percent}%</p>
                </div>
                <div>
                  <p className="text-gray-400">Drawdown Risk</p>
                  <p>{fund?.risk_level} Risk</p>
                </div>
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
            <p className="text-[11px] font-semibold mb-4">ABOUT {fund?.fund_name?.toUpperCase()}</p>
            <p className="text-[12px] text-gray-500 mb-4">{fund?.description || "No description available."}</p>
            <div className="flex gap-2 mt-5 flex-wrap">
              <span className="bg-gray-100 rounded-full px-3 py-1 text-[10px]">{fund?.category}</span>
              <span className="bg-gray-100 rounded-full px-3 py-1 text-[10px]">{fund?.risk_level} Risk</span>
              <span className="bg-gray-100 rounded-full px-3 py-1 text-[10px]">Active</span>
            </div>
          </div>

          {/* SIMILAR FUNDS */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
            <p className="text-[11px] font-semibold mb-4">SIMILAR FUNDS</p>
            {allFunds.filter(f => f.id !== fund?.id).map((f) => (
              <div key={f.id} className="border border-gray-100 rounded-xl p-3 mb-3 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <p className="text-[12px] font-semibold">{f.fund_name}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{f.description}</p>
                  <div className="flex flex-wrap gap-3 text-[10px] mt-2">
                    <p>Size: ${Number(f.amount).toLocaleString()}</p>
                    <p className="text-green-600">▲ {f.returns_percent}% p.a.</p>
                    <p>{f.risk_level} Risk</p>
                  </div>
                  <button onClick={() => router.push(`/fund/${f.id}`)} className="mt-3 bg-black text-white rounded-full px-4 h-8 text-[11px]">Invest Now</button>
                </div>
                <div className="w-10 h-10 rounded-full bg-pink-200 shrink-0" />
              </div>
            ))}
          </div>

          {/* DISCLAIMER */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <p className="text-[11px] font-semibold mb-3">Disclaimer</p>
            <p className="text-[10px] text-gray-400 leading-5">
              The recommendations contained herein are for exclusive use of investors and prohibit any form of disclosure. The content cannot be relied upon for any other purpose. Investments may suffer losses and investors should bear all risks.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}