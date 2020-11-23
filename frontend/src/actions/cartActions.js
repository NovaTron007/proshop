import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

// Reducer takes in 2 params: state, action (data/payload). Get action payload, then save in store. data flow: action->reducer->store

// Action (call server)
// 1. addToCart action checks for product in db.
// 2. If exists dispatch into action payload, which is accessible by reducer

// Reducer
// 1. Store will be assigned this data. Set the state to payload here.

// pass id and qty when added to cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`); // after adding to cart in fed, get product info from db
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      // set payload reducer and later send to model. Model keys must match here
      product_id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  });
  // set storage
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => async (dispatch, getState) => {
  // get current cart state items
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id // product id
  });
  // set storage
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

// data: pass form values from shipping form
export const saveShippingAddress = data => async dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data // passed data as payload to reducer (action) inside the cartReducer param list
  });
  // set storage
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// save payment method action
export const savePaymentMethod = data => async dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  });
};
