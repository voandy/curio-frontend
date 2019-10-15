import C from "../types/notificationTypes";
import {
  getUserNotificationsAPIRequest,
  updateNotificationToReadAPIRequest
} from "../utils/APIHelpers/notificationAPIHelpers";

// get notifications from user of userId
export const getUserNotifications = userId => dispatch => {
  return new Promise((resolve, reject) => {
    getUserNotificationsAPIRequest(userId)
      .then(res => {
        dispatch(setNotifications(res.data));
        resolve(res);
      })
      .catch(err => {
        console.log("Failed to get user notifications: " + err);
        reject(err);
      });
  });
};

// set status of notification of notifId
export const setSeenStatusToTrue = notifId => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    updateNotificationToReadAPIRequest(notifId)
      .then(res => {
        // reload notification again
        dispatch(getUserNotifications(getState().auth.user.id));
        resolve(res);
      })
      .catch(err => {
        console.log("Failed to set status of notification: " + err);
        reject(err);
      });
  });
};

export const setNotifications = notifications => {
  return {
    type: C.SET_NOTIFICATIONS,
    payload: notifications
  };
};
