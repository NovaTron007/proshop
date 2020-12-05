import express from "express";
const router = express.Router();

// controller methods
import { authUser, getUserProfile, getUsers, registerUser, updateUserProfile } from "../controllers/userController.js";

// middleware functions
import { protect, admin } from "../middleware/authMiddleware.js";

// Routes are prepended in server.js: /api/users
// Login user
router.post("/login", authUser);

// Get profile & Update profile: router.route: for same route can chain. Pass in auth middleware functions
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

// Register user & get users
router.route("/").post(registerUser).get(protect, admin, getUsers);

export default router;
