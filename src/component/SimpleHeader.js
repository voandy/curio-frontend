import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

class SimpleHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        {/* header text */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    borderBottomColor: "black",
    borderRadius: 1,
  },

  headerText: {
    fontSize: 24,
    marginTop: 40,
    marginLeft: 30,
    fontFamily: "HindSiliguri-Bold"
  }
});

export default SimpleHeader;
