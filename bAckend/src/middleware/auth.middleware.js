import foodpartnerModel from "../models/foodpartner.model.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.foodPartnerToken;
  if (!token) {
    return res.status(400).json({
      message: "user must be a foodPartner",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodpartnerModel.findById(decoded.id);
    req.foodpartner = foodPartner;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "unauthorized user",
    });
  }
}

export async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "you must login first!",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    res.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized User!",
    });
  }
}
