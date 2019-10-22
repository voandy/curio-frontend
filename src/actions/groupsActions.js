import {
  SET_USER_GROUPS,
  SET_GROUP_IN_CACHE,
  GROUP_DATA,
  GROUP_MEMBERS
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
  deleteGroupAPIRequest,
  addMemberToGroupAPIRequest,
  deleteMemberFromGroupAPIRequest,
  addArtefactToGroupAPIRequest,
  deleteArtefactFromGroupAPIRequest,
  inviteUserToGroupAPIRequest,
  removeInviteFromGroupAPIRequest
} from "../utils/APIHelpers/groupAPIHelper";

import { uploadImageToGCS } from "../utils/imageUpload";

// get groups of user based on userId
export const getUserGroups = userId => dispatch => {
  return new Promise((resolve, reject) => {
    getUserGroupsAPIRequest(userId)
      // success
      .then(res => {
        dispatch(setUserGroups(res.data));
        resolve(res.data);
      })
      // failure
      .catch(err => {
        console.log("Failed to get user groups: " + err);
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
              dispatch(getUserGroups(adminId));
              resolve(res);
            })
            // failed to set group admin
            .catch(err => {
              console.log("Failed to set group admin: " + err);
              reject(err);
            });
        })
        // failure
        .catch(err => {
          console.log("Failed to create group: " + err);
          reject(err);
        });
    });
  });
};

// when user clicks on (selects) a specific group
export const getSelectedGroup = groupId => dispatch => {
  // update group details
  dispatch(updateSelectedGroupData(groupId));
  dispatch(updateSelectedGroupAllMembers(groupId));
};

// when user clicks on (selects) a specific group
export const updateSelectedGroupData = groupId => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    // update data
    getGroupDetailsAPIRequest(groupId)
      // success
      .then(res => {
        // save to redux
        dispatch(setGroupDataInCache(res.data));
        // return group data instead of request response
        resolve(true);
      })
      // failure
      .catch(err => {
        console.log("Failed to get selected group: " + err);
        reject(false);
      });
  });
};

// get all members of a group
export const updateSelectedGroupAllMembers = groupId => dispatch => {
  return new Promise((resolve, reject) => {
    getGroupAllMembersAPIRequest(groupId)
      // success
      .then(res => {
        // extract and set required body info
        const data = {
          _id: groupId,
          data: res.data
        };
        // save to redux
        dispatch(setGroupMemberDataInCache(data));
        // return true to show the data is loaded
        resolve(true);
      })
      // failure
      .catch(err => {
        console.log("Failed to get all members of a selected group: " + err);
        reject(false);
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
            // reload all user groups data
            dispatch(getUserGroups(getState().auth.user.id));
            resolve(res);
          })
          // failure
          .catch(err => {
            console.log("Failed to edit group: " + err);
            reject(err);
          });
      }) // failure for getting imageURL
      .catch(err => {
        console.log("Failed to upload image: " + err);
        reject(err);
      });
  });
};

// delete selected group based on groupId
export const deleteSelectedGroup = groupId => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    deleteGroupAPIRequest(groupId)
      .then(res => {
        // reload user's groups
        dispatch(getUserGroups(getState().user.userData._id));
        resolve(res);
      })
      .catch(err => {
        console.log("Failed to delete group: " + err);
        reject(err);
      });
  });
};

// pin group of groupId in user of userId
export const pinGroup = (userId, groupId) => dispatch => {
  return new Promise((resolve, reject) => {
    pinGroupAPIRequest(userId, groupId)
      .then(res => {
        // reload user's groups
        dispatch(getUserGroups(userId));
        resolve(res);
      })
      .catch(err => {
        console.log("Failed to pin group: " + err);
        reject(err);
      });
  });
};

// unpin group of group Id in user of userId
export const unpinGroup = (userId, groupId) => dispatch => {
  return new Promise((resolve, reject) => {
    unpinGroupAPIRequest(userId, groupId)
      .then(res => {
        // reload user's groups
        dispatch(getUserGroups(userId));
        resolve(res);
      })
      .catch(err => {
        console.log("Failed to unpin group: " + err);
        reject(err);
      });
  });
};

// admin adds users to group
export const addMemberToGroup = (groupId, userId) => dispatch => {
  return new Promise((resolve, reject) => {
    addMemberToGroupAPIRequest(groupId, userId)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log("Failed to add member: " + err);
        reject(err);
      });
  });
};

// users leave a group
export const deleteMemberFromGroup = (groupId, userId) => dispatch => {
  return new Promise((resolve, reject) => {
    deleteMemberFromGroupAPIRequest(groupId, userId)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log("Failed to remove member: " + err);
        reject(err);
      });
  });
};

// group members add an artefact to group
export const addArtefactToGroup = (groupId, artefactId) => dispatch => {
  return new Promise((resolve, reject) => {
    addArtefactToGroupAPIRequest(groupId, artefactId)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log("Failed to add artefact: " + err);
        reject(err);
      });
  });
};

// an artefact is deleted from group
export const deleteArtefactFromGroup = (groupId, artefactId) => dispatch => {
  return new Promise((resolve, reject) => {
    deleteArtefactFromGroupAPIRequest(groupId, artefactId)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log("Failed to delete artefact: " + err);
        reject(err);
      });
  });
};

export const inviteUserToGroup = (groupId, userId) => dispatch => {
  console.log("InviteButton pressed: " + groupId, userId);
  return new Promise((resolve, reject) => {
    inviteUserToGroupAPIRequest(groupId, userId)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log("Failed to invite user: " + err);
        reject(err);
      });
  });
};

// remove invite from invited users (called after a user accepts or declines invite)
export const removeInviteFromGroup = (groupId, userId) => dispatch => {
  return new Promise((resolve, reject) => {
    removeInviteFromGroupAPIRequest(groupId, userId)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log("Failed to invite user: " + err);
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

export const setGroupDataInCache = decoded => {
  return {
    type: SET_GROUP_IN_CACHE,
    payload: decoded,
    cache_type: GROUP_DATA
  };
};

export const setGroupMemberDataInCache = decoded => {
  return {
    type: SET_GROUP_IN_CACHE,
    payload: decoded,
    cache_type: GROUP_MEMBERS
  };
};
