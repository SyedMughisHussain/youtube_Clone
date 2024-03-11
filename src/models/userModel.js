import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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


userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = function (password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

userSchema.methods.generateAccessToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRY,
  });
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRY,
  });
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
