const config = require("../../../config.json");
import axios from "axios";

// group search
export const searchGroupsAPIRequest = searchTerms => {
  return new Promise((resolve, reject) => {
    axios
      .put(config.SERVER_URL + "api/group/search", searchTerms)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// user search
export const searchUsersAPIRequest = searchTerms => {
  return new Promise((resolve, reject) => {
    axios
      .put(config.SERVER_URL + "api/user/search", searchTerms)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
