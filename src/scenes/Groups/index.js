import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
  TextInput,
  Image,
  ActivityIndicator
} from "react-native";

// import redux actions for groups
import { createNewGroup } from "../../actions/groupsActions";
import { uploadImage } from "../../actions/imageActions";
import { uploadImageToGCS } from "../../utils/imageUpload";

// custom components
import CardCarousel from "../../component/CardCarousel";
import CardGroup from "../../component/CardGroup";
import Header from "../../component/Header";
import AddButton from "../../component/AddButton";
import GroupModal from "../../component/GroupModal";
// import Tabs from "./groupManager";

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

  // show groups that are unpinned by user
  showUnpinnedGroups = groups => {
    let unpinnedGroups = groups.concat();
    let cardGroupRows = [];
    let cardGroups = [];
    let rowKey = 0;

    // remove user's pinned groups
    for (var i = 0; i < unpinnedGroups.length; i++) {
      // console.log("cover photo is", unpinnedGroups[i].coverPhoto);
    }

    // sort array based on date obtained (from earliest to oldest)
    unpinnedGroups.sort(function(a,b){
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    });

    // create CardGroup object out of group and push it into cardGroups array
    for (var i = 0; i < unpinnedGroups.length; i++) {

      cardGroups.push(<CardGroup key={unpinnedGroups[i].details._id} text={unpinnedGroups[i].details.title}  image={{ uri: unpinnedGroups[i].details.coverPhoto }} />);
      
      // create a new row after the previous row has been filled with 2 groups and fill the previous row into cardGroupRows
      if (unpinnedGroups.length === 1 || cardGroups.length === 2 || (i !== 0 && i === unpinnedGroups.length - 1)) {
        cardGroupRows.push(<View style={styles.feed} key={i}>{cardGroups}</View>)
        cardGroups = [];
        rowKey++;
      }
    }
    return <>{cardGroupRows}</>;
  };

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
          {this.props.groups.userGroups.length !== 0 && (
            <View>{this.showUnpinnedGroups(this.props.groups.userGroups)}</View>
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
  // CHANGE THIS LATER
  inputField: {
    textAlign: "center",
    width: wd(0.7),
    height: hp(0.05),
    marginTop: 20,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    fontSize: 16,
    alignSelf: "center"
  },

  container: {
    flex: 1
  },

  feed: {
    flexDirection: "row",
    marginLeft: Dimensions.get("window").width * 0.032,
    marginRight: Dimensions.get("window").width * 0.032
  },

  header: {
    height: 130,
    elevation: 2,
    borderRadius: 1
  },

  headerText: {
    fontSize: 24,
    marginTop: 40,
    marginLeft: 30,
    fontWeight: "bold"
  },

  headerButton: {
    alignContent: "center",
    marginTop: 20,
    marginLeft: 30,
    padding: 5,
    borderColor: "#FF6E6E",
    borderWidth: 0,
    borderBottomWidth: 3,
    justifyContent: "center"
  },

  headerButtonText: {
    fontSize: 18,
    fontWeight: "bold"
  },

  mainGroupContainer: {
    height: wd(0.3),
    top: 0,
    position: "absolute",
    backgroundColor: "#E2E2E2"
  },

  titleText: {
    fontSize: 30,
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wd(0.07),
    fontFamily: "HindSiliguri-Bold"
  },

  unpinned: {
    flexDirection: "row"
  },

  unpinnedLeft: {
    flex: 0.5,
    marginLeft: Dimensions.get("window").width * 0.05
  },

  unpinnedRight: {
    alignItems: "flex-end",
    flex: 0.5,
    marginRight: Dimensions.get("window").width * 0.05
  }
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
  { createNewGroup, uploadImage }
)(Groups);
