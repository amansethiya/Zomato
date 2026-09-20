import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  registerFoodPartnerController,
  loginFoodPartnerController,
  logoutFoodPartnerController,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/user/register", registerController);
router.post("/user/login", loginController);
router.post("/user/logout", logoutController);
router.post("/foodpartner/register", registerFoodPartnerController);
router.post("/foodpartner/login", loginFoodPartnerController);
router.post("/foodpartner/logout", logoutFoodPartnerController);

export default router;
