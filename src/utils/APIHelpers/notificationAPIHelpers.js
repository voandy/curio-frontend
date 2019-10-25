const config = require("../../../config.json");
import axios from "axios";

// get user by id
export const getUserNotificationsAPIRequest = userId => {
  return new Promise((resolve, reject) => {
    axios
      .get(config.SERVER_URL + "api/notification/userId/" + userId)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const updateNotificationToReadAPIRequest = notifId => {
  const body = {
    seenStatus: true
  };
  return new Promise((resolve, reject) => {
    axios
      .put(config.SERVER_URL + "api/notification/id/" + notifId, body)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
