import creatorModel from "../models/creator.model.js";
import foodVideoModel from "../models/foodVideo.model.js";

export async function profileController(req, res) {
  const creatorId = req.params.id;

  const creator = await creatorModel.findById(creatorId);
  const creatorFoodVideo = await foodVideoModel.find({ creator: creatorId });

  if (!creator) {
    return res.status(404).json({
      message: "creator not found",
    });
  }

  res.status(200).json({
    message: "creator profile found",
    creator: {
      ...creator.toObject(),
      foodVideos: creatorFoodVideo,
    },
  });
}
