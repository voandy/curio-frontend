import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, StyleSheet, Text, AsyncStorage } from "react-native";
// Redux actions
import { registerUser, loginUser } from "../../actions/authActions";
// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";
// import manager to manage register stage
import RegisterManager from "./registerManager";
// import helper function to deal with image upload
import { uploadImageToGCS } from "../../utils/imageUpload";
// import the loader modal to help show loading process
import ActivityLoaderModal from "../../component/ActivityLoaderModal";

class Register extends Component {
  state = {
    loading: true
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

  // post new user to the backend
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
        this.props.registerUser(newUser, this.props.history).then(res => {
          // prepare login details
          const user = {
            email: newUser.email,
            password: newUser.password
          };
          // upon successful registration
          if (res !== null) {
            // log the user in directly
            this.props
              .loginUser(user, this.props.history)
              .then(res => {
                AsyncStorage.getItem("userToken")
                  .then(res => {
                    // stop showing user the loading modal
                    this.setLoading(false);
                    // navigate user to Welcome page if no errors
                    if (res !== null) {
                      navigate("Welcome");
                    }
                  })
                  // error with retrieving user token
                  .catch(err => {
                    // stop showing user the loading modal
                    this.setLoading(false);
                    console.log(
                      "Failed at retrieving user token! Error: " + err
                    );
                  });
              })
              // error with logging in the user
              .catch(err => {
                // stop showing user the loading modal
                this.setLoading(false);
                console.log("Failed to log user in. Error: " + err);
              });
          }
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
        {this.state.loading ? (
          <ActivityLoaderModal loading={this.state.loading} />
        ) : (
          <View />
        )}

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

Register.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
};

// map required redux state to local props
const mapStateToProps = state => ({
  register: state.register
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { registerUser, loginUser }
)(Register);
