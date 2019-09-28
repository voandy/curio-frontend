import React, { Component } from "react";
import {
    View,
    StyleSheet,
} from "react-native";

// responsive design component
import {
    deviceWidthDimension as wd
  } from "../utils/responsiveDesign";

class Line extends Component {

    render() {
        return (
            < View style={styles.line} />
        )
    }
}

const styles = StyleSheet.create({
    line: {
        borderBottomColor: "#939090",
        borderBottomWidth: 0.5,
        width: wd(0.85),
        alignSelf: "center"
    },
});

// export
export default Line;
