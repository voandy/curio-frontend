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
import { LikeButton, UnlikeButton } from "../component/LikeButton";
import CommentButton from "../component/CommentButton";

// custom responsive design component
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd,
} from "../utils/responsiveDesign"

/** artefacts feed posted in groups
 * used in selected groups page
*/
class PostFeed extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.description}>
                    <UserDetail userName={this.props.userName} image={this.props.profileImage} />
                    {/* ^ add time= props.time */}

                    <Text style={[styles.font, styles.title]}>{this.props.title}</Text>
                </View>


                {/* image */}
                {/* <TouchableOpacity onPress={this.props.onPress}> */}
                <TouchableOpacity>
                    <Image source={this.props.image} style={styles.image} />
                </TouchableOpacity>

                {/* likes/comments counters */}
                <View style={styles.likesIndicatorPlaceholder}>
                    <Text style={styles.indicator}>
                        {/* {likesCount} Likes • {commentsCount} Comments */}
                        5 Likes • 2 Comments
                    </Text>
                </View>

                {/* button */}
                <View style={styles.likesButtonPlaceholder}>
                    {/* Like button */}
                    <LikeButton />

                    {/* Comment button */}
                    <CommentButton />
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
        marginVertical: wd(0.02),
        backgroundColor: "white"
    },

    font: {
        fontFamily: "HindSiliguri-Regular",
    },

    description:{
        // backgroundColor:"red",
    },

    title: {
        marginBottom: wd(0.02)
    },

    image: {
        width: wd(1),
    },

    likesIndicatorPlaceholder: {
        width:wd(0.9),
        marginVertical: wd(0.03),
    },

    indicator: {
        fontFamily: "HindSiliguri-Regular",
        fontSize: 13,
        color: "#939090"
    },

    likesButtonPlaceholder: {
        flexDirection: "row",
        marginBottom: wd(0.03)
    },
});


// export 
export default PostFeed
