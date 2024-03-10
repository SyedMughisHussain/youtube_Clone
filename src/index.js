import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// ========================Import Routes =========================
import userRouter from "./routes/userRoutes.js";

// ========================.env file config =========================
dotenv.config({
  path: "./.env",
});

const app = express();

// ========================MiddleWares=========================
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// ========================Routes MiddleWare=========================
app.use("/api/v1/users", userRouter);

export default app;
