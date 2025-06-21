import mongoose from "mongoose";

const toUser = new mongoose.Schema(
  {
    username: {
      type: String,
      requied: true,
      unique: true,
    },
    email: {
      type: String,
      requied: true,
    },
    password: {
      type: String,
      default: true,
    }, 
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", toUser);

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// module.exports = mongoose.model("User", userSchema);
