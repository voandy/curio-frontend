import React, { Component } from "react";
import { StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

/** loading modal screen overlay to proide feedback to users */
export default class ActivityLoaderModal extends Component {
  render() {
    return (
      <AnimatedLoader
        visible={this.props.loading}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1.5}
        loop={true}
        source={require("../../assets/animations/loading_animation.json")}
      ></AnimatedLoader>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 90,
    height: 90
  }
});
