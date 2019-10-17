import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OptionButton from "../../../component/OptionButton";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  View,
  Text,
  Image,
  Alert,
  RefreshControl
} from "react-native";

// import redux actions for groups
import {
  getSelectedGroup,
  editSelectedGroup,
  getSelectedGroupAllArtefacts,
  getSelectedGroupAllMembers,
  deleteSelectedGroup,
  inviteUserToGroup,
  deleteMemberFromGroup,
  getUserGroups
} from "../../../actions/groupsActions";

// custom component
import UserIcon from "../../../component/UserIcon";
import AddButton from "../../../component/AddButton";
import PostFeed from "../../../component/PostFeed";

// import the loader modal to help show loading process
import ActivityLoaderModal from "../../../component/ActivityLoaderModal";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../../utils/responsiveDesign";

class SelectedGroup extends Component {
  constructor(props) {
    super(props);
    // Setup initial state
    this.state = {
      // page settings
      isUpdateModalVisible: false,
      loading: false,
      refreshing: false,
      // selected group data
      group: {},
      groupMembers: [],
      groupArtefacts: []
    };
    // get group id passed in from the navigation parameter
    groupId = this.props.navigation.getParam("groupId");
    // make sure it exists
    groupId
      ? this.getSelectedGroupData(groupId)
      : alert("Error loading group data");
  }

  // get selected group data asynchronously
  //prettier-ignore
  getSelectedGroupData = async groupId => {
    // retrieve all data from backend at once
    return Promise.all([
      this.props.getSelectedGroup(groupId),
      this.props.getSelectedGroupAllMembers(groupId),
      this.props.getSelectedGroupAllArtefacts(groupId)
    ])
      .then(data => {
        // set all data to local state
        this.setState({
          group: data[0],
          groupMembers: data[1],
          groupArtefacts: data[2]
        }, () => Promise.resolve());
      })
      .catch(err => {
        console.log(JSON.stringify(err.response));
        alert("Please try again later");
        Promise.reject(err);
      });
  };

