import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, StyleSheet, Text, AsyncStorage } from "react-native";

import { registerUser, loginUser } from "../../actions/authActions";
import RegisterManager from "./registerManager";
import { C } from "../../types/registerTypes";
import CustomFontText from "../../utils/customFontText";

// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";

// state
const initialState = {
  registerStage: C.GET_NAME,
  name: "",
  email: "",
  password: "",
  passwordCfm: "",
  photoURL: null
};

class Register extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // nav details
  static navigationOptions = {
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // state data handler
  nameHandler = name => {
    this.setState({ ...this.state, name });
  };

  emailHandler = email => {
    this.setState({ ...this.state, email });
  };

  passwordHandler = password => {
    this.setState({ ...this.state, password });
  };

  passwordCfmHandler = passwordCfm => {
    this.setState({ ...this.state, passwordCfm });
  };

  photoURLHandler = photoURL => {
    this.setState({ ...this.state, photoURL });
  };

  stageHandler = registerStage => {
    this.setState({ ...this.state, registerStage });
    console.log(this.state);
  };

  // send new user data
  onSubmit = e => {
    const { navigate } = this.props.navigation;

    // create new user
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordCfm: this.state.passwordCfm,
      profilePic: this.state.photoURL
    };

    // include default photo for those who skipped the selection TODO
    if (newUser.profilePic === null) {
      newUser.profilePic = require("../../../assets/images/default-profile-pic.png");
    }

    // register user
    this.props.registerUser(newUser, this.props.history).then(res => {
      // login details
      const user = {
        email: newUser.email,
        password: newUser.password
      };

      // login user directly
      this.props.loginUser(user, this.props.history).then(res => {
        AsyncStorage.getItem("userToken").then(res => {
          // navigate user to Welcome page if no errors
          if (res !== null) {
            navigate("Welcome");
          }
        });
      });
    });
    // reset state
    this.state = initialState;
  };

  render() {
    return (
      <View style={styles.container}>
        {/* heading */}
        <Text style={styles.titleText}> Welcome, </Text>
        <Text style={styles.subTitleText}> Enter your details to signup. </Text>

        {/* main card view */}
        <View style={styles.card}>
          <RegisterManager
            registerStage={this.state.registerStage}
            nameHandler={this.nameHandler}
            emailHandler={this.emailHandler}
            passwordHandler={this.passwordHandler}
            passwordCfmHandler={this.passwordCfmHandler}
            photoURLHandler={this.photoURLHandler}
            stageHandler={this.stageHandler}
            name={this.state.name}
            email={this.state.email}
            password={this.state.password}
            passwordCfm={this.state.passwordCfm}
            photoURL={this.state.photoURL}
            onSubmit={this.onSubmit}
          />
        </View>
      </View>
    );
    // switch (this.state.registerStage) {
    //   // once registered
    //   case C.LAST_STAGE:
    //     return (
    //       <View style={styles.lastContainer}>
    //         {/* heading */}
    //         <CustomFontText style={styles.titleText}>All done!</CustomFontText>
    //         <CustomFontText style={styles.subTitleText}>
    //           Welcome {this.state.name}
    //         </CustomFontText>

    //         <Image
    //           style={styles.profilePic}
    //           source={{ uri: this.state.photoURL }}
    //         />
    //         {/* button to collection/group page */}
    //         {setToBottom(
    //           <View style={styles.bottom}>
    //             <MyButton
    //               text="Get Started"
    //               // onPress={{ navigate("App") }}    TODO add navigation and verification
    //             />
    //           </View>
    //         )}
    //       </View>
    //     );

    //   // register pages
    //   default:
    //     return (
    //       <View style={styles.container}>
    //         {/* heading */}
    //         <CustomFontText style={styles.titleText}> Welcome, </CustomFontText>
    //         <CustomFontText style={styles.subTitleText}>
    //           {" "}
    //           Enter your details to signup.{" "}
    //         </CustomFontText>

    //         {/* main card view */}
    //         <View style={styles.card}>
    //           <RegisterManager
    //             registerStage={this.state.registerStage}
    //             nameHandler={this.nameHandler}
    //             emailHandler={this.emailHandler}
    //             passwordHandler={this.passwordHandler}
    //             passwordCfmHandler={this.passwordCfmHandler}
    //             photoURLHandler={this.photoURLHandler}
    //             stageHandler={this.stageHandler}
    //             name={this.state.name}
    //             email={this.state.email}
    //             password={this.state.password}
    //             passwordCfm={this.state.passwordCfm}
    //             photoURL={this.state.photoURL}
    //           />
    //           {/* <CustomFontText style={styles.error}> {errors.passwordCfm} </CustomFontText> */}
    //         </View>
    //       </View>
    //     );
    // }
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
    marginLeft: wd(0.07),
    fontFamily: "HindSiliguri-Bold"
  },

  subTitleText: {
    fontSize: 25,
    marginBottom: 50,
    fontWeight: "bold",
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
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// export
export default connect(
  mapStateToProps,
  { registerUser, loginUser }
)(Register);
