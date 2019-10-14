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
import UserDetail from "../component/UserDetail";
import { LikeButton, UnlikeButton } from "../component/LikeButton";
import CommentButton from "../component/CommentButton";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

/** artefacts feed posted in groups
 * used in selected groups page
 */
class PostFeed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //prettier-ignore
    return (
      //   main container
      <View style={styles.container}>
          
        {/* artefact post description */}
        <View style={styles.description}>
          {/* show user details */}
          <UserDetail
            userName={this.props.userName}
            image={this.props.profileImage}
            dateAdded={this.props.dateAdded}
          />
          {/* post title */}
          <Text style={[styles.font, styles.title]}>{this.props.title}</Text>
        </View>

        {/* post image */}
        <TouchableOpacity onPress={() => this.props.onPress(this.props.artefactId)}>
          <Image 
            source={this.props.image} 
            style={styles.image} 
            resizeMethod="resize"      
            resizeMode="cover" 
          />
        </TouchableOpacity>

        {/* likes/comments counters */}
        <View style={styles.likesIndicatorPlaceholder}>
          <Text style={styles.indicator}>
            {this.props.likesCount} Likes • {this.props.commentsCount} Comments
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
    fontFamily: "HindSiliguri-Regular"
  },

  description: {
    // backgroundColor:"red",
  },

  title: {
    marginBottom: wd(0.02)
  },

  image: {
    width: wd(1),
    height: wd(1)
  },

  likesIndicatorPlaceholder: {
    width: wd(0.9),
    marginVertical: wd(0.03)
  },

  indicator: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: 13,
    color: "#939090"
  },

  likesButtonPlaceholder: {
    flexDirection: "row",
    marginBottom: wd(0.03)
  }
});

// export
export default PostFeed;
