import mongoose from "mongoose";

function connectDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database connected successfullY");
    })
    .catch((err) => {
      console.log("error in connecting db: ", err);
    });
}

export default connectDb;
