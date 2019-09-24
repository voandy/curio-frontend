import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";

import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

class LikeButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
      <Image
        style={styles.buttonIcon}
        source={require("../../assets/images/icons/like.png")}
      />
      <Text style={styles.buttonText}>Like</Text>
      </TouchableOpacity>
    );
  }
}

class UnlikeButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
      <Image
        style={styles.buttonIconUnlike}
        source={require("../../assets/images/icons/like.png")}
      />
      <Text style={styles.buttonTextUnlike}>Like</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get("window").width * 0.48, // just to make it look "justified"
    height: wd(0.06),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonIcon: {
    width: wd(0.05),
    height: wd(0.05),
    marginRight: wd(0.01),
    // tintColor: "#939090"
    tintColor: "#939090"
  },

  buttonIconUnlike: {
    width: wd(0.05),
    height: wd(0.05),
    marginRight: wd(0.01),
    // tintColor: "#939090"
    tintColor: "#FF6E6E"
  },

  buttonText: {
    color: "#939090",
    fontFamily: "HindSiliguri-Regular",
    fontSize: 16
  },

  buttonTextUnlike: {
    color: "#FF6E6E",
    fontFamily: "HindSiliguri-Regular",
    fontSize: 16
  }
});

export { LikeButton, UnlikeButton };
