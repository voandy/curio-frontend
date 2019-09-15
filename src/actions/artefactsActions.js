import axios from "axios";

import {
  SET_USER_ARTEFACTS,
  ADD_NEW_ARTEFACT,
} from "../types/artefactsTypes";

// get artefacts of user based on userId
export const getUserArtefacts = userId => dispatch => {
  return axios
    .get("http://curioapp.herokuapp.com/api/artefact/userId/" + userId)
    .then(res => {
      dispatch(setUserArtefacts(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
     })
    );
}

// create new artefact for user based on artefactData
export const createNewArtefact = (artefactData) => dispatch => {
  return axios
    .post("http://curioapp.herokuapp.com/api/artefact", artefactData)
    .then(res => {
      dispatch(addNewArtefact(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
  );
}

// assign user artefacts based on decoded
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