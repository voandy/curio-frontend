import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getUserData } from "../../actions/userActions";

import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text
} from "react-native";

// date converter
import Moment from "moment";

// custom component
import SimpleHeader from "../../component/SimpleHeader";
import MyButton from "../../component/MyButton";
import ProfileSetting from "../../component/ProfileSetting";
import Line from "../../component/Line";

// responsive design component
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd
  } from "../../utils/responsiveDesign";

class PublicProfile extends Component {
  constructor() {
    super();
  }

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  componentWillUpdate(nextProps) {
    // sets user data
    if (nextProps.user.userData !== this.props.user.userData) {
      this.setState({
        userData: nextProps.user.userData
      });
    }
  }

  render() {
    // date format
    Moment.locale("en");
    const dt = this.props.user.userData.dateJoined;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <SimpleHeader title="Profile" />

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {/* user profile picture */}
          {this.props.user.userData.profilePic != null ? (
            <Image
              style={styles.profilePic}
              source={{ uri: this.props.user.userData.profilePic }}
            />
          ) : (
            <Image
              style={styles.profilePic}
              source={require("../../../assets/images/default-profile-pic.png")}
            />
          )}

          {/* user heading */}
          <Text style={styles.userName}>{this.props.user.userData.name}</Text>
          <Text style={styles.userDetails}>
            @{this.props.user.userData.username}
          </Text>
          <Text style={[styles.userDetails, { marginBottom: 25 }]}>
            joined since {Moment(dt).format("Do MMMM YYYY")}
          </Text>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  userName: {
    fontSize: 24,
    marginVertical: 5,
    alignSelf: "center",
    fontFamily: "HindSiliguri-Bold"
  },

  userDetails: {
    fontSize: 14,
    alignSelf: "center",
    color: "#939090",
    fontFamily: "HindSiliguri-Regular"
  },

  profilePic: {
    marginTop: 30,
    width: Dimensions.get("window").width * 0.45,
    height: Dimensions.get("window").width * 0.45,
    borderRadius: (Dimensions.get("window").width * 0.45) / 2,
    alignSelf: "center"
  },

  button: {
    alignItems: "center",
    marginVertical: 25
  }
});

PublicProfile.propTypes = {
  getUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserData }
)(PublicProfile);