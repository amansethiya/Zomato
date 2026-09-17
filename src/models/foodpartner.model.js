import mongoose from "mongoose";

const foodpartnerSchema = new mongoose.Schema({
  foodpartnername: {
    type: String,
    required: true,
  },
  foodpartneremail: {
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

const foodpartnerModel = mongoose.model("foodpartner", foodpartnerSchema);
export default foodpartnerModel;
