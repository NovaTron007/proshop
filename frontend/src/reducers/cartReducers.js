import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

// Reducer takes in 2 params: state, action (data/payload). Get dispatched action's payload,
// Assign in reducer in store, to access date. data flow: dispatch action->reducer->store (config order: consts, reducer, store, action )

// Action (call server)
// 1. addToCart action checks for product in db.
// 2. If exists dispatch into action payload, which is accessible by reducer

// Reducer
// 1. Store will be assigned this data. Set the state to payload here.

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const cartItem = action.payload; // set cartItem to payload from action
      const existItem = state.cartItems.find(item => item.product_id === cartItem.product_id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item => (item.product_id === existItem.product_id ? cartItem : item))
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, cartItem] // add new item to current state
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product_id !== action.payload) // filter cart w/o payload (id)
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      };
    default:
      return state;
  }
};
