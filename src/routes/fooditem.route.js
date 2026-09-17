import express from "express";
import { authFoodPartnerMiddleware } from "../middleware/auth.middleware.js";
import { createFoodController } from "../controller/fooditem.controller.js";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  authFoodPartnerMiddleware,
  upload.single("video"),
  createFoodController,
);

export default router;
