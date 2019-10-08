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
  Alert,
  StatusBar
} from "react-native";

// date converter
import Moment from "moment";

// custom component
import { LikeButton, UnlikeButton } from "../../../component/LikeButton";
import CommentButton from "../../../component/CommentButton";
import CommentForm from "../../../component/CommentForm";
import UserDetail from "../../../component/UserDetail"
import Line from "../../../component/Line"
import Comments from "../../../component/Comments"
import OptionButton from "../../../component/OptionButton"
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import ImageView from 'react-native-image-view';
import ArtefactModal from '../../../component/ArtefactModal';
import ActivityLoaderModal from "../../../component/ActivityLoaderModal";
import KeyboardShift from "../../../component/componentHelpers/KeyboardShift"

// redux actions
import { editSelectedArtefact, getSelectedArtefact, getUserArtefacts, 
  removeSelectedArtefact, likeArtefact, unlikeArtefact, getArtefactComments, 
  commentOnArtefact } 
  from "../../../actions/artefactsActions";

// custom responsive design component
import {
  deviceWidthDimension as wd,
} from "../../../utils/responsiveDesign";

class SelectedArtefact extends Component {
  constructor(props) {
    super(props);

    // get all information required for the selectedGroup page
    artefactId = this.props.navigation.getParam('artefactId', 'NO-ARTEFACT-ID');
    this.props.getSelectedArtefact(artefactId);
    this.props.getArtefactComments(artefactId);
  }

  state = {
    selectedArtefact: {
      ...this.props.artefacts.selectedArtefact,
      imageURI: this.props.artefacts.selectedArtefact.images[0].URL
    },
    isImageViewVisible: false,
    isUpdateModalVisible: false,
    loading: false,
    newComment: "",
    // whether the user has liked this artefact
    liked: this.props.artefacts.selectedArtefact.likes.includes(this.props.user.userData._id),
    likesCount: this.props.artefacts.selectedArtefact.likes.length,
    commentsCount: this.props.artefacts.artefactComments.length,
    likingEnabled: true,
    // statusBarHidden: false,
  };

