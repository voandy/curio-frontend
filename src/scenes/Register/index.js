import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, AsyncStorage } from "react-native";
// redux action
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/authActions";
// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";
// import manager to manage register stage
import RegisterManager from "./registerManager";
// import the loader modal to help show loading process
import ActivityLoaderModal from "../../component/ActivityLoaderModal";
// import helper function to deal with image upload
import { uploadImageToGCS } from "../../utils/imageUpload";
import { registerUser, loginUser } from "../../utils/auth/authHelpers";

class Register extends Component {
  state = {
    loading: false
  };

  // nav details
  static navigationOptions = {
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };

  // post new user to the backend (massive function)
  onSubmit = async () => {
    // show user the loading modal
    this.setLoading(true);
    // get the navigate function from props
    const { navigate } = this.props.navigation;
    // upload the selected photo to GCS, which returns the url to the image
    uploadImageToGCS(this.props.register.photoURI)
      .then(imageUrl => {
        // prepare the body data base on new user details
        const newUser = {
          name: this.props.register.name,
          email: this.props.register.email,
          username: this.props.register.username,
          password: this.props.register.password,
          passwordCfm: this.props.register.passwordCfm,
          profilePic: imageUrl
        };
        // register user (post api request)
        registerUser(newUser)
          .then(() => {
            // prepare login details
            const user = {
              email: newUser.email,
              password: newUser.password
            };
            // log the user in directly
            loginUser(user)
              .then(decoded => {
                // setting user's details to redux store
                this.props.setCurrentUser(decoded);
                // get user's data
                AsyncStorage.getItem("userToken")
                  .then(() => {
                    // stop showing user the loading modal
                    this.setLoading(false);
                    // navigate user to Welcome page
                    navigate("Welcome");
                  })
                  // error with retrieving user token
                  .catch(err => {
                    // stop showing user the loading modal
                    this.setLoading(false);
                    console.log(
                      "Failed to retrieve user token at Register -> Login: " +
                        err
                    );
                  });
              })
              // error with logging in the user
              .catch(err => {
                this.setLoading(false);
                console.log("Failed to log user in after registration: " + err);
              });
          })
          .catch(err => {
            this.setLoading(false);
            console.log("Failed to register user: " + err);
          });
      })
      // error with uploading image to GCS
      .catch(err => {
        // stop showing user the loading modal
        this.setLoading(false);
        console.log(
          "Failed to upload image at user registration. Error: " + err
        );
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* loading modal window */}
        <ActivityLoaderModal loading={this.state.loading} />
        {/* heading */}
        <Text style={styles.titleText}> Welcome, </Text>
        <Text style={styles.subTitleText}> Enter your details to signup. </Text>

        {/* main card view */}
        <View style={styles.card}>
          <RegisterManager onSubmit={this.onSubmit.bind(this)} />
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
    alignSelf: "flex-start",
    marginLeft: wd(0.07),
    fontFamily: "HindSiliguri-Bold"
  },

  subTitleText: {
    fontSize: 25,
    marginBottom: 50,
    alignSelf: "flex-start",
    marginLeft: wd(0.07),
    fontFamily: "HindSiliguri-Bold"
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

// map required redux state to local props
const mapStateToProps = state => ({
  register: state.register
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Register);
