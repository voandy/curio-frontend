import axios from "axios";

import {
  SET_USER_GROUPS, ADD_NEW_GROUP
} from "../types/groupsTypes";

// get groups of user based on userId
export const getUserGroups = userId => dispatch => {
  return axios
    .get("http://curioapp.herokuapp.com/api/user/id/" + userId + "/groups")
    .then(res => {
      dispatch(setUserGroups(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
     })
    );
}

// create new group based on groupData
export const createNewGroup = groupData => dispatch => {
    return axios
    .post("http://curioapp.herokuapp.com/api/artefact", groupData)
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

// assign user groups
export const setUserGroups = decoded => {
  return {
    type: SET_USER_GROUPS,
    payload: decoded
  };
};

// assign new group to user
export const addNewGroup = decoded => {
  return {
    type: ADD_NEW_GROUP,
    payload: decoded
  };
};