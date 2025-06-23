import mongoose from "mongoose";
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requied: true,
    },
    description: {
      type: String,
      requied: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
export const Todo = mongoose.model("Todo", todoSchema);
