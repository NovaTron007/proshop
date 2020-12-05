import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// Database queries

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  // get form fields
  const { orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    // create order obj using model
    const order = new Order({
      orderItems, // foreign key as model required
      user: req.user._id, // foreign key as model required
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    // save order to db
    const createdOrder = await order.save();
    res.status(201).json(createdOrder); // return status
  }
});

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // get order id from url set in PlaceOrderScreen
  const order = await Order.findById(req.params.id).populate("user", "name email"); // pull from user doc: name email

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // get order id from url set in PlaceOrderScreen
  const order = await Order.findById(req.params.id);

  if (order) {
    // set order fields in document
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    };
    // save order to db
    const updatedOrder = await order.save();
    // send back updated order
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc    Get logged in users orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  // get orders from db
  const orders = await Order.find({ user: req.user._id }); //  get all orders with user id (use obj: more than 1 order)
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
