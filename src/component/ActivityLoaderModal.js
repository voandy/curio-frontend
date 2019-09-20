import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

export default class ActivityLoaderModal extends Component {
  rendersLoading() {
    if (this.props.loading) {
      return (
        <View style={[styles.modalBackground, { visible: this.props.loading }]}>
          <View style={styles.activityIndicatorWrapper}>
            <AnimatedLoader
              visible={this.props.loading}
              overlayColor="rgba(255,255,255,0)"
              animationStyle={styles.lottie}
              speed={1.5}
              loop={true}
              source={require("../../assets/animations/loading_animation.json")}
            />
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  render() {
    return this.rendersLoading();
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#00000040",
    height: hp(2),
    width: wd(2),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 9999,
    elevation: 50
  },

  activityIndicatorWrapper: {
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    borderRadius: 60
  },

  lottie: {
    alignSelf: "center",
    top: 11,
    width: 90,
    height: 90
  }
});
