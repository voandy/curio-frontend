import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

/**similar design to MyButton but just smaller 
 * used in areas artefacts and group forms
*/
class MySmallerButton extends Component {
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
    width: wd(0.25),
    height: 45,
    borderRadius: 40,
    elevation: 4
  },

  buttonText: {
    fontSize: wd(0.035),
    color: "white",
    fontFamily: "HindSiliguri-Bold"
  }
});

export default MySmallerButton;
