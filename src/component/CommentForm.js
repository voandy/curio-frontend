import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";

import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

class CommentForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.commentInput}>
        {/* user profile pic */}
        {/* <Image style={styles.photo} source={this.props.userProfilePic} /> */}
        <Image
          style={styles.userProfilePic}
          source={{uri: this.props.profilePic}}
        />

        {/* comment input field */}
        <TextInput
          placeholder="Add Comment"
          placeholderTextColor="#707070"
          style={styles.textInput}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userProfilePic: {
    borderRadius: Dimensions.get('window').width * 0.1 / 2,
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    marginLeft: wd(0.06),
    marginRight: wd(0.03)
  },

  commentInput: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    height: wd(0.1),
    marginVertical: wd(0.03)
  },

  textInput: {
    fontFamily: "HindSiliguri-Regular",
    width: Dimensions.get("window").width * 0.7
  }
});

export default CommentForm;
