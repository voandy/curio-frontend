import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity
} from "react-native";

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        {/* header text */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headerText}> {this.props.title} </Text>
        </View>

        {/* header tab */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            // onPress
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}> {this.props.tab1} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}> {this.props.tab2} </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 130,
    elevation: 2,
    borderBottomColor: "black",
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
  }
});

export default Header;
