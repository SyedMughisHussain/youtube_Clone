import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

export default app;
