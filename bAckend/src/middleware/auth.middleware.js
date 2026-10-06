import creatorModel from "../models/creator.model.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function authcreatorMiddleware(req, res, next) {
  const token = req.cookies.creatorToken;
  if (!token) {
    return res.status(400).json({
      message: "user must be a creator",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const creator = await creatorModel.findById(decoded.id);
    req.creator = creator;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "unauthorized user",
    });
  }
}

export async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;
  const creatorToken = req.cookies.creatorToken;
  if (!token && !creatorToken) {
    return res.status(400).json({
      message: "you must login first!",
    });
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);

      if (user) {
        req.user = user;
        req.authType = user;

        return next();
      }
    } catch (err) {
      return res.status(401).json({
        message: "Unauthorized User!",
      });
    }
  }
  if (creatorToken) {
    try {
      const decoded = jwt.verify(creatorToken, process.env.JWT_SECRET);

      const creator = await creatorModel.findById(decoded.id);

      if (creator) {
        req.creator = creator;
        req.authType = creator;

        return next();
      }
    } catch (err) {
      res.status(401).json({
        message: "Unauthorized user",
      });
    }
  }
}
