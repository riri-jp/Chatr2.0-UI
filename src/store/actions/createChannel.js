import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const CreateChannel = (channel, history) => {
  return async dispatch => {
    try {
      const response = await instance.post("channels/create/", channel);
      const newChannel = response.data;
      console.log(newChannel);
      dispatch({
        type: actionTypes.CREATE_CHANNEL,
        payload: newChannel
      });
      history.replace(`/channels/${newChannel.id}/`);
    } catch (error) {
      console.error(error);
    }
  };
};
