import React from "react";
import { View, Dimensions, StatusBar, StyleSheet } from "react-native";

// height of device by percentage
export const deviceHeigthDimension = percentage => {
  return Dimensions.get("window").height * percentage;
};

// width of device by percentage
export const deviceWidthDimension = percentage => {
  return Dimensions.get("window").width * percentage;
};

// Reusable CSS rule that set a component at the bottom right of the screen
export const setToBottom = component => {
  return (
    <View style={styles.container}>{component}</View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
});
