"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setMessage("Login successful ✅");
        router.push("/dashboard");
      } else {
        setMessage(data.error || "Login failed ❌");
      }
    } catch (error) {
      setMessage("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-black">

      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex justify-center px-6 md:px-16 py-10">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-semibold text-lg flex items-center gap-2">⚫ GFS</h1>
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 font-medium">Sign up</a>
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-2">Login to your account</h2>
          <p className="text-sm mb-6 text-gray-500">Enter your credentials to login.</p>

          {message && (
            <p className={`font-semibold mb-3 ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200"
            />
            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-full font-semibold disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-10">
        <div className="max-w-md w-full text-center">
          <Image src="/myimage.jpg" alt="finance" width={500} height={300} className="rounded-2xl mb-4" />
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-6 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <h3 className="text-lg font-semibold mb-4">Consistently Performing Portfolios</h3>
          <ul className="text-gray-600 text-sm space-y-3 text-left">
            <li>✔ Lorem ipsum dolor sit amet</li>
            <li>✔ Lorem ipsum dolor sit amet</li>
            <li>✔ Lorem ipsum dolor sit amet</li>
          </ul>
        </div>
      </div>

    </div>
  );
}