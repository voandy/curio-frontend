import {
  SET_CURRENT_USER_DATA,
  CLEAR_CURRENT_USER_DATA
} from "../types/userTypes";

import { getUserAPIRequest } from "../utils/APIHelpers/userAPIHelpers";

// Async Redux actions //
// get user data belonging to userId
export const getUserData = userId => dispatch => {
  //get user by id
  getUserAPIRequest(userId)
    // success
    .then(res => dispatch(setCurrentUserData(res.data)))
    // failure
    .catch(err => console.log("userActions error: " + err));
};

// Redux actions //
// Set logged in user
export const setCurrentUserData = decoded => {
  return {
    type: SET_CURRENT_USER_DATA,
    payload: decoded
  };
};

export const clearCurrentUserData = () => {
  return {
    type: CLEAR_CURRENT_USER_DATA
  };
};
