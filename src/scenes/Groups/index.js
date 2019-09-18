import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-native-modal";
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

// custom components
import CardCarousel from "../../component/CardCarousel";
import CardGroup from "../../component/CardGroup";
import Header from "../../component/Header";
import AddButton from "../../component/AddButton";
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
  coverPhoto: ""
};

class Groups extends Component {
  // CHANGE THIS LATER
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  state = {
    isModalVisible: false,
    newGroup
  };

  showUnpinnedGroups = groups => {
    console.log(groups);
    // let unpinnedGroups = groups.concat();
    // let cardGroupRows = [];
    // let cardGroups = [];
    // let rowKey = 0;

    // remove user's pinned groups
    // for (var i = 0; i < unpinnedGroups.length; i++) {
    //   console.log(unpinnedGroups[i]);
    // }

    // // sort array based on date obtained (from earliest to oldest)
    // groups.sort(function(a,b){
    //   return new Date(b.dateCreated) - new Date(a.dateCreated);
    // });

    // // create ArtefactFeed object out of artefact and push it into artefactFeeds array
    // for (var i = 0; i < artefacts.length; i++) {
    //   artefactFeeds.push(<ArtefactFeed key={artefacts[i]._id} image={{ uri: artefacts[i].imageURLs[0] }} />);

    //   // create a new row after the previous row has been filled with 3 artefacts and fill the previous row into artefactFeedRows
    //   if (artefactFeeds.length === 3 || i === artefacts.length - 1) {
    //     artefactFeedRows.push(<View style={styles.feed} key={rowKey}>{artefactFeeds}</View>)
    //     artefactFeeds = [];
    //     rowKey++;
    //   }
    // }
    // return <>{artefactFeedRows}</>;
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
          <View style={styles.unpinned}>
            {this.props.groups.userGroups.length !== 0 && (
              <View><Text>{this.showUnpinnedGroups(this.props.groups.userGroups)}</Text></View>
            )}
          </View>

          {/* <View style={styles.unpinnedLeft}>
            <CardGroup text="You can't fail if you dont enroll" userName="Bob" image={require("../../../assets/images/test-delete-this/boi1.jpg")} />
            <CardGroup text="CooooCOCOCOOOLD" userName="Jon Snow" image={require("../../../assets/images/test-delete-this/boi5.png")} />
          </View>
          <View style={styles.unpinnedRight}>
            <CardGroup text="OWH" userName="Pikaso" image={require("../../../assets/images/test-delete-this/boi3.jpg")} />
          </View> */}
        </ScrollView>

        {/*********************** CHANGE THIS LATER ********************/}
        {/* create new Group */}
        <AddButton onPress={this.toggleModal} />

        <Modal isVisible={this.state.isModalVisible} onRequestClose={this.toggleModal}>
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <Button title="Close" onPress={this.toggleModal} />

            <TextInput
              style={styles.inputField}
              placeholder="Title"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.props.nameHandler(val)}
              value={this.props.name}
            />

            <TextInput
              style={styles.inputField}
              placeholder="Description"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.props.nameHandler(val)}
              value={this.props.name}
            />

            <Button title="Create Group" />
          </View>
        </Modal>
        {/****************************************************************/}

        {/* <Tabs /> */}
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
