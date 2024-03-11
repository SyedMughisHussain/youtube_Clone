import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route('/login').post(loginUser)

export default router;
