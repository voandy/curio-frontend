import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../style";
import { C } from "../../../types/registerTypes";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';

// redux state
import {
  setPhotoURI,
  setRegisterStage
} from "../../../actions/registerActions";
// import reusable button component
import MyButton from "../../../component/MyButton";
import { setToBottom } from "../../../utils/responsiveDesign";

export class RegisterPhotoField extends Component {
  // access camera roll to pick an image
  _pickImage = async () => {
    // wait for user to pick an image
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4]
    });
    // set imageURI in local state
    if (!response.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        response.uri,
        [{ resize: { width: 1024} }],
        { format: 'jpeg', compress: 0.5 }
      );
      this.setImageURI(manipResult.uri);
    }
  };

  render() {
    return (
      <View style={styles.cardContainer}>
        {/* Title */}
        <Text style={styles.photoMainTitle}>Almost there!</Text>
        <Text style={styles.photoSubTitle}>
          Take a minute to upload a photo.
        </Text>

        {/* Image button */}
        <TouchableOpacity activeOpacity={0.5} onPress={this._pickImage}>
          {this.props.register.photoURI ? (
            <Image
              style={[styles.profilePic, styles.profilePicBorder]}
              source={{ uri: this.props.register.photoURI }}
            />
          ) : (
            <Image
              style={styles.profilePic}
              source={require("../../../../assets/images/plus-profile-pic.png")}
            />
          )}
        </TouchableOpacity>

        {/* back button + skip/next button */}
        {setToBottom(
          <View style={styles.buttom}>
            <TouchableOpacity
              onPress={() => this.props.setRegisterStage(C.SET_PASSWORD)}
            >
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>

            <MyButton
              style={styles.nextButton}
              text={this.props.register.photoURI ? "Submit" : "Skip"}
              onPress={() => this.props.onSubmit()} // moves to welcome page and will be logged in
            />
          </View>
        )}
      </View>
    );
  }
}

// map required redux state to local props
const mapStateToProps = state => ({
  register: state.register
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { setPhotoURI, setRegisterStage }
)(RegisterPhotoField);
