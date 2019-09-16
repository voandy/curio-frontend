import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, StyleSheet, Text, AsyncStorage } from "react-native";

// Redux actions
import { registerUser, loginUser } from "../../actions/authActions";

import RegisterManager from "./registerManager";

// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";

import { uploadImageToGCS } from "../../utils/imageUpload";

class Register extends Component {
  // nav details
  static navigationOptions = {
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // send new user data
  onSubmit = async () => {
    console.log("submit!");
    console.log("user's pro pic uri: " + this.props.register.photoURI);
    // get the navigate function from props
    const { navigate } = this.props.navigation;

    uploadImageToGCS(this.props.register.photoURI)
      .then(imageUrl => {
        console.log("Image Uploaded: " + imageUrl);
        // create new user
        const newUser = {
          name: this.props.register.name,
          email: this.props.register.email,
          password: this.props.register.password,
          passwordCfm: this.props.register.passwordCfm,
          profilePic: imageUrl
        };
        console.log("Registering new user: " + newUser);
        // register user
        this.props.registerUser(newUser, this.props.history).then(res => {
          console.log("api call response from register is", res);

          // login details
          const user = {
            email: newUser.email,
            password: newUser.password
          };
          // successful registration
          if (res !== null) {
            console.log("Register succeeded! Trying to login user now.");
            // login user directly
            this.props
              .loginUser(user, this.props.history)
              .then(res => {
                console.log("api call response from login is", res);
                AsyncStorage.getItem("userToken")
                  .then(res => {
                    console.log("Gotten userToken!:" + JSON.stringify(res));
                    // navigate user to Welcome page if no errors
                    if (res !== null) {
                      navigate("Welcome");
                    }
                  })
                  .catch(err => {
                    console.log("Failed!: " + err);
                  });
              })
              .catch(err => {
                console.log("Failed to log user in.");
              });
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* heading */}
        <Text style={styles.titleText}> Welcome, </Text>
        <Text style={styles.subTitleText}> Enter your details to signup. </Text>

        {/* main card view */}
        <View style={styles.card}>
          <RegisterManager onSubmit={this.onSubmit} />
        </View>
      </View>
    );
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
    marginLeft: wd(0.07)
    // fontFamily: "HindSiliguri-Bold"
  },

  subTitleText: {
    fontSize: 25,
    marginBottom: 50,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: wd(0.07)
    // fontFamily: "HindSiliguri-Bold"
  },

  card: {
    width: wd(0.9),
    height: hp(0.6),
    borderColor: "#E2E2E2",
    borderRadius: 30,
    borderTopWidth: 0.5,
    borderRightWidth: 2,
    borderLeftWidth: 0.5,
    borderBottomWidth: 2,
    marginBottom: 50
  },

  lastContainer: {
    flex: 1,
    alignItems: "center"
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
    height: wd(0.3),
    alignItems: "flex-end"
  }
});

Register.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
  // register: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  register: state.register
});

// connect and export
export default connect(
  mapStateToProps,
  { registerUser, loginUser }
)(Register);
