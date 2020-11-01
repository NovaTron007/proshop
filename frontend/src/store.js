import { createStore, combineReducers, applyMiddleware } from "redux"; // applyMiddleware to use thunk
import thunk from "redux-thunk"; // allow actions async
import { composeWithDevTools } from "redux-devtools-extension";

// import reducers
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

//1. Create reducer: use Multiple reducers here
const reducer = combineReducers({
  productList: productListReducer, // productList reducer
  productDetails: productDetailsReducer, // productDetails reducer
  cart: cartReducer // cart reducer
});

// check cart in localStorage
const cartItemsFromStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

//2. Initialise State when redux store loads
const initialState = {
  // cart object: get cart from localstorage
  cart: { cartItems: cartItemsFromStorage }
};

const middleware = [thunk]; // add middleware spread new middlewares

//3. Create store
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))); // devtools for chrome

export default store;
