import axios from "axios";

// group search
export const searchGroupsAPIRequest = newArtefact => {
  return new Promise((resolve, reject) => {
    axios
      .put("http://curioapp.herokuapp.com/api/group/search", searchTerms)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// user search
export const searchUsersAPIRequest = newArtefact => {
  return new Promise((resolve, reject) => {
    axios
      .put("http://curioapp.herokuapp.com/api/user/search", searchTerms)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
