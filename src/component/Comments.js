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
            <View style={styles.container}>
                {/* <Text style={ styles.comment }>{this.props.comment}</Text> */}
                <Text style={styles.comment}>Omaewa Mo shindeiru</Text>

                {/* TODO add link to user profile */}
                <TouchableOpacity>
                    <View style={styles.user}>
                        <Image style={styles.photo} source={this.props.image} />
                        <Text style={styles.userName}>{this.props.userName}</Text>
                        <Text style={styles.time}>{this.props.time}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.line} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: wd(0.05),
        // alignItems: "center",
        width: Dimensions.get('window').width * 0.8,
        height: wd(0.24),
    },

    comment: {
        fontFamily: "HindSiliguri-Regular",
        width: Dimensions.get('window').width * 0.8,
        alignContent: "center",
        height: wd(0.1),
        marginTop: wd(0.02),
    },

    user: {
        height: wd(0.1),
        flexDirection: "row",
        alignItems: "center",
        marginBottom: wd(0.02)
    },

    photo: {
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        marginRight: wd(0.03),
    },

    userName: {
        fontFamily: "HindSiliguri-Bold",
        flex: 0.95,
    },

    time: {
        fontFamily: "HindSiliguri-Regular",
    },

    // this line is different from the "line component"
    line: {
        borderBottomColor: "#939090",
        borderBottomWidth: 0.2,
        width: Dimensions.get("window").width * 0.95,
        alignSelf: "center"
    }
});


// export
export default UserDetail;