import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text
} from "react-native";
import * as Font from 'expo-font';


export default class Start extends Component {
  // Nav bar details
  static navigationOptions = {
    header: null
  }

  async componentDidMount() {
    // font
    await Font.loadAsync({
        'HindSiliguri-Bold': require('../../../assets/fonts/HindSiliguri-Bold.ttf'),
        'HindSiliguri-Regular': require('../../../assets/fonts/HindSiliguri-Regular.ttf'),
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/* heading */}
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, styles.font]}>Hello there, </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },

  font: {
    fontFamily: "HindSiliguri-Bold",
  },

  titleContainer: {
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.095,
    paddingTop: Dimensions.get("window").height * 0.13
  },

  titleText: {
    fontSize: Dimensions.get("window").width * 0.08,
    paddingTop: Dimensions.get("window").width * 0.008,
    textShadowColor: "rgba(0, 0, 0, 0.13)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 40,
    fontWeight: "bold",
  },

  imageStyle: {
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.85,
    resizeMode: "contain",
    marginTop: Dimensions.get("window").height * 0.03,
    marginBottom: Dimensions.get("window").height * 0.01
  },

  loginButton: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").height * 0.065,
    borderRadius: 540,
    elevation: 7,
    marginTop: Dimensions.get("window").height * 0.065
  },

  loginButtonText: {
    fontSize: Dimensions.get("window").width * 0.035,
    fontWeight: "bold",
    alignSelf: "center",
    color: "black",
  },

  signupContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: Dimensions.get("window").height * 0.02
  },

  signupText: {
    fontSize: Dimensions.get("window").width * 0.035,
    fontWeight: "bold",
    color: "#FF6E6E",
    fontFamily: 'HindSiliguri-Regular'
  },

  signupTextButton: {
    textDecorationLine: "underline"
  }
});