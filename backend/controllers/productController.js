import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js"; // model to query collection

// Database queries

// @desc    Fetch all Products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products); // convert to json
});

// @desc    Fetch single Products
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // mongoose expression
  const product = await Product.findById(req.params.id); //gets placeholder in url :id
  if (product) {
    res.json(product);
  } else {
    // res.status(404).json({ message: "Product not found!" });
    res.status(404); // use error middleware with custom msg, set 404 instead of 500
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById };
