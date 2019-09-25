import axios from "axios";

// get user by id
export const getUserAPIRequest = userId => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://curioapp.herokuapp.com/api/user/id/" + userId)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
