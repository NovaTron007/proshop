import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

// Login action
export const login = (email, password) => async dispatch => {
  try {
    // 1. action type
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    // prepare headers for sending data
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // 2. send data to api and get response
    const { data } = await axios.post("/api/users/login", { email, password }, config);

    // 3. dispatch payload pass payload to reducer
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    // set login status in storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message // get error message into payload
    });
  }
};

// Logout action
export const logout = () => dispatch => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT
  });
};

// Register action
export const register = (name, email, password) => async dispatch => {
  try {
    // 1. dispatch with action type
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    // prepare headers for sending data
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    // 2. send data to api and get response
    const { data } = await axios.post("/api/users", { name, email, password }, config);

    // 3. dispatch payload pass payload to reducer
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });

    // 4. login user after registration
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data // user data with token from server
    });

    // set storage for login
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message // get error message into payload
    });
  }
};
