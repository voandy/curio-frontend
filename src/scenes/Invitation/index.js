import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSpecificUser } from "../../actions/userActions";
import { getSpecificGroup } from "../../actions/groupsActions";

import {
  StyleSheet,
  View,
  Image,
  Text,
  Animated,
  TouchableOpacity
} from "react-native";

// custom component
import MyButton from "../../component/MyButton";
import Line from "../../component/Line";

// import reusable components
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

import SimpleHeader from "../../component/SimpleHeader";

class Invitation extends Component {
  constructor(props) {
    super(props);
    this.fadeAnimation = new Animated.Value(0);
    // setup initial state
    this.state = {
      loading: false,
      admin: {},
      group: {}
    };
    this.getRequiredData();
  }

  // get selected group data asynchronously
  getRequiredData = async () => {
    const { notif } = this.props.navigation.state.params;
    const { data, refId } = notif;
    const adminId = data.otherUser;
    // reload everything at once
    return Promise.all([
      this.props.getSpecificUser(adminId),
      this.props.getSpecificGroup(refId)
    ])
      .then(values => {
        const admin = values[0];
        const group = values[1];
        // set data into local state and start showing data
        this.setState({ admin, group }, () => this.startShowing());
      })
      .catch(err => {
        console.log(err);
        alert("Error loading invitation data");
      });
  };

  // Nav bar details
  static navigationOptions = {
    headerStyle: {
      elevation: 0
    }
  };

  // animation trigger
  startShowing = () => {
    Animated.timing(this.fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };

  // TODO
  onSubmit = async () => {
    // show user the loading modal
    this.setLoading(true);
  };

  render() {
    const { notif } = this.props.navigation.state.params;
    const { thumbnailURL } = notif;
    console.log(this.state);
    return (
      <Animated.View
        style={[styles.container, { opacity: this.fadeAnimation }]}
      >
        {/* invitator's profile pic */}
        <View
          style={{
            height: hp(0.3),
            width: wd(1),
            alignItems: "center",
            marginVertical: hp(0.1)
          }}
        >
          <Image
            style={styles.profilePic}
            source={{ uri: thumbnailURL }}
            resizeMethod="resize"
            resizeMode="cover"
          />

          <Text style={styles.invite}>
            @{this.state.admin.username} has invited you to join
          </Text>
          <Text style={styles.group}>{this.state.group.title}</Text>
        </View>

        {/* invitation fields */}
        <View style={styles.buttons}>
          {/* join group */}
          <TouchableOpacity
            style={{ marginVertical: wd(0.05), alignItems: "center" }}
          >
            <Text style={styles.accept}>Accept</Text>
          </TouchableOpacity>

          {/* delete account */}
          <TouchableOpacity
            style={{ marginVertical: wd(0.05), alignItems: "center" }}
          >
            <Text style={styles.decline}>Decline</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },

  profilePic: {
    marginTop: 50,
    marginBottom: 20,
    width: wd(0.3),
    height: wd(0.3),
    borderRadius: wd(0.3) / 2,
    alignSelf: "center"
  },

  invite: {
    width: wd(0.7),
    color: "#939090",
    fontFamily: "HindSiliguri-Regular",
    fontSize: 16,
    textAlign: "center"
  },

  group: {
    width: wd(0.7),
    color: "black",
    fontFamily: "HindSiliguri-Bold",
    fontSize: 16,
    textAlign: "center"
  },

  buttons: {
    height: hp(0.6),
    width: wd(0.8),
    alignContent: "center"
  },

  accept: {
    fontFamily: "HindSiliguri-Bold",
    color: "#1183ca",
    fontSize: 16
  },

  decline: {
    fontFamily: "HindSiliguri-Bold",
    color: "red",
    fontSize: 16
  }
});

Invitation.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getSpecificUser, getSpecificGroup }
)(Invitation);
