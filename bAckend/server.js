import "dotenv/config";
import app from "./src/app.js";
import connectDb from "./src/db/db.js";

const PORT = "https://foodiehub-6l84.onrender.com" || 3000;

connectDb();
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
