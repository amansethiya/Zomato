import React, { useState } from "react";
import "../../index.css";
import axios from "axios";

import { Link } from "react-router-dom";

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/auth/user/register", formData);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="mx-auto flex min-h-[90vh] max-w-6xl items-center justify-center">
        {/* Main Card */}
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
          {/* Left Side */}
          <div className="hidden bg-orange-500 p-10 text-white md:flex md:flex-col md:justify-center">
            <div className="max-w-md">
              <p className="text-lg font-medium text-orange-100">
                🍴 Welcome to FoodieHub
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Discover food.
                <br />
                Share your passion.
              </h1>

              <p className="mt-6 leading-7 text-orange-100">
                Join our food community and discover amazing food videos,
                recipes and creators from around the community.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    🎥
                  </span>
                  <span>Discover food videos</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    👨‍🍳
                  </span>
                  <span>Follow amazing creators</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    ❤️
                  </span>
                  <span>Be part of the community</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="p-6 sm:p-10 md:p-12">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-orange-500">
              FoodieHub
            </Link>

            <div className="mt-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Create your account
              </h2>

              <p className="mt-2 text-gray-500">
                Join the FoodieHub community today.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullname"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-orange-500 hover:text-orange-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-100"
              >
                Create Account
              </button>
            </form>

            {/* Login */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/user/login"
                className="font-semibold text-orange-500 hover:text-orange-600"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
