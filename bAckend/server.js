import "dotenv/config";
import app from "./src/app.js";
import connectDb from "./src/db/db.js";

const PORT = process.env.PORT || 3000;

connectDb();
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
