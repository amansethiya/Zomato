import express from "express";
import {
  authcreatorMiddleware,
  authUserMiddleware,
} from "../middleware/auth.middleware.js";
import {
  addFoodVideoController,
  checkCreatorController,
  getFoodVideoController,
  likeController,
  saveController,
  myVideosController,
  getSaveController,
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

router.get("/checkCreator", authcreatorMiddleware, checkCreatorController);

router.get("/", authUserMiddleware, getFoodVideoController);

router.post("/like", authUserMiddleware, likeController);

router.post("/save", authUserMiddleware, saveController);

router.get("/getsave", authUserMiddleware, getSaveController);

router.get("/myVideos", authcreatorMiddleware, myVideosController);

export default router;
