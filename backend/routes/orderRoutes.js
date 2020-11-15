import express from "express";
const router = express.Router();

import { addOrderItems } from "../controllers/orderController.js"; // controller methods
import { protect } from "../middleware/authMiddleware.js"; // protect func

// routes are prepended in server.js: /api/users

// Create Order: api/orders/
router.route('/').post(protect, addOrderItems); // hit endpoint with controller method to create order

export default router;