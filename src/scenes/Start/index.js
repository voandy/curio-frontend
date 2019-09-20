import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Animated
} from "react-native";

// import reusable components
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

export class Start extends Component {
  constructor(props) {
    super(props);
    this.fadeAnimation = new Animated.Value(0);
    this.slideAnimation = new Animated.ValueXY({ x: -wd(1), y: 0 });
  }

  componentDidMount() {
    this.props.logoutUser().then(res => console.log(res));
    Animated.timing(this.fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();

    Animated.spring(this.slideAnimation, {
      toValue: { x: 0, y: 0 },
      friction: 5
    }).start();
  }

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Animated.View
        style={[styles.container, { opacity: this.fadeAnimation }]}
      >
        {/* heading */}
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, styles.font]}>Hello there,</Text>
          <Text style={styles.titleText}>Welcome to Curio.</Text>
        </View>

        {/* start image */}
        <Image
          style={styles.imageStyle}
          source={require("../../../assets/images/welcome-start.png")}
        />

        {/* Login Button */}
        <Animated.View style={[this.slideAnimation.getLayout()]}>
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={styles.loginButton}
          >
            <Text style={[styles.loginButtonText, styles.font]}>LOGIN</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Register Button */}
        <View style={styles.signupContainer}>
          <Text styles={styles.signupText}>Don't have account yet? </Text>
          <TouchableOpacity onPress={() => navigate("Register")}>
            <Text style={styles.signupTextButton}>Create account</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(Start);

// Component Stylesheet Rules
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },

  font: {
    fontFamily: "HindSiliguri-Bold"
  },

  titleContainer: {
    alignSelf: "flex-start",
    marginLeft: wd(0.095),
    paddingTop: hp(0.13)
  },

  titleText: {
    fontSize: wd(0.08),
    paddingTop: wd(0.008),
    fontFamily: "HindSiliguri-Regular"
  },

  imageStyle: {
    alignSelf: "center",
    width: wd(0.85),
    height: wd(0.85),
    resizeMode: "contain",
    marginTop: hp(0.02),
    marginBottom: hp(0.01)
  },

  loginButton: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: wd(0.7),
    height: hp(0.065),
    borderRadius: 540,
    elevation: 7,
    marginTop: hp(0.065)
  },

  loginButtonText: {
    fontSize: wd(0.037),
    alignSelf: "center",
    color: "black"
  },

  signupContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: hp(0.02)
  },

  signupText: {
    fontSize: wd(0.035),
    color: "#FF6E6E",
    fontFamily: "HindSiliguri-Regular"
  },

  signupTextButton: {
    textDecorationLine: "underline",
    fontFamily: "HindSiliguri-Regular"
  }
});
