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
    setToBottom
} from "../utils/responsiveDesign"

class CardGroup extends Component {

    // get height of group image, and dynamically adjust it
    changeHeight() {
        // Image.getSize(this.props.image, (width, height) => {this.setState({width, height})});
    }

    render() {

        return (
            <View style={styles.card}>

                <TouchableOpacity>
                    {/* Image  */}
                    <View style={styles.picPlaceholder}>
                        <Image style={[styles.photo]} source={this.props.image} />
                    </View>
                    <View style={styles.textPlaceholder}>
                        {/* CHANGE TO FIT USER DB model (ie. this.props.user.text or something) */}
                        <Text style={[styles.title, styles.font]}>{this.props.text}</Text>

                        {/* <Image style={styles.user} source={this.props.userPic}/> */}
                        <View style={styles.userProfile}>
                            <Image style={styles.userProfilePic} source={require("../../assets/images/default-profile-pic.png")} />
                            <Text style={[styles.userName, styles.font]}>{this.props.userName}</Text>
                        </View>


                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get("window").width * 0.43,
        marginVertical: 10,
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
        width: Dimensions.get("window").width * 0.425,
        height: wd(0.35),
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
