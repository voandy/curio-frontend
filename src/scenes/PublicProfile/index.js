import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

// redux actions
import { getUserData } from "../../actions/userActions";
import { getUserArtefacts } from "../../actions/artefactsActions";

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
  }

  // nav details
  static navigationOptions = {
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  render() {
    // date format
    Moment.locale("en");
    const dt = this.props.user.userData.dateJoined;
    // navigate to other screens
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {/* user details */}
          <View style={{backgroundColor:"white"}}>
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
            <Text style={[styles.userName, styles.font]}>{this.props.user.userData.name}</Text>
            <Text style={[styles.userDetails, styles.subFont]}>
              @{this.props.user.userData.username}
            </Text>
            <Text style={styles.userDetails}>
              joined since {Moment(dt).format("Do MMMM YYYY")}
            </Text>

            {/* number of artefacts and groups of the user */}
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginVertical: 10 }}>
              <TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                  {/* TODO USE THIS */}
                  {/* <Text style={styles.font}>{this.props.numArtefacts}</Text> */}
                  <Text style={styles.font}>10</Text>
                  <Text style={styles.subFont, { color: "#939090" }}>Artefacts</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                  {/* <Text style={styles.font}>{this.props.numGroups}</Text> */}
                  <Text style={styles.font}>2</Text>
                  <Text style={styles.subFont, { color: "#939090" }}>Groups</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

          {/* user artefacts posts */}
          <View style={{marginBottom:hp(0.1)}}>

            {/* all artefacts posted by the user */}

{/* ADD LOGIC HERE */}
{/* and IF ELSE logic */}

            <View style={styles.feed}>
              <ArtefactFeed
                image={require("../../../assets/images/test-delete-this/boi2.jpg")}
              />
              <ArtefactFeed
                image={require("../../../assets/images/test-delete-this/boi3.jpg")}
              />
              <ArtefactFeed
                image={require("../../../assets/images/test-delete-this/boi1.jpg")}
              />
            </View>

            {/* <View style={styles.emptyFeed}>
              <Text style={[styles.font, { fontSize: 16 }]}>
                No Artefacts posted yet
              </Text>
            </View> */}

          </View>
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
    fontFamily: "HindSiliguri-Bold",
  },

  subFont: {
    fontFamily: "HindSiliguri-Regular",
  },

  userName: {
    fontSize: hp(0.025),
    marginVertical: 5,
    alignSelf: "center",
  },

  userDetails: {
    fontSize: hp(0.015),
    alignSelf: "center",
    color: "#939090",
  },

  profilePic: {
    marginTop: hp(0.015),
    width: wd(0.35),
    height: wd(0.35),
    borderRadius: wd(0.35) / 2,
    alignSelf: "center"
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
    justifyContent:"center"
  }

});

PublicProfile.propTypes = {
  getUserData: PropTypes.func.isRequired,
  getUserArtefacts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  artefacts: state.artefacts,
});


// export
export default connect(
  mapStateToProps,
  { getUserData, getUserArtefacts }
)(PublicProfile);
