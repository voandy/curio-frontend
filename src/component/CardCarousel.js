import React, { Component } from "react";
import { View, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { unpinGroup } from "../actions/groupsActions";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

/** carousel for saved groups in groups page */
class CardCarousel extends Component {

  // alert prompt to pin or unpin groups
  showAlert = () => {
    //prettier-ignore
    const message = "Do you want to unpin this group?"
    const userId = this.props.userId;
    const groupId = this.props.groupId;
    // show alert
    Alert.alert(
      message,
      "",
      [
        { text: "Cancel", onPress: null },
        {
          text: "Yes",
          onPress: () => this.props.unpinGroup(userId, groupId)
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <View style={styles.card}>
        {/* favouraite icon */}
        <View style={{ position: "absolute", top: 5, right: 5, elevation: 2 }}>
          <Image source={require("../../assets/images/icons/favourite.png")} />
        </View>
        
        {/* group card */}
        <TouchableOpacity
          onLongPress={() => this.showAlert()}
          onPress={() => this.props.onPress(this.props.groupId)}
        >
          {/* Image  */}
          <View style={styles.picPlaceholder}>
            <Image style={styles.photo} source={{ uri: this.props.image }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: wd(0.9),
    marginHorizontal: wd(0.05),
    height: wd(0.45),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    alignContent: "center",
    alignItems: "center"
  },

  picPlaceholder: {
    alignItems: "center",
    justifyContent: "center"
  },

  photo: {
    width: wd(0.9),
    height: wd(0.45),
    borderRadius: 15
  }
});

export default connect(
  null,
  { unpinGroup }
)(CardCarousel);
