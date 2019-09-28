import axios from "axios";

// create new artefact
export const createArtefactAPIRequest = newArtefact => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://curioapp.herokuapp.com/api/artefact", newArtefact)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// get all artefacts owned by user
export const getUserArtefactsAPIRequest = userId => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://curioapp.herokuapp.com/api/artefact/userId/" + userId)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// get an artefact based on artefactId
export const getSelectedArtefactAPIRequest = artefactId => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://curioapp.herokuapp.com/api/artefact/id/" + artefactId)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// update selected artefact based on artefactId
export const updateSelectedArtefactAPIRequest = (
  artefactId,
  selectedArtefact
) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "http://curioapp.herokuapp.com/api/artefact/id/" + artefactId,
        selectedArtefact
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// delete selected artefact of artefactId
export const deleteSelectedArtefactAPIRequest = artefactId => {
  return new Promise((resolve, reject) => {
    axios
      .delete("http://curioapp.herokuapp.com/api/artefact/id/" + artefactId)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// like an artefact
export const likeAPIRequest = (artefactId, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://curioapp.herokuapp.com/api/artefact/id/" +
          artefactId +
          "/userId/" +
          userId +
          "/like"
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// unlike an artefact
export const unlikeAPIRequest = (artefactId, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://curioapp.herokuapp.com/api/artefact/id/" +
          artefactId +
          "/userId/" +
          userId +
          "/unlike"
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// get all comments on an artefact
export const getArtefactCommentsAPIRequest = artefactId => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://curioapp.herokuapp.com/api/artefact/id/" +
          artefactId +
          "/getAllComments"
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// post a comment on an artefact
export const postArtefactCommentAPIRequest = (
  artefactId,
  userId,
  newComment
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://curioapp.herokuapp.com/api/artefact/id/" +
          artefactId +
          "/userId/" +
          userId +
          "/comment",
        newComment
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
