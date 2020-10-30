import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants";
import axios from "axios";

// like useEffect: fetch data and dispatch action to reducer
export const listProducts = () => async dispatch => {
  try {
    // 1. action type
    dispatch({
      type: PRODUCT_LIST_REQUEST
    });

    // 2. fetch api if success
    const { data } = await axios.get("/api/products");

    // 3. dispatch payload pass payload to reducer
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message // get error message into payload
    });
  }
};

export const listProductDetails = id => async dispatch => {
  try {
    // 1. action type
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    });

    // 2. fetch api if success
    const { data } = await axios.get(`/api/products/${id}`);

    // 3. dispatch payload pass payload to reducer
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message // get error message into payload
    });
  }
};
