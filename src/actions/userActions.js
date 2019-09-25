import axios from "axios";

import {
  SET_CURRENT_USER_DATA
} from "../types/userTypes";

// get user data belonging to userId
export const getUserData = userId => dispatch => {
  return axios
    .get("http://curioapp.herokuapp.com/api/user/id/" + userId)
    .then(res => {
      dispatch(setCurrentUserData(res.data));
    })
    .catch(
      err => console.log("userActions error: " + err)
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    );
};

// Set logged in user
export const setCurrentUserData = decoded => {
  return {
    type: SET_CURRENT_USER_DATA,
    payload: decoded
  };
};
