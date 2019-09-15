import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-native-modal";
// import DateTimePicker from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import DatePicker from 'react-native-datepicker'
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";

import Header from "../../component/Header";
import ArtefactFeed from "../../component/ArtefactFeed";
import { getUserArtefacts, createNewArtefact } from "../../actions/artefactsActions";
import { uploadImage } from "../../actions/imageActions";

// import width/height responsive functions
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd,
    setToBottom
} from "../../utils/responsiveDesign";

// object with attributes required to create a new artefact
const newArtefact = {
  title: "",
  description: "",
  category: "",
  dateObtained: "",
  imageURL: "",
};

class Artefacts extends Component {

  constructor() {
    super();
    this.state = {
      userArtefacts: {},
      newArtefact,
      isModalVisible: false,
    };
  }

  // toggle the modal for new artefact creation
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  // checks if userArtefacts is empty
  isUserArtefactsEmpty() {
    if (Object.keys(this.state.userArtefacts).length === 0) {
        return true;
    }
    return false;
  }

  async componentDidMount() {

    // get user authentication data
    const { user } = this.props.auth;
    await this.props.getUserArtefacts(user.id);
  }

  async componentWillUpdate(nextProps) {

    // sets user artefacts 
    if (this.isUserArtefactsEmpty() && nextProps.artefacts.userArtefacts !== this.state.userArtefacts) {
      await this.setState({
        userArtefacts: nextProps.artefacts.userArtefacts
      });
    }

    // sets new artefact's imageURL
    if (this.state.newArtefact.imageURL === "" && nextProps.image.imageURL !== this.state.newArtefact.imageURL) {
        await this.onImageURLChange(nextProps.image.imageURL);
        // console.log("imageURL is ", nextProps.image.imageURL);
    }
  }
  
  // return ArtefactFeedRows containing ArtefactFeed in different rows
  showArtefacts = artefacts => {
    let artefactFeedRows = [];
    let artefactFeeds = [];
    let rowKey = 0;

    // create ArtefactFeed object out of artefact and push it into artefactFeeds array
    for (var i = 0; i < artefacts.length; i++) {
        artefactFeeds.push(<ArtefactFeed key={artefacts[i]._id} image={{uri: artefacts[i].imageURLs[0]}}/>);

        // create a new row after the previous row has been filled with 3 artefacts and fill the previous row into artefactFeedRows
        if (artefactFeeds.length === 3 || i === artefacts.length-1) {
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

  postNewArtefact = () => {
    console.log("new artefact is ", this.state.newArtefact);
  }

  // change title
  onTitleChange = title => {
    this.setState({
      newArtefact: {
        ...this.state.newArtefact,
        title
      }
    });
  };

  // change description
  onDescriptionChange = description => {
    this.setState({
      newArtefact: {
        ...this.state.newArtefact,
        description
      }
    });
  };

  // change category
  onCategoryChange = category => {
    this.setState({
      newArtefact: {
        ...this.state.newArtefact,
        category
      }
    });
  };

  // change imageURL
  onImageURLChange = imageURL => {
    this.setState({
      newArtefact: {
        ...this.state.newArtefact,
        imageURL
      }
    });
  };

  // change date
  onDateObtainedChange = dateObtained => {
      this.setState({
          newArtefact: {
              ...this.state.newArtefact,
              dateObtained
          }
      })
  }

  // change imageURL
  onImageURLChange = imageURL => {
    this.setState({
        newArtefact: {
            ...this.state.newArtefact,
            imageURL
        }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header tab1="Public" tab2="Private" />

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
              placeholder="Title"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={value => this.onTitleChange(value)}
              value={this.state.newArtefact.title}
            />

            <TextInput
              placeholder="Description"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={value => this.onDescriptionChange(value)}
              value={this.state.newArtefact.description}
            />

            <TextInput
              style={styles.inputField}
              placeholder="Category"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={(value) => this.onCategoryChange(value)}
              value={this.state.newArtefact.category}
            />

            <DatePicker
                style={{width: 200}}
                date={this.state.newArtefact.dateObtained}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                // minDate="2016-05-01"
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => this.onDateObtainedChange(date)}
            />

            {/* Image button */}
            <TouchableOpacity activeOpacity={0.5} onPress={this._pickImage}>
              {/* {this.state.newArtefact.imageURL !== "" ? (
                <Image
                  style={[styles.profilePic, styles.profilePicBorder]}
                  source={{ uri: this.state.newArtefact.imageURL }}
                />
              ) : ( */}
                <Image
                  style={styles.profilePic}
                  source={require("../../../assets/images/plus-profile-pic.png")}
                />
              {/* )} */}
            </TouchableOpacity>
            
            <Button 
                title="Post Artefact" 
                onPress={() => this.postNewArtefact()}
            />
          </View>
        </Modal>
        {/****************************************************************/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // CHANGE LATER
  profilePic: {
    marginTop: 30,
    width: wd(0.3),
    height: wd(0.3),
    alignSelf: "center"
  },
  profilePicBorder: {
    borderRadius: wd(0.3) / 2
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
