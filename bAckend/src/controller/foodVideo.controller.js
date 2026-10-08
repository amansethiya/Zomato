import foodVideoModel from "../models/foodVideo.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuid } from "uuid";
import likeModel from "../models/likes.model.js";
import saveModel from "../models/save.model.js";
import creatorModel from "../models/creator.model.js";

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

export async function checkCreatorController() {}

export async function getFoodVideoController(req, res) {
  try {
    const userId = req.authType;

    const foodVideos = await foodVideoModel
      .find({})
      .sort({ _id: -1 })
      .populate("creator", "creatorusername")
      .lean();

    const videosWithLikeSavedStatus = await Promise.all(
      foodVideos.map(async (video) => {
        const isLiked = await likeModel.findOne({
          user: userId,
          food: video._id,
        });
        const isSaved = await saveModel.findOne({
          user: userId,
          food: video._id,
        });

        return {
          ...video,
          liked: !!isLiked,
          saved: !!isSaved,
        };
      }),
    );

    res.status(200).json({
      message: "wow! i have found food videos for you.",
      foodVideos: videosWithLikeSavedStatus,
    });
  } catch (error) {
    console.error("Get food videos error:", error);

    res.status(500).json({
      message: "Unable to fetch food videos",
    });
  }
}

export async function likeController(req, res) {
  const { foodId } = req.body;
  const userId = req.authType;

  const isAlreadyLiked = await likeModel.findOne({
    user: userId,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: userId,
      food: foodId,
    });

    const updatedVideo = await foodVideoModel.findByIdAndUpdate(
      foodId,
      {
        $inc: { likecount: -1 },
      },
      {
        returnDocument: "after",
      },
    );

    return res.status(200).json({
      message: "extra like deleted",
      liked: false,
      likecount: updatedVideo.likecount,
    });
  }

  const like = await likeModel.create({
    user: userId,
    food: foodId,
  });

  const updatedVideo = await foodVideoModel.findByIdAndUpdate(
    foodId,
    {
      $inc: { likecount: 1 },
    },
    {
      returnDocument: "after",
    },
  );

  res.status(201).json({
    message: "food liked by someone",
    liked: true,
    likecount: updatedVideo.likecount,
  });
}

export async function saveController(req, res) {
  const { foodId } = req.body;
  const userId = req.authType;

  const isAlreadySaved = await saveModel.findOne({
    user: userId,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: userId,
      food: foodId,
    });

    return res.status(200).json({
      message: "extra save deleted",
      saved: false,
    });
  }

  const save = await saveModel.create({
    user: userId,
    food: foodId,
  });

  res.status(201).json({
    message: "food vid saved by someone",
    saved: true,
    save: save,
  });
}

export async function getSaveController(req, res) {
  try {
    const userId = req.authType;

    if (!userId) {
      return res.status(401).json({
        message: "please login to get saved videos",
      });
    }

    const savedVideos = await saveModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "food",
        populate: {
          path: "creator",
          select: "creatorusername",
        },
      })
      .lean();

    const foodVideos = await Promise.all(
      savedVideos
        .map((item) => item.food)
        .filter(Boolean)
        .map(async (video) => {
          const isLiked = await likeModel.findOne({
            user: userId,
            food: video._id,
          });

          return {
            ...video,
            saved: true,
            liked: !!isLiked,
          };
        }),
    );

    res.status(200).json({
      message: "saved videos found",
      foodVideos,
    });
  } catch (error) {
    console.error("Get saved videos error:", error);

    res.status(500).json({
      message: "Unable to fetch saved videos",
    });
  }
}

export async function myVideosController(req, res) {
  const creator = req.creator._id;
  if (!creator) {
    return res.status(401).json({
      message: "please login first to fatch videos",
    });
  }
  const creatorVideos = await foodVideoModel
    .find({ creator: req.creator._id })
    .sort({ _id: -1 });

  res.status(200).json({
    message: "videos of creator: ",
    creator,
    creatorVideos: creatorVideos,
  });
}
