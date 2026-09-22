import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  registercreatorController,
  logincreatorController,
  logoutcreatorController,
} from "../controller/auth.controller.js";

import { authUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/user/register", registerController);
router.post("/user/login", loginController);
router.post("/user/logout", logoutController);
router.post("/creator/register", registercreatorController);
router.post("/creator/login", logincreatorController);
router.post("/creator/logout", logoutcreatorController);

router.get("/user/me", authUserMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

export default router;
