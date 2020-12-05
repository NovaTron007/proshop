import express from "express";
const router = express.Router();

import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid } from "../controllers/orderController.js"; // controller methods
import { protect } from "../middleware/authMiddleware.js"; // protect func

// routes are prepended in server.js: /api/users

// Create Order: api/orders/
router.route("/").post(protect, addOrderItems).get(getOrderById); // hit endpoint with controller method to create order

// Orders: api/orders/myorders
router.route("/myorders").get(protect, getMyOrders);

// Get order by id
router.route("/:id").get(protect, getOrderById);

//Update order status
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
