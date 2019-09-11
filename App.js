import React from "react";
import { ActivityIndicator } from "react-native";
import Provider from "./src/provider";
import * as Font from "expo-font";

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "HindSiliguri-Bold": require("./assets/fonts//HindSiliguri-Bold.ttf"),
      "HindSiliguri-Light": require("./assets/fonts/HindSiliguri-Light.ttf"),
      "HindSiliguri-Regular": require("./assets/fonts/HindSiliguri-Regular.ttf")
    }).then(() => {
      this.setState({ fontLoaded: true });
    });
  }

  rendersAfterFontIsLoaded() {
    if (this.state.fontLoaded) {
      return <Provider />;
    } else {
      return <ActivityIndicator size="large" />;
    }
  }
  render() {
    return this.rendersAfterFontIsLoaded();
  }
}
