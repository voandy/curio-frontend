import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

import CardCarousel from "../../component/CardCarousel";
import * as Font from 'expo-font';

class Mine extends Component {

  componentDidMount() {
    // font
    Font.loadAsync({
        'HindSiliguri-Bold': require('../../../assets/fonts/HindSiliguri-Bold.ttf'),
        'HindSiliguri-Regular': require('../../../assets/fonts/HindSiliguri-Regular.ttf'),
    });
  }

  render() {
    return (
      <View style={styles.container}>

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <Text style={styles.titleText}>MINE</Text>
          <Text style={styles.titleText}>MINE</Text>
          <Text style={styles.titleText}>MINE</Text>
          <Text style={styles.titleText}>MINE</Text>
          <Text style={styles.titleText}>MINE</Text>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    height: 130,
    elevation: 2,
    borderRadius: 1
  },

  headerText: {
    fontSize: 24,
    marginTop: 40,
    marginLeft: 30,
    fontWeight: "bold"
  },

  headerButton: {
    alignContent: "center",
    marginTop: 20,
    marginLeft: 30,
    padding: 5,
    borderColor: "#FF6E6E",
    borderWidth: 0,
    borderBottomWidth: 3,
    justifyContent: "center"
  },

  headerButtonText: {
    fontSize: 18,
    fontWeight: "bold"
  },

  mainGroupContainer: {
    height: Dimensions.get("window").height * 0.3,
    top: 0,
    position: "absolute",
    backgroundColor: "#E2E2E2"
  },

  titleText: {
    fontSize: 30,
    marginTop: 100,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Dimensions.get("window").width * 0.07,
    fontFamily: 'HindSiliguri-Bold'
  }
});

//  export
export default Mine
