import React, { Component } from "react";

import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    View,
    Image,
    Text
} from "react-native";


// custom component
import UserDetail from "../component/UserDetail"
import Line from "../component/Line"

// custom responsive design component
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd,
    setToBottom
} from "../../src/utils/responsiveDesign"


class PostFeed extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.description}>
                    <UserDetail userName={this.props.userName} image={this.props.image} />
                    {/* ^ add time= props.time */}

                    <Text style={[styles.font, styles.title]}>{this.props.title}</Text>
                </View>


                {/* image */}
                {/* <TouchableOpacity onPress={this.props.onPress}> */}
                <TouchableOpacity>
                    <Image source={this.props.image} style={styles.image} />
                </TouchableOpacity>

                {/* likes and comments */}
                <View style={styles.likesIndicatorPlaceholder}>


                    <View style={styles.likesPlaceholder}>

                    </View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: wd(0.05),
        backgroundColor: "white"
    },

    font: {
        fontFamily: "HindSiliguri-Regular",
    },

    title: {
        marginHorizontal: wd(0.05),
        marginBottom: wd(0.02)
    },

    image: {
        width: wd(1),
    },

    likesIndicatorPlaceholder: {

    },

    likesPlaceholder: {

    },





});


// export 
export default PostFeed
