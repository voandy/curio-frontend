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

/** touchable user detail that would link to the user's profile
 *  used in comments, artefact feed in groups and selcted artefacts
 */
class UserDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>

                {/* user profile pic */}
                <TouchableOpacity>
                    {/* TODO: LINK TO PROFILE */}
                    <Image style={styles.userProfilePic} source={this.props.userProfilePic} />
                </TouchableOpacity>

                {/* comment bubble */}
                <View style={styles.bubble}>
                    <View style={styles.user}>

                        <TouchableOpacity style={{ flex: 0.65 }}>
                            {/* TODO: LINK TO PROFILE */}
                            <Text style={styles.userName}>{this.props.userName}</Text>
                        </TouchableOpacity>
                        <Text style={styles.time}>{this.props.time}</Text>
                    </View>

                    <Text style={styles.comment}>{this.props.comment}</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: wd(0.03),
        flexDirection: "row",
        width: Dimensions.get('window').width,
    },

    userProfilePic: {
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        marginLeft: wd(0.06),
        marginRight: wd(0.03),
    },

    bubble: {
        width: Dimensions.get('window').width * 0.77,
        backgroundColor: "#E0E0E0",
        borderRadius: 10,
        alignContent: "center"
    },

    user: {
        width: Dimensions.get('window').width * 0.77,
        flexDirection: "row",
        marginVertical: wd(0.01),
        marginHorizontal: wd(0.03)
    },

    userName: {
        fontFamily: "HindSiliguri-Bold",
    },

    time: {
        fontFamily: "HindSiliguri-Regular",
        flex: 0.35,
    },

    comment: {
        fontFamily: "HindSiliguri-Regular",
        alignContent: "center",
        marginVertical: wd(0.01),
        marginHorizontal: wd(0.03)
    },
});


// export
export default UserDetail;