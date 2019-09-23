import { SET_USER_ARTEFACTS, ADD_NEW_ARTEFACT, SET_SELECTED_ARTEFACT } from "../types/artefactsTypes";
import {
  createArtefactAPIRequest,
  getUserArtefactsAPIRequest,
  selectArtefactAPIRequest,
} from "../utils/apiRequestHelpers/artefactHelpers";

import { uploadImageToGCS } from "../utils/imageUpload";

// Async Redux actions //
// get all artefacts of user based on userId
export const getUserArtefacts = userId => dispatch => {
  // get all artefacts posted by user
  getUserArtefactsAPIRequest(userId)
    // success
    .then(res => dispatch(setUserArtefacts(res.data)))
    // failure
    .catch(err => console.log("artefactActions: " + err));
};

// register user based on user details
export const createNewArtefacts = artefact => dispatch => {
  return new Promise((resolve, reject) => {
    // upload image
    uploadImageToGCS(artefact.imageURI)
      .then(imageURL => {
        // prepare the body data base on new user details
        const newArtefact = {
          ...artefact,
          imageURL
        };
        // send a post API request to backend to register user
        createArtefactAPIRequest(newArtefact)
          .then(res => {
            // add the new artefact directly to redux state
            dispatch(addNewArtefact(res.data));
            resolve(res);
          })
          .catch(err => {
            console.log("Failed to create new artefact: " + err);
            reject(err);
          });
      })
      .catch(err => {
        console.log("Failed to upload image at creating new artefact: " + err);
        reject(err);
      });
  });
};

// select artefact based on artefactId
export const selectArtefact = artefactId => dispatch => {
  return new Promise((resolve, reject) => {

    // get artefact based on artefactId
    selectArtefactAPIRequest(artefactId)
    .then(res => {
      
      // add selected artefact to redux state
      dispatch(setSelectedArtefact(res.data));
      resolve(res);
    })
    .catch(err => {
      console.log("Failed to select artefact" + err);
      reject(err);
    });
  });
}

// Redux actions //
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

// assign new group to user
export const setSelectedArtefact = decoded => {
  return {
    type: SET_SELECTED_ARTEFACT,
    payload: decoded
  };
};
