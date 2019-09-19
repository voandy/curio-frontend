import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dimensions, StyleSheet, ScrollView, View } from "react-native";
import axios from "axios";

// custom components
import SimpleHeader from "../../component/SimpleHeader";
import ArtefactFeed from "../../component/ArtefactFeed";
import {
  getUserArtefacts,
  addNewArtefact
} from "../../actions/artefactsActions";
import ArtefactModal from "../../component/ArtefactModal";
import AddButton from "../../component/AddButton";
import { uploadImageToGCS } from "../../utils/imageUpload";

// temp state to store object with attributes required to create a new artefact
const newArtefact = {
  userId: "",
  title: "",
  description: "",
  category: "",
  dateObtained: "",
  imageURI: ""
};

class Artefacts extends Component {
  // local state
  state = {
    newArtefact: newArtefact,
    isModalVisible: false
  };

  // toggle the modal for new artefact creation
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  // new artefact's attribute change
  setNewArtefact = (key, value) => {
    this.setState({
      newArtefact: {
        ...this.state.newArtefact,
        [key]: value
      }
    });
  };

  // revert newArtefact to initial state
  resetNewArtefact = () => {
    this.setState({
      ...this.state,
      newArtefact
    });
  };

  // post new artefact to the backend
  onSubmit = async () => {
    await this.setNewArtefact("userId", this.props.auth.user.id);
    // upload the selected photo to GCS, which returns the url to the image
    uploadImageToGCS(this.state.newArtefact.imageURI).then(imageURL => {
      // prepare the body data
      const newArtefact = {
        ...this.state.newArtefact,
        imageURL: imageURL
      };
      // post to the backend to create artefact
      axios
        .post("http://curioapp.herokuapp.com/api/artefact", newArtefact)
        .then(res => {
          // add backend's response (artefact's details) to redux
          this.props.addNewArtefact(res.data);
          // close modal window and reset local state
          this.toggleModal();
          this.resetNewArtefact();
        })
        .catch(err => console.log("POST: Create New Artefact Error: " + err));
    });
  };

  // return ArtefactFeedRows containing ArtefactFeed in different rows
  showArtefacts = artefacts => {
    let artefactFeedRows = [];
    let artefactFeeds = [];
    let rowKey = 0;

    // sort array based on date obtained (from earliest to oldest)
    artefacts.sort(function(a, b) {
      return new Date(b.datePosted) - new Date(a.datePosted);
    });

    // create ArtefactFeed object out of artefact and push it into artefactFeeds array
    for (var i = 0; i < artefacts.length; i++) {
      artefactFeeds.push(
        <ArtefactFeed
          key={artefacts[i]._id}
          image={{ uri: artefacts[i].images[0].URL }}
        />
      );

      // create a new row after the previous row has been filled with 3 artefacts and fill the previous row into artefactFeedRows
      if (artefactFeeds.length === 3 || i === artefacts.length - 1) {
        artefactFeedRows.push(
          <View style={styles.feed} key={rowKey}>
            {artefactFeeds}
          </View>
        );
        artefactFeeds = [];
        rowKey++;
      }
    }
    return <>{artefactFeedRows}</>;
  };

  render() {
    return (
      <View style={styles.container}>
        <SimpleHeader title="My Artefacts" />

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {Object.keys(this.props.artefacts.userArtefacts).length !== 0 && (
            <View>
              {this.showArtefacts(this.props.artefacts.userArtefacts)}
            </View>
          )}
        </ScrollView>

        {/* create new Group */}
        <AddButton onPress={() => this.toggleModal()} />

        <ArtefactModal
          isModalVisible={this.state.isModalVisible}
          toggleModal={this.toggleModal}
          newArtefact={this.state.newArtefact}
          onSubmit={this.onSubmit.bind(this)}
          setNewArtefact={this.setNewArtefact.bind(this)}
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
    marginLeft: Dimensions.get("window").width * 0.032,
    marginRight: Dimensions.get("window").width * 0.032
  }
});

// check for prop types correctness
Artefacts.propTypes = {
  getUserArtefacts: PropTypes.func.isRequired,
  artefacts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
};

// map required redux state to local props
const mapStateToProps = state => ({
  artefacts: state.artefacts,
  auth: state.auth,
  image: state.image
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { getUserArtefacts, addNewArtefact }
)(Artefacts);
