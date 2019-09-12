import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';

// custom responsive design component
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd,
    setToBottom
} from "../utils/responsiveDesign"

class NotificationFeed extends Component {

    render() {
        return (
            <View style={styles.card}>

                {/* TODO ADD BELOW ===>   onPress={ () => this.props.func() } */}
                <TouchableOpacity activeOpacity={0.5}>

                    <View style={styles.card}>
                        {/* Image  */}
                        <View style={styles.picPlaceholder}>
                            <Image style={styles.photo} source={this.props.image} />
                        </View>

                        {/* Notification */}
                        <View style={ styles.notificationPlaceholder }>
                            <View >
                                <Text style={ styles.title }>{this.props.text}</Text>
                            </View>

                            <View style={{ alignContent:"flex-end" ,backgroundColor: "red" }}>
                                <Text style={ styles.time }> 16 hours ago </Text>
                            </View>
                        </View>
                    </View>

                    {/* line separator */}
                    <View style={styles.line} />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    card: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: 100,
        flexDirection: "row",
        alignItems: "center",
    },

    picPlaceholder: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: wd(0.03),
        backgroundColor: "blue"
    },

    photo: {
        width: Dimensions.get('window').width * 0.17,
        height: Dimensions.get('window').width * 0.17,
    },

    notificationPlaceholder: {
        width: Dimensions.get('window').width * 0.8,
    },

    title: {
        fontFamily: "HindSiliguri-Bold",
        paddingHorizontal: wd(0.03),
    },

    time: {
        fontFamily: "HindSiliguri-Regular",
        paddingHorizontal: wd(0.03)
    },

    line: {
        borderBottomColor: "#939090",
        borderBottomWidth: 0.4,
        width: Dimensions.get("window").width * 0.9,
        alignSelf: "center"
    },
})

//  export
export default NotificationFeed;