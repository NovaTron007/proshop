import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`); // get product info from db
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
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
