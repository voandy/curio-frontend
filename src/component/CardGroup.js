import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    Alert,
    Image,
    TouchableOpacity
} from "react-native";

// custom responsive design component
import {
    deviceWidthDimension as wd,
} from "../utils/responsiveDesign"

/**groups shown in a card form in groups page */
class CardGroup extends Component {

    state = {
        favourite: false,
        key: this.props.key
    }

    changeFavourite = () => {
        this.setState({
            favourite: !this.state.favourite
        })
    }

    // alert prompt to pin or unpin groups
    showAlert = () => {
        let message = ""

        if(this.state.favourite == false){
            message="Do you want to pin this group?"
        }else{
            message="Do you want to unpin this group?"
        }

        Alert.alert(
            message,
            "",
            [
                { text: "Cancel", onPress: null },
                { text: "Yes", onPress: () => this.changeFavourite() },
            ],
            { cancelable: false },
        );
    }

    render() {

        return (
            <View style={styles.card}>

                <View style={{ position: "absolute", top: 5, right: 5, elevation: 2 }} >

                    {this.state.favourite === true ? (
                        <Image source={require("../../assets/images/icons/favourite.png")} />
                    ) : (
                            <Image source={require("../../assets/images/icons/unfavourite.png")} />
                        )}
                </View>

                {/* <TouchableOpacity onPress={this.props.onPress(this.props.groupId)}> */}
                <TouchableOpacity 
                    onLongPress={() => this.showAlert()}
                    onPress={this.props.onPress}>
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
        borderWidth: 1,
        borderColor: "#E2E2E2",
        alignContent: "center",
        alignItems: "center",
    },

    font: {
        fontFamily: "HindSiliguri-Regular",
    },

    picPlaceholder: {
        flex: 0.7,
        alignItems: "center",
        justifyContent: "center",
    },

    photo: {
        width: wd(0.44),
        height: wd(0.37),
        marginTop: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    textPlaceholder: {
        flex: 0.3,
        justifyContent: "center"
    },

    title: {
        // flex: 0.4,
        marginHorizontal: 5,
        marginTop: 3,
        fontSize: wd(0.035)
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

    userName: {
        color: "#939090"
    }
});

export default CardGroup;
