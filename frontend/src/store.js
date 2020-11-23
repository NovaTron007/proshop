import { createStore, combineReducers, applyMiddleware } from "redux"; // applyMiddleware to use thunk
import thunk from "redux-thunk"; // allow actions async
import { composeWithDevTools } from "redux-devtools-extension";

// import reducers
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from "./reducers/userReducers";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from "./reducers/orderReducers";

//1. Combine reducers: add reducers here and save state to the store. state: store assigns data from actions here

const reducer = combineReducers({
  // productReducers.js
  productList: productListReducer, // productList reducer
  productDetails: productDetailsReducer, // productDetails reducer
  cart: cartReducer, // cart reducer

  // userReducers.js
  userLogin: userLoginReducer, // login reducer
  userRegister: userRegisterReducer, // register reducer
  userDetails: userDetailsReducer, // user details reducer
  userUpdateProfile: userUpdateProfileReducer, // update profile reducer

  // orderReducers.js
  orderCreate: orderCreateReducer, //  create order reducer
  orderDetails: orderDetailsReducer, // order details
  orderPay: orderPayReducer // order pay
});

// LocalStorage: get storage items that were set in cartAction.js
const cartItemsFromStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []; // has storage? else empty storage
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {};

//2. Initialise State when redux store loads
const initialState = {
  // assign new obj with the storage
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk]; // add middleware spread new middlewares

//3. Create store
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))); // devtools for chrome

export default store;
