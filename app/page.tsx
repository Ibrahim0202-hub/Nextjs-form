"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
  });

  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // FETCH USERS
  const fetchUsers = async () => {
    const res = await fetch("/api/signup");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // DELETE USER
  const deleteUser = async (id: number) => {
    await fetch("/api/signup", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchUsers();
  };

  // EDIT USER
  const editUser = (user: any) => {
    setFormData({
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      password: user.password,
      country: user.country,
    });
  };

  // SUBMIT FORM
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful ✅");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          country: "",
        });

        fetchUsers();
      } else {
        setMessage("Signup failed ❌");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      setMessage("Server error ❌");
    }
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

          {/* MESSAGE */}
          {message && (
            <p
              className={`font-semibold mb-3 ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
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
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div className="w-full">
                <label className="text-sm mb-1 block">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>
            </div>

            <div>
              <label className="text-sm mb-1 block">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="">Select country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>

            <div>
              <label className="text-sm mb-1 block">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
              Sign up
            </button>
          </form>

          {/* USERS LIST */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">Users List</h2>

            {users.map((user) => (
              <div
                key={user.id}
                className="border p-3 rounded-lg mb-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => editUser(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>

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

          <h3 className="text-lg font-semibold mb-3 text-center">
            Consistently Performing Portfolios
          </h3>

          {/* ✅ EXACT PLACE WHERE YOUR LIST BELONGS */}
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