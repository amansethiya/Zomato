import React from "react";
import "../index.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const CreatorProfile = () => {
  const { id } = useParams();
  const [profile, setprofile] = useState(null);
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/creator/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setprofile(response.data.creator);
        setvideos(response.data.foodVideos);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= PROFILE ================= */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Profile Card */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {/* Cover */}
          <div className="h-36 bg-gradient-to-r from-purple-500 to-purple-700 sm:h-48" />

          {/* Profile Info */}
          <div className="px-5 pb-6 sm:px-8">
            {/* Avatar + Button */}
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
              {/* Avatar */}
              <div className="-mt-14 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-purple-100 text-4xl font-bold text-purple-600 shadow-md">
                A
              </div>
            </div>

            {/* Creator Details */}
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {profile?.name}
              </h1>

              <p className="mt-1 text-sm font-medium text-purple-600">
                @{profile?.username}
              </p>

              <p className="mt-4 max-w-xl leading-6 text-gray-600">
                {profile?.bio}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-6 flex gap-8 border-t border-gray-100 pt-5">
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {profile?.videos}
                </p>

                <p className="text-sm text-gray-500">Videos</p>
              </div>

              <div>
                <p className="text-xl font-bold text-gray-900">
                  {profile?.followers.toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">Followers</p>
              </div>

              <div>
                <p className="text-xl font-bold text-gray-900">
                  {profile?.following}
                </p>

                <p className="text-sm text-gray-500">Following</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= VIDEOS ================= */}
        <section className="mt-8">
          {/* Heading */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Videos</h2>

              <p className="mt-1 text-sm text-gray-500">
                Food videos shared by @{profile?.username}
              </p>
            </div>

            <span className="hidden rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-600 sm:block">
              {profile?.videos} Videos
            </span>
          </div>

          {/* Video Grid */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((item) => (
              <article
                key={item._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Video */}
                <div className="relative aspect-video bg-black">
                  <video
                    src={item.video}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />

                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-lg shadow-lg">
                      ▶
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>

                  <p className="mt-2 text-sm text-gray-500">
                    👁️ {item.views} views
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= END ================= */}
        <div className="py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
            🍴
          </div>

          <p className="mt-3 text-sm text-gray-500">
            More delicious content coming soon!
          </p>
        </div>
      </main>
    </div>
  );
};

export default CreatorProfile;
