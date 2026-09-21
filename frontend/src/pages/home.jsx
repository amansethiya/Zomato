import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-orange-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 lg:py-28">
          {/* Hero Content */}
          <div>
            <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
              🍴 Food • Community • Creativity
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Discover.
              <span className="text-orange-500"> Create.</span>
              <br />
              Share Food.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              A community where food lovers and creators come together. Discover
              amazing food videos, share your creations, and connect with people
              who love food just like you.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/creatordashboard"
                className="rounded-xl bg-orange-500 px-7 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
              >
                Join the Community
              </Link>

              <Link
                to="/feeds"
                className="rounded-xl border border-gray-300 bg-white px-7 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Explore Videos
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="flex justify-center">
            <div className="relative h-80 w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-orange-400 to-red-500 shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="text-7xl">🍕</div>

                <h2 className="mt-5 text-2xl font-bold">Your Food Community</h2>

                <p className="mt-2 text-center text-orange-100">
                  Watch • Create • Share
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-orange-500">FEATURES</p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Everything for food lovers
            </h2>

            <p className="mt-4 text-gray-600">
              A simple platform designed for discovering and sharing food
              content.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-3xl">
                🎥
              </div>

              <h3 className="mt-5 text-xl font-bold">Watch Food Videos</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Discover recipes, cooking videos, food ideas and interesting
                content from creators.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-3xl">
                👨‍🍳
              </div>

              <h3 className="mt-5 text-xl font-bold">Become a Creator</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Share your own food videos and build your audience within the
                community.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-3xl">
                ❤️
              </div>

              <h3 className="mt-5 text-xl font-bold">Connect & Discover</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Find new creators, discover different cuisines and enjoy food
                content from the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-semibold text-orange-500">HOW IT WORKS</p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Start in three simple steps
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
                1
              </div>

              <h3 className="mt-5 text-xl font-bold">Create an Account</h3>

              <p className="mt-3 text-gray-600">
                Register as a food lover or creator and join the community.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
                2
              </div>

              <h3 className="mt-5 text-xl font-bold">Explore Content</h3>

              <p className="mt-3 text-gray-600">
                Watch videos and discover recipes and food content from
                creators.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
                3
              </div>

              <h3 className="mt-5 text-xl font-bold">Share Your Food</h3>

              <p className="mt-3 text-gray-600">
                Creators can upload videos and share their food experiences with
                everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creator CTA */}
      <section id="creators" className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-orange-500 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Have something delicious to share?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-orange-100">
            Join our creator community and share your recipes, cooking videos
            and food experiences with others.
          </p>

          <Link
            to="/creator/register"
            className="mt-8 inline-block rounded-xl bg-white px-7 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            Become a Creator
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold text-orange-500">FoodieHub</p>

          <p className="text-sm text-gray-500">
            © 2026 FoodieHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
