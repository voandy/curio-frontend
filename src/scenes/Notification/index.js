import React, { Component } from "react";

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Text
} from "react-native";

import SimpleHeader from "../../component/SimpleHeader";
import CustomFontText from "../../utils/customFontText";

export default class Notification extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <SimpleHeader title="Notification" />

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {/* heading */}
          <CustomFontText style={styles.titleText}>NOTIFICATION</CustomFontText>
          <CustomFontText style={styles.titleText}>NOTIFICATION</CustomFontText>
          <CustomFontText style={styles.titleText}>NOTIFICATION</CustomFontText>
          <CustomFontText style={styles.titleText}>NOTIFICATION</CustomFontText>
          <CustomFontText style={styles.titleText}>NOTIFICATION</CustomFontText>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  titleText: {
    fontSize: 30,
    marginTop: 250,
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.07,
    fontFamily: "HindSiliguri-Bold"
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6E6E",
    width: Dimensions.get("window").width * 0.4,
    height: 50,
    margin: 10,
    borderRadius: 540,
    elevation: 3
  }
});
