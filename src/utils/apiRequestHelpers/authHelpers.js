import axios from "axios";

// register user based on user details
export const registerUserAPIRequest = userData => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://curioapp.herokuapp.com/api/register", userData)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// log user in with user details
export const loginUserAPIRequest = user => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://curioapp.herokuapp.com/api/login", user)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
