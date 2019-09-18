import { StyleSheet } from "react-native";
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

export default StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    padding: wd(0.05)
  },

  inputField: {
    textAlign: "center",
    width: wd(0.7),
    height: hp(0.05),
    marginTop: 20,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    fontSize: 16,
    alignSelf: "center"
  },

  inputText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: hp(0.026)
  },

  passwordTitle: {
    marginBottom: hp(0.024),
    fontSize: hp(0.025)
  },

  photoMainTitle: {
    fontWeight: "bold",
    fontSize: hp(0.028),
    marginBottom: hp(0.02)
  },

  photoSubTitle: {
    fontWeight: "bold",
    fontSize: hp(0.024)
  },

  passwordFieldTitle: {
    fontSize: hp(0.022),
    alignSelf: "flex-start",
    marginLeft: wd(0.015)
  },

  passwordField: {
    marginTop: hp(0.01),
    fontSize: hp(0.02),
    height: hp(0.03),
    marginBottom: hp(0.05)
  },

  profilePic: {
    marginTop: 30,
    width: wd(0.3),
    height: wd(0.3),
    alignSelf: "center"
  },

  profilePicBorder: {
    borderRadius: wd(0.3) / 2
  },

  buttom: {
    alignSelf: "center",
    flexDirection: "row",
    width: wd(0.7935),
    alignItems: "center",
    justifyContent: "space-between"
  },

  backButton: {
    fontSize: hp(0.021),
    alignSelf: "center",
    marginLeft: wd(0.03),
    textDecorationLine: "underline",
    color: "#FF6E6E",
    fontFamily: "HindSiliguri-Regular"
  },

  nextButton: {
    alignSelf: "flex-end"
  },

  error: {
    color: "red",
    alignSelf: "center"
  }
});
