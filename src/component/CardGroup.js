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
import {
  deviceWidthDimension as wd,
  deviceHeigthDimension as hp
} from "../utils/responsiveDesign";

/**groups shown in a card form in groups page */
class CardGroup extends Component {

  constructor(props) {
    super(props);
  }

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
        {/* favourite icon */}
        <View style={{ position: "absolute", top: 10, right: 10, elevation: 2 }}>
          {this.props.pinned === true ?
            (<Image resizeMode="contain" style={styles.favourite} source={require("../../assets/images/icons/favourite.png")} />) :
            (<Image resizeMode="contain" style={styles.favourite} source={require("../../assets/images/icons/unfavourite.png")} />)}
        </View>

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
            {/* Group name */}
            <View style={styles.groupNamePlaceholder}>
              <Text style={[{ fontSize: wd(0.0375) }, styles.font]}>{this.props.title}</Text>
            </View>
            {/* admin of the group and number of members */}
            <View style={styles.groupDetailsPlaceholder}>
              <Image style={styles.userProfilePic} source={require("../../assets/images/default-profile-pic.png")}/>
              <Text style={styles.userName}>John Doe</Text>
            </View>

          </View>
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: wd(0.425),
    marginTop: 10,
    marginBottom: 20,
    elevation:3,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 0.4,
    borderColor: "#E2E2E2",
  },

  font: {
    fontFamily: "HindSiliguri-Regular",
  },

  picPlaceholder: {
    justifyContent: "flex-start",
  },

  photo: {
    width: wd(0.425),
    height: wd(0.425),
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12
  },

  textPlaceholder: {
    marginHorizontal: 8,
    marginVertical:4,
  },

  groupNamePlaceholder: {
    marginBottom: 2,
    justifyContent: "center",
  },

  groupDetailsPlaceholder: {
    flexDirection: "row",
    alignItems:"center",
    marginBottom:6
  },

  userProfilePic: {
    width: wd(0.055),
    height: wd(0.055),
  },

  userName: {
    color: "#939090",
    fontSize: wd(0.03),
    marginLeft: 8,
    fontFamily: "HindSiliguri-Light",
  },

  favourite: {
    width: 25,
    height: 25,
  }
});

export default connect(
  null,
  { pinGroup, unpinGroup }
)(CardGroup);
