import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // user model
import asyncHandler from "express-async-handler"; // use express error handlers

// middleware functions: req, res, next always
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // console.log(req.headers.authorization); // get auth headers sent
    try {
      token = req.headers.authorization.split(" ")[1]; // split at ' ' returns array:[Bearer,token] get pos 1 (token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // returns object with user._id in db

      // console.log(decoded);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401); // not authorized
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// middleware func: req, res, next
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401); // not authorized
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
