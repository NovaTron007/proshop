import express from "express"; // use routes
import asyncHandler from "express-async-handler";
const router = express.Router();
import Product from "../models/productModel.js"; // model to query collection

// @desc    Fetch all Products
// @route   GET /api/products
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products); // convert to json
  })
);

// @desc    Fetch single Products
// @route   GET /api/products/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // mongoose expression
    const product = await Product.findById(req.params.id); //gets placeholder in url :id
    if (product) {
      res.json(product);
    } else {
      // res.status(404).json({ message: "Product not found!" });
      res.status(404); // use error middleware with custom msg, set 404 instead of 500
      throw new Error("Product not found");
    }
  })
);

export default router;
