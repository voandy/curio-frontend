// reference: https://docs.expo.io/versions/v35.0.0/guides/push-notifications/

const { Notifications } = require("expo");
const Permissions = require("expo-permissions");
const axios = require("axios");

//prettier-ignore
const { setUserPushTokenAPIRequest } = require('../../utils/APIHelpers/userAPIHelpers');

export async function registerForPushNotificationsAsync(userId) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // Show push token for now until backend has been updated
  console.log("Expo-Push-Token: " + token);

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  setUserPushTokenAPIRequest(userId, token).catch(err => console.log(err));
}
