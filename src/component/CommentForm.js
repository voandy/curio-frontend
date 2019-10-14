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
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

/**text input for comments
 * used in selectedArtefacts
 */
class CommentForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.commentInput}>
        {/* user profile pic */}
        <Image
          style={styles.userProfilePic}
          source={{uri: this.props.profilePic}}
        />

        {/* comment input field */}
        <TextInput
          placeholder="Add Comment"
          placeholderTextColor="#707070"
          style={styles.textInput}
          multiline={false}
          value={this.props.newComment}
          onChangeText={value => this.props.onChangeNewComment(value)}
          onSubmitEditing={this.props.onSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userProfilePic: {
    borderRadius: wd(0.1)/ 2,
    width: wd(0.1),
    height: wd(0.1),
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
    width: wd(0.7)
  }
});

export default CommentForm;
