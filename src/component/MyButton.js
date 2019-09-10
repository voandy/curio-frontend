import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";

import CustomFontText from "../utils/customFontText";

class MyButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <CustomFontText style={styles.buttonText}>
          {this.props.text}
        </CustomFontText>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6E6E",
    width: Dimensions.get("window").width * 0.3,
    height: 50,
    borderRadius: 40,
    elevation: 4
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
    // fontFamily: 'HindSiliguri-Regular'
  }
});

export default MyButton;
