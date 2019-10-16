import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  StatusBar,
  RefreshControl
} from "react-native";

// date converter
import Moment from "moment";

// custom component
import { LikeButton, UnlikeButton } from "../../../component/LikeButton";
import CommentButton from "../../../component/CommentButton";
import CommentForm from "../../../component/CommentForm";
import UserDetail from "../../../component/UserDetail";
import Comments from "../../../component/Comments";
import OptionButton from "../../../component/OptionButton";
import HeaderImageScrollView from "react-native-image-header-scroll-view";
import ImageView from "react-native-image-view";
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

import { getSelectedGroupAllArtefacts } from "../../../actions/groupsActions";

import { getSpecificUser } from "../../../actions/userActions";

// import the loader modal to help show loading process
import ActivityLoaderModal from "../../../component/ActivityLoaderModal";

// custom responsive design component
import {
  deviceWidthDimension as wd,
  deviceHeigthDimension as hp
} from "../../../utils/responsiveDesign";

class SelectedArtefact extends Component {
  constructor(props) {
    super(props);
    // clear redux state in case user force quits the app and reopen it
    this.props.clearSelectedArtefact();
    // setup initial local state values
    this.state = {
      // local page settings state
      isImageViewVisible: false,
      isUpdateModalVisible: false,
      loading: false,
      refreshing: false,
      // artefact state
      newComment: "",
      liked: 0,
      likesCount: 0,
      commentsCount: 0,
      likingEnabled: true,
      // artefact owner
      owner: {}
    };
    // get artefact id passed in from the navigation parameter
    artefactId = this.props.navigation.getParam("artefactId");
    // make sure it exists
    artefactId
      ? this.getSelectedArtefactData(artefactId)
      : alert("Error loading artefact data");
  }

  // asynchronously make api calls to get selectedArtefact data into redux state
  //prettier-ignore
  async getSelectedArtefactData(artefactId) {
    Promise.all([
      this.props.getSelectedArtefact(artefactId),
      this.props.getArtefactComments(artefactId)
    ])
      .then(() => {
        (() => {
          // extract owner id
          const { userId } = this.props.artefacts.selectedArtefact;
          // get owner data and store in local state
          return this.props.getSpecificUser(userId)
            .then(owner => this.setState({ owner }))
            .catch(err => Promise.reject(err));
        })();
      })
      .catch(err => {
        console.log(err);
        alert("Error loading artefact data");
      });
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

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };

  // check if user is the owner of the artefact
  isUserArtefactOwner = () => {
    // get required redux data
    const ownerId = this.props.artefacts.selectedArtefact.userId;
    const userId = this.props.user.userData._id;
    // return true if user is owner, otherwise false
    return userId === ownerId;
  };

  // setter function for handling new changes in local comment state
  onChangeNewComment = newComment => {
    this.setState({
      newComment
    });
  };

  // refresh page
  refreshSelectedArtefactPage = async () => {
    this.setState({ refreshing: true });
    // get data from backend
    artefactId = this.props.navigation.getParam("artefactId");
    // reload everything at once, only refresh once everything is done loading
    Promise.all([
      this.props.getSelectedArtefact(artefactId),
      this.props.getArtefactComments(artefactId)
    ])
      // resets refreshing state
      .then(() => this.setState({ refreshing: false }))
      .catch(() => {
        this.setState({ refreshing: false });
        alert("Please try again later");
      });
  };