  // nav details
  static navigationOptions = {
    header: null,
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      loading
    });
  };

  // check if user is the admin of the group
  isUserAdmin = () => {
    // get required local state data
    const { adminId } = this.state.group;
    const userId = this.props.user.userData._id;
    // return true if user is admin, otherwise false
    return adminId === userId;
  };

  // refresh page
  reloadData = async () => {
    this.setState({ refreshing: true });
    // get data from backend
    groupId = this.props.navigation.getParam("groupId");
    // reload everything at once, only refresh once everything is done loading
    await this.getSelectedGroupData(groupId);
    // resets refreshing state
    this.setState({ refreshing: false });
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
          onPress: () => this.onDeleteSelectedGroup()
        }
      ],
      { cancelable: false }
    );
  };

  // delete the current selected group
  onDeleteSelectedGroup = async () => {
    const { origin } = this.props.navigation.state.params;
    // show user the loading modal
    this.setLoading(true);
    // remove selected artefact from redux states
    //prettier-ignore
    await this.props.deleteSelectedGroup(this.state.group._id)
      .then(() => {
        // stop showing user the loading modal
        this.setLoading(false);
        // navigate to origin
        this.navigateToPage(origin);
      })
      .catch(err => {
        // stop showing user the loading modal
        this.setLoading(false);
        // show error
        console.log(JSON.stringify(err.response));
      });
  };

  // navigation functions //
  onArtefactClick = artefactId => {
    this.navigateToPage("SelectedArtefact", { artefactId });
  };

  onAddNewArtefact = () => {
    this.navigateToPage("ArtefactsForm", {
      addToGroup: true
    });
  };

  onInviteButtonClick = () => {
    const { group } = this.state;
    // selectedGroup is not ready yet, return early (toggle is temp disabled)
    if (!group) return;
    // it is ready
    this.navigateToPage("UserSearch", {
      toInvite: true,
      onPress: this.props.inviteUserToGroup
    });
  };

  onGroupEdit = () => {
    const { group } = this.state;
    // selectedGroup is not ready yet, return early (toggle is temp disabled)
    if (!group) return;
    // redirect user
    this.navigateToPage("GroupsForm", {
      group,
      isEditMode: true
    });
  };

  onGroupLeave = async () => {
    // show modal loading
    this.setLoading(true);
    // get group id
    const { groupId, origin } = this.props.navigation.state.params;
    // get current logged-in user id
    const userId = this.props.user.userData._id;

    // selectedGroup is not ready yet, return early (toggle is temp disabled)
    if (!groupId) return;
    // remove user from the group and reload user groups data
    await this.props.deleteMemberFromGroup(groupId, userId);
    await this.props.getUserGroups(userId);
    // close modal loading
    this.setLoading(false);
    // redirect user back to where they came from (not necessarily "Groups" page)
    this.navigateToPage(origin);
  };

  // main navigation function
  navigateToPage = (page, options) => {
    const { navigate } = this.props.navigation;
    const groupId = this.props.navigation.getParam("groupId");
    navigate(page, {
      origin: "SelectedGroup",
      groupId,
      ...options,
      reloadDataAtOrigin: this.reloadData.bind(this)
    });
  };

  // all the component render functions //
  // show options depends on user's role to the group
  showOptions = () => {
    // check if user is the admin of the group
    return this.isUserAdmin() ? (
      <OptionButton
        firstOption={"Edit Group"}
        secondOption={"Delete Group"}
        toggleFirstOption={this.onGroupEdit}
        toggleSecondOption={this.toggleDeleteModal}
      />
    ) : (
      <OptionButton
        firstOption={"Leave Group"}
        toggleFirstOption={this.onGroupLeave}
      />
    );
  };

  // show button only if user is the admin of the group
  showInviteButton = () => {
    // check if user is the admin of the group
    return this.isUserAdmin() ? (
      <TouchableOpacity
        onPress={() => this.onInviteButtonClick()}
        style={styles.memberButton}
      >
        <Text style={styles.buttonText}>Invite</Text>
      </TouchableOpacity>
    ) : (
      <View />
    );
  };

  // display a row of group members
  showGroupMembers = () => {
    // transform each member to an UserIcon component
    //prettier-ignore
    const groupMembersComponent = this.state.groupMembers.map(member => (
      <UserIcon 
        key={ member._id } 
        image={{ uri: member.details.profilePic }} 
      />
    ));
    const style = this.isUserAdmin()
      ? styles.groupMemberContainerForAdmin
      : styles.groupMemberContainerForMember;
    return (
      <View style={style}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {groupMembersComponent}
        </ScrollView>
      </View>
    );
  };

  // return all group artefacts components
  showGroupArtefacts = () => {
    // sort array based on date obtained (from earliest to oldest)
    const groupArtefacts = this.state.groupArtefacts.sort(function(a, b) {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });
    // transform each artefact to a PostFeed component
    // prettier-ignore
    const groupArtefactsComponent = groupArtefacts.map(a => (
      <PostFeed
        key={a.artefactId}
        artefactId={a.artefactId}
        userName={a.user.name}
        title={a.details.title}
        profileImage={{ uri: a.user.profilePic }}
        image={{ uri: a.details.images[0].URL }}
        likesCount={a.details.likes.length}
        dateAdded={a.dateAdded}
        commentsCount={a.commentCount ? a.commentCount : 0}
        onPress={this.onArtefactClick.bind(this)}
      />
    ));
    return groupArtefactsComponent;
  };

  render() {
    // extract selected group information
    const { coverPhoto, description, title } = this.state.group;
    // extract local state data
    const { groupMembers } = this.state;
    this.showOptions();
    return (
      <View style={styles.container}>
        <ActivityLoaderModal loading={this.state.loading} />
        {/* container to let user scroll within main component */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.reloadData}
            />
          }
        >
          {/* group cover photo */}
          <View style={styles.coverPhoto}>
            <Image
              style={styles.cover}
              source={{ uri: coverPhoto }}
              resizeMethod="resize"
              resizeMode="cover"
            />
          </View>
          {/* group description */}
          <View style={styles.groupInfo}>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: wd(0.05),
                justifyContent: "center"
              }}
            >
              {/* title */}
              <Text style={[styles.groupTitle, styles.font]}>{title}</Text>
              {/* option button */}
              {this.showOptions()}
            </View>
            {/* descriptions */}
            <Text style={[styles.groupDescription, styles.subFont]}>
              {description}
            </Text>
            {/* show group members count */}
            <Text style={[styles.groupCount, styles.subFont]}>
              {groupMembers.length} Members
            </Text>
            {/* container for group members and button */}
            <View style={styles.groupMember}>
              {/* show members in scrollable view */}
              {this.showGroupMembers()}

              {/* Add members button */}
              {this.showInviteButton()}
            </View>
          </View>
          {/* container for all artefacts */}
          <View>
            {/* Show all artefacts in group */}
            {this.showGroupArtefacts()}
          </View>
        </ScrollView>
        {/* toggle modal to add artefacts into groups */}
        <AddButton onPress={this.onAddNewArtefact.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
    backgroundColor: "#F7F7F7"
  },

  font: {
    fontFamily: "HindSiliguri-Bold",
    fontSize: hp(0.03)
  },

  subFont: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: hp(0.02)
  },

  cover: {
    width: wd(1),
    height: hp(0.4)
  },

  groupInfo: {
    alignItems: "center",
    paddingHorizontal: wd(0.05),
    backgroundColor: "white"
  },

  groupTitle: {
    width: wd(0.76),
    textAlign: "center",
    alignSelf: "center",
    marginTop: hp(0.01),
    marginLeft: wd(0.05),
    marginBottom: hp(0.01)
  },

  groupDescription: {
    textAlign: "center",
    marginBottom: hp(0.01)
  },

  groupCount: {
    color: "#737373",
    marginBottom: hp(0.01)
  },

  groupMember: {
    width: wd(1),
    height: wd(0.15),
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },

  groupMemberContainerForAdmin: {
    flex: 0.7,
    height: wd(0.1),
    justifyContent: "center",
    alignSelf: "center",
    paddingLeft: wd(0.07)
  },

  groupMemberContainerForMember: {
    height: wd(0.1),
    alignSelf: "center"
  },

  memberButton: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#FF6E6E",
    marginVertical: wd(0.03),
    marginRight: wd(0.07),
    width: wd(0.3),
    height: wd(0.1),
    borderRadius: 40,
    elevation: 3
  },

  buttonText: {
    fontSize: wd(0.037),
    color: "white",
    fontFamily: "HindSiliguri-Bold"
  }
});

SelectedGroup.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

//  connect to redux and export
export default connect(
  mapStateToProps,
  {
    getSelectedGroup,
    getSelectedGroupAllMembers,
    getSelectedGroupAllArtefacts,
    editSelectedGroup,
    deleteSelectedGroup,
    inviteUserToGroup,
    deleteMemberFromGroup,
    getUserGroups
  }
)(SelectedGroup);
