import express from "express"; // use routes
const router = express.Router();

import { getProducts, getProductById } from "../controllers/productController.js"; // controller get methods

// routes
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
