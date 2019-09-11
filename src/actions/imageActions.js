import axios from "axios";

import {
  SET_IMAGE
} from "../types/imageTypes";

// get artefacts of user based on userId
export const uploadImage = data => dispatch => {
  return axios
    .post("http://curioapp.herokuapp.com/img-upload", data)
    .then(res => {
      dispatch(setImage(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
     })
    );
}

// assign user artefacts based on decoded
export const setImage = decoded => {
  return {
    type: SET_IMAGE,
    payload: decoded
  };
};