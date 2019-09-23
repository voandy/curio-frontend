import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

// import redux actions for groups
import { createNewGroup, selectGroup } from "../../actions/groupsActions";
import { uploadImage } from "../../actions/imageActions";
import { uploadImageToGCS } from "../../utils/imageUpload";

// custom components
import CardCarousel from "../../component/CardCarousel";
import CardGroup from "../../component/CardGroup";
import Header from "../../component/Header";
import AddButton from "../../component/AddButton";
import GroupModal from "../../component/GroupModal";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";

// default gray colour
const gray = "#F7F7F7";

const newGroup = {
  adminId: "",
  title: "",
  description: "",
  private: true,
  imageURI: ""
};

class Groups extends Component {

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  state = {
    isModalVisible: false,
    newGroup
  };

  // CHANGE THIS LATER
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  // revert newGroup to initial state
  resetNewGroup = () => {
    this.setState({
      newGroup
    })
  }

  // new group's attribute change
  onNewGroupChange = (key, value) => {
    this.setState({
      newGroup: {
        ...this.state.newGroup,
        [key]: value
      }
    })
  }

  // post new group into the backend
  postNewGroup = async () => {
    await this.onNewGroupChange("adminId", this.props.auth.user.id);

    // upload the selected photo to GCS, which returns the url to the image
    uploadImageToGCS(this.state.newGroup.imageURI).then(imageURL => {
      // prepare the body data
      const newGroup = {
        ...this.state.newGroup,
        coverPhoto: imageURL
      };

      // save new group to redux store
      this.props.createNewGroup(newGroup);

      this.toggleModal();
      this.resetNewGroup();
    });
  }

  // click a specific group and navigate to it
  clickGroup = async (groupId) => {
    const { navigate } = this.props.navigation;

    await this.props.selectGroup(groupId);
    navigate("SelectedGroup");
  }

  // show groups that are unpinned by user
  showUnpinnedGroups = groups => {
    let unpinnedGroups = groups.concat();
    let cardGroupRows = [];
    let cardGroups = [];
    let rowKey = 0;
    let groupKey = 0;

    // remove user's pinned groups
    for (var i = 0; i < unpinnedGroups.length; i++) {
      // console.log("cover photo is", unpinnedGroups[i].coverPhoto);
    }

    // sort array based on date obtained (from earliest to oldest)
    unpinnedGroups.sort(function (a, b) {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    });

    // create CardGroup object out of group and push it into cardGroups array
    for (var i = 0; i < unpinnedGroups.length; i++) {

      cardGroups.push(
        <CardGroup
          onPress={() => this.clickGroup.bind(this)} 
          key={groupKey}  
          groupId={unpinnedGroups[i].details._id} 
          text={unpinnedGroups[i].details.title}  
          image={{ uri: unpinnedGroups[i].details.coverPhoto }}
        /> );
      groupKey++;

      // create a new row after the previous row has been filled with 2 groups and fill the previous row into cardGroupRows
      if (unpinnedGroups.length === 1 || cardGroups.length === 2 || (i !== 0 && i === unpinnedGroups.length - 1)) {
        cardGroupRows.push(<View style={styles.feed} key={rowKey}>{cardGroups}</View>)
        cardGroups = [];
        rowKey++;
      }
    }
    return <>{cardGroupRows}</>;
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{ backgroundColor: gray }}
        >
          {/* carousel pinned groups */}
          <View style={{ height: wd(0.52), backgroundColor: "white" }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate={0.8}
              snapToAlignment={"center"}
              snapToInterval={Dimensions.get("window").width}
            >
              <CardCarousel
                image={require("../../../assets/images/test-delete-this/boi1.jpg")}
              />
              <CardCarousel
                image={require("../../../assets/images/test-delete-this/boi2.jpg")}
              />
              <CardCarousel
                image={require("../../../assets/images/test-delete-this/boi3.jpg")}
              />
              <CardCarousel
                image={require("../../../assets/images/test-delete-this/boi4.jpg")}
              />
            </ScrollView>
          </View>

          {/* unpinned groups */}
          {this.props.groups.userGroups.length !== 0 ? (
            <View>{this.showUnpinnedGroups(this.props.groups.userGroups)}</View>
          ) : (
              <View style={styles.emptyFeed}>
                <Text style={{ fontSize: 16, fontFamily: "HindSiliguri-Regular" }}>Looks like you're not part of any groups yet</Text>
                <Text style={{ fontSize: 16, fontFamily: "HindSiliguri-Regular" }}>Click the "+" button to create a group</Text>
              </View>
            )}
        </ScrollView>

        {/* create new Group */}
        <AddButton onPress={this.toggleModal} />

        <GroupModal
          isModalVisible={this.state.isModalVisible}
          toggleModal={this.toggleModal}
          newGroup={this.state.newGroup}
          post={this.postNewGroup.bind(this)}
          onNewGroupChange={this.onNewGroupChange.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  feed: {
    flexDirection: "row",
  },

  emptyFeed: {
    flex: 1,
    height: Dimensions.get('window').height * 0.6,
    alignItems: "center",
    justifyContent: "center"
  },

});

Groups.propTypes = {
  createNewGroup: PropTypes.func.isRequired,
  groups: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groups: state.groups,
  auth: state.auth,
  image: state.image
});

//  connect to redux and export
export default connect(
  mapStateToProps,
  { createNewGroup, uploadImage, selectGroup }
)(Groups);
