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
  Alert
} from "react-native";

// date converter
import Moment from "moment";

// custom component
import { LikeButton, UnlikeButton } from "../../../component/LikeButton";
import CommentButton from "../../../component/CommentButton";
import UserDetail from "../../../component/UserDetail"
import Line from "../../../component/Line"
import Comments from "../../../component/Comments"
import OptionButton from "../../../component/OptionButton"
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import ImageView from 'react-native-image-view';
import ArtefactModal from '../../../component/ArtefactModal';
import ActivityLoaderModal from "../../../component/ActivityLoaderModal";

// redux actions
import { editSelectedArtefact, selectArtefact, getUserArtefacts, removeSelectedArtefact } from "../../../actions/artefactsActions";
import { likeArtefact, unlikeArtefact } from "../../../actions/artefactsActions";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../../utils/responsiveDesign";

// remove this
const comment1 = "Ravioli, ravioli, give me the formuoli";
const comment2 = "is mayonnaise an instrument? No patrick, mayonnaise is not an instrument... Horseradish is not either";
const comment3 = "Goodbye everyone, I'll remember you all in therapy";

class SelectedArtefact extends Component {
  state = {
    selectedArtefact:
      { 
        ...this.props.artefacts.selectedArtefact,
        imageURI: this.props.artefacts.selectedArtefact.images[0].URL,
      },
    isImageViewVisible: false,
    isUpdateModalVisible: false,
    loading: false,
    // statusBarHidden: false,
  };

