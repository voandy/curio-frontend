import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    Picker,
    Dimensions,
    TouchableOpacity
} from "react-native";

import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd
} from "../utils/responsiveDesign";

class OptionButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>console.log("hue")} style={styles.button}>
                {/* options icon */}
                <Image style={styles.icon} source={require("../../assets/images/icons/option.png")} />

                {/* dropdown menu */}
                {/* TODO */}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
        marginTop: wd(0.02),
        width: wd(0.1),
        height: wd(0.1),
        position: "absolute",
        right: wd(0.01)
    },

    icon: {
        width: wd(0.04),
        height: wd(0.04)
    }
});

export default OptionButton;
