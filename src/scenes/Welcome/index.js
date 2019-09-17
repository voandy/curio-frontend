import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserData, clearCurrentUserData } from "../../actions/userActions";
import { View, Image, StyleSheet, Text } from "react-native";

// custom components
import MyButton from "../../component/MyButton";

// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";

class Welcome extends Component {
  // remove nav details
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    console.log("Launching Welcome Page!");
    this.props.clearCurrentUserData();
    // get user authentication data
    const { user } = this.props.auth;
    console.log("user in auth: " + JSON.stringify(user));
    this.props.getUserData(user.id);
  }

  // guard to make sure userData is loaded properly, otherwise renders a loading screen
  rendersWithUserDataGuard() {
    const { navigate } = this.props.navigation;

    if (this.props.user.userData) {
      return (
        <View style={styles.container}>
          {/* heading */}
          <Text style={styles.titleText}> All done! </Text>
          <Text style={styles.subTitleText}>
            {" "}
            Welcome {this.props.user.userData.name}.{" "}
          </Text>
          {/* <Text style={styles.subTitleText}> Welcome hue. </Text> */}

          <Image
            style={styles.profilePic}
            source={{ uri: this.props.user.userData.profilePic }}
          />
          {/* <Image style={styles.profilePic} source={require("../../../assets/images/default-profile-pic.png")} /> */}
          {/* button to collection/group page */}
          {setToBottom(
            <View style={styles.bottom}>
              <MyButton text="Get Started" onPress={() => navigate("App")} />
            </View>
          )}
        </View>
      );
    } else {
      return <ActivityIndicator size="large" />;
    }
  }

  render() {
    return this.rendersWithUserDataGuard();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: wd(0.25),
    marginLeft: wd(0.07)
    // fontFamily: 'HindSiliguri-Bold'
  },

  subTitleText: {
    fontSize: 25,
    marginBottom: 50,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: wd(0.07)
    // fontFamily: 'HindSiliguri-Bold'
  },

  profilePic: {
    marginTop: 40,
    width: wd(0.4),
    height: wd(0.4),
    alignSelf: "center",
    borderRadius: wd(0.4) / 2
  },

  bottom: {
    width: wd(0.8),
    height: wd(0.35),
    alignItems: "flex-end"
  }
});

Welcome.propTypes = {
  getUserData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserData, clearCurrentUserData }
)(Welcome);
