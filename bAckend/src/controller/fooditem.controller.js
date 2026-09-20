import foodItemModel from "../models/fooditem.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuid } from "uuid";

export async function createFoodController(req, res) {
  const { name, video, description } = req.body;
  const fileUploadResult = await uploadFile(req.file.buffer, uuid());

  const foodItem = await foodItemModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodpartner._id,
  });
  res.status(200).json({
    message: "congretulation! food item created.",
    foodItem,
  });
}

export async function getFoodController(req, res) {
  const foodItems = await foodItemModel.find({});
  res.status(200).json({
    message: "wow! i have found a food videos for you.",
    foodItems,
  });
}
