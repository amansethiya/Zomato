import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  registerFoodPartnerController,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/user/register", registerController);
router.post("/user/login", loginController);
router.post("/user/logout", logoutController);
router.post("/foodpartner/register", registerFoodPartnerController);

export default router;
