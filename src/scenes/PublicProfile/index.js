import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  RefreshControl,
  TouchableOpacity
} from "react-native";

// redux actions
import {
  getSelectedUser,
  getSelectedUserArtefacts
} from "../../actions/userActions";

// date converter
import Moment from "moment";

// components
import ArtefactFeed from "../../component/ArtefactFeed";

// responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

class PublicProfile extends Component {
  constructor(props) {
    super(props);
    // extract navigation parameters
    const { userId } = this.props.navigation.state.params;
    // setup initial state
    this.state = {
      // page settings
      refreshing: false,
      // user data
      userId,
      user: {},
      artefacts: []
    };
    // make sure it exists
    userId
      ? this.getSelectedUserData(userId)
      : alert("Error loading user data");
  }

  // nav details
  static navigationOptions = {
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // get selected group data asynchronously
  getSelectedUserData = async userId => {
    // retrieve all data from backend at once
    return Promise.all([
      this.props.getSelectedUser(userId),
      this.props.getSelectedUserArtefacts(userId)
    ])
      .then(data => {
        // set all data to local state
        this.setState(
          {
            user: data[0],
            artefacts: data[1]
          },
          () => Promise.resolve()
        );
      })
      .catch(err => {
        console.log(JSON.stringify(err.response));
        alert("Please try again later");
        Promise.reject(err);
      });
  };

  // re-retrieve all required data - also used in page refresh
  reloadData = async () => {
    this.setState({ refreshing: true });
    // get data from backend
    await this.getSelectedUserData(this.state.userId);
    // resets refreshing state
    this.setState({ refreshing: false });
  };

  // retains only artefacts with privacy = public
  extractPublicArtefacts = artefacts => {
    // show only public artefacts
    const privacy = 0;
    // filter artefacts by their privacy settings
    return artefacts.filter(x => x.privacy == privacy);
  };

  // navigation functions //
  // for each individual artefact clicked by user
  onArtefactClick = async artefactId => {
    // redirect user
    this.navigateToPage("SelectedArtefact", {
      origin: "PublicProfile",
      artefactId
    });
  };

  // main navigation function
  navigateToPage = (page, options) => {
    const { push } = this.props.navigation;
    push(page, {
      origin: "PublicProfile",
      ...options
    });
  };

  // artefact feed functions //
  // show artefacts by privacy settings
  showArtefacts = () => {
    // return modularized feed component
    return (
      <ArtefactFeed
        artefacts={this.state.artefacts}
        onPress={this.onArtefactClick.bind(this)}
      />
    );
  };

  render() {
    // date format
    Moment.locale("en");
    // extract data from local states
    const { user, artefacts } = this.state;
    const { name, username, profilePic, dateJoined } = user;
    // make sure groups is not undefined
    const groups = !user.groups ? [] : user.groups;
    // decide which image source to use
    const imageSource = !this.state.user
      ? require("../../../assets/images/default-profile-pic.png")
      : { uri: profilePic };

    return (
      <View style={styles.container}>
        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.reloadData}
            />
          }
        >
          {/* user details */}
          <View style={styles.userDetailsContainer}>
            {/* user profile picture */}
            <View style={styles.profilePicContainer}>
              <Image
                style={styles.profilePic}
                source={imageSource}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>

            {/* user heading */}
            <Text style={[styles.userName, styles.font]}>
              {name ? name : " " /*ensure consistency before data is loaded*/}
            </Text>
            <Text style={[styles.userDetails, styles.subFont]}>
              @{username}
            </Text>
            <Text style={styles.userDetails}>
              Joined Curio on {Moment(dateJoined).format("Do MMMM YYYY")}
            </Text>
            {/* number of artefacts and groups of the user */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginVertical: 10
              }}
            >
              {/* artefacts numbers */}
              <View style={{ alignItems: "center" }}>
                <Text style={styles.font}>{artefacts.length}</Text>
                <Text style={(styles.subFont, { color: "#939090" })}>
                  Artefacts
                </Text>
              </View>

              {/* groups number */}
              <View style={{ alignItems: "center" }}>
                <Text style={styles.font}>{groups.length}</Text>
                <Text style={(styles.subFont, { color: "#939090" })}>
                  Groups
                </Text>
              </View>
            </View>
          </View>

          {/* user artefacts posts */}
          <View style={{ marginTop: wd(0.01) }}>{this.showArtefacts()}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7"
  },

  font: {
    fontFamily: "HindSiliguri-Bold"
  },

  subFont: {
    fontFamily: "HindSiliguri-Regular"
  },

  userDetailsContainer: {
    backgroundColor: "white"
  },

  userName: {
    fontSize: hp(0.025),
    marginVertical: 5,
    alignSelf: "center"
  },

  userDetails: {
    fontSize: hp(0.015),
    alignSelf: "center",
    color: "#939090"
  },

  profilePicContainer: {
    width: wd(0.35),
    height: wd(0.35),
    alignSelf: "center",
    marginBottom: hp(0.01)
  },

  profilePic: {
    marginTop: hp(0.015),
    width: wd(0.35),
    height: wd(0.35),
    borderRadius: wd(0.35)
  },

  feed: {
    flexDirection: "row",
    marginLeft: wd(0.032),
    marginRight: wd(0.032)
  },

  emptyFeed: {
    flex: 1,
    height: hp(0.3),
    alignItems: "center",
    justifyContent: "center"
  }
});

PublicProfile.propTypes = {
  getSelectedUser: PropTypes.func.isRequired,
  getSelectedUserArtefacts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  artefacts: state.artefacts
});

// export
export default connect(
  mapStateToProps,
  { getSelectedUser, getSelectedUserArtefacts }
)(PublicProfile);
