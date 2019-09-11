import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserArtefacts } from "../../actions/artefactsActions";
import Modal from "react-native-modal";

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  Button,
  TextInput
} from "react-native";

//  custom components
import Header from "../../component/Header";
import ArtefactFeed from "../../component/ArtefactFeed";

// CHANGE THIS LATER
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";

const newArtefact = {
  title: "",
  description: "",
  category: ""
};

class Artefacts extends Component {
  // CHANGE THIS LATER
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  constructor() {
    super();
    this.state = {
      userArtefacts: {},
      isModalVisible: false,
      newArtefact
    };
  }

  async componentDidMount() {
    // get user authentication data
    const { user } = this.props.auth;
    await this.props.getUserArtefacts(user.id);
  }

  async componentWillUpdate(nextProps) {
    if (Object.keys(this.state.userArtefacts).length === 0) {
      await this.setState({
        userArtefacts: nextProps.artefacts.userArtefacts
      });
    }
  }

  showArtefacts = artefacts => (
    <>
      {artefacts.map(artefact => (
        <ArtefactFeed
          key={artefact._id}
          image={{ uri: artefact.imageURLs[0] }}
        />
      ))}
    </>
  );

  onTitleChange = title => {
    this.setState({
      newArtefact: {
        ...this.state.newArtefact,
        title
      }
    });
  };

  onDescriptionChange = description => {
    this.setState({
      newArtefact: {
        ...this.state.newArtefact,
        description
      }
    });
  };

  onCategoryChange = category => {
    this.setState({
      newArtefact: {
        ...this.state.newArtefact,
        category
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Artefacts" tab1="All" tab2="Mine" />

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {Object.keys(this.state.userArtefacts).length !== 0 && (
            <View>{this.showArtefacts(this.state.userArtefacts)}</View>
          )}
        </ScrollView>

        {/*********************** CHANGE THIS LATER ********************/}
        {/* create new Group */}
        <Button title="Post New Artefact" onPress={this.toggleModal} />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <Button title="Close" onPress={this.toggleModal} />

            <TextInput
              style={styles.inputField}
              placeholder="Title"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={() => this.onTitleChange()}
              value={this.state.newArtefact.title}
            />

            <TextInput
              style={styles.inputField}
              placeholder="Description"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={() => this.onDescriptionChange()}
              value={this.state.newArtefact.description}
            />

            <TextInput
              style={styles.inputField}
              placeholder="Category"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={() => this.onCategoryChange()}
              value={this.state.newArtefact.category}
            />

            <Button title="Post Artefact" />
          </View>
        </Modal>
        {/****************************************************************/}
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

  titleText: {
    fontSize: 30,
    marginTop: 250,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.07,
    fontFamily: "HindSiliguri-Bold"
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6E6E",
    width: Dimensions.get("window").width * 0.4,
    height: 50,
    margin: 10,
    borderRadius: 540,
    elevation: 3
  }
});

Artefacts.propTypes = {
  getUserArtefacts: PropTypes.func.isRequired,
  artefacts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  artefacts: state.artefacts,
  auth: state.auth
});

// export
export default connect(
  mapStateToProps,
  { getUserArtefacts }
)(Artefacts);
