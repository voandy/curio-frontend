import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Image
} from "react-native";

import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd
} from "../utils/responsiveDesign";


// used for the bottom part of artefact post
// used in files - selectedArtefact & PostFeed
class LikeAndCommentTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View style={styles.container} >
                < View style={styles.likesIndicatorPlaceholder} >
                    <Text style={styles.indicator}>
                        {likesCount} Likes {commentsCount} Comments
            </Text>
                </View >

                {/* button */}
                < View style={styles.likesButtonPlaceholder} >
                    {/* Like button */}
                    {likeUnlike}

                    {/* Comment button */}
                    <CommentButton />
                </View >
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1
    },
    

});

export default LikeAndCommentTab;
