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
  clearSelectedGroup,
  getSelectedGroupAllArtefacts,
  getSelectedGroupAllMembers,
  getSelectedGroupArtefactComments,
  deleteSelectedGroup
} from "../../../actions/groupsActions";

// custom component
import UserIcon from "../../../component/UserIcon";
import AddButton from "../../../component/AddButton";
import PostFeed from "../../../component/PostFeed";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../../utils/responsiveDesign";

class SelectedGroup extends Component {
  constructor(props) {
    super(props);
    // clear redux state in case user force quits the app and reopen it
    this.props.clearSelectedGroup();
    // Setup initial state
    this.state = {
      isUpdateModalVisible: false,
      loading: false,
      refreshing: false
    };
    // get group id passed in from the navigation parameter
    groupId = this.props.navigation.getParam("groupId");
    // make sure it exists
    groupId
      ? this.getSelectedGroupData(groupId)
      : alert("Error loading group data.");
  }

  // get selected group data asynchronously
  getSelectedGroupData = async groupId => {
    // reload everything at once
    return Promise.all([
      this.props.getSelectedGroup(groupId),
      this.props.getSelectedGroupAllMembers(groupId),
      this.props.getSelectedGroupAllArtefacts(groupId)
    ])
      .then(() => Promise.resolve())
      .catch(err => {
        console.log(err);
        alert("Please try again later.");
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

  // clear redux state on unmount (usual case of clearing state)
  // this is needed to improve app responsiveness compared to having clearSelectedGroup
  // in constructor alone
  componentWillUnmount() {
    this.props.clearSelectedGroup();
  }

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      loading
    });
  };

  // refresh page
  refreshSelectedGroupPage = async () => {
    this.setState({ refreshing: true });
    // get data from backend
    groupId = this.props.navigation.getParam("groupId");
    // reload everything at once, only refresh once everything is done loading
    await this.getSelectedGroupData(groupId);
    // resets refreshing state
    this.setState({ refreshing: false });
  };

  // when user presses "edit group"
  onEditGroup = () => {
    const { navigate } = this.props.navigation;
    // navigate to GroupsForm and pass in required parameters
    navigate("GroupsForm", {
      origin: "SelectedGroup",
      isEditMode: true,
      selectedGroup: this.props.groups.selectedGroup
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
          onPress: () => this.onDeleteSelectedGroup()
        }
      ],
      { cancelable: false }
    );
  };

  // delete the current selected group
  onDeleteSelectedGroup = async () => {
    const { navigate } = this.props.navigation;
    const { origin } = this.props.navigation.state.params;
    // show user the loading modal
    this.setLoading(true);
    // remove selected artefact from redux states
    //prettier-ignore
    await this.props.deleteSelectedGroup(this.props.groups.selectedGroup._id)
      .then(() => {
        // stop showing user the loading modal
        this.setLoading(false);
        // navigate to groups
        navigate(origin);
      })
      .catch(err => {
        // stop showing user the loading modal
        this.setLoading(false);
        // show error
        console.log(err.response.data);
      });
  };

  // click a specific artefact and navigate to it
  clickArtefact = artefactId => {
    const { navigate } = this.props.navigation;
    groupId = this.props.navigation.getParam("groupId");
    // navigate to selected artefact
    navigate("SelectedArtefact", {
      origin: "SelectedGroup",
      artefactId,
      groupId
    });
  };

  onAddNewArtefact = () => {
    const { navigate } = this.props.navigation;
    const groupId = this.props.navigation.getParam("groupId");
    // navigate to selected artefact
    navigate("ArtefactsForm", {
      origin: "SelectedGroup",
      addToGroup: true,
      groupId
    });
  };

  // return a row of group members
  showGroupMembers = groupMembers => {
    // transform each member to an UserIcon component
    //prettier-ignore
    const groupMembersComponent = groupMembers.map(member => (
      <UserIcon 
        key={ member._id } 
        image={{ uri: member.details.profilePic }} 
      />
    ));
    return groupMembersComponent;
  };

  // return all group artefacts components
  showGroupArtefacts = groupArtefacts => {
    // transform each artefact to a PostFeed component
    // prettier-ignore
    const groupArtefactsComponent = groupArtefacts.map(artefact => (
      <PostFeed
        key={artefact.artefactId}
        artefactId={artefact.artefactId}
        userName={artefact.user.name}
        title={artefact.details.title}
        profileImage={{ uri: artefact.user.profilePic }}
        image={{ uri: artefact.details.images[0].URL }}
        likesCount={artefact.details.likes.length}
        dateAdded={artefact.dateAdded}
        commentsCount={artefact.commentCount ? artefact.commentCount : 0}
        onPress={this.clickArtefact.bind(this)}
      />
    ));
    return groupArtefactsComponent;
  };

  render() {
    // extract selected group information
    const {
      coverPhoto,
      dateCreated,
      description,
      title
    } = this.props.groups.selectedGroup;
    // extract redux store information
    const { selectedGroupMembers, selectedGroupArtefacts } = this.props.groups;
    // extract navigate function
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {/* container to let user scroll within main component */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshSelectedGroupPage}
            />
          }
        >
          {/* group cover photo */}
          <View style={styles.coverPhoto}>
            <Image style={styles.cover} source={{ uri: coverPhoto }} />
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
              <OptionButton
                firstOption={"Edit Group"}
                secondOption={"Delete Group"}
                thirdOption={"Leave Group"}
                toggleFirstOption={this.onEditGroup}
                toggleSecondOption={this.toggleDeleteModal}
              />
            </View>
            {/* descriptions */}
            <Text style={[styles.groupDescription, styles.subFont]}>
              {description}
            </Text>
            {/* show group members count */}
            <Text style={[styles.groupCount, styles.subFont]}>
              {selectedGroupMembers.length} Members
            </Text>
            {/* container for group members and button */}
            <View style={styles.groupMember}>
              {/* show members in scrollable view */}
              <ScrollView
                style={{ flex: 0.7 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {this.showGroupMembers(selectedGroupMembers)}
              </ScrollView>
              {/* Add members button */}
              <TouchableOpacity
                onPress={() => navigate("UserSearch")}
                style={styles.memberButton}
              >
                <Text style={styles.buttonText}>Invite</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* container for all artefacts */}
          <View>
            {/* Show all artefacts in group */}
            {this.showGroupArtefacts(selectedGroupArtefacts)}
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
    height: wd(0.15),
    flexDirection: "row",
    alignItems: "center"
  },

  memberButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6E6E",
    margin: wd(0.03),
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
  groups: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groups: state.groups
});

//  connect to redux and export
export default connect(
  mapStateToProps,
  {
    getSelectedGroup,
    editSelectedGroup,
    clearSelectedGroup,
    getSelectedGroupAllArtefacts,
    getSelectedGroupAllMembers,
    getSelectedGroupArtefactComments,
    deleteSelectedGroup
  }
)(SelectedGroup);
