import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  registercreatorController,
  logincreatorController,
  logoutcreatorController,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/user/register", registerController);
router.post("/user/login", loginController);
router.post("/user/logout", logoutController);
router.post("/creator/register", registercreatorController);
router.post("/creator/login", logincreatorController);
router.post("/creator/logout", logoutcreatorController);

export default router;
