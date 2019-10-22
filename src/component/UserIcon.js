import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

// custom responsive design component
import { deviceWidthDimension as wd } from "../utils/responsiveDesign";

/**used for showing circular user icons
 * used in groups, comments artefacts etc */
class UserIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    // show default profile pic if there isnt
    const imageSource = !this.props.image
      ? require("../../assets/images/default-profile-pic.png")
      : { uri: this.props.image };

    return (
      // TODO link to user profile
      // <TouchableOpacity onPress={} style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPress(this.props.userId)}
      >
        <Image
          style={styles.photo}
          source={imageSource}
          resizeMethod="resize"
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: wd(0.005),
    alignItems: "center",
    width: wd(0.1),
    height: wd(0.1),
    marginBottom: 0
  },

  photo: {
    borderRadius: wd(0.1),
    width: wd(0.1),
    height: wd(0.1)
  }
});

// export
export default UserIcon;
