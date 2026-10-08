import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Video,
  Heart,
  Upload,
  X,
  Play,
  ArrowRight,
  LoaderCircle,
  RefreshCw,
  LogIn,
} from "lucide-react";

import Navbar from "../components/navbar";

const CreatorDashboard = () => {
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [recentPosts, setRecentPosts] = useState([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");

  // =========================================================
  // GET CREATOR VIDEOS
  // =========================================================

  const fetchVideos = async () => {
    try {
      setError("");

      const response = await axios.get(
        "http://localhost:3000/foodvideo/myVideos",
        {
          withCredentials: true,
        },
      );

      setRecentPosts(response.data.creatorVideos || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Unable to load creator dashboard.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================================
  // VIDEO SELECTION
  // =========================================================

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  // =========================================================
  // REMOVE VIDEO
  // =========================================================

  const removeVideo = () => {
    setVideo(null);
    setVideoPreview("");
  };

  // =========================================================
  // UPLOAD VIDEO
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      alert("Please select a video.");
      return;
    }

    try {
      setUploading(true);

      const data = new FormData();

      data.append("video", video);
      data.append("name", formData.name);
      data.append("description", formData.description);

      await axios.post("http://localhost:3000/foodvideo/", data, {
        withCredentials: true,
      });

      alert("Video uploaded successfully!");

      // Reset form
      setVideo(null);
      setVideoPreview("");

      setFormData({
        name: "",
        description: "",
      });

      // Refresh creator videos
      await fetchVideos();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to upload video.");
    } finally {
      setUploading(false);
    }
  };

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalVideos = recentPosts.length;

  const totalLikes = recentPosts.reduce(
    (sum, post) => sum + (post.likecount || 0),
    0,
  );

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="mx-auto max-w-6xl px-4 py-8">
          {/* Header Skeleton */}

          <div className="mb-8">
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

            <div className="mt-3 h-8 w-64 animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-3 h-4 w-80 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Stats Skeleton */}

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                    <div className="mt-3 h-8 w-12 animate-pulse rounded bg-gray-200" />
                  </div>

                  <div className="h-11 w-11 animate-pulse rounded-xl bg-gray-200" />
                </div>
              </div>
            ))}
          </div>

          {/* Main Skeleton */}

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />

              <div className="mt-6 h-44 animate-pulse rounded-xl bg-gray-200" />

              <div className="mt-5 h-11 animate-pulse rounded-lg bg-gray-200" />

              <div className="mt-4 h-24 animate-pulse rounded-lg bg-gray-200" />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="h-6 w-36 animate-pulse rounded bg-gray-200" />

              <div className="mt-6 space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-14 animate-pulse rounded-lg bg-gray-200"
                  />
                ))}
              </div>
            </div>
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
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-purple-500">
              <Video size={26} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Unable to load dashboard
            </h2>

            <p className="mt-2 text-sm text-gray-500">{error}</p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 rounded-lg bg-purple-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-600"
              >
                <RefreshCw size={16} />
                Try Again
              </button>

              {/* Login */}
              <Link
                to="/creator/login"
                className="flex items-center gap-2 rounded-lg border border-purple-200 px-5 py-2.5 text-sm font-semibold text-purple-600 transition hover:bg-purple-50"
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
  // DASHBOARD
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8">
          <p className="text-sm font-semibold text-purple-600">
            Creator Studio
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Creator Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Upload and manage your food videos.
          </p>
        </div>

        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* TOTAL VIDEOS */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Videos
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {totalVideos}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Video size={22} />
              </div>
            </div>
          </div>

          {/* TOTAL LIKES */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Likes</p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {totalLikes}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <Heart size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ===================================================
              UPLOAD
          =================================================== */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Upload size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Upload New Video
                </h2>

                <p className="text-xs text-gray-500">
                  Share your latest food creation.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* VIDEO */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Food Video
                </label>

                {!videoPreview ? (
                  <label
                    htmlFor="video"
                    className="flex h-44 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition hover:border-purple-400 hover:bg-purple-50"
                  >
                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <Upload size={21} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-gray-700">
                        Select a video
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        MP4, WebM or MOV
                      </p>
                    </div>

                    <input
                      id="video"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <div className="bg-black">
                      <video
                        src={videoPreview}
                        controls
                        className="max-h-72 w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <Play size={16} className="shrink-0 text-purple-600" />

                        <p className="truncate text-sm text-gray-600">
                          {video?.name}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={removeVideo}
                        className="flex shrink-0 items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600"
                      >
                        <X size={15} />
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* FOOD NAME */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Food Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. White Sauce Pasta"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write something about your food..."
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={uploading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {uploading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={17} />
                    Upload Video
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ===================================================
              RECENT UPLOADS
          =================================================== */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Recent Uploads</h2>

                <p className="mt-1 text-xs text-gray-500">Your latest videos</p>
              </div>

              <Link
                to="/feeds"
                className="flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-700"
              >
                Feed
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {recentPosts.length === 0 ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                    <Video size={22} />
                  </div>

                  <p className="mt-3 text-sm font-medium text-gray-600">
                    No videos yet
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Upload your first food video.
                  </p>
                </div>
              ) : (
                recentPosts.slice(0, 5).map((post) => (
                  <div
                    key={post._id}
                    className="rounded-xl border border-gray-100 p-3 transition hover:border-purple-100 hover:bg-purple-50/30"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {post.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {post.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 text-xs font-medium text-red-500">
                        <Heart size={13} fill="currentColor" />
                        {post.likecount || 0}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorDashboard;
