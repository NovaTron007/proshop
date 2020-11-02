import express from "express";
const router = express.Router();

import { authUser, getUserProfile } from "../controllers/userController.js"; // controller get methods
import { protect } from "../middleware/authMiddleware.js"; // protect func
// routes
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile); // router.route for same route uses post, get etc. Pass in auth middlware

export default router;
