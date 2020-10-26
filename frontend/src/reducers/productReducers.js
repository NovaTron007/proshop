// import constants
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants";

// reducer takes in 2 params: state, action (data/payload). Get action payload and save in store.
// data flow: action->reducer->store
export const productListReducer = (state = { products: [] }, action) => {
  // validate action type
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: []
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
