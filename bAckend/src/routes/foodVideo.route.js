import express from "express";
import {
  authcreatorMiddleware,
  authUserMiddleware,
} from "../middleware/auth.middleware.js";
import {
  addFoodVideoController,
  getFoodVideoController,
} from "../controller/foodVideo.controller.js";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  authcreatorMiddleware,
  upload.single("video"),
  addFoodVideoController,
);
router.get("/", authUserMiddleware, getFoodVideoController);

export default router;
