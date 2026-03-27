"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // ✅ NEW: message state
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    // ✅ NEW: show success message
    setMessage("Signup successful ✅");

    // ✅ NEW: clear form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-black">

      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-10 py-8 md:py-12">
        <div className="w-full max-w-md sm:max-w-lg">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <h1 className="font-semibold text-lg">GFS</h1>
            <p className="text-sm">
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer">Log in</span>
            </p>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            Explore our funds today
          </h2>
          <p className="text-sm sm:text-base mb-6">
            Create your free account and view our funds in just a few steps.
          </p>

          {/* ✅ NEW: success message UI */}
          {message && (
            <p className="text-green-600 font-semibold mb-3">
              {message}
            </p>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="text-sm mb-1 block">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}   // ✅ added
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-full">
                <label className="text-sm mb-1 block">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}   // ✅ added
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm mb-1 block">Country</label>
              <select className="w-full border border-gray-300 rounded-lg p-3">
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>

            <div>
              <label className="text-sm mb-1 block">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}   // ✅ added
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}   // ✅ added
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-3 md:py-4 rounded-lg text-sm md:text-base hover:bg-blue-700 transition">
              Sign up
            </button>

            <p className="text-xs sm:text-sm">
              I have read and agree to Terms of Service and Privacy Notice.
            </p>

            <p className="text-sm">
              Have a Kristal referral code?
            </p>

          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-md w-full">

          <Image
            src="/myimage.jpg"
            alt="finance"
            width={500}
            height={300}
            className="w-full h-auto rounded-xl mb-4"
          />

          <div className="flex justify-center gap-2 mb-4">
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-6 h-2 bg-blue-600 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center">
            Consistently Performing Portfolios
          </h3>

          <ul className="space-y-2 text-sm sm:text-base text-gray-600">
            <li>✔ Lorem ipsum dolor sit amet</li>
            <li>✔ Lorem ipsum dolor sit amet</li>
            <li>✔ Lorem ipsum dolor sit amet</li>
          </ul>

        </div>
      </div>

    </div>
  );
}