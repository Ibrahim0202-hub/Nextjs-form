"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Fund {
  id: number;
  fund_name: string;
  category: string;
  amount: number;
  returns_percent: number;
  risk_level: string;
  description: string;
  created_at: string;
  isin: string;
  share_class: string;
  investor_category: string;
  target_aum: number;
  min_investment: number;
  management_fee: number;
  performance_fee: number;
  hurdle_rate: number;
  high_water_mark: boolean;
}

interface User {
  name: string;
  email: string;
}

export default function InvestPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [activeTab, setActiveTab] = useState<"summary" | "details">("summary");
  const [fund, setFund] = useState<Fund | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [investAmount, setInvestAmount] = useState("");
  const [frequency, setFrequency] = useState("One-time");
  const [placing, setPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/me");
      if (!res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setUser(data.user);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchFund = async () => {
      try {
        const res = await fetch(`/api/fund/${id}`);
        const data = await res.json();
        if (data.fund) {
          setFund(data.fund);
          setInvestAmount(data.fund.min_investment?.toString() || "1200");
        } else {
          setError("Fund not found");
        }
      } catch (err) {
        setError("Failed to load fund");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchFund();
  }, [id]);

  const handlePlaceOrder = async () => {
    setPlacing(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fund_id: Number(id),
        amount: Number(investAmount),
        frequency,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setOrderSuccess(true);
    } else {
      alert("Failed to place order. Please try again.");
    }
    setPlacing(false);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-blue-500">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6]">

      {/* TOPBAR */}
      <div className="h-[58px] bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🟡</span>
          <span className="font-semibold text-sm">GFS</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1100px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">

        {/* LEFT */}
        <div className="flex-1">

          {/* BACK */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-gray-500 mb-6 hover:text-black"
          >
            ← BACK
          </button>

          <h1 className="text-2xl font-bold mb-1">Investment Details</h1>
          <p className="text-sm text-gray-400 mb-6">Below is your order summary. Please read it carefully before confirming the order.</p>

          {/* TABS */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("summary")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeTab === "summary" ? "bg-[#0f172a] text-white" : "bg-white border border-gray-200 text-gray-500"}`}
            >
              Investment Summary
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeTab === "details" ? "bg-[#0f172a] text-white" : "bg-white border border-gray-200 text-gray-500"}`}
            >
              Fund Details
            </button>
          </div>

          {/* TAB 1 — INVESTMENT SUMMARY */}
          {activeTab === "summary" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                  <span className="text-white text-xs">🏠</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{fund?.fund_name}</p>
                  <p className="text-xs text-blue-600 mt-1">Important: You will be subscribed to the upcoming series.</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-1">Investment Account</label>
                <input
                  type="text"
                  value={user?.email || ""}
                  readOnly
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-gray-50 text-gray-500"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-1">Investment Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white"
                >
                  <option>One-time</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Annually</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700 block mb-1">Investment Amount (USD)</label>
                <input
                  type="number"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  ⓘ Min Investment: ${Number(fund?.min_investment).toLocaleString()}.00
                </p>
              </div>

            </div>
          )}

          {/* TAB 2 — FUND DETAILS */}
          {activeTab === "details" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">

              <p className="text-xs font-semibold text-gray-500 mb-4">FUND DETAILS</p>

              {[
                { label: "ISIN", value: fund?.isin || "—" },
                { label: "Share Class", value: fund?.share_class || "—" },
                { label: "Investor Category", value: fund?.investor_category || "—", bold: true },
                { label: "Inception date", value: fund?.created_at ? new Date(fund.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—" },
                { label: "Fund AUM", value: `$${Number(fund?.amount).toLocaleString()}.00` },
                { label: "Target AUM", value: `$${Number(fund?.target_aum).toLocaleString()}.00` },
                { label: "Risk Level", value: fund?.risk_level || "—", bold: true },
                { label: "Category", value: fund?.category || "—" },
                { label: "Min Investment", value: `$${Number(fund?.min_investment).toLocaleString()}.00` },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className={`text-sm ${item.bold ? "font-semibold" : ""}`}>{item.value}</span>
                </div>
              ))}

              <p className="text-xs font-semibold text-gray-500 mt-6 mb-4">FEES</p>

              {[
                { label: "Fund Management Fee", value: `${fund?.management_fee}%` },
                { label: "Fund Performance Fee", value: `${fund?.performance_fee}%` },
                { label: "Hurdle Rate", value: `${fund?.hurdle_rate}%`, link: true },
                { label: "High Water Mark", value: fund?.high_water_mark ? "Yes" : "No", link: true },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <span className={`text-sm ${item.link ? "text-teal-600 flex items-center gap-1" : "text-gray-400"}`}>
                    {item.link && "↗ "}{item.label}
                  </span>
                  <span className="text-sm">{item.value}</span>
                </div>
              ))}

            </div>
          )}
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="w-full lg:w-[280px]">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-6">

            <div className="flex gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-400 text-xs">ⓘ</span>
              <p className="text-xs text-gray-500 leading-5">Due to the Banking process of getting the credit in account, the redemption proceeds or dividend credit will take 2 business days to be available as withdrawable or investable.</p>
            </div>

            <p className="text-sm text-gray-400 mb-1">Order Value:</p>
            <p className="text-2xl font-bold mb-4">
              ${Number(investAmount || 0).toLocaleString()}.00
            </p>

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold text-sm transition disabled:opacity-50"
            >
              {placing ? "Placing..." : "Place Order"}
            </button>

            {orderSuccess && (
              <p className="text-green-600 text-xs text-center mt-3 font-medium">
                ✅ Order placed successfully!
              </p>
            )}

            <p className="text-xs text-gray-400 mt-3 flex gap-1">
              <span>ⓘ</span>
              The net banking details will be provided to you once the order is confirmed for deposit.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}