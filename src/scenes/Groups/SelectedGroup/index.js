import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GroupOptionButton from "../../../component/GroupOptionButton";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// import redux actions for groups
import { 
  editSelectedGroup,
} from "../../../actions/groupsActions";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../../utils/responsiveDesign";

// custom components
import GroupModal from "../../../component/GroupModal";

class SelectedGroup extends Component {
  

    state = {
      selectedGroup: {
        ...this.props.groups.selectedGroup,
        coverPhoto: this.props.groups.selectedGroup.coverPhoto
      },
      isUpdateModalVisible: false,
      loading: false
    };

  // nav details
  static navigationOptions = {
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // return a row of group members 
  showGroupMembers = groupMembers => {
    let groupMemberRows = [];
    let groupMemberFeeds = [];
    let rowKey = 0;
    let groupMemberKey = 0;

    for (var i = 0; i < groupMembers.length; i++) {

      // append group members into array
      groupMemberFeeds.push(
        <View style={styles.card} key={groupMemberKey}>
          <TouchableOpacity
            activeOpacity={0.5}
          >
            <Image
              style={styles.photo}
              source={{ uri: groupMembers[i].details.profilePic }}
            />
            <Text> {groupMembers[i].details.name} </Text>
          </TouchableOpacity>
        </View>
      );
      groupMemberKey++;
    }

    // create a row out of the array of group members
    groupMemberRows.push(
      <View style={styles.feed} key={rowKey}>
        {groupMemberFeeds}
      </View>
    );   
    return <>{groupMemberRows}</>;
  };

  // return a row of group artefacts 
  showGroupArtefacts = groupArtefacts => {
    let groupArtefactRows = [];
    let groupArtefactFeeds = [];
    let rowKey = 0;
    let groupArtefactKey = 0;

    for (var i = 0; i < groupArtefacts.length; i++) {

      // append group artefacts into array
      groupArtefactFeeds.push(
        <View style={styles.card} key={groupArtefactKey}>
          <TouchableOpacity
            activeOpacity={0.5}
          >
            <Image
              style={styles.photo}
              source={{ uri: groupArtefacts[i].details.images[0].URL }}
            />
            <Text> title: {groupArtefacts[i].details.title} </Text>
            <Text> description: {groupArtefacts[i].details.description} </Text>
            <Text> category: {groupArtefacts[i].details.category} </Text>
            <Text> dateObtained {groupArtefacts[i].details.dateObtained} </Text>
          </TouchableOpacity>
        </View>
      );
      groupArtefactKey++;
    }

    // create a row out of the array of group artefacts
    groupArtefactRows.push(
      <View style={styles.feed} key={rowKey}>
        {groupArtefactFeeds}
      </View>
    );   
    return <>{groupArtefactRows}</>;
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
    console.log("selectedGroup", this.props.groups.selectedGroup);
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

    return (
      <View style={styles.container}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
        >
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

          <Text style={styles.title}> Group Information </Text>

            <Text> coverPhoto: </Text>
              <Image style={[styles.photo]} source={{ uri: coverPhoto }} />

            <Text> title: {title} </Text>
            <Text> description: {description} </Text>
            <Text> dateCreated: {dateCreated} </Text>
          
          <Text style={styles.title}> Members </Text>
            {this.showGroupMembers(selectedGroupMembers)}

          <Text style={styles.title}> Artefacts </Text>
            {this.showGroupArtefacts(selectedGroupArtefacts)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // TEMPORARY STYLES
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  photo: {
    width: wd(0.435),
    height: wd(0.35),
    marginTop: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  feed: {
    flexDirection: "column",
    marginLeft: wd(0.032),
    marginRight: wd(0.032)
  },
});

SelectedGroup.propTypes = {
  groups: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  groups: state.groups,
});

//  connect to redux and export
export default connect(
  mapStateToProps,
  { editSelectedGroup }
)(SelectedGroup);
