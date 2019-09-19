import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Text
} from "react-native";

// custom components
import SimpleHeader from "../../component/SimpleHeader";
import ArtefactFeed from "../../component/ArtefactFeed";
import {
  getUserArtefacts,
  addNewArtefact
} from "../../actions/artefactsActions";
import { uploadImage } from "../../actions/imageActions";
import ArtefactModal from "../../component/ArtefactModal";
import AddButton from "../../component/AddButton";
import { uploadImageToGCS } from "../../utils/imageUpload";

// object with attributes required to create a new artefact
const newArtefact = {
  userId: "",
  title: "",
  description: "",
  category: "",
  dateObtained: "",
  imageURI: ""
};

class Artefacts extends Component {
  state = {
    newArtefact: newArtefact,
    isModalVisible: false
  };

  async componentWillUpdate(nextProps) {
    // sets new artefact's imageURI
    if (nextProps.image.imageURI !== this.props.image.imageURI) {
      await this.setNewArtefact("imageURI", nextProps.image.imageURI);
    }
  }

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

  // post new artefact into My Artefacts scene
  onSubmit = async () => {
    await this.setNewArtefact("userId", this.props.auth.user.id);
    uploadImageToGCS(this.state.newArtefact.imageURI).then(imageURL => {
      const newArtefact = {
        ...this.state.newArtefact,
        imageURL: imageURL
      };
      axios
        .post("http://curioapp.herokuapp.com/api/artefact", newArtefact)
        .then(res => {
          this.props.addNewArtefact(res.data);
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
        <AddButton onPress={this.toggleModal} />

        <ArtefactModal
          isModalVisible={this.state.isModalVisible}
          toggleModal={this.toggleModal}
          uploadImage={this.props.uploadImage}
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

Artefacts.propTypes = {
  getUserArtefacts: PropTypes.func.isRequired,
  artefacts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  artefacts: state.artefacts,
  auth: state.auth,
  image: state.image
});

// export
export default connect(
  mapStateToProps,
  { getUserArtefacts, uploadImage, addNewArtefact }
)(Artefacts);
