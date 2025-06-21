import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express";
import userRoute from "./routes/authRouter.js";
import bodyparser from "body-parser";
import todoRoute from "./routes/todoRoutes.js";
import cookieparser from "cookie-parser";

dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo", todoRoute);

const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`server runing on port ${PORT}`);
// });

export default app