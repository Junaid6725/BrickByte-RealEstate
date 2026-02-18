import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "./../utils/error.js";
import jwt from "jsonwebtoken";

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

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(errorHandler(400, "Please fill all the fields"));
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User does not exist"));
    }
    const isPasswordMatch = await bcrypt.compare(password, validUser.password);
    if (!isPasswordMatch) {
      return next(errorHandler(400, "Invalid Password"));
    }
    const token = jwt.sign(
      { id: validUser._id, email: validUser.email },
      process.env.JWT_SECRET,
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .status(200)
      .json({
        message: "Login successful",
        ...rest,
      });
  } catch (error) {
    next(error);
  }
};
