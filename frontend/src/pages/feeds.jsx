import React from "react";
import "../index.css";

const Feed = () => {
  // Dummy feed data
  const posts = [
    {
      id: 1,
      video:
        "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
      name: "Creamy Pasta",
      caption: "Made this creamy pasta today! Super easy and delicious 🍝",
      creatorUsername: "foodie_aman",
    },
    {
      id: 2,
      video:
        "https://videos.pexels.com/video-files/853801/853801-hd_1920_1080_30fps.mp4",
      name: "Fresh Burger",
      caption: "Nothing beats a juicy homemade burger 🍔",
      creatorUsername: "burgerlover",
    },
    {
      id: 3,
      video:
        "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4",
      name: "Street Food",
      caption: "Exploring some amazing street food today! 🌮",
      creatorUsername: "food_explorer",
    },
    {
      id: 4,
      video:
        "https://videos.pexels.com/video-files/3196346/3196346-hd_1920_1080_25fps.mp4",
      name: "Chocolate Dessert",
      caption: "A little chocolate never hurts. 🍫❤️",
      creatorUsername: "sweettooth",
    },
    {
      id: 5,
      video:
        "https://videos.pexels.com/video-files/4253048/4253048-hd_1920_1080_25fps.mp4",
      name: "Healthy Bowl",
      caption: "Simple, healthy and full of flavor 🥗",
      creatorUsername: "healthy_bites",
    },
    {
      id: 6,
      video:
        "https://videos.pexels.com/video-files/4253267/4253267-hd_1920_1080_25fps.mp4",
      name: "Pizza Night",
      caption: "Pizza night with friends! 🍕",
      creatorUsername: "pizza_daily",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-orange-500">FoodieHub</h1>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              Home
            </button>

            <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
              Feed
            </button>

            <button className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 sm:block">
              Profile
            </button>
          </div>
        </div>
      </nav>

      {/* ================= FEED ================= */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Feed Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Discover Food</h2>

          <p className="mt-2 text-gray-500">
            Explore delicious videos from our food community.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              {/* ================= CREATOR ================= */}
              <div className="flex items-center gap-3 px-4 py-4">
                {/* Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                  {post.creatorUsername.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    @{post.creatorUsername}
                  </p>

                  <p className="text-xs text-gray-500">Food Creator</p>
                </div>
              </div>

              {/* ================= VIDEO ================= */}
              <div className="aspect-video w-full bg-black">
                <video
                  src={post.video}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* ================= POST CONTENT ================= */}
              <div className="p-5">
                {/* Food Name */}
                <h3 className="text-xl font-bold text-gray-900">{post.name}</h3>

                {/* Caption */}
                <p className="mt-2 leading-6 text-gray-600">{post.caption}</p>

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
