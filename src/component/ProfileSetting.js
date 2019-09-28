import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";

// responsive design component
import {
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

/**seetings rows for the user
 * used in profile page
 */
class ProfileSetting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.icon}>ICON</Text>

        </View>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.buttonText}>{this.props.text}</Text>

        </View>


        {/* <Text style={styles.buttonText}>{this.props.text}</Text> */}
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
    flexDirection: "row",
  },

  icon: {
    alignSelf: "center",
    fontFamily: 'HindSiliguri-Bold',

  },

  buttonText: {
    fontSize: 16,
    fontFamily: 'HindSiliguri-Regular',
    
  }
});

export default ProfileSetting;
