import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "A user name is required"],
      unique: [true, "A username should be unique"],
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "A email is required"],
      unique: [true, "A email should be unique"],
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: [true, "A full name is required"],
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      required: [true, "A avatar is required"],
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "A password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
