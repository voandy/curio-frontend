import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

// date converter
import Moment from "moment";

// redux actions
import { logoutUser } from "../../actions/authActions";
import { getUserData, sendUserPushToken } from "../../actions/userActions";

import {
  deviceWidthDimension as wd,
  deviceHeigthDimension as hp
} from "../../utils/responsiveDesign";

// custom component
import SimpleHeader from "../../component/SimpleHeader";
import MyButton from "../../component/MyButton";

class Profile extends Component {
  constructor(props) {
    super(props);
    // date format
    Moment.locale("en");
  }

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  //prettier-ignore
  // logs user out and navigate to authentication page
  onLogoutClick = () => {
    const { navigate } = this.props.navigation;
    const userId = this.props.user.userData._id;
    this.props.logoutUser()
      .then(() => {
        // set user's push token to null so that the backend won't set
        // a notification to an unlogged in device
        sendUserPushToken(userId, null);
        // use navigate instead of push cause we want to reset the stack
        navigate("Auth");
      })
      .catch(err => console.log(err));
  };

  // user typed and enters search inputs
  onAccountSettingPress = () => {
    // navigate to general search page
    this.navigateToPage("AccountSetting");
  };

  // main navigation function
  navigateToPage = (page, options) => {
    const { push } = this.props.navigation;
    push(page, {
      origin: "Profile",
      ...options
    });
  };

  render() {
    const groups = this.props.groups.userGroups;
    const artefacts = this.props.artefacts.userArtefacts;

    // extract data from redux
    const { dateJoined, profilePic, username, name } = this.props.user.userData;
    const imageSource = profilePic
      ? { uri: profilePic }
      : require("../../../assets/images/default-profile-pic.png");

    return (
      <View style={styles.container}>
        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <SimpleHeader title="My Profile" showSearch={false} />

          {/* user profile picture */}
          <Image
            style={styles.profilePic}
            source={imageSource}
            resizeMethod="resize"
            resizeMode="cover"
          />

          {/* user heading */}
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userDetails}>@{username}</Text>
          <Text style={[styles.userDetails, { marginBottom: 25 }]}>
            Joined Curio on {Moment(dateJoined).format("Do MMMM YYYY")}
          </Text>

          {/* profile tabs */}
          <View style={styles.profileTabsContainer}>
            {/* artefact tab */}
            <View style={styles.profileTab}>
              <Text style={styles.font}>{artefacts.length}</Text>
              <Text style={styles.subFont}>Artefacts</Text>
            </View>

            {/* group tab */}
            <View style={styles.profileTab}>
              <Text style={styles.font}>{groups.length}</Text>
              <Text style={styles.subFont}>Groups</Text>
            </View>

            {/* edit profile */}
            <TouchableOpacity
              style={styles.profileTab}
              onPress={() => this.onAccountSettingPress()}
            >
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  source={require("../../../assets/images/icons/edit-profile.png")}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.subFont}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* logout button */}
          <View style={styles.button}>
            <MyButton onPress={this.onLogoutClick} text="LOG OUT" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
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
  },

  profileTabsContainer: {
    width: wd(0.9),
    height: wd(0.15),
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
    marginBottom: hp(0.1)
  },

  profileTab: {
    flex: 0.33,
    flexDirection: "column",
    alignItems: "center"
  },

  iconContainer: {
    flex: 0.6,
    alignContent: "center",
    justifyContent: "center"
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: "black"
  },

  font: {
    flex: 0.6,
    fontSize: 23,
    fontFamily: "HindSiliguri-Bold"
  },

  subFont: {
    flex: 0.4,
    fontSize: 15,
    fontFamily: "HindSiliguri-Regular",
    color: "#939090"
  }
});

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  groups: state.groups,
  artefacts: state.artefacts
});

export default connect(
  mapStateToProps,
  { logoutUser, getUserData }
)(Profile);
