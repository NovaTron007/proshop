import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

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

export { authUser };