  // nav details
  static navigationOptions = {
    header: null,
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // update selectedArtefact when it has already been changed
  componentWillUpdate(nextProps) {

    if (this.props.artefacts.selectedArtefact !== nextProps.artefacts.selectedArtefact) {
      // edit selectedArtefact in redux state
      this.props.getSelectedArtefact(nextProps.artefacts.selectedArtefact._id);

      // reload userArtefacts to update userArtefacts in redux state
      this.props.getUserArtefacts(this.props.user.userData._id);
    }

    if(this.props.artefacts.artefactComments.length !== nextProps.artefacts.artefactComments.length) {
      this.generateComments();
    }
  }

  onChangeNewComment = (newComment) => {
    this.setState({
      newComment
    })
  }

  like = function () {
    if (this.state.likingEnabled) {
      this.setState(
        {
          liked: true,
          likesCount: this.state.likesCount + 1,
          likingEnabled: false
        }
      );
      this.props.likeArtefact(
        this.props.artefacts.selectedArtefact._id, 
        this.props.user.userData._id
      ).then(function() {
        this.setState({likingEnabled: true});
      }.bind(this)).catch(function() {
        this.setState({likingEnabled: true});
        alert("An error occured. Please try again.");
      }.bind(this));
    } else {
      alert("Sending request. Please wait.");
    }
  }

  unlike = function () {
    if (this.state.likingEnabled) {
      this.setState(
        {
          liked: false,
          likesCount: this.state.likesCount - 1,
          likingEnabled: false
        }
      );
      this.props.unlikeArtefact(
        this.props.artefacts.selectedArtefact._id, 
        this.props.user.userData._id
      ).then(function() {
        this.setState({likingEnabled: true});
      }.bind(this)).catch(function() {
        this.setState({likingEnabled: true});
        alert("An error occured. Please try again.");
      }.bind(this));
    } else {
      alert("Sending request. Please wait.");
    }
  }

  generateComments = async () => {
    const artefactId = this.props.artefacts.selectedArtefact._id;
    await this.props.getArtefactComments(artefactId);
    this.setState({commentsCount: this.props.artefacts.artefactComments.length});
  }

  postComment = function (commentContent) {
    this.props.commentOnArtefact(
      this.props.artefacts.selectedArtefact._id,
      this.props.user.userData._id,
      commentContent
    );
  }

  scrollToEnd = function () {
    this.scrollView.scrollToEnd();
  }

  showComments = function (comments) {
    var commentViews = [];

    // sort comments by date
    comments.sort(function(a, b) {
      return new Date(a.datePosted) - new Date(b.datePosted);
    });

    // create a view for each comment
    for (var i = 0; i < comments.length; i++) {
      commentViews.push(
        <Comments
          key={i}
          userProfilePic={comments[i].posterPic}
          userName={comments[i].posterName}
          datePosted={comments[i].datePosted}
          comment={comments[i].content}
        />
      );
    }

    return commentViews;
  }

  // toggle the modal for artefact update input
  toggleUpdateModal = () => {
    this.setState({ isUpdateModalVisible: !this.state.isUpdateModalVisible });
  };

  // toggle the modal for artefact deletion
  toggleDeleteModal = async () => {
    const { navigate } = this.props.navigation;

    Alert.alert(
      "Delete Artefact",
      "Are you sure you want to delete your artefact?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            // show user the loading modal
            this.setLoading(true);

            // remove selected artefact from redux states
            await this.props
              .removeSelectedArtefact(this.props.artefacts.selectedArtefact._id)
              .then(() => {
                // stop showing user the loading modal
                this.setLoading(false);

                // navigate to artefacts
                navigate("Artefacts");
              })
              .catch(err => {
                // stop showing user the loading modal
                this.setLoading(false);
                // show error
                console.log(err.response.data);
              });
          }
        }
      ],
      { cancelable: false }
    );
  };

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
    this.props
      .editSelectedArtefact(this.state.selectedArtefact)
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

    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            {/* loading modal window */}
            {/* <ActivityLoaderModal loading={this.state.loading} /> */}

            {/* header */}
            <HeaderImageScrollView
              ref={(scrollView) => { this.scrollView = scrollView }}
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
                  <Text style={styles.title}>
                    {this.props.artefacts.selectedArtefact.title}
                  </Text>
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
                <Text style={styles.description}>
                  {this.props.artefacts.selectedArtefact.description}
                </Text>
              </View>

              {/* user detail */}
              <UserDetail
                image={{ uri: this.props.user.userData.profilePic }}
                userName={this.props.user.userData.name}
              />

              {/* likes/comments counters */}
              <View style={styles.likesIndicatorPlaceholder}>
                <Text style={styles.indicator}>
                  {this.state.likesCount} Likes {this.state.commentsCount} Comments
                </Text>
              </View>

              {/* button */}
              <View style={styles.likesButtonPlaceholder}>
                {this.state.liked === true ? (
                  <UnlikeButton onPress={this.unlike.bind(this)} />
                ) : (
                  <LikeButton onPress={this.like.bind(this)} />
                )}
                {/* Comment button */}
                <CommentButton onPress={() => this.scrollToEnd()} />
              </View>
              {/* comments */}
              <View style={styles.comments}>
                <Text style={styles.commentsTitle}>Comments</Text>
                {/* comments */}
                {this.showComments(this.props.artefacts.artefactComments)}
                <CommentForm
                  newComment={this.state.newComment}
                  onChangeNewComment={this.onChangeNewComment}
                  profilePic={this.props.user.userData.profilePic}
                  onSubmitEditing={event => {
                    this.postComment(event.nativeEvent.text);
                    this.onChangeNewComment("");
                  }}
                />
              </View>
            </HeaderImageScrollView>
          </View>
        )}
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
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

  comments: {
    alignItems: "center"
  },

  commentsTitle: {
    marginHorizontal: wd(0.05),
    // marginTop: wd(0.05),
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
  { editSelectedArtefact, getSelectedArtefact, getUserArtefacts, removeSelectedArtefact,
    likeArtefact, unlikeArtefact, getArtefactComments, commentOnArtefact }
)(SelectedArtefact);
