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
    // get random card height to make it more aesthetically pleasing
    // if no height value is provided, then use default card height
    this.cardHeight = this.props.cardHeight ? this.props.cardHeight : wd(0.425);
  }

  // alert prompt to pin or unpin groups
  showAlert = () => {
    const userId = this.props.userId;
    const { groupId, pinned } = this.props.group;
    //prettier-ignore
    const message = `Do you want to ${(!pinned) ? "pin" : "unpin"} this group?`
    // show alert
    Alert.alert(
      message,
      "",
      [
        { text: "Cancel", onPress: null },
        {
          text: "Yes",
          onPress: () =>
            !pinned
              ? this.props.pinGroup(userId, groupId)
              : this.props.unpinGroup(userId, groupId)
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { details, groupId, pinned, admin } = this.props.group;
    const { coverPhoto, title } = details;
    const { profilePic, name } = admin;

    const pinImageSource = pinned
      ? require("../../assets/images/icons/favourite.png")
      : require("../../assets/images/icons/unfavourite.png");

    return (
      <View style={styles.card}>
        {/* favourite icon */}
        <View style={styles.favouriteContainer}>
          {/* pin image */}
          <Image
            style={styles.favourite}
            source={pinImageSource}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity
          onLongPress={() => this.showAlert()}
          onPress={() => this.props.onPress(groupId)}
        >
          {/* group image */}
          <View style={styles.picPlaceholder}>
            <Image
              style={[styles.photo, { height: this.cardHeight }]}
              source={{ uri: coverPhoto }}
              resizeMethod="resize"
              resizeMode="cover"
            />
          </View>
          {/* title */}
          <View style={styles.textPlaceholder}>
            {/* Group name */}
            <View style={styles.groupNamePlaceholder}>
              <Text style={[{ fontSize: wd(0.0375) }, styles.font]}>
                {title}
              </Text>
            </View>
            {/* admin of the group and number of members */}
            <View style={styles.groupDetailsPlaceholder}>
              <Image
                style={styles.userProfilePic}
                source={{ uri: profilePic }}
                resizeMethod="resize"
                resizeMode="cover"
              />
              <Text style={styles.userName}>{name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: wd(0.425),
    marginTop: 10,
    marginBottom: 10,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 0.4,
    borderColor: "#E2E2E2"
  },

  font: {
    fontFamily: "HindSiliguri-Regular"
  },

  picPlaceholder: {
    justifyContent: "flex-start"
  },

  photo: {
    width: wd(0.425),
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12
  },

  textPlaceholder: {
    marginHorizontal: 8,
    marginVertical: 4
  },

  groupNamePlaceholder: {
    marginBottom: 2,
    justifyContent: "center"
  },

  groupDetailsPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6
  },

  userProfilePic: {
    width: wd(0.055),
    height: wd(0.055),
    borderRadius: wd(0.055)
  },

  userName: {
    color: "#939090",
    fontSize: wd(0.03),
    marginLeft: 8,
    fontFamily: "HindSiliguri-Light"
  },

  favouriteContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    elevation: 2
  },

  favourite: {
    width: 25,
    height: 25
  }
});

export default connect(
  null,
  { pinGroup, unpinGroup }
)(CardGroup);
