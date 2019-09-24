import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

import Modal from "react-native-modal";
import DatePicker from "react-native-datepicker";
import Line from "./Line";
import * as ImagePicker from "expo-image-picker";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

class ArtefactModal extends Component {
  // access camera roll to pick an image
  _pickImage = async () => {
    // wait for user to pick an image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4]
    });
    // set imageURI in local state
    if (!result.cancelled) {
      this.setImageURI(result.uri);
    }
  };

  // Setters for all the local state passed down from Artefacts/index.js
  setDateObtained = dateObtained => {
    this.props.setNewArtefact("dateObtained", dateObtained);
  };
  setTitle = title => {
    this.props.setNewArtefact("title", title);
  };
  setCategory = category => {
    this.props.setNewArtefact("category", category);
  };
  setDescription = description => {
    this.props.setNewArtefact("description", description);
  };
  setDate = date => {
    this.props.setNewArtefact("date", date);
  };
  setImageURI = imageURI => {
    this.props.setNewArtefact("imageURI", imageURI);
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onRequestClose={() => this.props.toggleModal()}
      >
        <View style={styles.modal}>
          {/* Title */}
          <TextInput
            placeholder="Add Title"
            autoCapitalize="none"
            placeholderTextColor="#868686"
            style={[styles.title, styles.font]}
            onChangeText={value => this.setTitle(value)}
            value={this.props.newArtefact.title}
          />

          <Line />

          {/* add category  */}
          <View style={styles.inputRow}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/category.png")}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Add Category"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              style={[styles.subTitle, styles.font]}
              onChangeText={value => this.setCategory(value)}
              value={this.props.newArtefact.category}
            />
          </View>

          {/* add description */}
          <View style={styles.inputRow}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/description.png")}
            />
            <TextInput
              placeholder="Add Description"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              style={[styles.subTitle, styles.font]}
              onChangeText={value => this.setDescription(value)}
              value={this.props.newArtefact.description}
            />
          </View>

          <Line />

          {/* date */}
          <View style={styles.inputRow}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/calendar.png")}
            />
            <DatePicker
              style={{ width: 100 }}
              date={this.props.newArtefact.dateObtained}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              customStyles={{
                dateIcon: {
                  display: "none"
                },
                dateInput: {
                  borderWidth: 0,
                  fontFamily: "HindSiliguri-Bold"
                }
              }}
              onDateChange={date => this.setDateObtained(date)}
            />
          </View>

          {/* Add image button */}
          <View style={styles.imagePlaceholder}>
            <TouchableOpacity activeOpacity={0.5} onPress={this._pickImage}>
              {this.props.newArtefact.imageURI !== undefined &&
              this.props.newArtefact.imageURI !== "" ? (
                <Image
                  style={styles.imageSelected}
                  source={{ uri: this.props.newArtefact.imageURI }}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={require("../../assets/images/icons/addPicture.png")}
                />
              )}
            </TouchableOpacity>

            <Text style={[styles.imageText, styles.font]}>
              Add images of your artefacts
            </Text>
          </View>

          {/* post button */}
          <TouchableOpacity
            onPress={() => this.props.onSubmit()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    alignSelf: "center",
    width: Dimensions.get("window").width,
    height: hp(0.6),
    bottom: -25,
    position: "absolute"
  },

  font: {
    fontFamily: "HindSiliguri-Bold"
  },

  icon: {
    height: wd(0.05),
    width: wd(0.05),
    marginLeft: 30,
    marginVertical: 20,
    alignSelf: "center"
  },

  inputRow: {
    flexDirection: "row",
    width: Dimensions.get("window").width
  },

  title: {
    fontSize: 24,
    marginHorizontal: 40,
    marginTop: 30,
    marginBottom: 5,
    width: Dimensions.get("window").width * 0.8
  },

  subTitle: {
    fontSize: 14,
    marginHorizontal: 30,
    marginVertical: 20,
    width: Dimensions.get("window").width * 0.8
  },

  imagePlaceholder: {
    flex: 1,
    marginTop: 5
  },

  image: {
    alignSelf: "center",
    width: wd(0.25),
    height: wd(0.25)
  },

  imageSelected: {
    alignSelf: "center",
    width: wd(0.3),
    height: wd(0.3),
    borderRadius: 5
  },

  imageText: {
    alignSelf: "center",
    color: "#868686",
    fontSize: 14
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FF6E6E",
    height: 35,
    elevation: 4,
    marginBottom: 10,
    borderRadius: 40,
    width: Dimensions.get("window").width * 0.2
  },

  buttonText: {
    fontSize: 14,
    color: "white",
    fontFamily: "HindSiliguri-Bold"
  }
});

export default ArtefactModal;