  // toggle the modal for artefact deletion
  toggleDeleteModal = async () => {
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
          onPress: () => this.onDeleteSelectedArtefact()
        }
      ],
      { cancelable: false }
    );
  };

  // navigation functions //
  // when user presses "edit artefact"
  onArtefactEdit = () => {
    this.navigateToPage("ArtefactsForm", {
      isEditMode: true,
      selectedArtefact: this.props.artefacts.selectedArtefact
    });
  };
  // when user presses "delete artefact"
  onDeleteSelectedArtefact = async () => {
    const { origin, artefactId, groupId } = this.props.navigation.state.params;
    console.log(origin, artefactId, groupId);
    // show user the loading modal
    this.setLoading(true);
    // remove selected artefact from redux states
    //prettier-ignore
    await this.props.removeSelectedArtefact(artefactId)
      .then(() => {
        // stop showing user the loading modal
        this.setLoading(false);
        // reload group data here
        if (origin === 'SelectedGroup' && groupId) {
          this.props.getSelectedGroupAllArtefacts(groupId);
        }
        // redirect back to previous page
        this.navigateToPage(origin);
      })
      .catch(err => {
        // stop showing user the loading modal
        this.setLoading(false);
        // show error
        console.log(JSON.stringify(err.response));
      });
  };
  // main navigation function
  navigateToPage = (page, options) => {
    const { navigate } = this.props.navigation;
    const artefactId = this.props.navigation.getParam("artefactId");
    navigate(page, {
      origin: "SelectedArtefact",
      artefactId,
      ...options
    });
  };

  // like an artefact
  like = function() {
    if (this.state.likingEnabled) {
      this.setState({
        liked: true,
        likesCount: this.state.likesCount + 1,
        likingEnabled: false
      });

      // make an api call to the backend to like artefact
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

  // unlike an artefact
  unlike = function() {
    if (this.state.likingEnabled) {
      this.setState({
        liked: false,
        likesCount: this.state.likesCount - 1,
        likingEnabled: false
      });

      // make an api call to the backend to unlike artefact
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

  // scroll to the bottom of the comments
  scrollToEnd = function() {
    this.scrollView.scrollToEnd();
  };

  // post new comment
  postComment = function(commentContent) {
    this.props.commentOnArtefact(
      this.props.artefacts.selectedArtefact._id,
      this.props.user.userData._id,
      commentContent
    );
  };

  showOptions = () => {
    return this.isUserArtefactOwner() ? (
      <OptionButton
        firstOption={"Edit Artefact"}
        secondOption={"Delete Artefact"}
        toggleFirstOption={this.onArtefactEdit}
        toggleSecondOption={this.toggleDeleteModal}
      />
    ) : (
      <View />
    );
  };

  // show all comments
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

  render() {
    // date format
    Moment.locale("en");
    // extract selectedArtefact from redux state
    const { selectedArtefact } = this.props.artefacts;
    // does not render when selectedArtefact is empty
    if (Object.keys(selectedArtefact).length === 0) {
      return null;
    }
    // prepare artefact image
    const artefactImage = [
      {
        source: {
          uri: selectedArtefact.images[0].URL
        }
      }
    ];
    // extract owner details
    const { owner } = this.state;

    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            {/* loading modal window */}
            <ActivityLoaderModal loading={this.state.loading} />

            {/* header */}
            <HeaderImageScrollView
              ref={scrollView => {
                this.scrollView = scrollView;
              }}
              maxHeight={hp(0.5)}
              minHeight={hp(0)}
              // use this to dynamically get image data
              headerImage={{ uri: selectedArtefact.images[0].URL }}
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
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refreshSelectedArtefactPage}
                />
              }
            >
              {/* open image in full screen */}
              <ImageView
                images={artefactImage}
                isVisible={this.state.isImageViewVisible}
                onClose={() => this.setState({ isImageViewVisible: false })}
                animationType={"fade"}
                isSwipeCloseEnabled={true}
              />

              {/* desciption */}
              <View style={styles.descriptionPlaceholder}>
                <View style={{ flexDirection: "row" }}>
                  {/* title */}
                  <Text style={styles.title}>{selectedArtefact.title}</Text>
                  {/* option */}
                  {this.showOptions()}
                </View>

                {/* description */}
                <Text style={styles.description}>
                  {selectedArtefact.description}
                </Text>
              </View>

              {/* user detail */}
              <UserDetail
                image={{ uri: owner.profilePic }}
                userName={owner.name}
                dateAdded={selectedArtefact.datePosted}
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
    clearSelectedArtefact,
    getSelectedGroupAllArtefacts,
    getSpecificUser
  }
)(SelectedArtefact);
