import {
  SET_USER_GROUPS,
  SET_SELECTED_GROUP,
  SET_SELECTED_GROUP_ARTEFACTS,
  SET_SELECTED_GROUP_MEMBERS,
  ADD_SELECTED_GROUP_ARTEFACTS_COMMENTS
} from "../types/groupsTypes";

import {
  getGroupDetailsAPIRequest,
  getUserGroupsAPIRequest,
  createGroupAPIRequest,
  putGroupAdminAPIRequest,
  getGroupAllArtefactsAPIRequest,
  getGroupAllMembersAPIRequest,
  editGroupAPIRequest,
  pinGroupAPIRequest,
  unpinGroupAPIRequest,
  deleteGroupAPIRequest
} from "../utils/APIHelpers/groupAPIHelper";

import { getArtefactCommentsAPIRequest } from "../utils/APIHelpers/artefactAPIHelpers";

import { uploadImageToGCS } from "../utils/imageUpload";

// get groups of user based on userId
export const getUserGroups = userId => dispatch => {
  return new Promise((resolve, reject) => {
    getUserGroupsAPIRequest(userId)
      .then(res => {
        dispatch(setUserGroups(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("groupActions: " + err);
        reject(err);
      });
  });
};

// create new group based on groupData
export const createNewGroup = groupData => dispatch => {
  return new Promise((resolve, reject) => {
    // extract adminId (current user id)
    const { adminId, imageURI } = groupData;
    // upload cover photo to GCS
    uploadImageToGCS(imageURI).then(imageURL => {
      // prepare the body data
      const newGroup = {
        ...groupData,
        coverPhoto: imageURL
      };
      // send create new group request to backend
      createGroupAPIRequest(newGroup)
        .then(res => {
          // set current user as the admin of the new group at the backend
          putGroupAdminAPIRequest(res.data._id, adminId)
            .then(() => {
              // get all user's groups to re-add them to redux store
              getUserGroupsAPIRequest(adminId)
                .then(res => {
                  resolve(res);
                  dispatch(setUserGroups(res.data));
                })
                // failure
                .catch(err => {
                  console.log("groupActions: " + err);
                  reject(err);
                });
              // failed to set group admin
            })
            // failure
            .catch(err => {
              console.log("groupActions: " + err);
              reject(err);
            });
        })
        // failure
        .catch(err => {
          console.log("groupActions: " + err);
          reject(err);
        });
    });
  });
};

// when user clicks on (selects) a specific group
export const getSelectedGroup = groupId => dispatch => {
  return new Promise((resolve, reject) => {
    getGroupDetailsAPIRequest(groupId)
      .then(res => {
        dispatch(setSelectedGroup(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("groupActions: " + err);
        reject(err);
      });
  });
};

// get all artefacts of a group
export const getSelectedGroupAllArtefacts = groupId => dispatch => {
  return new Promise((resolve, reject) => {
    getGroupAllArtefactsAPIRequest(groupId)
      .then(res => {
        dispatch(setSelectedGroupArtefacts(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("groupActions: " + err);
        reject(err);
      });
  });
};

// get all members of a group
export const getSelectedGroupAllMembers = groupId => dispatch => {
  return new Promise((resolve, reject) => {
    getGroupAllMembersAPIRequest(groupId)
      .then(res => {
        dispatch(setSelectedGroupMembers(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("groupActions: " + err);
        reject(err);
      });
  });
};

// edit group details
export const editSelectedGroup = group => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    // check if user selects a new image to upload or not
    (() => {
      // if a new image is selects, the imageURI would not be empty
      return !group.imageURI
        ? Promise.resolve(group.coverPhoto)
        : uploadImageToGCS(group.imageURI);
    })()
      .then(imageURL => {
        // prepare data body using the imageURL prepared
        const groupData = {
          ...group,
          coverPhoto: imageURL
        };
        // send edit API request to backend
        editGroupAPIRequest(group._id, groupData)
          .then(res => {
            // reload user groups data
            dispatch(getUserGroups(getState().auth.user.id));
            resolve(res);
          })
          // failure
          .catch(err => {
            console.log("groupActions: " + err);
            reject(err);
          });
      }) // failure for getting imageURL
      .catch(err => {
        console.log("groupActions: " + err);
        reject(err);
      });
  });
};

export const getSelectedGroupArtefactComments = artefactId => dispatch => {
  return new Promise((resolve, reject) => {
    getArtefactCommentsAPIRequest(artefactId)
      .then(res => {
        dispatch(addSelectedGroupArtefactComments(res.data));
        resolve(res);
      })
      // failure
      .catch(err => {
        console.log("groupActions: " + err);
        reject(err);
      });
  });
};

// delete selected artefact
export const deleteSelectedGroup = groupId => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    deleteGroupAPIRequest(groupId)
      .then(res => {
        dispatch(getUserGroups(getState().user.userData._id));
        resolve(res);
      })
      .catch(err => {
        console.log("Failed to delete group" + err);
        reject(err);
      });
  });
};

// action to clear out selected group
// formatted in this way to make it consistent
export const clearSelectedGroup = () => dispatch => {
  dispatch(setSelectedGroup({}));
  dispatch(setSelectedGroupArtefacts([]));
  dispatch(setSelectedGroupMembers([]));
};

export const pinGroup = (userId, groupId) => dispatch => {
  return new Promise((resolve, reject) => {
    pinGroupAPIRequest(userId, groupId)
      .then(() => {
        dispatch(getUserGroups(userId));
        resolve();
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const unpinGroup = (userId, groupId) => dispatch => {
  return new Promise((resolve, reject) => {
    unpinGroupAPIRequest(userId, groupId)
      .then(() => {
        dispatch(getUserGroups(userId));
        resolve();
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const setUserGroups = decoded => {
  return {
    type: SET_USER_GROUPS,
    payload: decoded
  };
};

export const setSelectedGroup = decoded => {
  return {
    type: SET_SELECTED_GROUP,
    payload: decoded
  };
};

export const setSelectedGroupArtefacts = decoded => {
  return {
    type: SET_SELECTED_GROUP_ARTEFACTS,
    payload: decoded
  };
};

export const setSelectedGroupMembers = decoded => {
  return {
    type: SET_SELECTED_GROUP_MEMBERS,
    payload: decoded
  };
};

export const addSelectedGroupArtefactComments = decoded => {
  return {
    type: ADD_SELECTED_GROUP_ARTEFACTS_COMMENTS,
    payload: decoded
  };
};
