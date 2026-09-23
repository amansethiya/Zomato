import mongoose from "mongoose";

const foodVideoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creator",
  },
  likecount: {
    type: Number,
    default: 0,
  },
});

const foodVideoModel = mongoose.model("foodVideo", foodVideoSchema);
export default foodVideoModel;
