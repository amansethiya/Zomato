import React, { useState } from "react";
import "../../index.css";
import { Link } from "react-router-dom";

const CreatorLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Creator Login Data:", formData);

    // Connect your backend here
    // axios.post("/api/food-partner/login", formData)
  };

  return (
    <div className="min-h-screen bg-purple-50 px-4 py-10">
      <div className="mx-auto flex min-h-[90vh] max-w-6xl items-center justify-center">
        {/* Main Card */}
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
          {/* ================= LEFT SIDE ================= */}
          <div className="hidden bg-purple-600 p-10 text-white md:flex md:flex-col md:justify-center">
            <div className="max-w-md">
              <p className="text-lg font-medium text-purple-100">
                🎥 Welcome Back, Creator
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Your food.
                <br />
                Your audience.
              </h1>

              <p className="mt-6 leading-7 text-purple-100">
                Login to manage your creator profile, share food videos and
                connect with your community.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    🎬
                  </span>

                  <span>Share your latest videos</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    👥
                  </span>

                  <span>Connect with your audience</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    🚀
                  </span>

                  <span>Grow your creator profile</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="p-6 sm:p-10 md:p-12">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-purple-600">
              FoodieHub
            </Link>

            {/* Heading */}
            <div className="mt-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
                Creator Account
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Welcome back
              </h2>

              <p className="mt-2 text-gray-500">
                Login to continue to your creator account.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                  placeholder="creator@example.com"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/creator/forgot-password"
                    className="text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-purple-600 py-3.5 font-semibold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-100"
              >
                Login as Creator
              </button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have a creator account?{" "}
              <Link
                to="/creator/register"
                className="font-semibold text-purple-600 hover:text-purple-700"
              >
                Create one
              </Link>
            </p>

            {/* Normal User Login */}
            <p className="mt-5 text-center text-sm text-gray-500">
              Are you a food lover?{" "}
              <Link
                to="/user/login"
                className="font-semibold text-gray-700 hover:text-purple-600"
              >
                Login as user
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorLogin;
