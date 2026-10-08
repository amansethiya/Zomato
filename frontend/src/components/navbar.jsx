import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, PlayCircle, Upload } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-orange-500"
        >
          FoodieHub
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <a
            href="/#features"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
          >
            Features
          </a>

          <a
            href="/#how-it-works"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
          >
            How It Works
          </a>

          <Link
            to="/feeds/saved"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <Bookmark size={17} />
            Saved
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/feeds"
            className="flex items-center gap-2 rounded-lg border border-orange-200 px-3 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-50"
          >
            <PlayCircle size={17} />
            <span className="hidden sm:inline">Watch</span>
          </Link>

          <Link
            to="/creatordashboard"
            className="flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            <Upload size={17} />
            <span className="hidden sm:inline">Upload</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
