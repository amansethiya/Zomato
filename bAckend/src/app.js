import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import foodVideoRouter from "./routes/foodVideo.route.js";
import cors from "cors";
import creatorRouter from "./routes/creator.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://foodie-hub-puce.vercel.app",
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/foodvideo", foodVideoRouter);
app.use("/creator", creatorRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Thanks, FoodieHub's server is stared & in Running. Please go back to FoodieHub page",
  });
});

export default app;
