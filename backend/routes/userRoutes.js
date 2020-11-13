import express from "express";
const router = express.Router();

import { authUser, getUserProfile, registerUser, updateUserProfile } from "../controllers/userController.js"; // controller methods
import { protect } from "../middleware/authMiddleware.js"; // protect func

// routes are prepended in server.js: /api/users

// Login user
router.post("/login", authUser);

// Get profile & Update profile: router.route: for same route can chain. Pass in auth middlware
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

// Register user
router.route("/").post(registerUser);

export default router;
