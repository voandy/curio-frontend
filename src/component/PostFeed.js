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
import UserDetail from "../../../component/UserDetail"
import Line from "../../../component/Line"

// custom responsive design component
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd,
    setToBottom
} from "../../../utils/responsiveDesign"

class PostFeed extends Component {

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.description}>
                    <UserDetail userName="this.props.userName" />

                    <Text style={[styles.font, styles.title]}></Text>
                </View>


                {/* image */}
                {/* <Image source={this.props.image} style={styles.image} /> */}
                <Image source={require("../../assets/images/test-delete-this/boi2.jpg")} style={styles.image} />
                
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
        marginVertical: wd(0.05)
    },

    font: {
        fontFamily: "HindSiliguri-Bold",
    },

    image: {
        width: wd(1),
    },

    likesIndicatorPlaceholder:{

    },

    likesPlaceholder:{

    },





});


// export 
export default PostFeed
