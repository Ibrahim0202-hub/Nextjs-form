"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Fund {
  id: number;
  fund_name: string;
}

export default function OrderConfirmPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id;

  const [fund, setFund] = useState<Fund | null>(null);
  const amount = searchParams.get("amount") || "0";
  const frequency = searchParams.get("frequency") || "One-time";
  const appId = "APP" + Date.now();
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });

  useEffect(() => {
    const fetchFund = async () => {
      const res = await fetch(`/api/fund/${id}`);
      const data = await res.json();
      if (data.fund) setFund(data.fund);
    };
    if (id) fetchFund();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#f3f4f6]">

      {/* TOPBAR */}
      <div className="h-[58px] bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold">H</div>
          <span className="font-semibold text-sm">GFS</span>
        </div>
        <button onClick={() => window.print()} className="text-gray-400 hover:text-black text-lg">🖨️</button>
      </div>

      {/* CONTENT */}
      <div className="max-w-[680px] mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-8">

          {/* SUCCESS */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h1 className="text-xl font-bold mb-1">Order Placed!</h1>
            <p className="text-xs text-gray-400">Application ID: {appId}</p>
            <p className="text-sm text-gray-500 mt-2">Fund Name:</p>
            <p className="text-base font-bold">{fund?.fund_name || "Loading..."}</p>
          </div>

          {/* ORDER DETAILS */}
          <div className="border border-gray-100 rounded-xl overflow-hidden mb-6">
            {[
              { label: "Investment Amount", value: `$${Number(amount).toLocaleString()}.00` },
              { label: "Investment Frequency", value: frequency },
              { label: "Status", value: "Pending", orange: true },
              { label: "Date of Investment", value: today },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center px-5 py-4 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className={`text-sm font-medium ${item.orange ? "text-orange-500" : ""}`}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* BANK DETAILS */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-1">Deposit details for fund Investment.</h2>
            <p className="text-xs text-gray-400 mb-4">Please initiate a bank transfer to the below account</p>

            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-5 py-3">
                <p className="text-xs font-semibold text-gray-500">ACCOUNT DETAILS</p>
              </div>
              {[
                { label: "Account No.", value: "MU0646S00002" },
                { label: "Account Name", value: "GFS ABC" },
                { label: "Account ID", value: "S-123456-1-SDG-1" },
                { label: "Bank Name & Address", value: "S-123456-1-SDG-1" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center px-5 py-4 border-t border-gray-100">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NOTE */}
          <div className="border border-gray-100 rounded-xl p-4 mb-6 flex gap-3">
            <span className="text-gray-400 text-sm">ⓘ</span>
            <div>
              <p className="text-sm font-medium mb-1">Note</p>
              <p className="text-xs text-gray-500 leading-5">To proceed with your investment, please make a deposit using the account details provided above. Ensure to double-check all details before initiating the payment. If you have questions, contact our support team for assistance.</p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => router.push(`/fund/${id}`)}
              className="flex-1 border border-gray-200 text-sm py-3 rounded-full hover:bg-gray-50 text-gray-700 font-medium"
            >
              View Fund Details
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex-1 border border-gray-200 text-sm py-3 rounded-full hover:bg-gray-50 text-gray-700 font-medium"
            >
              View Order History
            </button>
          </div>

          {/* HELP */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold mb-2">Need Help?</h3>
            <p className="text-xs text-gray-400 mb-4">For any queries or assistance regarding your deposit or investment, please reach to us using the below contact details. Our support team is happy to assist you</p>
            <div className="flex gap-6 text-xs text-gray-500">
              <span>Toll-free number : <strong>1800-555-0199</strong></span>
              <span>Email: <strong className="text-black">support@gfs.com</strong></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}