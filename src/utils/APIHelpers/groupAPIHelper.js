const config = require("../../../config.json");
import axios from "axios";

// get all details of a group by groupId
export const getGroupDetailsAPIRequest = groupId => {
  return new Promise((resolve, reject) => {
    axios
      .get(config.SERVER_URL + "api/group/id/" + groupId)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// get groups of user based on userId
export const getUserGroupsAPIRequest = userId => {
  return new Promise((resolve, reject) => {
    axios
      .get(config.SERVER_URL + "api/user/id/" + userId + "/groups")
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// create new group based on group details
export const createGroupAPIRequest = groupData => {
  return new Promise((resolve, reject) => {
    axios
      .post(config.SERVER_URL + "api/group", groupData)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// set the group admin by user id
export const putGroupAdminAPIRequest = (groupId, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        config.SERVER_URL + "api/group/id/" + groupId + "/add/userId/" + userId
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// get all artefacts of a group
export const getGroupAllArtefactsAPIRequest = groupId => {
  return new Promise((resolve, reject) => {
    axios
      .get(config.SERVER_URL + "api/group/id/" + groupId + "/artefacts")
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// get all artefacts of a group
export const getGroupAllMembersAPIRequest = groupId => {
  return new Promise((resolve, reject) => {
    axios
      .get(config.SERVER_URL + "api/group/id/" + groupId + "/members")
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// edit group data api call
export const editGroupAPIRequest = (groupId, groupData) => {
  return new Promise((resolve, reject) => {
    axios
      .put(config.SERVER_URL + "api/group/id/" + groupId, groupData)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const pinGroupAPIRequest = (userId, groupId) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        config.SERVER_URL + "api/user/id/" + userId + "/pin/groupId/" + groupId
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const unpinGroupAPIRequest = (userId, groupId) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        config.SERVER_URL +
          "api/user/id/" +
          userId +
          "/unpin/groupId/" +
          groupId
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// delete group api call
export const deleteGroupAPIRequest = groupId => {
  return new Promise((resolve, reject) => {
    axios
      .delete(config.SERVER_URL + "api/group/id/" + groupId)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const addMemberToGroupAPIRequest = (groupId, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        config.SERVER_URL + "api/group/id/" + groupId + "/add/userId/" + userId
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const deleteMemberFromGroupAPIRequest = (groupId, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        config.SERVER_URL +
          "api/group/id/" +
          groupId +
          "/remove/userId/" +
          userId
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const addArtefactToGroupAPIRequest = (groupId, artefactId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        config.SERVER_URL +
          "api/group/id/" +
          groupId +
          "/add/artefactId/" +
          artefactId
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const deleteArtefactFromGroupAPIRequest = (groupId, artefactId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        config.SERVER_URL +
          "api/group/id/" +
          groupId +
          "/remove/artefactId/" +
          artefactId
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const inviteUserToGroupAPIRequest = (groupId, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        config.SERVER_URL +
          "api/group/id/" +
          groupId +
          "/userId/" +
          userId +
          "/invite"
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const removeInviteFromGroupAPIRequest = (groupId, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        config.SERVER_URL +
          "api/group/id/" +
          groupId +
          "/userId/" +
          userId +
          "/remove-invite"
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
