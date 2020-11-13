import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

//reducer takes in 2 params: state, action (data/payload). Get action payload,save in store. data flow: action->reducer->store

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const cartItem = action.payload;
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
    default:
      return state;
  }
};
