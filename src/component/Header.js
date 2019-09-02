import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import * as Font from 'expo-font';


class Header extends Component {

  async componentDidMount() {
    // font
    await Font.loadAsync({
        'HindSiliguri-Bold': require('../../assets/fonts/HindSiliguri-Bold.ttf'),
        'HindSiliguri-Regular': require('../../assets/fonts/HindSiliguri-Regular.ttf'),
    });
  }

  render() {
    return (
      <View style={styles.header}>
        {/* header text */}
        <View>
          <Text style={[styles.headerText, styles.font]}> {this.props.title} </Text>
        </View>

        {/* header tab */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            // onPress
            style={styles.headerButton}
          >
            <Text style={[styles.headerButtonText, styles.font]}> {this.props.tab1} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress
            style={styles.headerButton}
          >
            <Text style={[styles.headerButtonText, styles.font]}> {this.props.tab2} </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  font: {
    fontFamily: "HindSiliguri-Bold",
  },

  header: {
    height: 130,
    // elevation: 2,
    // borderBottomColor: "black",
    // borderRadius: 1
  },

  headerText: {
    fontSize: 24,
    marginTop: 40,
    marginLeft: 30,
  },

  headerButton: {
    alignContent: "center",
    marginTop: 10,
    marginLeft: 30,
    borderColor: "#FF6E6E",
    borderWidth: 0,
    borderBottomWidth: 3,
    justifyContent: "center"
  },

  headerButtonText: {
    fontSize: 18,
  }
});

export default Header;
