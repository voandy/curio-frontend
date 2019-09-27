import React, { Component } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";

// custom responsive design component
import {
    deviceWidthDimension as wd,
} from "../utils/responsiveDesign"


/**used for showing circular user icons
 * used in groups, comments artefacts etc */
class UserIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // TODO link to user profile
            // <TouchableOpacity onPress={} style={styles.container}>
            <TouchableOpacity style={styles.container}>
                <Image style={styles.photo} source={this.props.image} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: wd(0.005),
        alignItems: "center",
        width: wd(0.1),
        height: wd(0.1),
    },

    photo: {
        borderRadius: wd(0.1) / 2,
        width: wd(0.1),
        height: wd(0.1),
        marginRight: wd(0.06),
    },
});

// export
export default UserIcon;
