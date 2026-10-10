import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import ServerWakeupBanner from "../components/ServerWakeupBanner";
import {
  ArrowRight,
  Play,
  Heart,
  Bookmark,
  Users,
  ChefHat,
  Sparkles,
  Utensils,
  Video,
  Upload,
  Search,
} from "lucide-react";

import Navbar from "../components/navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-orange-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 lg:py-24">
          {/* Hero Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-orange-600 shadow-sm">
              <Utensils size={16} />
              Food Community
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              Discover food.
              <span className="block text-orange-500">Share your passion.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              FoodieHub is a place to discover food videos, find new creators,
              save your favourite content, and share your own food creations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/feeds"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                <Play size={18} />
                Explore Videos
              </Link>

              <Link
                to="/creator/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
              >
                <ChefHat size={18} />
                Become a Creator
              </Link>
            </div>
          </div>

          {/* Hero Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-lg">
              <div className="relative overflow-hidden rounded-2xl bg-orange-500">
                <div className="flex h-80 flex-col items-center justify-center px-6 text-center text-white">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15">
                    <Utensils size={42} />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold">
                    Welcome to FoodieHub
                  </h2>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-orange-100">
                    Watch food videos, discover creators and share your
                    favourite food moments.
                  </p>

                  <Link
                    to="/feeds"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
                  >
                    Start Exploring
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Small action row */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center rounded-xl bg-gray-50 py-3">
                  <Video size={20} className="text-orange-500" />
                  <span className="mt-1 text-xs text-gray-500">Watch</span>
                </div>

                <div className="flex flex-col items-center rounded-xl bg-gray-50 py-3">
                  <Heart size={20} className="text-orange-500" />
                  <span className="mt-1 text-xs text-gray-500">Like</span>
                </div>

                <div className="flex flex-col items-center rounded-xl bg-gray-50 py-3">
                  <Bookmark size={20} className="text-orange-500" />
                  <span className="mt-1 text-xs text-gray-500">Save</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* server alert  */}
      <ServerWakeupBanner />

      {/* Features */}
      <section id="features" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-wide text-orange-500">
              FEATURES
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Everything in one place
            </h2>

            <p className="mt-4 text-gray-600">
              Simple tools to help you discover, save and share food content.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-gray-200 p-6 transition hover:border-orange-200 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <Video size={24} />
              </div>

              <h3 className="mt-5 text-xl font-bold">Watch Food Videos</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Explore cooking videos, recipes and food ideas shared by
                creators.
              </p>

              <Link
                to="/feeds"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600"
              >
                Explore Videos
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-gray-200 p-6 transition hover:border-orange-200 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <Upload size={24} />
              </div>

              <h3 className="mt-5 text-xl font-bold">Share Your Videos</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Upload your own food videos and share your cooking ideas with
                the community.
              </p>

              <Link
                to="/creator/register"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600"
              >
                Become a Creator
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-gray-200 p-6 transition hover:border-orange-200 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <Bookmark size={24} />
              </div>

              <h3 className="mt-5 text-xl font-bold">Like & Save</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Like videos you enjoy and save your favourite food content for
                later.
              </p>

              <Link
                to="/feeds"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600"
              >
                Start Exploring
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-orange-500">
              HOW IT WORKS
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Get started in three steps
            </h2>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                1
              </div>

              <h3 className="mt-5 text-xl font-bold">Create an Account</h3>

              <p className="mx-auto mt-3 max-w-sm leading-7 text-gray-600">
                Register as a user or creator and become part of the FoodieHub
                community.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                2
              </div>

              <h3 className="mt-5 text-xl font-bold">Discover Food</h3>

              <p className="mx-auto mt-3 max-w-sm leading-7 text-gray-600">
                Browse food videos and discover new creators and recipes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                3
              </div>

              <h3 className="mt-5 text-xl font-bold">Share & Connect</h3>

              <p className="mx-auto mt-3 max-w-sm leading-7 text-gray-600">
                Like, save and share content or upload your own food videos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creator CTA */}
      {/* Join FoodieHub */}
      <section id="creators" className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-orange-500 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            What brings you to FoodieHub?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-orange-100">
            Discover amazing food videos or share your own creations with the
            community.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {/* Viewer */}
            <Link
              to="/feeds"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              <Play size={18} />
              Explore Food Videos
            </Link>

            {/* Creator */}
            <Link
              to="/creator/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <ChefHat size={18} />
              Become a Creator
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-orange-500">FoodieHub</p>
            <p className="mt-1 text-sm text-gray-500">
              A community for food lovers and creators.
            </p>
          </div>

          <div className="flex gap-5 text-sm text-gray-500">
            <a href="/feeds/saved" className="hover:text-orange-500">
              Saved
            </a>

            <a href="/feeds" className="hover:text-orange-500">
              Feeds
            </a>
            <a href="/creatordashboard" className="hover:text-orange-500">
              Creator Dashboard
            </a>
          </div>

          <p className="text-sm text-gray-400">© 2026 FoodieHub</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
