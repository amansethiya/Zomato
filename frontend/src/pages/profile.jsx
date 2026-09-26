import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from "axios";

const CreatorProfile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // GET CREATOR PROFILE
  // =========================================================

  useEffect(() => {
    const getCreatorProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:3000/creator/${id}`,
          {
            withCredentials: true,
          },
        );

        setProfile(response.data.creator);
        setVideos(response.data.creator.foodVideos || []);
      } catch (error) {
        console.error("Error fetching creator profile:", error);

        setError(
          error.response?.data?.message || "Unable to load creator profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getCreatorProfile();
    }
  }, [id]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          {/* Profile Skeleton */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="h-36 animate-pulse bg-gray-200 sm:h-48" />

            <div className="px-5 pb-6 sm:px-8">
              <div className="-mt-14 h-28 w-28 animate-pulse rounded-full border-4 border-white bg-gray-300" />

              <div className="mt-5">
                <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />

                <div className="mt-3 h-4 w-32 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="mt-6 h-px bg-gray-100" />

              <div className="mt-5 h-6 w-32 animate-pulse rounded bg-gray-200" />
            </div>
          </section>

          {/* Video Skeleton */}
          <section className="mt-8">
            <div className="h-7 w-28 animate-pulse rounded bg-gray-200" />

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                  <div className="aspect-video animate-pulse bg-gray-200" />

                  <div className="space-y-3 p-4">
                    <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />

                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Unable to load profile
            </h2>

            <p className="mt-2 text-sm text-gray-500">{error}</p>

            <Link
              to="/feeds"
              className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              Back to Feed
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // PROFILE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* =====================================================
            PROFILE CARD
        ===================================================== */}

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {/* Cover */}
          <div className="h-36 bg-gradient-to-r from-purple-500 to-purple-700 sm:h-48" />

          {/* Profile Content */}
          <div className="px-5 pb-7 sm:px-8">
            {/* Avatar */}

            <div className="-mt-14 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-purple-100 text-4xl font-bold text-purple-600 shadow-md">
              {profile?.creatorusername?.charAt(0).toUpperCase()}
            </div>

            {/* Creator Information */}

            <div className="mt-5">
              <h1 className="text-2xl font-bold text-gray-900">
                {profile?.name}
              </h1>

              <p className="mt-1 font-medium text-purple-600">
                @{profile?.creatorusername}
              </p>

              {/* Bio */}

              {profile?.bio && (
                <p className="mt-4 max-w-2xl leading-6 text-gray-600">
                  {profile.bio}
                </p>
              )}

              {/* Video Count */}

              <div className="mt-6 border-t border-gray-100 pt-5">
                <p className="text-2xl font-bold text-gray-900">
                  {videos.length}
                </p>

                <p className="text-sm text-gray-500">
                  {videos.length === 1 ? "Video" : "Videos"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            VIDEOS
        ===================================================== */}

        <section className="mt-10">
          {/* Section Heading */}

          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Videos</h2>

              <p className="mt-1 text-sm text-gray-500">
                Videos shared by @{profile?.creatorusername}
              </p>
            </div>

            <span className="hidden text-sm font-medium text-gray-500 sm:block">
              {videos.length} {videos.length === 1 ? "video" : "videos"}
            </span>
          </div>

          {/* =================================================
              EMPTY VIDEOS
          ================================================= */}

          {videos.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                No videos yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                This creator hasn't uploaded any videos yet.
              </p>
            </div>
          ) : (
            /* =================================================
               VIDEO GRID
            ================================================= */

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((item) => (
                <article
                  key={item._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Video */}

                  <div className="aspect-video bg-black">
                    <video
                      src={item.video}
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Video Information */}

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>

                    {/* Description */}

                    {item.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
                        {item.description}
                      </p>
                    )}

                    {/* Likes */}

                    <div className="mt-4 border-t border-gray-100 pt-3">
                      <span className="text-sm text-gray-500">
                        {item.likecount || 0}{" "}
                        {item.likecount === 1 ? "like" : "likes"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Bottom */}

        {videos.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-400">
              End of @{profile?.creatorusername}'s videos.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreatorProfile;
