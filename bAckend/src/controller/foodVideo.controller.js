import foodVideoModel from "../models/foodVideo.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuid } from "uuid";

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
  const foodVideos = await foodVideoModel.find({});
  res.status(200).json({
    message: "wow! i have found a food videos for you.",
    foodVideos,
  });
}
