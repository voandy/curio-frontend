import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

/**Simpler header design from Header
 * used in Notifications, Artefacts, profile page
 */
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
    height: 70,
    borderBottomColor: "black",
    borderRadius: 1,
  },

  headerText: {
    fontSize: 24,
    marginTop: 20,
    marginLeft: 30,
    fontFamily: "HindSiliguri-Bold"
  }
});

export default SimpleHeader;