  // nav details
  static navigationOptions = {
    header: null,
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  like = function () {
    console.log("like");
    this.props.likeArtefact(this.props.artefacts.selectedArtefact._id, this.props.user.userData._id);
  }

  unlike = function () {
    console.log("unlike");
    console.log(this.props);
    this.props.unlikeArtefact(this.props.artefacts.selectedArtefact._id, this.props.user.userData._id);
  }

  // update selectedArtefact when it has already been changed
  componentWillUpdate(nextProps) {
    const prevSelectedArtefact = this.props.artefacts.selectedArtefact;
    const selectedArtefact = nextProps.artefacts.selectedArtefact;
    if (prevSelectedArtefact !== selectedArtefact) { 

      // edit selectedArtefact in redux state
      this.props.selectArtefact(selectedArtefact._id);

      // reload userArtefacts to update userArtefacts in redux state
      this.props.getUserArtefacts(selectedArtefact.userId);
    }
  }

  // toggle the modal for artefact update input
  toggleUpdateModal = () => {
    this.setState({ isUpdateModalVisible: !this.state.isUpdateModalVisible });
  };

  // toggle the modal for artefact deletion
  toggleDeleteModal = async () => {
    const { navigate } = this.props.navigation;

    Alert.alert(
      'Delete Artefact',
      'Are you sure you want to delete your artefact?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: async () => {
            // show user the loading modal
            this.setLoading(true);

            // remove selected artefact from redux states
            await this.props.removeSelectedArtefact(this.props.artefacts.selectedArtefact._id)
            .then(() => {
              // stop showing user the loading modal
              this.setLoading(false);

              // navigate to artefacts
              navigate('Artefacts');
            })
            .catch(err => {
              // stop showing user the loading modal
              this.setLoading(false);
              // show error
              console.log(err.response.data);
            });
          }
        },
      ],
      { cancelable: false }
    );
  }

  // selected artefact's attribute change
  setSelectedArtefact = (key, value) => {
    this.setState({
      selectedArtefact: {
        ...this.state.selectedArtefact,
        [key]: value
      }
    });
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };

  // post new artefact to the backend
  onSubmit = async () => {
    // show user the loading modal
    this.setLoading(true);
    // send and create artefact to the backend
    this.props.editSelectedArtefact(this.state.selectedArtefact)
      .then(() => {
        // stop showing user the loading modal
        this.setLoading(false);
        // close loading modal
        this.toggleUpdateModal();
      })
      .catch(err => {
        // stop showing user the loading modal
        this.setLoading(false);
        // show error
        console.log(err.response.data);
      });
  };

  render() {
    // FOR TESTING PURPOSES
    // console.log("selected artefact is", this.props.artefacts.selectedArtefact);

    // date format
    Moment.locale("en");

    const artefactImage = [
      {
        source: {
          uri: this.props.artefacts.selectedArtefact.images[0].URL
        },
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width
      }
    ];

    var likesCount = this.props.artefacts.selectedArtefact.likes.length;
    var commentsCount = 44;

    // whether the user has liked this artefact
    var liked = this.props.artefacts.selectedArtefact.likes.includes(this.props.user.userData._id);

    const likeButton = <LikeButton onPress={this.like.bind(this)} />;

    const unlikeButton = <UnlikeButton onPress={this.unlike.bind(this)} />;

    var likeUnlike;
    if (liked) {
      likeUnlike = unlikeButton;
    } else {
      likeUnlike = likeButton;
    }

    return (
      <View style={styles.container}>

        {/* loading modal window */}
        <ActivityLoaderModal loading={this.state.loading} />

        {/* header */}
        <HeaderImageScrollView
          maxHeight={Dimensions.get("window").height * 0.5}
          minHeight={Dimensions.get("window").height * 0.2}
          // use this to dynamically get image data
          headerImage={{
            uri: this.props.artefacts.selectedArtefact.images[0].URL
          }}
          renderForeground={() => (
            // change this to open the image in full screen
            <TouchableOpacity
              style={styles.cover}
              onPress={() =>
                this.setState({
                  isImageViewVisible: true,
                  statusBarHidden: true
                })
              }
            />
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
              toggleUpdateModal={this.toggleUpdateModal}
              toggleDeleteModal={this.toggleDeleteModal}
            />
          </View>

          <ArtefactModal
            isModalVisible={this.state.isUpdateModalVisible}
            toggleModal={this.toggleUpdateModal}
            newArtefact={this.state.selectedArtefact}
            onSubmit={this.onSubmit.bind(this)}
            setNewArtefact={this.setSelectedArtefact.bind(this)}
          />

          {/* description */}
          <Text style={styles.description}>{this.props.artefacts.selectedArtefact.description}</Text>
        </View>

          {/* user detail */}
          <UserDetail
            image={{ uri: this.props.user.userData.profilePic }}
            userName={this.props.user.userData.name}
          />

          {/* likes/comments counters */}
          <View style={styles.likesIndicatorPlaceholder}>
            <Text style={styles.indicator}>{likesCount} Likes {commentsCount} Comments</Text>
          </View>

          {/* button */}
          <View style={styles.likesButtonPlaceholder}>
            {/* Like button */}
            {likeUnlike}

            {/* Comment button */}
            <CommentButton />
          </View>

          {/* comments */}
          <View style={styles.comments}>
            <Text style={styles.commentsTitle}>Comments</Text>

            <View style={styles.commentInput}>
              {/* user profile pic */}
              {/* <Image style={styles.photo} source={this.props.userProfilePic} /> */}
              <Image
                style={styles.userProfilePic}
                source={require("../../../../assets/images/default-profile-pic.png")}
              />

              {/* comment input field */}
              <TextInput
                placeholder="Add Comment"
                placeholderTextColor="#707070"
                style={styles.textInput}
              />
            </View>

            {/* comments */}
            <Comments
              userProfilePic={require("../../../../assets/images/default-profile-pic.png")}
              userName="Spongebob"
              time="1 hour ago"
              comment={comment1}
            />
            <Comments
              userProfilePic={require("../../../../assets/images/default-profile-pic.png")}
              userName="Squidward"
              time="5 hours ago"
              comment={comment2}
            />
            <Comments
              userProfilePic={require("../../../../assets/images/default-profile-pic.png")}
              userName="Plankton"
              time="20 hours ago"
              comment={comment3}
            />
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
    width: Dimensions.get("window").width
  },

  descriptionPlaceholder: {
    marginHorizontal: wd(0.06)
  },

  title: {
    fontFamily: "HindSiliguri-Bold",
    fontSize: 20,
    marginTop: wd(0.03),
    width: Dimensions.get("window").width * 0.7
  },

  description: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: 16,
    marginVertical: wd(0.03)
  },

  likesIndicatorPlaceholder: {
    flexDirection: "row",
    marginHorizontal: wd(0.06),
    marginVertical: wd(0.03)
  },

  indicator: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: 12,
    color: "#939090"
  },

  likesButtonPlaceholder: {
    flexDirection: "row",
    marginVertical: wd(0.02)
  },

  userProfilePic: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    marginLeft: wd(0.06),
    marginRight: wd(0.03)
  },

  commentInput: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    height: wd(0.1),
    marginVertical: wd(0.03)
  },

  textInput: {
    fontFamily: "HindSiliguri-Regular",
    width: Dimensions.get("window").width * 0.7
  },

  comments: {
    alignItems: "center"
  },

  commentsTitle: {
    marginHorizontal: wd(0.05),
    marginTop: wd(0.05),
    fontFamily: "HindSiliguri-Bold",
    alignSelf: "flex-start",
    fontSize: 24
  }
});

// check for prop types correctness
SelectedArtefact.propTypes = {
  artefacts: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

// map required redux state to local props
const mapStateToProps = state => ({
  artefacts: state.artefacts,
  user: state.user
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { editSelectedArtefact, selectArtefact, getUserArtefacts, removeSelectedArtefact,
    likeArtefact, unlikeArtefact }
)(SelectedArtefact);
