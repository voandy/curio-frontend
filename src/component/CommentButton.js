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

class CommentButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.button}>
      <Image
        style={styles.buttonIcon}
        source={require("../../assets/images/icons/comment.png")}
      />
      <Text style={styles.buttonText}>Comment</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: wd(0.48), // just to make it look "justified"
    height: wd(0.06),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonIcon: {
    width: wd(0.05),
    height: wd(0.05),
    marginRight: wd(0.01),
    tintColor: "#939090"
  },

  buttonText: {
    color: "#939090",
    fontFamily: "HindSiliguri-Regular",
    fontSize: 16
  }
});

export default CommentButton;
