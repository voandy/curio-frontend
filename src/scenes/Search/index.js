import React, { Component } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  StatusBar
} from "react-native";

// Custom component
import SearchFeed from "../../component/SearchFeed";
import Header from "../../component/Header";

// import width/height responsive functions
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd
  } from "../../utils/responsiveDesign";

export default class Search extends Component {

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  render() {

    // navigation in app
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header tab1="Users" tab2="Groups"/>

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >

            <SearchFeed heading="Bob" subHeading="bob" isGroup={false}
                image={require("../../../assets/images/test-delete-this/boi1.jpg")}/>
            <SearchFeed heading="Sarah" subHeading="sarahLeee" isGroup={false}
                image={require("../../../assets/images/test-delete-this/boi2.jpg")}/>
            <SearchFeed heading="MEME LEGEND" subHeading="5" isGroup={true}
                image={require("../../../assets/images/test-delete-this/boi4.jpg")}/>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
});
