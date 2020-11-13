import asyncHandler from "express-async-handler"; // use express error handlers
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Database queries

// @desc    Auth User and get token
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // get fields from form

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      isAdmin: user.isAdmin,
      name: user.name,
      email: user.email,
      token: generateToken(user._id) // pass user id
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});

// @desc    Get User profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      isAdmin: user.isAdmin,
      name: user.name,
      email: user.email,
      token: generateToken(user._id) // pass user id
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Register a new User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // get fields from form

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // also runs pre 'save' in model
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      isAdmin: user.isAdmin,
      name: user.name,
      email: user.email,
      token: generateToken(user._id) // pass user id
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Update User profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save(); // write to db

    res.json({
      _id: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(user._id) // pass user id
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
