import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants/userConstants";

// Action to hit api (actions to send data to db or storage. Data flow: action->reducer->store)

// Login action: process form
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

// Register action: process form
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

    // set data in storage for userInfo
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message // get error message into payload
    });
  }
};

// User details action: process form pass in id for dispatch, getState to get userLogin from store
export const getUserDetails = profile => async (dispatch, getState) => {
  try {
    // 1. dispatch with action type
    dispatch({
      type: USER_DETAILS_REQUEST
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

    // 2. get user with id the id passed
    const { data } = await axios.get(`/api/users/${profile}`, config);
    console.log(data);
    // 3. dispatch payload pass payload to reducer
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message // get error message into payload
    });
  }
};

// User details action: pass in user obj for dispatch, getState to get userLogin from store
export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    // 1. dispatch with action type
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    });

    // logged in user obj in store
    const {
      userLogin: { userInfo } // destructure store which has userInfo in localStorage
    } = getState();

    //prepare headers for sending data: pass in token to server
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    // 2. get user with id the id passed
    const { data } = await axios.put(`/api/users/profile`, user, config);
    console.log(data);
    // 3. dispatch payload pass payload to reducer
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message // get error message into payload
    });
  }
};
