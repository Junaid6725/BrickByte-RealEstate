import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "./../utils/error.js";

export const test = (req, res) => {
  console.log("API is working fine");
  res.send(`<h1 style="color:purple">Welcome to the Real Estate API</h1>`);
};

export const registerUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return next(errorHandler(400, "Please fill all the fields"));
    }
    const user = await User.findOne({ email });
    if (user) {
      return next(errorHandler(400, "User already exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};
