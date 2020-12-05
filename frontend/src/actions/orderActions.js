import axios from "axios";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_PAY_REQUEST, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS } from "../constants/orderConstants";

// Action to hit api (actions to send data to db or storage. Data flow: action->reducer->store)

// Create Order Details action: pass in user obj for dispatch, getState to get userLogin from store
export const createOrder = order => async (dispatch, getState) => {
  try {
    // 1. dispatch with action type
    dispatch({
      type: ORDER_CREATE_REQUEST
    });

    // logged in user obj in store
    const {
      userLogin: { userInfo } // destructure store which has userInfo in localStorage
    } = getState();

    // prepare headers for sending data
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    // 2. pass in order obj to api
    const { data } = await axios.post(`/api/orders`, order, config);
    console.log(data);
    // 3. dispatch payload pass payload to reducer
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data // order data
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message // get error message into payload
    });
  }
};

// Get Order Details action: pass in order id for dispatch, getState to get userLogin from store
export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    // 1. dispatch with action type
    dispatch({
      type: ORDER_DETAILS_REQUEST
    });

    // logged in user obj in store
    const {
      userLogin: { userInfo } // destructure store which has userInfo in localStorage
    } = getState();

    // prepare headers for sending data: pass in token to server
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    // 2. pass in order obj to api
    const { data } = await axios.get(`/api/orders/${id}`, config);
    console.log(data);
    // 3. dispatch payload pass payload to reducer
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data // order data
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message // get error message into payload
    });
  }
};

// Pay Order action:
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    // 1. dispatch with action type
    dispatch({
      type: ORDER_PAY_REQUEST
    });

    // need logged in user obj from store
    const {
      userLogin: { userInfo } // destructure store which has userInfo in localStorage
    } = getState();

    // prepare headers for sending data: pass in token to server
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    // 2. pass in order obj to api
    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
    console.log(data);
    // 3. dispatch payload pass payload to reducer
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data // order data
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message // get error message into payload
    });
  }
};

// Get user orders
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    // 1. dispatch with action type
    dispatch({
      type: ORDER_LIST_MY_REQUEST
    });

    // need logged in user obj from store
    const {
      userLogin: { userInfo } // destructure store which has userInfo in localStorage
    } = getState();

    // prepare headers for sending data: pass in token to server
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    //2. pass in userid to api
    const { data } = await axios.get(`/api/orders/myorders`, config); // pass config above with headers

    // 3. dispatch payload and pass payload to reducer
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message // get error message into payload
    });
  }
};
