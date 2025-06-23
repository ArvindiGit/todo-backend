import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express";
import userRoute from "./routes/authRouter.js";
import bodyparser from "body-parser";
import todoRoute from "./routes/todoRoutes.js";
import cookieparser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import uploadRout from "./routes/uploadRoute.js";

dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo", todoRoute);

// Serve static files from uploads folder
// http://localhost:5000/api/upload
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", uploadRout);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
