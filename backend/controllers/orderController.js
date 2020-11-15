import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// Database queries

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  // get form fields
  const { 
    orderItems, 
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    taxPrice, 
    shippingPrice, 
    totalPrice } = req.body;

if(orderItems && orderItems.length === 0){
  res.status(400);
  throw new Error('No order items');
  return;
} else {
  // create order obj using model
  const order = new Order ({ 
    orderItems, 
    user: req.user._id,
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    taxPrice, 
    shippingPrice, 
    totalPrice 
  });

  // save order to db
  const createdOrder = await order.save();
  res.status(201).json(createdOrder); // return status
}
});


export {addOrderItems};