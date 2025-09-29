import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(`${process.env.MONGO_URI}/GoogleAuth`)
    .then((res) => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("Failed to connect");
    });
};

export default connectDB;
