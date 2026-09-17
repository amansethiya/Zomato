import foodItemModel from "../models/fooditem.model.js";
export async function createFoodController(req, res) {
  const { name, video, description } = req.body;
  console.log(req.body);
  console.log(req.file);
}
