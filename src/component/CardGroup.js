import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
  TouchableOpacity
} from "react-native";

import { connect } from "react-redux";

import { pinGroup, unpinGroup } from "../actions/groupsActions";

// custom responsive design component
import { deviceWidthDimension as wd } from "../utils/responsiveDesign";

/**groups shown in a card form in groups page */
class CardGroup extends Component {
  // alert prompt to pin or unpin groups
  showAlert = () => {
    const userId = this.props.userId;
    const groupId = this.props.groupId;
    //prettier-ignore
    const message = `Do you want to ${(!this.props.pinned) ? "pin" : "unpin"} this group?`
    // show alert
    Alert.alert(
      message,
      "",
      [
        { text: "Cancel", onPress: null },
        {
          text: "Yes",
          onPress: () =>
            !this.props.pinned
              ? this.props.pinGroup(userId, groupId)
              : this.props.unpinGroup(userId, groupId)
        }
      ],
      { cancelable: false }
    );
  };

  //prettier-ignore
  render() {
    return (
      <View style={styles.card}>
        <View style={{ position: "absolute", top: 5, right: 5, elevation: 2 }}>
          {this.props.pinned === true ? 
            (<Image source={require("../../assets/images/icons/favourite.png")}/>) :
            (<Image source={require("../../assets/images/icons/unfavourite.png")}/>)}
        </View>

        {/* <TouchableOpacity onPress={this.props.onPress(this.props.groupId)}> */}
        <TouchableOpacity
          onLongPress={() => this.showAlert()}
          onPress={() => this.props.onPress(this.props.groupId)}
        >
          {/* big image */}
          <View style={styles.picPlaceholder}>
            <Image 
              style={[styles.photo]} 
              source={this.props.image}
            />
          </View>
          {/* title */}
          <View style={styles.textPlaceholder}>
            <Text style={[styles.title, styles.font]}>
              {this.props.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: wd(0.44),
    marginTop: 10,
    marginLeft: wd(0.04),
    height: wd(0.5),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    alignContent: "center",
    alignItems: "center"
  },

  font: {
    fontFamily: "HindSiliguri-Regular"
  },

  picPlaceholder: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center"
  },

  photo: {
    width: wd(0.44),
    height: wd(0.37),
    marginTop: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },

  textPlaceholder: {
    flex: 0.3,
    justifyContent: "center"
  },

  title: {
    // flex: 0.4,
    marginHorizontal: 5,
    marginTop: 3,
    fontSize: wd(0.035)
  },

  userProfile: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center"
  },

  userProfilePic: {
    width: wd(0.07),
    height: wd(0.07),
    marginHorizontal: 5
  },

  userName: {
    color: "#939090"
  }
});

export default connect(
  null,
  { pinGroup, unpinGroup }
)(CardGroup);
