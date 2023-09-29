import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;
const MONGODB_URL = process.env.MONGODB_URL;

//middleware
app.use(cors());
app.use(express.json());
//routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
