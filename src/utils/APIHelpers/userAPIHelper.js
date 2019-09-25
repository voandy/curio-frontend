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