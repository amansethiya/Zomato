import express from "express";
import { profileController } from "../controller/creator.controller.js";
import { authUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", authUserMiddleware, profileController);

export default router;
