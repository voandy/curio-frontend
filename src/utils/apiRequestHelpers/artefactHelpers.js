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