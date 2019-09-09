import axios from "axios";

import {
  SET_USER_ARTEFACTS,
  
} from "../types/artefactsTypes";

// get user artefacts
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

// assign user artefacts
export const setUserArtefacts = decoded => {
  return {
    type: SET_USER_ARTEFACTS,
    payload: decoded
  };
};