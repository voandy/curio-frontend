import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StyleSheet,
  Text
} from "react-native";

import { registerUser } from "../../actions/authActions";
import RegisterManager from "./registerManager";
import { C } from "../../actions/registerTypes";
import * as Font from 'expo-font';

// import widht/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

class Register extends Component {
  
  state = {
    registerStage: C.GET_NAME,
    name: "",
    email: "",
    password: "",
    photoURL: ""
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

  nameHandler = name => {
    this.setState({ ...this.state, name });
  };

  emailHandler = email => {
    this.setState({ ...this.state, email });
  };

  passwordHandler = password => {
    this.setState({ ...this.state, password });
  };

  photoURLHandler = photoURL => {
    this.setState({ ...this.state, photoURL });
  };

  stageHandler = registerStage => {
    this.setState({ ...this.state, registerStage });
    console.log(this.state);
  };



  // // show profile picture
  // renderProfile() {
  //   const { photo } = this.state;

  //   // photo selected
  //   if (this.state.photo) {
  //     return <Image source={{ uri: photo.uri }} style={styles.photo} />;
  //   }
  //   // default pic
  //   else {
  //     return (
  //       <Image
  //         source={require("../../../assets/images/default-profile-pic.png")}
  //         style={styles.photo}
  //       />
  //     );
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors
  //     });
  //   }
  // }

  // onChangeText = (key, val) => {
  //   this.setState({
  //     [key]: val,
  //     errors: {}
  //   });
  // };

  // // send new user data
  // onSubmit = () => {
  //   const { stage } = this.state.stage;
  //   if (stage < 4) {
  //     this.setState({
  //       ...state,
  //       stage: stage + 1
  //     });
  //   } else {
  //     const { navigate } = this.props.navigation;

  //     // create new user
  //     const newUser = {
  //       name: this.state.name,
  //       email: this.state.email,
  //       password: this.state.password,
  //       passwordCfm: this.state.passwordCfm
  //     };

  //     this.props.registerUser(newUser, this.props.history).then(res => {
  //       if (Object.keys(this.state.errors).length === 0) {
  //         navigate("Login");
  //         this.state = initialState;
  //       }
  //     });
  //   }
  // };

  // nextPage() {
  //   this.setState.stage = 1;
  //   console.log(this.state.stage);
  // }

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
            photoURLHandler={this.photoURLHandler}
            stageHandler={this.stageHandler}
          />
          {/* <Text style={styles.error}> {errors.passwordCfm} </Text> */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

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
  }
});

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
