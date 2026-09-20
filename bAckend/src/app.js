import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import foodVideoRouter from "./routes/foodVideo.route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/foodvideo", foodVideoRouter);

export default app;
