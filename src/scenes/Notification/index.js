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

// Custom component
import SimpleHeader from "../../component/SimpleHeader";
import NotificationFeed from "../../component/NotificationFeed"

const jon = "John snow is not Jon snow, so he knows something";
const varys = "botak dude that is sometimes a traitor";
const tormund = "WILD ONE";
const tyrion = "drunk as always";
const joffrey = "deserved to die, was a pleasure to watch him chock to his death XD";


export default class Notification extends Component {

  render() {

    // date format
    // const dt = this.state.userData.dateJoined;

    // navigation in app
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <SimpleHeader title="Notification" />

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >

          <NotificationFeed name={"jon "} text={jon} image={require("../../../assets/images/default-profile-pic.png")} />
          <NotificationFeed name={"varys "} text={varys} image={require("../../../assets/images/default-profile-pic.png")} />
          <NotificationFeed name={"tormund "} text={tormund} image={require("../../../assets/images/default-profile-pic.png")} />
          <NotificationFeed name={"tyrion "} text={tyrion} image={require("../../../assets/images/default-profile-pic.png")} />
          <NotificationFeed name={"joffrey "} text={joffrey} image={require("../../../assets/images/default-profile-pic.png")} />
          <NotificationFeed name={"tyrion "} text={tyrion} image={require("../../../assets/images/default-profile-pic.png")} />
          <NotificationFeed name={"joffrey "} text={joffrey} image={require("../../../assets/images/default-profile-pic.png")} />
          <NotificationFeed name={"tyrion "} text={tyrion} image={require("../../../assets/images/default-profile-pic.png")} />


          {/* no more notifications ! */}
          <Text style={{ alignSelf: "center", justifyContent: "center", marginVertical: 40 }}>  Hooray no more notifications </Text>
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
