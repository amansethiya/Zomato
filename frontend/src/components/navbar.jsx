import React from "react";
import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-500">
            FoodieHub
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-gray-600 hover:text-orange-500">
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-orange-500"
            >
              How It Works
            </a>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/feeds"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Watch
            </Link>

            <Link
              to="/creatordashboard"
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
            >
              Upload
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default navbar;
