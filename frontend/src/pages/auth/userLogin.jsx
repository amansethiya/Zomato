import React, { useState } from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/auth/user/login", formData, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
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
                🍴 Welcome Back
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Your food
                <br />
                community awaits.
              </h1>

              <p className="mt-6 leading-7 text-orange-100">
                Login to discover delicious food videos, explore creators and
                enjoy the FoodieHub community.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    🎥
                  </span>
                  <span>Watch food videos</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    🔥
                  </span>
                  <span>Discover trending content</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    ❤️
                  </span>
                  <span>Connect with food lovers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-6 sm:p-10 md:p-12">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-orange-500">
              FoodieHub
            </Link>

            {/* Heading */}
            <div className="mt-10">
              <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>

              <p className="mt-2 text-gray-500">
                Login to continue to FoodieHub.
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
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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
                    to="/forgot-password"
                    className="text-sm font-medium text-orange-500 hover:text-orange-600"
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
                Login
              </button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/user/register"
                className="font-semibold text-orange-500 hover:text-orange-600"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
