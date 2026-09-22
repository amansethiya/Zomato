import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import creatorModel from "../models/creator.model.js";

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
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
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
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
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

export async function registercreatorController(req, res) {
  const { creatorusername, creatoremail, password } = req.body;
  const isExists = await creatorModel.findOne({
    creatoremail,
  });
  if (isExists) {
    return res.status(400).json({
      message: "creator email already registered!",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const creator = await creatorModel.create({
    creatorusername,
    creatoremail,
    password: hashPassword,
  });
  const creatorToken = jwt.sign({ id: creator._id }, process.env.JWT_SECRET);
  res.cookie("creatorToken", creatorToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(201).json({
    message: "Congretulation you are now creator",
    creator: {
      creatorusername,
      creatoremail,
    },
    creatorToken,
  });
}

export async function logincreatorController(req, res) {
  const { creatoremail, password } = req.body;
  const creator = await creatorModel.findOne({
    creatoremail,
  });
  if (!creator) {
    return res.status(400).json({
      message: "creator is not registered registered!",
    });
  }
  const checkPassword = await bcrypt.compare(password, creator.password);
  if (!checkPassword) {
    return res.status(400).json({
      message: "creator password is wrong!",
    });
  }
  const creatorToken = jwt.sign({ id: creator._id }, process.env.JWT_SECRET);
  res.cookie("creatorToken", creatorToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(201).json({
    message: "Congretulation you are now creator",
    creator: {
      creatorUsername: creator.creatorusername,
      creatorEmail: creator.creatoremail,
    },
    creatorToken,
  });
}

export async function logoutcreatorController(req, res) {
  res.clearCookie("creatorToken");
  res.status(200).json({
    message: "user Logged-Out Successfully",
  });
}
