import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Text,
} from "react-native";

// date converter
import Moment from "moment";

// custom component
import UserDetail from "../../../component/UserDetail"
import Line from "../../../component/Line"
import Comments from "../../../component/Comments"
import OptionButton from "../../../component/OptionButton"
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import ImageView from 'react-native-image-view';

// redux actions
import { updateSelectedArtefact } from "../../../actions/artefactsActions";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../../utils/responsiveDesign"


// remove this
const comment1 = "Ravioli, ravioli, give me the formuoli"
const comment2 = "is mayonnaise an instrument? No patrick, mayonnaise is not an instrument... Horseradish is not either"
const comment3 = "Goodbye everyone, I'll remember you all in therapy"

class SelectedArtefact extends Component {

  state = {
    isImageViewVisible: false,
    // statusBarHidden: false,
  }

  // nav details
  static navigationOptions = {
    header: null,
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  render() {
    console.log("user is", this.props.user.userData);
    console.log("selected artefact is", this.props.artefacts.selectedArtefact);

    // date format
    Moment.locale("en");

    const artefactImage = [
      {
        source: {
          uri: this.props.artefacts.selectedArtefact.images[0].URL,
        },
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
      },
    ];

    return (
      <View style={styles.container}>
  
        <HeaderImageScrollView
          maxHeight={Dimensions.get("window").height * 0.5}
          minHeight={Dimensions.get("window").height * 0.2}

          // use this to dynamically get image data
          headerImage={{ uri: this.props.artefacts.selectedArtefact.images[0].URL }}

          renderForeground={() => (
            // change this to open the image in full screen
            <TouchableOpacity style={styles.cover} onPress={() =>
              this.setState({ isImageViewVisible: true, statusBarHidden: true })} />
          )}
        >

          {/* open image in full screen */}
          <ImageView
            images={artefactImage}
            isVisible={this.state.isImageViewVisible}
            animationType={"fade"}
            isSwipeCloseEnabled={true}
          />

          {/* desciption */}
          <View style={styles.descriptionPlaceholder}>
            <View style={{ flexDirection: "row" }}>

            {/* title */}
            <Text style={styles.title}>{this.props.artefacts.selectedArtefact.title}</Text>
              <OptionButton 
                editArtefact={() => this.editArtefact}
                deleteArtefact={() => this.deleteArtefact}
              />
            </View>

            {/* description */}
            <Text style={styles.description}>{this.props.artefacts.selectedArtefact.description}</Text>
          </View>

          {/* user detail */}
          <UserDetail image={{uri: this.props.user.userData.profilePic}} userName={this.props.user.userData.name} />

          {/* NOT WORKING YET!! indicator */}
          <View style={styles.likesIndicatorPlaceholder}>
            {/* <Text style={styles.indicator}>{this.props.likeCount} Likes    {this.props.commentsCount} Comments</Text> */}
            <Text style={styles.indicator}>69 Likes    3 Comments</Text>
          </View>

          {/* button */}
          <View style={styles.likesButtonPlaceholder}>
            {/* Like button */}
            <TouchableOpacity style={styles.button}>
              <Image style={styles.buttonIcon} source={require("../../../../assets/images/icons/like.png")} />
              <Text style={styles.buttonText}>Like</Text>
            </TouchableOpacity>

            {/* Comment button */}
            <TouchableOpacity style={styles.button}>
              <Image style={styles.buttonIcon} source={require("../../../../assets/images/icons/comment.png")} />
              <Text style={styles.buttonText}>Comment</Text>
            </TouchableOpacity>
          </View>

          <Line />

          {/* comments */}
          <View style={styles.comments}>
            <Text style={styles.commentsTitle}>Comments</Text>

            <View style={styles.commentInput}>
              {/* user profile pic */}
              {/* <Image style={styles.photo} source={this.props.userProfilePic} /> */}
              <Image style={styles.userProfilePic} source={require("../../../../assets/images/default-profile-pic.png")} />

              {/* comment input field */}
              <TextInput
                placeholder="Add Comment"
                placeholderTextColor="#707070"
                style={styles.textInput}
              />
            </View>

            {/* comments */}
            <Comments userProfilePic={require("../../../../assets/images/default-profile-pic.png")}
              userName="Spongebob"
              time="1 hour ago"
              comment={comment1} />
            <Comments userProfilePic={require("../../../../assets/images/default-profile-pic.png")}
              userName="Squidward"
              time="5 hours ago"
              comment={comment2} />
            <Comments userProfilePic={require("../../../../assets/images/default-profile-pic.png")}
              userName="Plankton"
              time="20 hours ago"
              comment={comment3} />

          </View>
        </HeaderImageScrollView>
      </View >
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
    width: Dimensions.get("window").width * 0.7,
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
    marginLeft: wd(0.06),
    marginRight: wd(0.03),
  },

  commentInput: {
    flexDirection: "row",
    width: Dimensions.get('window').width,
    height: wd(0.1),
    marginVertical: wd(0.03)
  },

  textInput: {
    fontFamily: "HindSiliguri-Regular",
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

// check for prop types correctness
SelectedArtefact.propTypes = {
  artefacts: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

// map required redux state to local props
const mapStateToProps = state => ({
  artefacts: state.artefacts,
  user: state.user,
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { updateSelectedArtefact }
)(SelectedArtefact);
