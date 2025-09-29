import { oauth2client } from "../config/google.config.js";
import axios from "axios";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    const googleRes = await oauth2client.getToken({
      code,
      redirect_uri: "postmessage",
    });
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    let { email, name, picture } = userRes.data;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
      });
    }

    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    return res.status(200).json({
      status: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Internal server error",
    });
  }
};
