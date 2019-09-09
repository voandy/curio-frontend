import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  View,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

import { registerUser } from "../../actions/authActions";
import RegisterManager from "./registerManager";
import { C } from "../../actions/registerTypes";
import MyButton from "../../component/MyButton";
import * as Font from 'expo-font';

// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";




class Register extends Component {
  
  state = {
    registerStage: C.GET_NAME,
    name: "",
    email: "",
    password: "",
    passwordCfm: "",    // DO NOT SEND THIS AFTER REGISTRATION
    photoURL: null,
  };

  constructor() {
    super();
  }

  // nav details
  static navigationOptions = {
    headerStyle: {
      elevation: 0, // remove shadow on Android
    },
  }

  async componentDidMount() {
    // font
    await Font.loadAsync({
        'HindSiliguri-Bold': require('../../../assets/fonts/HindSiliguri-Bold.ttf'),
        'HindSiliguri-Regular': require('../../../assets/fonts/HindSiliguri-Regular.ttf'),
    });
  }

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
  onSubmit = (e) => {

    const { navigate } = this.props.navigation;

    // create new user
    const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordCfm: this.state.passwordCfm,
        profilePic: this.state.photoURL,    // use "profilePic" as the default naming? since the photos in it is already named this way
    };

    // include default photo for those who skipped the selection TODO
    // if(newUser.profilePic === null){
    //   newUser.profilePic = require("../../../assets/images/default-profile-pic.png")
    // }
    
    this.props.registerUser(newUser, this.props.history)
      .then(res => {
        console.log(res);
        if (Object.keys(this.state.errors).length === 0) {
          // go to different screen and reset state
          navigate("Welcome")
          this.state = initialState;
        }
      });
  }

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
              />
              {/* <Text style={styles.error}> {errors.passwordCfm} </Text> */}
            </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: wd(0.07),
    fontFamily: 'HindSiliguri-Bold'
  },

  subTitleText: {
    fontSize: 25,
    marginBottom: 50,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: wd(0.07),
    fontFamily: 'HindSiliguri-Bold'
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

  lastContainer:{
    flex: 1,
    alignItems: "center",
  },

  profilePic: {
    marginTop: 40,
    width: wd(0.4),
    height: wd(0.4),
    alignSelf: 'center',
    borderRadius: wd(0.4)/2,
  },

  bottom: {
    width: wd(0.8),
    height: wd(0.3),
    alignItems: "flex-end",
  },  
});

Register.propTypes = {
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
  { registerUser }
)(Register);


