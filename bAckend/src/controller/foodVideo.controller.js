import foodVideoModel from "../models/foodVideo.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuid } from "uuid";
import likeModel from "../models/likes.model.js";
import saveModel from "../models/save.model.js";

export async function addFoodVideoController(req, res) {
  const { name, video, description } = req.body;
  const fileUploadResult = await uploadFile(req.file.buffer, uuid());

  const foodVideo = await foodVideoModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    creator: req.creator._id,
  });
  res.status(200).json({
    message: "congretulation! food Video Added.",
    foodVideo,
  });
}

export async function getFoodVideoController(req, res) {
  const foodVideos = await foodVideoModel
    .find({})
    .populate("creator", "username");
  res.status(200).json({
    message: "wow! i have found a food videos for you.",
    foodVideos,
  });
}

export async function likeController(req, res) {
  const { foodId } = req.body;
  const userId = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: userId,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: userId,
      food: foodId,
    });

    await foodVideoModel.findByIdAndUpdate(foodId, {
      $inc: { likecount: -1 },
    });

    return res.status(200).json({
      message: "extra like deleted",
    });
  }

  const like = await likeModel.create({
    user: userId,
    food: foodId,
  });

  await foodVideoModel.findByIdAndUpdate(foodId, {
    $inc: { likecount: 1 },
  });

  res.status(201).json({
    message: "food liked by someone",
    like,
  });
}

export async function saveController(req, res) {
  const { foodId } = req.body;
  const user = req.user._id;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    res.status(200).json({
      message: "extra saved deleted",
    });
  }

  const save = await saveModel.create({
    user: req.user._id,
    food: foodId,
  });

  res.status(201).json({
    message: "food saved by someone",
    save,
  });
}
