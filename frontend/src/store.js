import { createStore, combineReducers, applyMiddleware } from "redux"; // applyMiddleware to use thunk
import thunk from "redux-thunk"; // allow actions async
import { composeWithDevTools } from "redux-devtools-extension";

//1. Create reducer: use Multiple reducers here
const reducer = combineReducers({});

//2. Initialise State when redux store loads
const initialState = {};

const middleware = [thunk]; // add middleware spread new middlewares

//3. Create store
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))); // devtools for chrome

export default store;
