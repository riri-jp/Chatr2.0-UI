import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const createChannel = channel => {
  return async dispatch => {
    try {
      const response = await instance.post("/channels/create/", channel);
      const newChannel = response.data;
      dispatch({
        type: actionTypes.CREATE_CHANNELS,
        payload: newChannel
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
};
