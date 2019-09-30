import C from "../types/notificationTypes";
import {
  getUserNotificationsAPIRequest,
  updateNotificationToReadAPIRequest
} from "../utils/APIHelpers/notificationAPIHelpers";

export const getUserNotifications = userId => dispatch => {
  return new Promise((resolve, reject) => {
    getUserNotificationsAPIRequest(userId)
      .then(res => {
        dispatch(setNotifications(res.data));
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const setSeenStatusToTrue = notifId => dispatch => {
  return new Promise((resolve, reject) => {
    updateNotificationToReadAPIRequest(notifId)
      .then(res => {
        // dispatch(setNotifications(res.data));
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const updateNotificationById = (notifId, body) => (
  dispatch,
  getState
) => {};

export const setNotifications = notifications => {
  return {
    type: C.SET_NOTIFICATIONS,
    payload: notifications
  };
};
