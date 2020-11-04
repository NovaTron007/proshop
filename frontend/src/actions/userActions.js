import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from "../constants/userConstants";

export const login = (email, password) => async dispatch => {
  try {
    // 1. action type
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    // set type json
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // 2. fetch api
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
