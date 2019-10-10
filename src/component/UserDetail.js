import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

import moment from "moment";

// custom responsive design component
import { deviceWidthDimension as wd } from "../utils/responsiveDesign";

/** Touchable user detail that links to the user's pubic profile
 *  used in comments, artefact feeds and selected artefacts */
class UserDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const readableDateAdded = moment(new Date(this.props.dateAdded)).fromNow();

    return (
      // TODO link to user profile
      // <TouchableOpacity onPress={} style={styles.container}>
      // show user profile picture
      <TouchableOpacity style={styles.container}>
        <Image
          style={styles.photo}
          source={this.props.image}
          resizeMethod="resize"
          resizeMode="contain"
        />

        {/* user name */}
        <View style={styles.userDetailPlaceholder}>
          <View>
            <Text style={styles.userName}>{this.props.userName}</Text>
          </View>

          {/* Display readable date added */}
          <View>
            <Text style={styles.time}>{readableDateAdded}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: wd(0.9),
    height: wd(0.15)
  },

  photo: {
    borderRadius: wd(0.1),
    width: wd(0.1),
    height: wd(0.1),
    marginRight: wd(0.06)
  },

  userName: {
    fontFamily: "HindSiliguri-Bold"
  },

  time: {
    fontFamily: "HindSiliguri-Regular"
  }
});

// export
export default UserDetail;
