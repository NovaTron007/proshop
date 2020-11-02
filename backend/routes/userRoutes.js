import express from "express";
const router = express.Router();

import { authUser } from "../controllers/userController.js"; // controller get methods

// routes
router.post("/login", authUser);

export default router;
