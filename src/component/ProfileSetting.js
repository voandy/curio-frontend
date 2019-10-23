import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

// responsive design component
import { deviceWidthDimension as wd } from "../utils/responsiveDesign";

const gearIcon = require("../../assets/images/icons/gear.png");
const artefactIcon = require("../../assets/images/icons/artefact.png");

/**seetings rows for the user
 * used in profile page
 */
class ProfileSetting extends Component {
  constructor(props) {
    super(props);
  }

  generateIcon = iconType => {
    switch (iconType) {
      case "gear":
        return <Image style={styles.icon} source={gearIcon} />;
      case "artefact":
        return <Image style={styles.icon} source={artefactIcon} />;
      default:
        return <Image style={styles.icon} source={gearIcon} />;
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <View style={{ flex: 0.2 }}>{this.generateIcon(this.props.iconType)}</View>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: wd(0.8),
    height: 50,
    flexDirection: "row"
  },

  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    tintColor: "#707070"
  },

  buttonText: {
    fontSize: 16,
    fontFamily: "HindSiliguri-Regular"
  }
});

export default ProfileSetting;
