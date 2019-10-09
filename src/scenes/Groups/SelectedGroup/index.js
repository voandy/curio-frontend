import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GroupOptionButton from "../../../component/GroupOptionButton";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  View,
  Text,
  Image
} from "react-native";

// import redux actions for groups
import {
  editSelectedGroup,
  getSelectedGroup,
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

    this.state = {
      selectedGroup: {
        ...this.props.groups.selectedGroup,
        coverPhoto: this.props.groups.selectedGroup.coverPhoto
      },
      isUpdateModalVisible: false,
      loading: false,
      artefactsComments: []
    };

    // get all information required for the selectedGroup page
    groupId = this.props.navigation.getParam("groupId", "NO-GROUP-ID");
    this.props.getSelectedGroup(groupId);
    this.props.getSelectedGroupAllArtefacts(groupId);
    this.props.getSelectedGroupAllMembers(groupId);
  }

  // nav details
  static navigationOptions = {
    header: null,
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // return a row of group members
  showGroupMembers = groupMembers => {
    // map each member to an individual component
    //prettier-ignore
    const groupMembersComponent = groupMembers.map(member => (
      <UserIcon 
        key={ member._id } 
        image={{ uri: member.details.profilePic }} 
      />
    ));
    return groupMembersComponent;
  };

  // return a row of group artefacts
  showGroupArtefacts = groupArtefacts => {
    // prettier-ignore
    const groupArtefactsComponent = groupArtefacts.map(artefact => (
      <PostFeed
        key={artefact.artefactId}
        // change this to user's username later
        userName={artefact.user.name}
        title={artefact.details.title}
        // change this to user image later
        profileImage={{ uri: artefact.user.profilePic }}
        image={{ uri: artefact.details.images[0].URL }}
        likesCount={artefact.details.likes.length}
        commentsCount={artefact.commentCount ? artefact.commentCount : 0}
      />
    ));
    return groupArtefactsComponent;
  };

  // show group artefacts' comments
  showGroupArtefactsComments = async groupArtefacts => {
    // get ids of group artefacts
    var groupArtefactIds = [];
    for (var i = 0; i < groupArtefacts.length; i++) {
      groupArtefactIds.push(groupArtefacts[i].artefactId);
    }

    var promises = groupArtefactIds.map(
      this.props.getSelectedGroupArtefactComments
    );

    await Promise.all(promises)
      .then(res => {
        console.log(this.props.groups.selectedGroupArtefactsComments);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
      ...this.state,
      loading
    });
  };

  // toggle the modal for artefact update input
  toggleUpdateModal = () => {
    this.setState({ isUpdateModalVisible: !this.state.isUpdateModalVisible });
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
    // selected group information
    // console.log("selectedGroup", this.props.groups.selectedGroup);
    const selectedGroup = this.props.groups.selectedGroup;
    const coverPhoto = selectedGroup.coverPhoto;
    const dateCreated = selectedGroup.dateCreated;
    const description = selectedGroup.description;
    const title = selectedGroup.title;

    // selected group's members information
    // console.log("selectedGroupMembers", this.props.groups.selectedGroupMembers);
    const selectedGroupMembers = this.props.groups.selectedGroupMembers;

    // selected group's groupMembers information
    // console.log("selectedGroupArtefacts", this.props.groups.selectedGroupArtefacts);
    const selectedGroupArtefacts = this.props.groups.selectedGroupArtefacts;

    // this.showGroupArtefactsComments(selectedGroupArtefacts);

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {/*                 
          <Text style={styles.title}> Group Functionalities </Text>
            <GroupOptionButton
              toggleUpdateModal={this.toggleUpdateModal}
              toggleDeleteModal={this.toggleDeleteModal}
            />
              <GroupModal
                isModalVisible={this.state.isUpdateModalVisible}
                toggleModal={this.toggleUpdateModal}
                newGroup={this.state.selectedGroup}
                post={this.onSubmit.bind(this)}
                onNewGroupChange={this.setSelectedGroup.bind(this)}
              />
        */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* group cover photo */}
          <View style={styles.coverPhoto}>
            {/* TODO USE THIS <Image style={styles.cover} source={this.props.coverPhoto} /> */}
            <Image style={styles.cover} source={{ uri: coverPhoto }} />
          </View>

          {/* group description */}
          <View style={styles.groupInfo}>
            {/* TODO USE THIS <Text style={styles.groupTitle}>{this.props.groupTitle}</Text> */}
            <Text style={[styles.groupTitle, styles.font]}>{title}</Text>

            <Text style={[styles.groupDescription, styles.subFont]}>
              {description}
            </Text>

            {/* TODO USE THIS <Text style={[styles.groupCount, styles.subFont]}>{this.props.groupCount} Members</Text> */}
            <Text style={[styles.groupCount, styles.subFont]}>
              {selectedGroupMembers.length} Members
            </Text>

            {/* member scrollable view */}
            <View style={styles.groupMember}>
              <ScrollView
                style={{ flex: 0.7 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {this.showGroupMembers(selectedGroupMembers)}
              </ScrollView>
              <TouchableOpacity
                onPress={() => navigate("UserSearch")}
                style={styles.memberButton}
              >
                <Text style={styles.buttonText}>Add Members</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* content */}
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

            {this.showGroupArtefacts(selectedGroupArtefacts)}
          </View>
        </ScrollView>

        {/* toggle modal to add artefacts into groups */}
        <AddButton />
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
    textAlign: "center",
    marginTop: hp(0.02),
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
    editSelectedGroup,
    getSelectedGroup,
    getSelectedGroupAllArtefacts,
    getSelectedGroupAllMembers,
    getSelectedGroupArtefactComments
  }
)(SelectedGroup);
