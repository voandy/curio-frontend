import axios from "axios";

// register user based on user details
export const createArtefactAPIRequest = newArtefact => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://curioapp.herokuapp.com/api/artefact", newArtefact)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// log user in with user details
export const getUserArtefactsAPIRequest = userId => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://curioapp.herokuapp.com/api/artefact/userId/" + userId)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// get an artefact based on artefactId
export const selectArtefactAPIRequest = artefactId => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://curioapp.herokuapp.com/api/artefact/id/" + artefactId)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}

// update selected artefact based on artefactId
export const updateSelectedArtefactAPIRequest = artefactId => {
  return new Promise((resolve, reject) => {
    axios
    .put("http://curioapp.herokuapp.com/api/artefact/id/" + artefactId)
    .then(res => resolve(res))
    .catch(err => reject(err));
  });
}

// like an artefact
export const likeAPIRequest = (artefactId, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://curioapp.herokuapp.com/api/artefact/id/" + artefactId + "/userId/" + userId + "/like")
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// unlike an artefact
export const unlikeAPIRequest = (artefactId, userId) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://curioapp.herokuapp.com/api/artefact/id/" + artefactId + "/userId/" + userId + "/unlike")
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};