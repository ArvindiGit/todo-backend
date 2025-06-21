import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "All field are required.",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "This Email is Already Register",
      });
    }
    const bycript_for_strong_password = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: bycript_for_strong_password,
    });
    return res.status(201).json({
      success: true,
      message: `Welcome to ${username}`,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All field are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "This Email is Already Register.",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Passored not match yet.",
      });
    }
    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // const payload = JSON.parse(
    //   Buffer.from(token.split(".")[1], "base64").toString()
    // );
    // console.log("payload", payload);

    // console.log("token", user._id);
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.username}`,
      authtoken: token,
    });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (_, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User logout Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   const { username, email, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   const user = await User.create({ username, email, password: hash });
//   res.status(201).json({ message: "User registered", user });
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password)))
//     return res.status(401).json({ error: "Invalid credentials" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
//   res.cookie("token", token, { httpOnly: true }).json({ message: "Logged in" });
// };

