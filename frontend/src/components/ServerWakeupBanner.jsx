import { useState } from "react";

const BACKEND_URL = "https://foodiehub-6l84.onrender.com";

const ServerWakeupBanner = () => {
  const [opened, setOpened] = useState(false);

  const handleWakeup = () => {
    setOpened(true);
    window.open(`${BACKEND_URL}/health`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-10 bg-orange-50 border-b border-orange-200 px-4 pb-5 text-center">
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-orange-600">Server Notice:</span>{" "}
        Our free server may take a little time to start. Please wake it up
        before exploring FoodieHub.
      </p>

      <button
        onClick={handleWakeup}
        className=" cursor-pointer shrink-0 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        Start Server
      </button>

      {opened && (
        <span className="text-xs text-gray-600">
          Server opened in a new tab. Wait for it to respond, then return to
          FoodieHub.
        </span>
      )}
    </div>
  );
};

export default ServerWakeupBanner;
