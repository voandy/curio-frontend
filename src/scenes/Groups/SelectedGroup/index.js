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
  Image
} from "react-native";

// import redux actions for groups
import {
  getSelectedGroup,
  editSelectedGroup,
  clearSelectedGroup,
  getSelectedGroupAllArtefacts,
  getSelectedGroupAllMembers,
  getSelectedGroupArtefactComments
} from "../../../actions/groupsActions";

// custom component
import UserIcon from "../../../component/UserIcon";
import AddButton from "../../../component/AddButton";
import PostFeed from "../../../component/PostFeed";
import Line from "../../../component/Line";
import Comments from "../../../component/Comments";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../../utils/responsiveDesign";

// custom components
import GroupModal from "../../../component/GroupModal";

class SelectedGroup extends Component {
  constructor(props) {
    super(props);
    // clear redux state in case user force quits the app and reopen it
    this.props.clearSelectedGroup();
    // Setup initial state
    this.state = {
      selectedGroup: {
        ...this.props.groups.selectedGroup
      },
      isUpdateModalVisible: false,
      loading: false
    };
    // get all information required for the selectedGroup page
    // get group id from the parameter passed in, get "NO-GROUP-ID" if not found
    groupId = this.props.navigation.getParam("groupId", "NO-GROUP-ID");
    this.getSelectedGroupData(groupId);
  }

  // get selected group data asynchronously
  getSelectedGroupData = async groupId => {
    this.props.getSelectedGroup(groupId);
    this.props.getSelectedGroupAllArtefacts(groupId);
    this.props.getSelectedGroupAllMembers(groupId);
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

  // selected artefact's attribute change
  setSelectedGroup = (key, value) => {
    this.setState({
      selectedGroup: {
        ...this.state.selectedGroup,
        [key]: value
      }
    });
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      loading
    });
  };

  // toggle the modal for artefact update input
  toggleUpdateModal = () => {
    this.setState({ isUpdateModalVisible: !this.state.isUpdateModalVisible });
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
    console.log(groupArtefacts[0]);
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

  // click a specific artefact and navigate to it
  clickArtefact = artefactId => {
    const { navigate } = this.props.navigation;
    // navigate to selected artefact
    navigate("SelectedArtefact", { artefactId });
  };

  // post new artefact to the backend
  onSubmit = async () => {
    // show user the loading modal
    this.setLoading(true);
    // send and create artefact to the backend
    this.props
      .editSelectedGroup(this.state.selectedGroup)
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
                toggleFirstOption={this.toggleUpdateModal}
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
            {/* {this.props.groups.userGroups.length !== 0 ? (
              <View>{"ADD CONTENT HERE"}</View>
            ) : (
                <View style={styles.emptyFeed}>
                  <Text
                    style={{ textAlign: "center", marginTop: hp(0.05), marginBottom:hp(0.1), fontSize: 16, fontFamily: "HindSiliguri-Regular" }}
                  >
                    Get started by adding new memeber to the group {"\n"} and start post items here !
                  </Text>
                </View>
              )} */}
            {/* Show all artefacts in group */}
            {this.showGroupArtefacts(selectedGroupArtefacts)}
          </View>
        </ScrollView>
        {/* toggle modal to add artefacts into groups */}
        <AddButton />

        {/* REMOVE THIS LATER ON */}
        <GroupModal
          isModalVisible={this.state.isUpdateModalVisible}
          toggleModal={this.toggleUpdateModal}
          newGroup={this.state.selectedGroup}
          post={this.onSubmit.bind(this)}
          onNewGroupChange={this.setSelectedGroup.bind(this)}
        />
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
    paddingHorizontal: wd(0.1),
    backgroundColor: "white"
  },

  groupTitle: {
    width: wd(0.76),
    textAlign: "center",
    alignSelf: "center",
    marginTop: hp(0.01),
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
    getSelectedGroupArtefactComments
  }
)(SelectedGroup);
