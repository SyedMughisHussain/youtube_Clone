import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

  console.log(req.files)
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  const { userName, fullName, email, password } = req.body;

  if (userName === "" || fullName === "" || email === "" || password === "") {
    throw new ApiError("Please fill all fields", 400);
  }

  const isUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (isUser) {
    throw new ApiError("User is already wiht this username or password");
  }

  // console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(avatarLocalPath);

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError("Please upload an avatar", 400);
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError("Avatar file is required.", 400);
  }

  const user = await User.create({
    userName,
    email,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
  });

  return res
    .status(201)
    .json(new ApiResponse("User Created Successfuly.", 200, user));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, password } = req.body;

  if (email === "" || password === "") {
    throw new ApiError("Please fill all fields", 400);
  }

  const user = await User.findOne({email});
  console.log(user);

  if (!user) {
    throw new ApiError("User does not exist with this email or username.", 400);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new ApiError("Incorrect password", 400);
  }

  const token = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return res
  .status(200)
  .json(new ApiResponse("Login Successfuly.", 200, { token, refreshToken }));

});

export { registerUser, loginUser };
