import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerController(req, res) {
  const { fullname, email, password } = req.body;
  const isUserExist = await userModel.findOne({
    email,
  });
  if (isUserExist) {
    return res.status(400).json({
      message: "user alread exists!",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullname,
    email,
    password: hashPassword,
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "user Registered Successfully",
    user: { yourId: user._id, FullName: user.fullname, Email: user.email },
  });
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({
      message: "user does not exists!",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "incorrect password!",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "user Logged-In Successfully",
    user: {
      yourId: user._id,
      FullName: user.fullname,
      Email: user.email,
    },
  });
}

export async function logoutController(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "user Logged-Out Successfully",
  });
}
