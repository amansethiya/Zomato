import React, { useState } from "react";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreatorRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    creatorusername: "",
    creatoremail: "",
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
      await axios.post(
        "http://localhost:3000/auth/creator/register",
        formData,
        {
          withCredentials: true,
        },
      );
      navigate("/creatorDashboard");
    } catch (err) {
      console.log(err);
    }
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
                🎥 FoodieHub Creators
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Share your food.
                <br />
                <span className="text-purple-100">Build your community.</span>
              </h1>

              <p className="mt-6 leading-7 text-purple-100">
                Create your creator account and share your recipes, cooking
                videos and food experiences with food lovers.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    🎬
                  </span>

                  <span>Upload your food videos</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    👥
                  </span>

                  <span>Connect with food lovers</span>
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
            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
                Creator Account
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Become a creator
              </h2>

              <p className="mt-2 text-gray-500">
                Create your account and start sharing your food content.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* creatorusername */}
              <div>
                <label
                  htmlFor="creatorusername"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  creatorusername
                </label>

                <input
                  id="creatorusername"
                  name="creatorusername"
                  type="text"
                  value={formData.creatorusername}
                  onChange={handleChange}
                  placeholder="Enter your creatorusername"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* creatoremail */}
              <div>
                <label
                  htmlFor="creatoremail"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  creatoremail Address
                </label>

                <input
                  id="creatoremail"
                  name="creatoremail"
                  type="email"
                  value={formData.creatoremail}
                  onChange={handleChange}
                  placeholder="creator@example.com"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
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

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />

                <label
                  htmlFor="terms"
                  className="text-sm leading-5 text-gray-500"
                >
                  I agree to the creator terms and community guidelines.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-purple-600 py-3.5 font-semibold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-100"
              >
                Create Creator Account
              </button>
            </form>

            {/* Login */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Already a creator?{" "}
              <Link
                to="/creator/login"
                className="font-semibold text-purple-600 hover:text-purple-700"
              >
                Login
              </Link>
            </p>

            {/* Normal User */}
            <p className="mt-5 text-center text-sm text-gray-500">
              Want a normal account?{" "}
              <Link
                to="/user/register"
                className="font-semibold text-gray-700 hover:text-purple-600"
              >
                Sign up as a user
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorRegister;
