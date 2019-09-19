import axios from "axios";

import { SET_USER_ARTEFACTS, ADD_NEW_ARTEFACT } from "../types/artefactsTypes";

// get all artefacts of user based on userId
export const getUserArtefacts = userId => dispatch => {
  return axios
    .get("http://curioapp.herokuapp.com/api/artefact/userId/" + userId)
    .then(res => {
      dispatch(setUserArtefacts(res.data));
    })
    .catch(err => console.log("artefactActions: " + err));
};

// store all of the user's artefacts into redux state
export const setUserArtefacts = decoded => {
  return {
    type: SET_USER_ARTEFACTS,
    payload: decoded
  };
};

// add user's newly posted/created rtefacts into redux state
export const addNewArtefact = decoded => {
  return {
    type: ADD_NEW_ARTEFACT,
    payload: decoded
  };
};
