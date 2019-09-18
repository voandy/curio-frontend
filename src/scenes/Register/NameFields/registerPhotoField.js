import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../style";
import { C } from "../../../types/registerTypes";
import * as ImagePicker from "expo-image-picker";

import {
  setPhotoURI,
  setRegisterStage
} from "../../../actions/registerActions";
// import reusable button component
import MyButton from "../../../component/MyButton";
import { setToBottom } from "../../../utils/responsiveDesign";

export class RegisterPhotoField extends Component {
  // access camera roll
  _pickImage = async () => {
    // obtain image
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4]
    });
    // set image
    if (!response.cancelled) {
      this.props.setPhotoURI(response.uri);
      // this.props.setphotoURI(uploadImageToGCS(response.uri));
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

const mapStateToProps = state => ({
  register: state.register
});

export default connect(
  mapStateToProps,
  { setPhotoURI, setRegisterStage }
)(RegisterPhotoField);
