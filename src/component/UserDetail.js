import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
    TouchableOpacity
} from "react-native";

// custom responsive design component
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd,
} from "../utils/responsiveDesign"

class UserDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // TODO link to user profile
            // <TouchableOpacity onPress={} style={styles.container}>
            <TouchableOpacity style={styles.container}>
                <Image style={styles.photo} source={this.props.image} />

                {/* user details */}
                <View style={styles.userDetailPlaceholder}>
                    <View>
                        <Text style={styles.userName}>{this.props.userName}</Text>
                    </View>

                    <View>
                        {/* TODO set time dynamically */}
                        {/* <Text style={styles.timeTitle}> {Moment(dt).format("H")} hours ago </Text> */}
                        <Text style={styles.time}>7 hours ago</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: wd(0.06),
        alignItems: "center",
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.15,
    },

    photo: {
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        marginRight: wd(0.06),
    },

    userName: {
        fontFamily:"HindSiliguri-Bold",
    },

    time: {
        fontFamily:"HindSiliguri-Regular",
    },
});

// export
export default UserDetail;
