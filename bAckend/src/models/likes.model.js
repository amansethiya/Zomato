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
    liked: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

likeSchema.index({ user: 1, food: 1 }, { unique: true });

const likeModel = mongoose.model("likes", likeSchema);

export default likeModel;
