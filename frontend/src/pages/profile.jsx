import React, { useEffect, useState } from "react";
import "../index.css";

import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import api from "../api/axios";

import {
  ArrowLeft,
  Video,
  Heart,
  Bookmark,
  User,
  Utensils,
} from "lucide-react";

const CreatorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [likingId, setLikingId] = useState(null);
  const [savingId, setSavingId] = useState(null);

  // =========================================================
  // GET CREATOR PROFILE + LIKE/SAVE STATUS
  // =========================================================

  useEffect(() => {
    const getCreatorProfile = async () => {
      try {
        setLoading(true);
        setError("");

        // Get creator profile
        const profileResponse = await api.get(`/creator/${id}`, {
          withCredentials: true,
        });

        const creator = profileResponse.data.creator;
        const creatorVideos = creator.foodVideos || [];

        /*
         * Get videos from feed as well.
         *
         * /foodvideo/ already returns:
         * liked: true/false
         * saved: true/false
         *
         * We use this information to show the correct
         * heart and bookmark state on this page.
         */
        const feedResponse = await api.get("/foodvideo/", {
          withCredentials: true,
        });

        const feedVideos = feedResponse.data.foodVideos || [];

        const videosWithStatus = creatorVideos.map((video) => {
          const matchingVideo = feedVideos.find(
            (feedVideo) => feedVideo._id === video._id,
          );

          return {
            ...video,
            liked: matchingVideo?.liked || false,
            saved: matchingVideo?.saved || false,
          };
        });

        setProfile(creator);
        setVideos(videosWithStatus);
      } catch (error) {
        console.error("Error fetching creator profile:", error);

        if (error.response?.status === 401) {
          setError("Please login to view this profile.");
        } else {
          setError(
            error.response?.data?.message || "Unable to load creator profile.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getCreatorProfile();
    }
  }, [id]);

  // =========================================================
  // LIKE
  // =========================================================

  const handleLike = async (videoId) => {
    try {
      setLikingId(videoId);

      const response = await api.post(
        "/foodvideo/like",
        {
          foodId: videoId,
        },
        {
          withCredentials: true,
        },
      );

      setVideos((currentVideos) =>
        currentVideos.map((video) =>
          video._id === videoId
            ? {
                ...video,
                liked: response.data.liked,
                likecount: response.data.likecount,
              }
            : video,
        ),
      );
    } catch (error) {
      console.error("Like error:", error);

      if (error.response?.status === 401) {
        alert("Please login to like this video.");
      } else {
        alert(error.response?.data?.message || "Unable to like this video.");
      }
    } finally {
      setLikingId(null);
    }
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSave = async (videoId) => {
    try {
      setSavingId(videoId);

      const response = await api.post(
        "/foodvideo/save",
        {
          foodId: videoId,
        },
        {
          withCredentials: true,
        },
      );

      setVideos((currentVideos) =>
        currentVideos.map((video) =>
          video._id === videoId
            ? {
                ...video,
                saved: response.data.saved,
              }
            : video,
        ),
      );
    } catch (error) {
      console.error("Save error:", error);

      if (error.response?.status === 401) {
        alert("Please login to save this video.");
      } else {
        alert(error.response?.data?.message || "Unable to save this video.");
      }
    } finally {
      setSavingId(null);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />

        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
          <div className="mb-7 h-5 w-24 animate-pulse rounded bg-gray-200" />

          {/* Creator Header Skeleton */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="mx-auto h-24 w-24 animate-pulse rounded-full bg-gray-200 md:mx-0" />

              <div>
                <div className="mx-auto h-7 w-48 animate-pulse rounded bg-gray-200 md:mx-0" />
                <div className="mx-auto mt-3 h-4 w-32 animate-pulse rounded bg-gray-200 md:mx-0" />

                <div className="mx-auto mt-5 h-4 w-full max-w-xl animate-pulse rounded bg-gray-200 md:mx-0" />
                <div className="mx-auto mt-2 h-4 w-3/4 max-w-md animate-pulse rounded bg-gray-200 md:mx-0" />
              </div>

              <div className="flex justify-center gap-8 md:justify-end">
                <div>
                  <div className="h-7 w-10 animate-pulse rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-14 animate-pulse rounded bg-gray-200" />
                </div>

                <div>
                  <div className="h-7 w-10 animate-pulse rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-14 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            </div>
          </section>

          {/* Video Skeleton */}
          <section className="mt-10">
            <div className="h-7 w-24 animate-pulse rounded bg-gray-200" />

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                  <div className="aspect-video animate-pulse bg-gray-200" />

                  <div className="space-y-3 p-5">
                    <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

                    <div className="mt-4 h-10 animate-pulse rounded-lg bg-gray-100" />
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
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <User size={25} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Profile unavailable
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">{error}</p>

            <Link
              to="/feeds"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              <ArrowLeft size={17} />
              Back to Feed
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // TOTAL LIKES
  // =========================================================

  const totalLikes = videos.reduce(
    (total, video) => total + (video.likecount || 0),
    0,
  );

  // =========================================================
  // PROFILE
  // =========================================================

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:py-10">
        {/* Back */}
        <Link
          to="/feeds"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-500"
        >
          <ArrowLeft size={17} />
          Back to Feed
        </Link>

        {/* =====================================================
            CREATOR HEADER
        ===================================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-7 md:grid-cols-[auto_1fr_auto] md:items-center">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-3xl font-bold text-orange-600 ring-4 ring-orange-50">
                {profile?.creatorusername?.charAt(0).toUpperCase() || "C"}
              </div>
            </div>

            {/* Creator Info */}
            <div className="text-center md:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row md:items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.name || profile?.creatorusername}
                </h1>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                  <Utensils size={13} />
                  Creator
                </span>
              </div>

              <p className="mt-1 text-sm font-medium text-orange-500">
                @{profile?.creatorusername}
              </p>

              {profile?.bio && (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 border-t border-gray-100 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Video size={18} className="text-orange-500" />

                  <span className="text-xl font-bold text-gray-900">
                    {videos.length}
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">Videos</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Heart size={18} className="text-orange-500" />

                  <span className="text-xl font-bold text-gray-900">
                    {totalLikes}
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">Likes</p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            VIDEOS
        ===================================================== */}

        <section className="mt-10">
          {/* Section Header */}
          <div className="flex items-end justify-between border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Videos</h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest posts from @{profile?.creatorusername}
              </p>
            </div>

            <span className="hidden text-sm text-gray-400 sm:block">
              {videos.length} {videos.length === 1 ? "post" : "posts"}
            </span>
          </div>

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {videos.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <Video size={25} />
              </div>

              <h3 className="mt-5 font-semibold text-gray-900">
                Nothing here yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                This creator hasn't uploaded any content.
              </p>
            </div>
          ) : (
            /* =================================================
               VIDEO GRID
            ================================================= */

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {videos.map((item) => (
                <article
                  key={item._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
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

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="line-clamp-1 font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    {item.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                        {item.description}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      {/* Like */}
                      <button
                        type="button"
                        onClick={() => handleLike(item._id)}
                        disabled={likingId === item._id}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                          item.liked
                            ? "bg-orange-50 text-red-500"
                            : "text-gray-500 hover:bg-gray-50 hover:text-orange-500"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={item.liked ? "currentColor" : "none"}
                        />

                        <span>{item.likecount || 0}</span>
                      </button>

                      {/* Save */}
                      <button
                        type="button"
                        onClick={() => handleSave(item._id)}
                        disabled={savingId === item._id}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                          item.saved
                            ? "bg-purple-50 text-black-500"
                            : "text-gray-500 hover:bg-gray-50 hover:text-orange-500"
                        }`}
                      >
                        <Bookmark
                          size={18}
                          fill={item.saved ? "currentColor" : "none"}
                        />

                        <span>{item.saved ? "Saved" : "Save"}</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bottom */}
          {videos.length > 0 && (
            <div className="mt-10 border-t border-gray-200 pt-7 text-center">
              <p className="text-xs text-gray-400">You've reached the end</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CreatorProfile;
