// import constants
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants";

/*  reducer takes in 2 params: state, action (data/payload). Get action payload and save in store.
    data flow: action->reducer->store
 */

// Product list
export const productListReducer = (state = { products: [] }, action) => {
  // validate action type
  switch (action.type) {
    // initial state
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: []
      };
    // populate products
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

// product:id
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state // get state above
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
