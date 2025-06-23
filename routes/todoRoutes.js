import express from "express";
import { createTodo, getAllTodo, updateTodo } from "../controllers/todoController.js";
import verifyHeaderToken from "../middlewares/verifyHeaderToken.js";

const todoRoute = express.Router();
todoRoute
  .route("/")
  .post(verifyHeaderToken, createTodo)
  .get(verifyHeaderToken, getAllTodo);
todoRoute.route("/:id").put(updateTodo)
export default todoRoute;
