import express from "express";
import { login, logout, register } from "../controllers/authController.js";

const userRoute = express.Router();

userRoute.route("/register").post(register);
userRoute.route("/login").post(login);
// userRoute.route("/login/profile-cookie").post(login);
// userRoute.route("/login/profile-header").post(login);
userRoute.route("/logout").get(logout);

export default userRoute;
