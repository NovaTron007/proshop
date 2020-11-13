import { createStore, combineReducers, applyMiddleware } from "redux"; // applyMiddleware to use thunk
import thunk from "redux-thunk"; // allow actions async
import { composeWithDevTools } from "redux-devtools-extension";

// import reducers
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from "./reducers/userReducers";

//1. Combine reducers: add reducers here.
const reducer = combineReducers({
  // state: store assigns data from actions here
  productList: productListReducer, // productList reducer
  productDetails: productDetailsReducer, // productDetails reducer
  cart: cartReducer, // cart reducer
  userLogin: userLoginReducer, // login reducer
  userRegister: userRegisterReducer, // register reducer
  userDetails: userDetailsReducer, // user details reducer
  userUpdateProfile: userUpdateProfileReducer // update profile reducer
});

// LocalStorage: get cart, userInfo
const cartItemsFromStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

//2. Initialise State when redux store loads
const initialState = {
  // cart object: get cart from localstorage
  // userLogin object: assign from storage
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk]; // add middleware spread new middlewares

//3. Create store
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))); // devtools for chrome

export default store;
