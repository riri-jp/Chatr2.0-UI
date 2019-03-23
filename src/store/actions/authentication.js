import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";

import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

const setAuthToken = token => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
  }
};

export const checkForExpiredToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const currentTime = Date.now() / 1000;

    const user = jwt_decode(token);

    if (user.exp >= currentTime) {
      setAuthToken(token);
      return setCurrentUser(user);
    }
  }
  return logout();
};

export const login = (userData, history) => {
  return async dispatch => {
    try {
      let response = await instance.post("/login/", userData);
      let user = response.data;
      setAuthToken(user.token);
      dispatch(setCurrentUser(jwt_decode(user.token)));
      history.push("/private");
    } catch (error) {
      console.error(error.response.data);
      alert("Wrong User Name Or password, Try Agaien Or Signup");
    }
  };
};

export const signup = (userData, history) => {
  return dispatch => {
    instance
      .post("/signup/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
        history.push("/private");
      })
      .catch(err => dispatch(setErrors(err.response.data)));
  };
};

export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
