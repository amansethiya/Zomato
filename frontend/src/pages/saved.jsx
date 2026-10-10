import React, { useEffect, useState } from "react";
import "../index.css";
import api from "../api/axios";
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

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // GET SAVED VIDEOS
  // =========================================================

  useEffect(() => {
    const getSavedVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/foodvideo/getsave", {
          withCredentials: true,
        });

        setVideos(response.data.foodVideos || []);
      } catch (error) {
        console.error("Error fetching saved videos:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load saved videos. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    getSavedVideos();
  }, []);

  // =========================================================
  // LIKE VIDEO
  // =========================================================

  const handleLike = async (videoId) => {
    try {
      const response = await api.post(
        "/foodvideo/like",
        {
          foodId: videoId,
        },
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
                likecount: response.data.likecount,
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
  // SAVE / UNSAVE VIDEO
  // =========================================================

  const handleSave = async (videoId) => {
    try {
      const response = await api.post(
        "/foodvideo/save",
        {
          foodId: videoId,
        },
        {
          withCredentials: true,
        },
      );

      /*
       * If the video is unsaved, remove it from this page.
       */
      if (!response.data.saved) {
        setVideos((previousVideos) =>
          previousVideos.filter((item) => item._id !== videoId),
        );
      }
    } catch (error) {
      console.error("Save error:", error);

      alert(error.response?.data?.message || "Unable to update saved video.");
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
                <div className="flex items-center gap-3 p-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />

                  <div>
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />

                    <div className="mt-2 h-3 w-20 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>

                <div className="aspect-video animate-pulse bg-gray-200" />

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
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <AlertCircle size={28} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Unable to load saved videos
            </h2>

            <p className="mt-2 text-sm text-gray-500">{error}</p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                <RefreshCw size={16} />
                Try Again
              </button>

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
  // MAIN SAVED PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* HEADER */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Bookmark size={22} fill="currentColor" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Saved Videos
              </h1>

              <p className="mt-1 text-gray-500">
                Your favorite food videos saved for later.
              </p>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}

        {videos.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-purple-600">
              <Bookmark size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No saved videos
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Videos you save will appear here. Go to the feed and save your
              favorite food videos.
            </p>

            <Link
              to="/feeds"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              <Video size={17} />
              Explore Videos
            </Link>
          </div>
        ) : (
          /* SAVED VIDEOS */

          <div className="space-y-8">
            {videos.map((item) => (
              <article
                key={item._id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* CREATOR */}

                <div className="flex items-center justify-between px-4 py-4">
                  <Link
                    to={`/creator/${item.creator?._id}`}
                    className="flex min-w-0 items-center gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                      {item.creator?.creatorusername?.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-900 hover:text-orange-500">
                        @{item.creator?.creatorusername}
                      </p>

                      <p className="text-xs text-gray-500">Food Creator</p>
                    </div>
                  </Link>
                </div>

                {/* VIDEO */}

                <div className="aspect-video w-full bg-black">
                  <video
                    src={item.video}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* CONTENT */}

                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h2>

                  <p className="mt-2 leading-6 text-gray-600">
                    {item.description}
                  </p>

                  {/* ACTIONS */}

                  <div className="mt-5 flex items-center border-t border-gray-100 pt-4">
                    {/* LIKE */}

                    <button
                      onClick={() => handleLike(item._id)}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        item.liked
                          ? "text-red-500"
                          : "text-gray-600 hover:bg-gray-50 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        size={19}
                        strokeWidth={2}
                        fill={item.liked ? "#ff0000" : "#fff"}
                      />

                      <span>{item.likecount}</span>
                    </button>

                    {/* SAVE */}

                    <button
                      onClick={() => handleSave(item._id)}
                      className="ml-2 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-black transition hover:bg-gray-50"
                    >
                      <Bookmark size={19} strokeWidth={2} fill="#000" />

                      <span>Saved</span>
                    </button>

                    {/* SHARE */}

                    <button
                      onClick={() => handleShare(item)}
                      className="ml-auto flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-orange-500"
                    >
                      <Share2 size={19} strokeWidth={2} />

                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Saved;
