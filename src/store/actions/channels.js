import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});
export const setChLoading = () => ({
  type: actionTypes.SET_CHANNELS_LOADING
});

export const fetchChannels = () => {
  return dispatch => {
    instance
      .get("channels/")
      .then(res => res.data)
      .then(channels =>
        dispatch({ type: actionTypes.FETCH_CHANNELS, payload: channels })
      )
      .catch(error => console.error(error));
  };
};
