import {
  SET_USER_ARTEFACTS,
  SET_ARTEFACT_IN_CACHE,
  ARTEFACT_DATA,
  ARTEFACT_COMMENTS
} from "../types/artefactsTypes";

import {
  createArtefactAPIRequest,
  getUserArtefactsAPIRequest,
  getSelectedArtefactAPIRequest,
  updateSelectedArtefactAPIRequest,
  likeAPIRequest,
  unlikeAPIRequest,
  deleteSelectedArtefactAPIRequest,
  getArtefactCommentsAPIRequest,
  postArtefactCommentAPIRequest
} from "../utils/APIHelpers/artefactAPIHelpers";

import { getUserNotifications } from "../actions/notificationActions";

import { uploadImageToGCS } from "../utils/imageUpload";

// Async Redux actions //
// get all artefacts of user based on userId
export const getUserArtefacts = userId => dispatch => {
  return new Promise((resolve, reject) => {
    // get all artefacts posted by user
    getUserArtefactsAPIRequest(userId)
      // success
      .then(res => {
        dispatch(setUserArtefacts(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("Failed to get user artefacts : " + err);
        reject(err);
      });
  });
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
          imageURL,
          privacy: artefact.privacy === 0 ? 0 : 1
        };
        // send a post API request to backend to create new artefact
        createArtefactAPIRequest(newArtefact)
          .then(res => {
            // reload user artefacts data
            dispatch(getUserArtefacts(newArtefact.userId));
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

// select artefact of artefactId
export const getSelectedArtefact = artefactId => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    // continue updating the artefact in the background
    getSelectedArtefactAPIRequest(artefactId)
      .then(res => {
        // save artefact in cache
        dispatch(setArtefactDataInCache(res.data));
        // return artefact data if it hasn't already
        resolve(res.data);
      })
      .catch(err => {
        console.log("Failed to select artefact" + err);
        reject(err);
      });
  });
};

// update selected artefact
export const editSelectedArtefact = artefact => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    (() => {
      // if a new image is selected, the imageURI would not be empty
      // so upload to GCS is required, otherwise just retain the old URL link
      return !artefact.imageURI
        ? Promise.resolve(artefact.images[0].URL)
        : uploadImageToGCS(artefact.imageURI);
    })()
      .then(imageURL => {
        // prepare the body data base on new user details
        const artefactData = {
          ...artefact,
          images: [{ URL: imageURL }]
        };
        // update artefact in the backend
        updateSelectedArtefactAPIRequest(artefact._id, artefactData)
          .then(res => {
            // reload all user artefacts data
            dispatch(getUserArtefacts(getState().auth.user.id));
            // return artefact data
            resolve(res.data);
          })
          .catch(err => {
            console.log("Failed to update artefact" + err);
            reject(err);
          });
      })
      .catch(err => {
        console.log("Failed to update artefact" + err);
        reject(err);
      });
  });
};

// delete selected artefact
export const removeSelectedArtefact = artefactId => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    deleteSelectedArtefactAPIRequest(artefactId)
      .then(res => {
        // reload data
        dispatch(getUserArtefacts(getState().auth.user.id));
        dispatch(getUserNotifications(getState().auth.user.id));
        resolve(res);
      })
      .catch(err => {
        console.log("Failed to delete artefact" + err);
        reject(err);
      });
  });
};

// like an artefact
export const likeArtefact = (artefactId, userId) => dispatch => {
  return new Promise((resolve, reject) => {
    // add like to artefact from user
    likeAPIRequest(artefactId, userId)
      // success
      .then(res => {
        // return data
        resolve(res.data);
      })
      // failure
      .catch(err => {
        console.log("Failed to like an artefact: " + err);
        reject(err);
      });
  });
};

// unlike an artefact
export const unlikeArtefact = (artefactId, userId) => dispatch => {
  return new Promise((resolve, reject) => {
    // remove like to artefact from user
    unlikeAPIRequest(artefactId, userId)
      // success
      .then(res => {
        // return data
        resolve(res.data);
      })
      // failure
      .catch(err => {
        console.log("Failed to unlike an artefact: " + err);
        reject(err);
      });
  });
};

// get all comments made about an artefact
export const getArtefactComments = artefactId => dispatch => {
  return new Promise((resolve, reject) => {
    getArtefactCommentsAPIRequest(artefactId)
      // success
      .then(res => {
        // return data
        resolve(res.data);
      })
      // failure
      .catch(err => {
        console.log("Failed to get artefact comments: " + err);
        reject(err);
      });
  });
};

// post comment on artefact
//prettier-ignore
export const commentOnArtefact = (artefactId, userId, commentString) => dispatch => {
  return new Promise((resolve, reject) => {
    // post comment to server
    var newComment = { content: commentString };
    postArtefactCommentAPIRequest(artefactId, userId, newComment)
      // success
      .then(res => {
        resolve(res.data);
      })
      // failure
      .catch(err => {
        console.log("Failed to create new comment: " + err);
        reject(err);
      });
  });
};

// Redux actions //
// store all of the user's artefacts into redux state
export const setUserArtefacts = decoded => {
  return {
    type: SET_USER_ARTEFACTS,
    payload: decoded
  };
};

export const setArtefactDataInCache = decoded => {
  return {
    type: SET_ARTEFACT_IN_CACHE,
    payload: decoded,
    cache_type: ARTEFACT_DATA
  };
};

export const setArtefactCommentsInCache = decoded => {
  return {
    type: SET_ARTEFACT_IN_CACHE,
    payload: decoded,
    cache_type: ARTEFACT_COMMENTS
  };
};
