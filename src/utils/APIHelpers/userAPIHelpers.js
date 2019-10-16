import axios from "axios";

const PUSH_ENDPOINT = "http://curioapp.herokuapp.com/api/user/id/";

// register user based on user details
export const setUserPushTokenAPIRequest = (userId, pushToken = null) => {
  return new Promise((resolve, reject) => {
    const userPushToken = {
      userPushToken: pushToken ? pushToken : ""
    };
    // send user token to backend
    axios
      .put(PUSH_ENDPOINT + userId, userPushToken)
      .then(res => resolve(res.request._response))
      .catch(err => reject(err));
  });
};

// get user by id
export const getUserAPIRequest = userId => {
  return new Promise((resolve, reject) => {
    axios
      .get(PUSH_ENDPOINT + userId)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// update user data based on userId
export const updateUserDataAPIRequest = (userId, user) => {
  return new Promise((resolve, reject) => {
    axios
      .put(PUSH_ENDPOINT + userId, user)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

// delete user by userId
export const deleteUserDataAPIRequest = userId => {
  return new Promise((resolve, reject) => {
    axios
      .delete(PUSH_ENDPOINT + userId)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};