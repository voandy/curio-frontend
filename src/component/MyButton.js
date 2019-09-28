import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

import {
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";


/* general design button 
 * used in areas in register, login and other pages through out the system */
class MyButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6E6E",
    width: wd(0.3),
    height: 50,
    borderRadius: 40,
    elevation: 4
  },

  buttonText: {
    fontSize: wd(0.037),
    color: "white",
    fontFamily: "HindSiliguri-Bold"
  }
});

export default MyButton;
