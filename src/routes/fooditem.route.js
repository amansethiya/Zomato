import express from "express";
import {
  authFoodPartnerMiddleware,
  authUserMiddleware,
} from "../middleware/auth.middleware.js";
import {
  createFoodController,
  getFoodController,
} from "../controller/fooditem.controller.js";
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
router.get("/", authUserMiddleware, getFoodController);

export default router;
