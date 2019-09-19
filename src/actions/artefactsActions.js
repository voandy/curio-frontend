import axios from "axios";

import { SET_USER_ARTEFACTS, ADD_NEW_ARTEFACT } from "../types/artefactsTypes";

// get artefacts of user based on userId
export const getUserArtefacts = userId => dispatch => {
  return axios
    .get("http://curioapp.herokuapp.com/api/artefact/userId/" + userId)
    .then(res => {
      dispatch(setUserArtefacts(res.data));
    })
    .catch(err => console.log("artefactActions: " + err));
};

// assign user artefacts
export const setUserArtefacts = decoded => {
  return {
    type: SET_USER_ARTEFACTS,
    payload: decoded
  };
};

// assign new artefact based on decoded
export const addNewArtefact = decoded => {
  return {
    type: ADD_NEW_ARTEFACT,
    payload: decoded
  };
};
