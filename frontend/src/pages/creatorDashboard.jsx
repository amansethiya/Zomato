import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

const CreatorDashboard = () => {
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // recent uploaded videos
  const [recentPosts, setRecentPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/foodvideo/", {
        withCredentials: true,
      })
      .then((response) => {
        setRecentPosts(response.data.foodVideos);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setVideo(file);

    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      alert("Please select a video.");
      return;
    }

    try {
      console.log("Video:", video);
      console.log("Food Name:", formData.name);
      console.log("Description:", formData.description);

      const data = new FormData();

      data.append("video", video);
      data.append("name", formData.name);
      data.append("description", formData.description);

      const response = await axios.post(
        "http://localhost:3000/foodvideo/",
        data,
        {
          withCredentials: true,
        },
      );

      console.log("Server Response:", response.data);

      alert("Food video uploaded successfully!");

      // Reset form after successful upload
      setVideo(null);
      setVideoPreview("");

      setFormData({
        name: "",
        description: "",
      });
    } catch (err) {
      console.error("Upload Error:", err);

      if (err.response) {
        console.log("Backend Response:", err.response.data);
        console.log("Status:", err.response.status);
      }

      alert("Failed to upload food video.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Creator Studio
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Creator Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your content and share your food creations.
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Videos */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Videos</p>

                <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl">
                🎥
              </div>
            </div>
          </div>

          {/* Views */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Views</p>

                <p className="mt-2 text-3xl font-bold text-gray-900">8.4K</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl">
                👁️
              </div>
            </div>
          </div>

          {/* Followers */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Followers</p>

                <p className="mt-2 text-3xl font-bold text-gray-900">1.2K</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl">
                👥
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          {/* ================= UPLOAD SECTION ================= */}
          <section className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Upload Food Video
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Share your latest food creation with the community.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ================= VIDEO UPLOAD ================= */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Food Video
                  </label>

                  {!videoPreview ? (
                    <label
                      htmlFor="video"
                      className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center transition hover:border-purple-400 hover:bg-purple-50"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl">
                        🎥
                      </div>

                      <p className="mt-4 font-semibold text-gray-700">
                        Click to upload your video
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        MP4, WebM or MOV
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Choose a video from your device
                      </p>

                      <input
                        id="video"
                        type="file"
                        name="video"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="hidden"
                        required
                      />
                    </label>
                  ) : (
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black">
                      <video
                        src={videoPreview}
                        controls
                        className="max-h-[450px] w-full object-contain"
                      />

                      <div className="flex items-center justify-between bg-white px-4 py-3">
                        <p className="truncate text-sm text-gray-600">
                          {video?.name}
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            setVideo(null);
                            setVideoPreview("");
                          }}
                          className="ml-4 text-sm font-medium text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* ================= FOOD NAME ================= */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Food Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Creamy White Pasta"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                {/* ================= DESCRIPTION ================= */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Food Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell people about your food, recipe or cooking process..."
                    required
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Write a short description about your food.
                  </p>
                </div>

                {/* ================= SUBMIT ================= */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-purple-600 py-3.5 font-semibold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-100"
                >
                  Upload Food Video
                </button>
              </form>
            </div>
          </section>

          {/* ================= RECENT POSTS ================= */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Uploads
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your latest food videos
                  </p>
                </div>

                <Link
                  to="/feed"
                  className="text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  View Feed
                </Link>
              </div>

              {/* Posts */}
              <div className="mt-6 space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post._id}
                    className="rounded-xl border border-gray-100 p-4 transition hover:border-purple-200 hover:bg-purple-50/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-gray-900">
                          {post.name}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                          {post.description}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                        Published
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                      <span>👁️ {post.views} views</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Creator Tip */}
            <div className="mt-6 rounded-2xl bg-purple-600 p-6 text-white">
              <div className="text-2xl">💡</div>

              <h3 className="mt-3 font-bold">Creator Tip</h3>

              <p className="mt-2 text-sm leading-6 text-purple-100">
                Keep your videos clear and engaging. A good food video can help
                more people discover your content.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CreatorDashboard;
