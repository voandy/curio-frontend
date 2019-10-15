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
  Text
} from "react-native";

// date converter
import Moment from "moment";

// redux actions
import { logoutUser } from "../../actions/authActions";
import { getUserData } from "../../actions/userActions";

// custom component
import SimpleHeader from "../../component/SimpleHeader";
import MyButton from "../../component/MyButton";
import ProfileSetting from "../../component/ProfileSetting";
import Line from "../../component/Line";
import { setUserPushTokenAPIRequest } from "../../utils/APIHelpers/userAPIHelpers";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  onChangeSearchInput = searchInput => {
    this.setState({
      searchInput
    });
  };

  // logs user out and navigate to authentication page
  onLogoutClick = () => {
    const { navigate } = this.props.navigation;
    const userId = this.props.user.userData._id;
    this.props
      .logoutUser()
      .then(() => {
        // set user's push token to null so that the backend won't set
        // a notification to an unlogged in device
        setUserPushTokenAPIRequest(userId, null).catch(err => console.log(err));
        navigate("Auth");
      })
      .catch(err => console.log(err));
  };

  render() {
    // date format
    Moment.locale("en");
    const dt = this.props.user.userData.dateJoined;

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <SimpleHeader
            title="My Profile"
            showSearch={true}
            searchInput={this.state.searchInput}
            onChangeSearchInput={this.onChangeSearchInput}
            pressClear={() => this.onChangeSearchInput("")}
            onSubmitEditing={() =>
              navigate("GeneralSearch", {
                searchTerms: this.state.searchInput
              })
            }
            pressSearch={() =>
              navigate("GeneralSearch", {
                searchTerms: this.state.searchInput
              })
            }
          />

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
            member since {Moment(dt).format("Do MMMM YYYY")}
          </Text>

          {/* line separator */}
          <Line />

          <ProfileSetting text="Artefacts" iconType="artefact" />
          <ProfileSetting
            text="Account Settings"
            iconType="gear"
            onPress={() => navigate("AccountSetting")}
          />

          {/* line separator */}
          <Line />

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
  }
});

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { logoutUser, getUserData }
)(Profile);
