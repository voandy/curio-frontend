import React, { Component } from "react";
import {
    StyleSheet,
} from "react-native";
import OptionsMenu from "react-native-options-menu";

import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd
} from "../utils/responsiveDesign";


/**3 dot button, that shows a dropdown menu
 * used in selected artefacts page to "edit" or "delete" the artefact
 */
class OptionButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <OptionsMenu
            button={require("../../assets/images/icons/option.png")}
            buttonStyle = {styles.icon}
            destructiveIndex={1}            // only on ios (red indicator)
            options={[this.props.firstOption, this.props.secondOption]}
            actions={[this.props.toggleFirstOption, this.props.toggleSecondOption]}
        />
        );
    }
}

const styles = StyleSheet.create({

    icon: {
        width: wd(0.04),
        height: wd(0.04),
        marginVertical: wd(0.05),
        resizeMode: "contain",
    }
});

export default OptionButton;
