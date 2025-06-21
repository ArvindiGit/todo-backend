import { Todo } from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;
    if (!title || !description) {
      return res.status(403).json({
        success: false,
        message: "All fields required.",
      });
    }

    const todo = await new Todo({ title, description, user: userId }).save();

    return res.status(201).json({
      success: true,
      message: "Todo created.",
      todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId });
    // console.log("todos", todos);
    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
