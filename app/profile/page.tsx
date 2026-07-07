"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/me");
      if (!res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setUser(data.user);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen text-blue-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6]">

      {/* TOPBAR */}
      <div className="h-[58px] bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🟡</span>
          <span className="font-semibold text-sm">GFS</span>
        </div>
        <button onClick={() => router.push("/dashboard")} className="text-sm text-gray-500 hover:text-black">
          ← Back to Dashboard
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-[600px] mx-auto px-4 py-10">

        {/* AVATAR */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-white text-2xl font-bold mb-3">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>

        {/* PROFILE DETAILS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-4">ACCOUNT INFORMATION</p>
          {[
            { label: "Full Name", value: user?.name || "—" },
            { label: "Email Address", value: user?.email || "—" },
            { label: "Account Type", value: "Investor" },
            { label: "Account Status", value: "Active" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-400">{item.label}</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        {/* SECURITY */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-4">SECURITY</p>
          {[
            { label: "Password", value: "••••••••" },
            { label: "Two Factor Auth", value: "Not Enabled" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-400">{item.label}</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        {/* LOGOUT */}
        <button
          onClick={async () => {
            await fetch("/api/logout", { method: "POST" });
            router.push("/login");
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold text-sm transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}