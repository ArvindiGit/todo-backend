import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    requied: true,
  },
  description: {
    type: String,
    requied: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // completed: {
  //   type: Boolean,
  //   default: false,
  // },
});
export const Todo = mongoose.model("Todo", todoSchema);
