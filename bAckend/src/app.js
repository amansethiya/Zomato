import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import foodItemRouter from "./routes/fooditem.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/food", foodItemRouter);

export default app;
