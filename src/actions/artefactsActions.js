import {
  SET_USER_ARTEFACTS,
  SET_SELECTED_ARTEFACT,
  SET_ARTEFACT_COMMENTS,
  ADD_ARTEFACT_COMMENT
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
        console.log("artefactActions: " + err);
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
        dispatch(setSelectedArtefact(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("artefactActions: " + err);
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
        dispatch(setSelectedArtefact(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("artefactActions: " + err);
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
          privacy: artefact.privacy === "Private" ? 0 : 1
        };
        // send a post API request to backend to register user
        createArtefactAPIRequest(newArtefact)
          .then(res => {
              // get all artefacts posted by user
              getUserArtefactsAPIRequest(newArtefact.userId)
              // success
              .then(res => {
                dispatch(setUserArtefacts(res.data));
                resolve(res);
              })
              // failure
              .catch(err => {
                console.log("artefactActions: " + err);
                reject(err);
              });
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
export const getSelectedArtefact = artefactId => dispatch => {
  return new Promise((resolve, reject) => {
    // get artefact based on artefactId
    getSelectedArtefactAPIRequest(artefactId)
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
};

// update selected artefact
export const editSelectedArtefact = artefact => dispatch => {
  return new Promise((resolve, reject) => {
    // upload image
    uploadImageToGCS(artefact.imageURI).then(imageURL => {
      // prepare the data for new images
      const newImages = artefact.images;
      newImages[0].URL = imageURL;

      // prepare the body data base on new user details
      const selectedArtefact = {
        ...artefact,
        images: newImages
      };

      // update artefact in the backend
      updateSelectedArtefactAPIRequest(selectedArtefact._id, selectedArtefact)
        .then(res => {

          // get artefact based on artefactId after the update
          getSelectedArtefactAPIRequest(selectedArtefact._id)
            .then(res => {

              // set artefact with new details
              dispatch(setSelectedArtefact(res.data));

              // get all artefacts posted by user after the update
              getUserArtefactsAPIRequest(selectedArtefact.userId)
                // success
                .then(res => {

                  // set user with new artefacts' details
                  dispatch(setUserArtefacts(res.data));
                  resolve(res);
                })
                // failure
                .catch(err => {
                  console.log("artefactActions: " + err);
                  reject(err);
                });
            })
            .catch(err => {
              console.log("Failed to select artefact" + err);
              reject(err);
            });
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
export const removeSelectedArtefact = artefact => dispatch => {
  return new Promise((resolve, reject) => {
    deleteSelectedArtefactAPIRequest(artefact._id)
      .then(res => {
        // get all artefacts posted by user after deletion
        getUserArtefactsAPIRequest(artefact.userId)
        // success
        .then(res => {
          dispatch(setUserArtefacts(res.data));
          resolve(res);
        })
        // failure
        .catch(err => {
          console.log("artefactActions: " + err);
          reject(err);
        });
      })
      .catch(err => {
        console.log("Failed to delete artefact" + err);
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
        dispatch(setArtefactComments(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("artefactActions: " + err);
        reject(err);
      });
  });
};

// post comment on artefact
export const commentOnArtefact = (
  artefactId,
  userId,
  commentString
) => dispatch => {
  return new Promise((resolve, reject) => {
    // post comment to server
    var newComment = { content: commentString };
    postArtefactCommentAPIRequest(artefactId, userId, newComment)
      // success
      .then(res => {
        dispatch(addNewArtefactComment(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("Failed to create new comment: " + err);
        reject(err);
      });
  });
};


// clear selectedArtefact 
export const clearSelectedArtefact = () => dispatch => {
  dispatch(setSelectedArtefact({}));
  dispatch(setArtefactComments([]));
}

// Redux actions //
// store all of the user's artefacts into redux state
export const setUserArtefacts = decoded => {
  return {
    type: SET_USER_ARTEFACTS,
    payload: decoded
  };
};

// assign new artefact to user
export const setSelectedArtefact = decoded => {
  return {
    type: SET_SELECTED_ARTEFACT,
    payload: decoded
  };
};

// store artefact comments in redux state
export const setArtefactComments = decoded => {
  return {
    type: SET_ARTEFACT_COMMENTS,
    payload: decoded
  };
};

// add new artefact comment to redux store
export const addNewArtefactComment = decoded => {
  return {
    type: ADD_ARTEFACT_COMMENT,
    payload: decoded
  };
};
