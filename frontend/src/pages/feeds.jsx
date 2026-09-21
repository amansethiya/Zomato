import React, { useEffect, useState } from "react";
import "../index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const Feed = () => {
  const [video, setvideo] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/foodvideo/", {
        withCredentials: true,
      })
      .then((response) => {
        setvideo(response.data.foodVideos);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= FEED ================= */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Feed Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Discover Food</h2>

          <p className="mt-2 text-gray-500">
            Explore delicious videos from our food community.
          </p>
        </div>

        {/* videos */}
        <div className="space-y-8">
          {video.map((item) => (
            <article
              key={item._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              {/* ================= CREATOR ================= */}
              <div className="flex items-center gap-3 px-4 py-4">
                {/* Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                  {item.creator?.username?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    @{item.creator?.username}
                  </p>

                  <p className="text-xs text-gray-500">Food Creator</p>
                </div>
              </div>

              {/* ================= VIDEO ================= */}
              <div className="aspect-video w-full bg-black">
                <video
                  src={item.video}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* ================= video CONTENT ================= */}
              <div className="p-5">
                {/* Food Name */}
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>

                {/* Caption */}
                <p className="mt-2 leading-6 text-gray-600">
                  {item.description}
                </p>

                {/* Actions */}
                <div className="mt-5 flex items-center gap-5 border-t border-gray-100 pt-4">
                  <button className="flex items-center gap-2 text-gray-600 transition hover:text-red-500">
                    ❤️
                    <span className="text-sm">Like</span>
                  </button>

                  <button className="flex items-center gap-2 text-gray-600 transition hover:text-orange-500">
                    💬
                    <span className="text-sm">Comment</span>
                  </button>

                  <button className="ml-auto flex items-center gap-2 text-gray-600 transition hover:text-orange-500">
                    ↗<span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* End of Feed */}
        <div className="py-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            🍴
          </div>

          <p className="text-sm text-gray-500">You're all caught up!</p>
        </div>
      </main>
    </div>
  );
};

export default Feed;
