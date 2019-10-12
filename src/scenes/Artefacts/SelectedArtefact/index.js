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
import UserDetail from "../../../component/UserDetail";
import Line from "../../../component/Line";
import Comments from "../../../component/Comments";
import OptionButton from "../../../component/OptionButton";
import HeaderImageScrollView from "react-native-image-header-scroll-view";
import ImageView from "react-native-image-view";
import ArtefactModal from "../../../component/ArtefactModal";
import ActivityLoaderModal from "../../../component/ActivityLoaderModal";
import KeyboardShift from "../../../component/componentHelpers/KeyboardShift";

// redux actions
import {
  editSelectedArtefact,
  getSelectedArtefact,
  getUserArtefacts,
  removeSelectedArtefact,
  likeArtefact,
  unlikeArtefact,
  getArtefactComments,
  commentOnArtefact,
  clearSelectedArtefact
} from "../../../actions/artefactsActions";

// custom responsive design component
import { deviceWidthDimension as wd } from "../../../utils/responsiveDesign";

class SelectedArtefact extends Component {
  constructor(props) {
    super(props);

    // clear redux state in case user force quits the app and reopen it
    this.props.clearSelectedArtefact();

    this.state = {
      isImageViewVisible: false,
      isUpdateModalVisible: false,
      loading: false,

      newComment: "",
      // whether the user has liked this artefact
      liked: 0,
      likesCount: 0,
      commentsCount: 0,
      likingEnabled: true
      // statusBarHidden: false,
    };
  }

  // asynchronously make api calls to get selectedArtefact data into redux state
  async getSelectedArtefactData(artefactId) {
    this.props.getSelectedArtefact(artefactId);
    this.props.getArtefactComments(artefactId);
  }

  componentDidMount() {
    // get all information required for the selectedGroup page
    artefactId = this.props.navigation.getParam("artefactId", "NO-ARTEFACT-ID");
    this.getSelectedArtefactData(artefactId);
  }

  // nav details
  static navigationOptions = {
    header: null,
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  async componentDidUpdate(prevProps) {
    // extract prev & selected artefact details
    const prevArtefact = prevProps.artefacts.selectedArtefact;
    const currentArtefact = this.props.artefacts.selectedArtefact;

    // assign selectedArtefact along with likes when selectedArtefact data
    // has been retrieved from api call for the first time
    if (
      Object.keys(prevArtefact).length === 0 &&
      Object.keys(currentArtefact).length !== 0
    ) {
      this.setState({
        selectedArtefact: {
          ...currentArtefact,
          imageURI: currentArtefact.images[0].URL
        },
        liked: currentArtefact.likes.includes(this.props.user.userData._id),
        likesCount: currentArtefact.likes.length
      });
    }

    // extract prev & selected artefact comments details
    const prevComments = prevProps.artefacts.artefactComments;
    const currentComments = this.props.artefacts.artefactComments;

    // assign selectedArtefact along with likes when selectedArtefact data
    // has been retrieved from api call for the first time
    if (prevComments.length !== currentComments.length) {
      this.setState({
        commentsCount: currentComments.length
      });
    }

    // re-generate comments when a new artefact comment has been made
    if (prevComments.length + 1 === currentComments.length) {
      const artefactId = currentArtefact._id;
      await this.props.getArtefactComments(artefactId);
    }
  }

  // clear redux state when component is unmounting
  componentWillUnmount() {
    this.props.clearSelectedArtefact();
  }

  onChangeNewComment = newComment => {
    this.setState({
      newComment
    });
  };

  like = function() {
    if (this.state.likingEnabled) {
      this.setState({
        liked: true,
        likesCount: this.state.likesCount + 1,
        likingEnabled: false
      });
      this.props
        .likeArtefact(
          this.props.artefacts.selectedArtefact._id,
          this.props.user.userData._id
        )
        .then(
          function() {
            this.setState({ likingEnabled: true });
          }.bind(this)
        )
        .catch(
          function() {
            this.setState({ likingEnabled: true });
            alert("An error occured. Please try again.");
          }.bind(this)
        );
    }
  };

  unlike = function() {
    if (this.state.likingEnabled) {
      this.setState({
        liked: false,
        likesCount: this.state.likesCount - 1,
        likingEnabled: false
      });
      this.props
        .unlikeArtefact(
          this.props.artefacts.selectedArtefact._id,
          this.props.user.userData._id
        )
        .then(
          function() {
            this.setState({ likingEnabled: true });
          }.bind(this)
        )
        .catch(
          function() {
            this.setState({ likingEnabled: true });
            alert("An error occured. Please try again.");
          }.bind(this)
        );
    }
  };

  postComment = function(commentContent) {
    this.props.commentOnArtefact(
      this.props.artefacts.selectedArtefact._id,
      this.props.user.userData._id,
      commentContent
    );
  };

  scrollToEnd = function() {
    this.scrollView.scrollToEnd();
  };

  showComments = function(comments) {
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
  };

  // toggle the modal for artefact update input
  toggleUpdateModal = () => {
    const { navigate } = this.props.navigation;

    // navigate to ArtefactsForm while passing the editedSelectedArtefact
    navigate("ArtefactsForm", {
      isEditingArtefact: true,
      newArtefact: this.props.artefacts.selectedArtefact
    });
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

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };

  render() {
    // does not render when selectedArtefact is empty
    if (Object.keys(this.props.artefacts.selectedArtefact).length === 0) {
      return null;
    }

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
              ref={scrollView => {
                this.scrollView = scrollView;
              }}
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
                    firstOption={"Edit Artefact"}
                    secondOption={"Delete Artefact"}
                    toggleFirstOption={this.toggleUpdateModal}
                    toggleSecondOption={this.toggleDeleteModal}
                  />
                </View>

                {/* <ArtefactModal
                  isModalVisible={this.state.isUpdateModalVisible}
                  toggleModal={this.toggleUpdateModal}
                  newArtefact={this.state.selectedArtefact}
                  onSubmit={this.onSubmit.bind(this)}
                  setNewArtefact={this.setSelectedArtefact.bind(this)}
                /> */}

                {/* description */}
                <Text style={styles.description}>
                  {this.props.artefacts.selectedArtefact.description}
                </Text>
              </View>

              {/* user detail */}
              <UserDetail
                image={{ uri: this.props.user.userData.profilePic }}
                userName={this.props.user.userData.name}
                dateAdded={this.props.artefacts.selectedArtefact.datePosted}
              />
              {/* likes/comments counters */}
              <View style={styles.likesIndicatorPlaceholder}>
                <Text style={styles.indicator}>
                  {this.state.likesCount} Likes {this.state.commentsCount}{" "}
                  Comments
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
    width: Dimensions.get("window").width * 0.8
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
  {
    editSelectedArtefact,
    getSelectedArtefact,
    getUserArtefacts,
    removeSelectedArtefact,
    likeArtefact,
    unlikeArtefact,
    getArtefactComments,
    commentOnArtefact,
    clearSelectedArtefact
  }
)(SelectedArtefact);
