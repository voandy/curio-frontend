import React, { Component } from "react";
import {
  StyleSheet, 
  TouchableOpacity,
  View,
  Text,
  Image
} from "react-native";
import { connect } from "react-redux";

// import reusable components
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

class Start extends Component {
  componentDidMount() {
    console.log("Start Page mounted! Font Loaded: " + this.props.fontLoaded);
  }

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
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
        <TouchableOpacity
          onPress={() => navigate("Login")}
          style={styles.loginButton}
        >
          <Text style={[styles.loginButtonText, styles.font]}>LOGIN</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <View style={styles.signupContainer}>
          <Text styles={styles.signupText}>Don't have account yet? </Text>
          <TouchableOpacity onPress={() => navigate("Register")}>
            <Text style={styles.signupTextButton}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// Connect to redux store
const mapStateToProps = state => ({
  // fontLoaded: state.fontLoader.fontLoaded
});

export default connect(
  mapStateToProps,
  null
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
    fontWeight: "bold"
  },

  imageStyle: {
    alignSelf: "center",
    width: wd(0.85),
    height: wd(0.85),
    resizeMode: "contain",
    marginTop: hp(0.03),
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
    fontSize: wd(0.035),
    fontWeight: "bold",
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
    fontWeight: "bold",
    color: "#FF6E6E",
    fontFamily: "HindSiliguri-Regular"
  },

  signupTextButton: {
    textDecorationLine: "underline"
  }
});
