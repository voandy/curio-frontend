import React, { Component } from "react";

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Text
} from "react-native";

// date converter
import Moment from "moment";

// custom component
import UserDetail from "../../../component/UserDetail"
import Line from "../../../component/Line"
import Comments from "../../../component/Comments"
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../../utils/responsiveDesign"

class Selected extends Component {

  state = {
    isImageViewVisible: false,
  }

  // nav details
  static navigationOptions = {
    header: null,
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  render() {

    // date format
    Moment.locale("en");
    // const dt = this.state.userData.dateJoined;

    return (
      <View style={styles.container}>

        <HeaderImageScrollView
          maxHeight={Dimensions.get("window").height * 0.5}
          minHeight={Dimensions.get("window").height * 0.2}

          // use this to dynamically get image data
          // headerImage={{ uri: this.props.user.image }}
          headerImage={require("../../../../assets/images/test-delete-this/boi5.png")}

          renderForeground={() => (
            // change this to open the image in full screen
            <TouchableOpacity style={styles.cover} onPress={() => console.log("Open the image fool!")} />
          )}
        >

          <View style={styles.descriptionPlaceholder}>
            <Text style={styles.title}>Patrick Star</Text>
            <Text style={styles.description}>we should take bikini bottom and push it somewhere else</Text>
            {/* <Text style={styles.title}>{this.props.title}</Text> */}
            {/* <Text style={styles.description}>{this.props.description}</Text> */}
          </View>

          {/* user detail */}
          <UserDetail image={require("../../../../assets/images/default-profile-pic.png")} userName="Patrick Star" />

          {/* indicator */}
          <View style={styles.likesIndicatorPlaceholder}>
            {/* <Text style={styles.indicator}>{this.props.likeCount} Likes    {this.props.commentsCount} Comments</Text> */}
            <Text style={styles.indicator}>69 Likes    5 Comments</Text>
          </View>

          {/* button */}
          <View style={styles.likesButtonPlaceholder}>
            <TouchableOpacity style={styles.button}>
              <Image style={styles.buttonIcon} source={require("../../../../assets/images/icons/like.png")} />
              <Text style={styles.buttonText}>Like</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Image style={styles.buttonIcon} source={require("../../../../assets/images/icons/comment.png")} />
              <Text style={styles.buttonText}>Comment</Text>
            </TouchableOpacity>
          </View>

          {/* line separator */}
          <Line />

          {/* comments */}
          <View style={styles.comments}>
            <Text style={styles.commentsTitle}>Comments</Text>

            <View styles={styles.commentInput}>
              {/* user profile pic */}
              {/* <Image style={styles.photo} source={this.props.userProfilePic} /> */}
              <Image style={styles.userProfilePic} source={require("../../../../assets/images/default-profile-pic.png")} />

              {/* comment inpit field */}
              <TextInput
                // underlineColorAndroid="transparent"
                placeholder="Add Comment"
                placeholderTextColor="#707070"
                style={styles.textInput}
              />
            </View>


            <Comments image={require("../../../../assets/images/default-profile-pic.png")} userName="bob" time="4 hours ago" />
            <Comments image={require("../../../../assets/images/default-profile-pic.png")} userName="Spongebob Squarepants" time="4 hours ago" />
            <Comments image={require("../../../../assets/images/default-profile-pic.png")} userName="uwuwewewe onyetenyevwe ugwemuhwem osas" time="4 hours ago" />

          </View>


        </HeaderImageScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  cover: {
    height: Dimensions.get("window").height * 0.5,
    width: Dimensions.get("window").width,
  },

  descriptionPlaceholder: {
    marginHorizontal: wd(0.06),
  },

  title: {
    fontFamily: "HindSiliguri-Bold",
    fontSize: 20,
    marginTop: wd(0.03),
  },

  description: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: 16,
    marginVertical: wd(0.03),
  },

  likesIndicatorPlaceholder: {
    flexDirection: "row",
    marginHorizontal: wd(0.06),
    marginVertical: wd(0.03)
  },

  indicator: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: 12,
    color: "#939090",
  },

  likesButtonPlaceholder: {
    flexDirection: "row",
    marginVertical: wd(0.02),
  },

  button: {
    width: Dimensions.get("window").width * 0.48,   // just to make it look "justified"
    height: wd(0.06),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonIcon: {
    width: wd(0.05),
    height: wd(0.05),
    marginRight: wd(0.01),
    tintColor: "#939090",
  },

  buttonText: {
    color: "#939090",
    fontFamily: "HindSiliguri-Regular",
    fontSize: 16
  },

  userProfilePic: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    // marginRight: wd(0.06),
  },

  commentInput: {
    flexDirection: "row",
    backgroundColor:"blue"
  },

  textInput: {
    fontFamily: "HindSiliguri-Regular",
    backgroundColor: "red",
    width: Dimensions.get("window").width * 0.7
  },

  comments: {
    alignItems: "center",
  },

  commentsTitle: {
    marginHorizontal: wd(0.05),
    marginTop: wd(0.05),
    fontFamily: "HindSiliguri-Bold",
    alignSelf: "flex-start",
    fontSize: 24,
  },

});


// export 
export default Selected
