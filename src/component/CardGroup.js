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
    deviceWidthDimension as wd,
} from "../utils/responsiveDesign"

/**groups shown in a card form in groups page */
class CardGroup extends Component {

    render() {

        return (
            <View style={styles.card}>

                <TouchableOpacity onPress={this.props.onPress(this.props.groupId)}>
                    {/* Image  */}
                    <View style={styles.picPlaceholder}>
                        <Image style={[styles.photo]} source={this.props.image} />
                    </View>
                    <View style={styles.textPlaceholder}>
                        {/* CHANGE TO FIT USER DB model (ie. this.props.user.text or something) */}
                        <Text style={[styles.title, styles.font]}>{this.props.text}</Text>

                        {/* <Image style={styles.user} source={this.props.userPic}/> */}
                        {/* <View style={styles.userProfile}>
                            <Image style={styles.userProfilePic} source={require("../../assets/images/default-profile-pic.png")} />
                            <Text style={[styles.userName, styles.font]}>{this.props.userName}</Text>
                        </View> */}

                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: wd(0.44),
        marginTop: 10,
        marginLeft: wd(0.04),
        height: wd(0.5),
        borderRadius: 15,
        borderWidth: 0.05,
        elevation: 1,
        borderColor: "#E2E2E2",
        alignContent: "center",
        alignItems: "center",
    },

    font:{
        fontFamily: "HindSiliguri-Regular"
    },

    picPlaceholder: {
        flex: 0.7,
        alignItems: "center",
        justifyContent: "center",
    },

    photo: {
        width: wd(0.435),
        height: wd(0.35),
        marginTop: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    textPlaceholder: {
        flex: 0.3,
        margin: 5,
    },

    title: {
        flex: 0.4,
        marginHorizontal: 5,
        marginTop: 3,
    },

    userProfile: {
        flex: 0.6,
        flexDirection: "row",
        alignItems: "center"
    },

    userProfilePic: {
        width: wd(0.07),
        height: wd(0.07),
        marginHorizontal: 5
    },

    userName:{
        color: "#939090"
    }
});

export default CardGroup;
