import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import DatePicker from 'react-native-datepicker';
import { FloatingAction } from 'react-native-floating-action';

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
import SimpleHeader from "../../component/SimpleHeader"
import ArtefactFeed from "../../component/ArtefactFeed";
import { getUserArtefacts, createNewArtefact } from "../../actions/artefactsActions";
import { uploadImage } from "../../actions/imageActions";
import ArtefactModal from "../../component/ArtefactModal";
import AddButton from "../../component/AddButton";

// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";

// object with attributes required to create a new artefact
const newArtefact = {
  userId: "",
  title: "",
  description: "",
  category: "",
  dateObtained: "",
  imageURL: "",
};


class Artefacts extends Component {
  state = {
    newArtefact: newArtefact,
    isModalVisible: false,
  }

  // toggle the modal for new artefact creation
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  // revert newArtefact to initial state
  resetNewArtefact = () => {
    this.setState({
      newArtefact
    })
  }

  async componentWillUpdate(nextProps) {

    // sets new artefact's imageURL
    if (nextProps.image.imageURL !== this.props.image.imageURL) {
      await this.onNewArtefactChange("imageURL", nextProps.image.imageURL);
    }
  }

  // return ArtefactFeedRows containing ArtefactFeed in different rows
  showArtefacts = artefacts => {
    let artefactFeedRows = [];
    let artefactFeeds = [];
    let rowKey = 0;

    // sort array based on date obtained (from earliest to oldest)
    artefacts.sort(function (a, b) {
      return new Date(b.datePosted) - new Date(a.datePosted);
    });

    // create ArtefactFeed object out of artefact and push it into artefactFeeds array
    for (var i = 0; i < artefacts.length; i++) {
      artefactFeeds.push(<ArtefactFeed key={artefacts[i]._id} image={{ uri: artefacts[i].images[0].URL }} />);

      // create a new row after the previous row has been filled with 3 artefacts and fill the previous row into artefactFeedRows
      if (artefactFeeds.length === 3 || i === artefacts.length - 1) {
        artefactFeedRows.push(<View style={styles.feed} key={rowKey}>{artefactFeeds}</View>)
        artefactFeeds = [];
        rowKey++;
      }
    }
    return <>{artefactFeedRows}</>;
  }

  // access camera roll
  _pickImage = async () => {
    // obtain image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4]
    });

    // set image
    if (!result.cancelled) {
      // upload image to Google Cloud Storage
      await this.props.uploadImage(result.uri);
    }
  };

  // post new artefact into My Artefacts scene
  postNewArtefact = async () => {
    await this.onNewArtefactChange("userId", this.props.auth.user.id);

    // save new artefact to redux store
    await this.props.createNewArtefact(this.state.newArtefact);

    this.toggleModal();
    this.resetNewArtefact();
  }

  // new artefact's attribute change
  onNewArtefactChange = (key, value) => {

    this.setState({
      newArtefact: {
        ...this.state.newArtefact,
        [key]: value
      }
    })
  }


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
            <View>{this.showArtefacts(this.props.artefacts.userArtefacts)}</View>
          )}
        </ScrollView>

        {/* create new Group */}
        <AddButton onPress={this.toggleModal} />

        <ArtefactModal
          isModalVisible={this.state.isModalVisible}
          toggleModal={this.toggleModal}
          dateObtained={this.state.newArtefact.dateObtained}
          pickImage={this._pickImage}

          title={this.state.newArtefact.title}
          category={this.state.newArtefact.category}
          description={this.state.newArtefact.description}
          date={this.state.newArtefact.dateObtained}
          imageURL={this.state.newArtefact.imageURL}
          post={this.postNewArtefact}
          
          onNewArtefactChange={this.onNewArtefactChange}
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
  },
});


Artefacts.propTypes = {
  getUserArtefacts: PropTypes.func.isRequired,
  createNewArtefact: PropTypes.func.isRequired,
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
  { getUserArtefacts, createNewArtefact, uploadImage }
)(Artefacts);
