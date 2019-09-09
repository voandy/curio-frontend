import { Text } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native-animatable";

class CustomFontText extends Component {
  loadCustomFontText() {
    if (this.props.fontLoaded) {
      return <Text style={this.props.style}>{this.props.children}</Text>;
    } else {
      return <View></View>;
    }
  }
  render() {
    return this.loadCustomFontText();
  }
}

const mapStateToProps = state => ({
  fontLoaded: state.fontLoader.fontLoaded
});

export default connect(
  mapStateToProps,
  {}
)(CustomFontText);
