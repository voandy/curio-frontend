import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { connect } from "react-redux";
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";
import CustomFontText from "../../utils/customFontText";

class Start extends Component {
  componentDidMount() {
    console.log("Start here! Font Loaded: " + this.props.fontLoader.fontLoaded);
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
          <CustomFontText style={[styles.titleText, styles.font]}>
            Hello there,
          </CustomFontText>
          <CustomFontText style={styles.titleText}>
            Welcome to Curio.
          </CustomFontText>
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
          <CustomFontText style={[styles.loginButtonText, styles.font]}>
            LOGIN
          </CustomFontText>
        </TouchableOpacity>

        {/* Register Button */}
        <View style={styles.signupContainer}>
          <CustomFontText styles={styles.signupText}>
            Don't have account yet?{" "}
          </CustomFontText>
          <TouchableOpacity onPress={() => navigate("Register")}>
            <CustomFontText style={styles.signupTextButton}>
              Create account
            </CustomFontText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  fontLoader: state.fontLoader
});

export default connect(
  mapStateToProps,
  null
)(Start);

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
    // textShadowColor: "rgba(0, 0, 0, 0.13)",
    // textShadowOffset: { width: 0, height: 3 },
    // textShadowRadius: 40,
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
