import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodVideo",
      required: true,
    },
  },
  { timestamps },
);

const likeModel = mongoose.model("likes", likeSchema);

export default likeModel;
