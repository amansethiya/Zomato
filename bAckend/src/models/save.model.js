import mongoose from "mongoose";

const saveSchema = new mongoose.Schema(
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
    saved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const saveModel = mongoose.model("saved", saveSchema);

export default saveModel;
