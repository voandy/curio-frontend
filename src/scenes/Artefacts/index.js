import React, { Component } from "react";

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text
} from "react-native";

//  custom components
import Header from "../../component/Header";
import ArtefactsFeed from "../../component/ArtefactFeed";
import CustomFontText from "../../utils/customFontText";

export default class Artefacts extends Component {
  render() {
    // navigate to different individual artefacts
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header title="Artefacts" tab1="All" tab2="Mine" />

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <View style={styles.feed}>
            <ArtefactsFeed
              image={require("../../../assets/images/default-profile-pic.png")}
            />
            <ArtefactsFeed
              image={require("../../../assets/images/default-profile-pic.png")}
            />
            <ArtefactsFeed
              image={require("../../../assets/images/default-profile-pic.png")}
            />
          </View>
          <View style={styles.feed}>
            <ArtefactsFeed
              image={require("../../../assets/images/default-profile-pic.png")}
            />
            <ArtefactsFeed
              image={require("../../../assets/images/default-profile-pic.png")}
            />
            <ArtefactsFeed
              image={require("../../../assets/images/default-profile-pic.png")}
            />
          </View>
          <View style={styles.feed}>
            <ArtefactsFeed
              image={require("../../../assets/images/default-profile-pic.png")}
            />
            <ArtefactsFeed
              image={require("../../../assets/images/default-profile-pic.png")}
            />
            <ArtefactsFeed
              image={require("../../../assets/images/default-profile-pic.png")}
            />
          </View>

          <CustomFontText style={styles.titleText}>ARTEFACTS</CustomFontText>
          <CustomFontText style={styles.titleText}>ARTEFACTS</CustomFontText>
          <CustomFontText style={styles.titleText}>ARTEFACTS</CustomFontText>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  feed: {
    flexDirection: "row",
    marginLeft: Dimensions.get("window").width * 0.032,
    marginRight: Dimensions.get("window").width * 0.032
  },

  titleText: {
    fontSize: 30,
    marginTop: 250,
    fontWeight: "bold",
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
