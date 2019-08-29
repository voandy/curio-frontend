import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text
} from "react-native";

export default class Start extends Component {
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
          <Text style={styles.titleText}>Hello there, </Text>
          <Text style={styles.titleText}>Welcome to Curio. </Text>
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
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <View style={styles.signupContainer}>
          <Text styles={styles.signupText}>Don't have account yet? </Text>
          <TouchableOpacity onPress={() => navigate("Register")}>
            <Text style={styles.signupTextButton}>Create account</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          onPress={() => navigate("Register")}
          style={[styles.button, styles.buttonSignUp]}
        >
          <Text style={[styles.buttonText, styles.buttonTextSignUp]}>
            SIGN UP
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },

  titleContainer: {
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.095,
    paddingTop: Dimensions.get("window").height * 0.13
  },

  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    paddingTop: Dimensions.get("window").width * 0.008,
    textShadowColor: "rgba(0, 0, 0, 0.08)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 40
    // fontFamily: 'HindSiliguri-Bold'
  },

  imageStyle: {
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.85,
    resizeMode: "contain",
    marginTop: Dimensions.get("window").height * 0.03,
    marginBottom: 10
  },

  loginButton: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").height * 0.065,
    borderRadius: 540,
    elevation: 6,
    marginTop: Dimensions.get("window").height * 0.065
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    color: "black"
    // fontFamily: 'HindSiliguri-Regular'
  },

  signupContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: Dimensions.get("window").height * 0.02
  },

  signupText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6E6E"
    // fontFamily: 'HindSiliguri-Regular'
  },

  signupTextButton: {
    textDecorationLine: "underline"
  }
});
