import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
} from "react-native";

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
        borderBottomWidth: 0.7,
        width: Dimensions.get("window").width * 0.9,
        alignSelf: "center"
    },
});

// export
export default Line;
