import React from "react";
import { Platform, ActivityIndicator } from "react-native";
import Provider from "./src/provider";
import * as Font from "expo-font";
// expo push notification
import { Notifications } from "expo";
import registerForPushNotificationsAsync from "./src/services/notification/registerForPushNotificationsAsync";

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  // Load fonts async
  componentDidMount() {
    // post user's expo-push-token to backend if haven't already
    registerForPushNotificationsAsync();
    // create a channel with id "test" for new user (first-time app launch)
    // otherwise this will be ignored
    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("test", {
        name: "test",
        priority: "max",
        vibrate: [0, 250, 250, 250]
      });
    }
    // load font
    Font.loadAsync({
      "HindSiliguri-Bold": require("./assets/fonts//HindSiliguri-Bold.ttf"),
      "HindSiliguri-Light": require("./assets/fonts/HindSiliguri-Light.ttf"),
      "HindSiliguri-Regular": require("./assets/fonts/HindSiliguri-Regular.ttf")
    })
      .then(() => {
        this.setState({ fontLoaded: true });
      })
      .catch(err => console.log("Font not loaded properly: " + err));
  }

  // guard to make sure font is loaded properly, otherwise renders a loading screen
  rendersWithFontGuard() {
    if (this.state.fontLoaded) {
      return <Provider />;
    } else {
      return <ActivityIndicator size="large" />;
    }
  }

  render() {
    return this.rendersWithFontGuard();
  }
}
