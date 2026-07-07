"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    setSent(true);
  };

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

        <h1 className="text-2xl font-bold mb-1">Contact Us</h1>
        <p className="text-sm text-gray-400 mb-8">Have a question? We're here to help.</p>

        {sent ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h2 className="text-lg font-bold mb-2">Message Sent!</h2>
            <p className="text-sm text-gray-400 mb-6">Our support team will get back to you within 24 hours.</p>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-black text-white px-6 py-2 rounded-full text-sm"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold text-sm transition"
            >
              Send Message
            </button>
          </div>
        )}

        {/* CONTACT INFO */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-xs font-semibold text-gray-500 mb-4">OTHER WAYS TO REACH US</p>
          {[
            { label: "Toll-free Number", value: "1800-555-0199" },
            { label: "Email", value: "support@gfs.com" },
            { label: "Working Hours", value: "Mon–Fri, 9am–6pm" },
            { label: "Office", value: "GFS HQ, Financial District" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-400">{item.label}</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}