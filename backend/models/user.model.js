import mongoose from "mongoose";

const userSchma = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  image: { type: String },
});

const User = mongoose.model("User", userSchma);
export default User;
