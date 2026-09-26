import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Video, Heart, Eye, Upload, X, Play, ArrowRight } from "lucide-react";
import Navbar from "../components/navbar";

const CreatorDashboard = () => {
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  const [error, setError] = useState("");
  // setError("");
  //     setError(
  //       error.response?.data?.message || "Unable to load creator profile.",
  //     );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [recentPosts, setRecentPosts] = useState([]);

  // Get videos
  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/foodVideo", {
        withCredentials: true,
      });

      setRecentPosts(response.data.foodVideos || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Video selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  // Upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      alert("Please select a video.");
      return;
    }

    try {
      const data = new FormData();

      data.append("video", video);
      data.append("name", formData.name);
      data.append("description", formData.description);

      await axios.post("http://localhost:3000/foodvideo/", data, {
        withCredentials: true,
      });

      alert("Video uploaded successfully!");

      setVideo(null);
      setVideoPreview("");

      setFormData({
        name: "",
        description: "",
      });

      fetchVideos();
    } catch (error) {
      console.error(error);
      alert("Failed to upload video.");
    }
  };

  // Statistics
  const totalVideos = recentPosts.length;

  const totalLikes = recentPosts.reduce(
    (sum, post) => sum + (post.likecount || 0),
    0,
  );

  const totalViews = recentPosts.reduce(
    (sum, post) => sum + (post.views || 0),
    0,
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Unable to load Dashboard
            </h2>

            <p className="mt-2 text-sm text-gray-500">{error}</p>

            <Link
              to="/creator/login"
              className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              Login Now
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50/30">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-medium text-purple-600">Creator Studio</p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            Creator Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">Manage your food videos.</p>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Videos */}
          <div className="rounded-xl border border-purple-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Videos</p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {totalVideos}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Video size={20} />
              </div>
            </div>
          </div>

          {/* Likes */}
          <div className="rounded-xl border border-purple-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Likes</p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {totalLikes}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Heart size={20} />
              </div>
            </div>
          </div>

          {/* Views */}
          <div className="rounded-xl border border-purple-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Views</p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {totalViews}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Eye size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Upload size={19} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Upload Video
                </h2>

                <p className="text-xs text-gray-500">
                  Share your latest food creation.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Video */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Food Video
                </label>

                {!videoPreview ? (
                  <label
                    htmlFor="video"
                    className="flex h-40 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/50 transition hover:border-purple-400 hover:bg-purple-50"
                  >
                    <div className="text-center">
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <Upload size={20} />
                      </div>

                      <p className="mt-3 text-sm font-medium text-gray-700">
                        Click to select video
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
                  <div className="overflow-hidden rounded-xl border border-purple-100">
                    <div className="relative bg-black">
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
                        onClick={() => {
                          setVideo(null);
                          setVideoPreview("");
                        }}
                        className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
                      >
                        <X size={15} />
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Food Name */}
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
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Description */}
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
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
              >
                <Upload size={17} />
                Upload Video
              </button>
            </form>
          </div>

          {/* Recent Uploads */}
          <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Uploads
              </h2>

              <Link
                to="/feeds"
                className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                View Feed
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {recentPosts.length === 0 ? (
                <div className="py-8 text-center">
                  <Video size={28} className="mx-auto text-purple-300" />

                  <p className="mt-2 text-sm text-gray-500">
                    No videos uploaded yet.
                  </p>
                </div>
              ) : (
                recentPosts.slice(0, 5).map((post) => (
                  <div
                    key={post._id}
                    className="border-b border-gray-100 pb-3 last:border-0"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {post.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {post.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 text-xs text-gray-500">
                        <Heart size={13} className="text-purple-500" />
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
