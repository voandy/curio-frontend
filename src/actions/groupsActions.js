import axios from "axios";

import {
  SET_USER_GROUPS, ADD_NEW_GROUP
} from "../types/groupsTypes";

// create new group based on adminId
export const createNewGroup = adminId => dispatch => {
    return axios
      .get("http://curioapp.herokuapp.com/api/group/adminId/" + adminId)
      .then(res => {

        // set new group
        dispatch(addNewGroup(res.data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

// assign new group to user
export const addNewGroup = decoded => {
  return {
    type: ADD_NEW_GROUP,
    payload: decoded
  };
};