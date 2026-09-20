import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema({
  creatorusername: {
    type: String,
    required: true,
    unique: true,
  },
  creatoremail: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    min: 6,
  },
});

const creatorModel = mongoose.model("creator", creatorSchema);
export default creatorModel;
