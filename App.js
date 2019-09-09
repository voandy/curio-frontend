import React from "react";
import Provider from "./src/provider";
import * as Font from "expo-font";
import { connect } from "react-redux";
import { loadFont } from "./src/actions/loadFontActions";

class App extends React.Component {
  // state = {
  //   fontLoaded: false
  // };

  // load fonts TODO
  async componentDidMount() {
    await Font.loadAsync({
      "HindSiliguri-Bold": require("./assets/fonts/HindSiliguri-Bold.ttf"),
      "HindSiliguri-Light": require("./assets/fonts/HindSiliguri-Light.ttf"),
      "HindSiliguri-Regular": require("./assets/fonts/HindSiliguri-Regular.ttf")
    });

    // this.setState({ fontLoaded: true });
    this.props.loadFont();
  }

  render() {
    return <Provider />;
  }
}

export default connect(
  null,
  { loadFont }
)(App);
