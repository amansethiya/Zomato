import React, { useEffect, useState } from "react";
import "../index.css";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Heart,
  Bookmark,
  Share2,
  Video,
  AlertCircle,
  RefreshCw,
  LogIn,
} from "lucide-react";

import Navbar from "../components/navbar";

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Store IDs of saved videos
  const [savedVideos, setSavedVideos] = useState([]);

  // =========================================================
  // GET VIDEOS
  // =========================================================

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("http://localhost:3000/foodvideo/", {
          withCredentials: true,
        });

        setVideos(response.data.foodVideos || []);
      } catch (error) {
        console.error("Error fetching videos:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load videos. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  // =========================================================
  // LIKE VIDEO
  // =========================================================

  const handleLike = async (videoId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/foodvideo/${videoId}/like`,
        {},
        {
          withCredentials: true,
        },
      );

      setVideos((previousVideos) =>
        previousVideos.map((item) =>
          item._id === videoId
            ? {
                ...item,
                liked: response.data.liked,
                likesCount: response.data.likesCount,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Like error:", error);

      alert(error.response?.data?.message || "Unable to like this video.");
    }
  };

  // =========================================================
  // SAVE VIDEO
  // =========================================================

  const handleSave = async (videoId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/foodvideo/${videoId}/save`,
        {},
        {
          withCredentials: true,
        },
      );

      setSavedVideos((previous) => {
        if (response.data.saved) {
          return [...new Set([...previous, videoId])];
        }

        return previous.filter((id) => id !== videoId);
      });
    } catch (error) {
      console.error("Save error:", error);

      alert(error.response?.data?.message || "Unable to save this video.");
    }
  };

  // =========================================================
  // SHARE VIDEO
  // =========================================================

  const handleShare = async (item) => {
    const shareUrl = `${window.location.origin}/foodvideo/${item._id}`;

    const shareData = {
      title: item.name,
      text: `${item.name} by @${item.creator?.creatorusername}`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareUrl);

      alert("Video link copied to clipboard!");
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share error:", error);
      }
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="mx-auto max-w-2xl px-4 py-10">
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="space-y-8">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                {/* Creator Skeleton */}
                <div className="flex items-center gap-3 p-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />

                  <div>
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />

                    <div className="mt-2 h-3 w-20 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>

                {/* Video Skeleton */}
                <div className="aspect-video animate-pulse bg-gray-200" />

                {/* Content Skeleton */}
                <div className="space-y-3 p-5">
                  <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
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
            {/* Error Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <AlertCircle size={28} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Unable to load feed
            </h2>

            <p className="mt-2 text-sm text-gray-500">{error}</p>

            <div className="mt-6 flex justify-center gap-3">
              {/* Try Again */}
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                <RefreshCw size={16} />
                Try Again
              </button>

              {/* Login */}
              <Link
                to="/user/login"
                className="flex items-center gap-2 rounded-lg border border-orange-200 px-5 py-2.5 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                <LogIn size={16} />
                Login
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // MAIN FEED
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Feed Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Discover Food
          </h1>

          <p className="mt-2 text-gray-500">
            Discover recipes, food ideas and creators from the community.
          </p>
        </div>

        {/* =====================================================
            EMPTY FEED
        ===================================================== */}

        {videos.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <Video size={26} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No videos yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Food creators haven't uploaded anything yet.
            </p>
          </div>
        ) : (
          /* =====================================================
             VIDEOS
          ===================================================== */

          <div className="space-y-8">
            {videos.map((item) => {
              const isSaved = savedVideos.includes(item._id);

              return (
                <article
                  key={item._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* =================================================
                      CREATOR
                  ================================================= */}

                  <div className="flex items-center justify-between px-4 py-4">
                    <Link
                      to={`/creator/${item.creator?._id}`}
                      className="flex min-w-0 items-center gap-3"
                    >
                      {/* Avatar */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                        {item.creator?.creatorusername?.charAt(0).toUpperCase()}
                      </div>

                      {/* Username */}
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900 hover:text-orange-500">
                          @{item.creator?.creatorusername}
                        </p>

                        <p className="text-xs text-gray-500">Food Creator</p>
                      </div>
                    </Link>
                  </div>

                  {/* =================================================
                      VIDEO
                  ================================================= */}

                  <div className="aspect-video w-full bg-black">
                    <video
                      src={item.video}
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="p-5">
                    {/* Food Name */}
                    <h2 className="text-xl font-bold text-gray-900">
                      {item.name}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 leading-6 text-gray-600">
                      {item.description}
                    </p>

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="mt-5 flex items-center border-t border-gray-100 pt-4">
                      {/* Like */}
                      <button
                        onClick={() => handleLike(item._id)}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                          item.liked
                            ? "bg-red-50 text-red-500"
                            : "text-gray-600 hover:bg-gray-50 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={19}
                          strokeWidth={2}
                          fill={item.liked ? "currentColor" : "none"}
                        />

                        <span>{item.likesCount || 0}</span>
                      </button>

                      {/* Save */}
                      <button
                        onClick={() => handleSave(item._id)}
                        className={`ml-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                          isSaved
                            ? "bg-purple-50 text-purple-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-purple-600"
                        }`}
                      >
                        <Bookmark
                          size={19}
                          strokeWidth={2}
                          fill={isSaved ? "currentColor" : "none"}
                        />

                        <span>{isSaved ? "Saved" : "Save"}</span>
                      </button>

                      {/* Share */}
                      <button
                        onClick={() => handleShare(item)}
                        className="ml-auto flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-orange-500"
                      >
                        <Share2 size={19} strokeWidth={2} />

                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* =====================================================
            END OF FEED
        ===================================================== */}

        {videos.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-400">You're all caught up.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Feed;
