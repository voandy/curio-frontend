import React, { Component } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity, Image, TextInput, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
// import style
import styles from "./registerManagerStyle";
// redux
import { C } from "../../types/registerTypes";
import {
  setName,
  setEmail,
  setPassword,
  setPasswordCfm,
  setPhotoURI,
  setRegisterStage,
  resetRegisterState,
  setUsername
} from "../../actions/registerActions";
// import { uploadImageToGCS } from "../../utils/imageUpload";
// import reusable button component
import MyButton from "../../component/MyButton";
// import entry field validators
import * as validator from "./registerValidator";
// import width/height responsive functions
import { setToBottom } from "../../utils/responsiveDesign";

// Load new page after each completed stage in sign up
class RegisterManager extends Component {
  state = {
    nameErrorMessage: "",
    emailErrorMessage: "",
    pwdErrorMessage: "",
    name: "",
    email: "",
    password: "",
    passwordCfm: ""
  };

  componentDidMount() {
    this.getPermissionAsync();
    // reset register's state so that the new user can get a fresh state
    this.props.resetRegisterState();
  }

  // camera roll permissions
  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

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

  // Skip button for photos
  skipPhotoText(photo) {
    if (photo != null) {
      return "Next";
    } else {
      return "Skip";
    }
  }

  setLocalName = name => {
    this.setState({ ...this.state, name });
  };

  setLocalEmail = email => {
    this.setState({ ...this.state, email });
  };

  setLocalPassword = password => {
    this.setState({ ...this.state, password });
  };

  setLocalPasswordCfm = passwordCfm => {
    this.setState({ ...this.state, passwordCfm });
  };

  // error handlers
  async errorName() {
    await this.setState({
      nameErrorMessage: validator.validateName(this.state.name)
    });
    // with no errors, proceed to next page
    if (!this.state.nameErrorMessage) {
      this.props.setRegisterStage(C.SET_EMAIL);
    }
  }

  async errorEmail() {
    await this.setState({
      emailErrorMessage: validator.validateEmail(this.state.email)
    });
    // with no errors, proceed to next page
    if (!this.state.emailErrorMessage) {
      this.props.setRegisterStage(C.SET_PASSWORD);
    }
  }

  async errorPassword() {
    await this.setState({
      pwdErrorMessage: validator.validatePassword(
        this.state.password,
        this.state.passwordCfm
      )
    });
    // with no errors, proceed to next page
    if (!this.state.pwdErrorMessage) {
      this.props.setRegisterStage(C.SET_PHOTO);
    }
  }

  render() {
    switch (this.props.register.register_stage) {
      case C.SET_NAME:
        return (
          <View style={styles.cardContainer}>
            {/* title */}
            <Text style={styles.inputText}>Hey, first tell us your name!</Text>

            <TextInput
              style={styles.inputField}
              placeholder="Jon Snow"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.setLocalName(val)}
              value={this.state.name}
              onSubmitEditing={() => {
                this.props.setName(this.state.name);
                this.errorName();
              }}
            />

            {this.state.nameErrorMessage !== "" && (
              <Text style={styles.error}> {this.state.nameErrorMessage} </Text>
            )}

            {setToBottom(
              <MyButton
                style={styles.nextButton}
                onPress={() => {
                  this.props.setName(this.state.name);
                  this.errorName();
                }}
                text="Next"
              />
            )}
          </View>
        );
      case C.SET_EMAIL:
        return (
          <View style={styles.cardContainer}>
            {/* title */}
            <Text style={styles.inputText}>Now, enter your email address!</Text>

            <TextInput
              style={styles.inputField}
              placeholder="abc@email.com"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.setLocalEmail(val)}
              value={this.state.email}
              onSubmitEditing={() => {
                this.props.setEmail(this.state.email);
                this.errorEmail();
              }}
            />

            {this.state.emailErrorMessage !== "" && (
              <Text style={styles.error}> {this.state.emailErrorMessage} </Text>
            )}

            {setToBottom(
              <View style={styles.buttom}>
                <TouchableOpacity
                  onPress={() => this.props.setRegisterStage(C.SET_NAME)}
                >
                  <Text style={styles.backButton}>Back</Text>
                </TouchableOpacity>

                <MyButton
                  style={styles.nextButton}
                  onPress={() => {
                    this.props.setEmail(this.state.email);
                    this.errorEmail();
                  }}
                  text="Next"
                />
              </View>
            )}
          </View>
        );
      case C.SET_PASSWORD:
        return (
          <View style={styles.cardContainer}>
            {/* Title */}
            <Text style={[styles.inputText, styles.passwordTitle]}>
              Great, create your unique password!
            </Text>

            {/* password */}
            <Text style={[styles.inputText, styles.passwordFieldTitle]}>
              {" "}
              Password:{" "}
            </Text>
            <TextInput
              style={[styles.inputField, styles.passwordField]}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.setLocalPassword(val)}
              // value={this.props.register.password}
            />

            {/* Cfm password */}
            <Text style={[styles.inputText, styles.passwordFieldTitle]}>
              {" "}
              Confirm Password:{" "}
            </Text>
            <TextInput
              style={[styles.inputField, styles.passwordField]}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.setLocalPasswordCfm(val)}
              value={this.state.passwordCfm}
            />

            {this.state.pwdErrorMessage !== "" && (
              <Text style={styles.error}> {this.state.pwdErrorMessage} </Text>
            )}

            {setToBottom(
              <View style={styles.buttom}>
                <TouchableOpacity
                  onPress={() => this.props.setRegisterStage(C.SET_EMAIL)}
                >
                  <Text style={styles.backButton}>Back</Text>
                </TouchableOpacity>

                <MyButton
                  style={styles.nextButton}
                  onPress={() => {
                    this.props.setPassword(this.state.password);
                    this.props.setPasswordCfm(this.state.passwordCfm);
                    this.errorPassword();
                  }}
                  text="Next"
                />
              </View>
            )}
          </View>
        );

      case C.SET_PHOTO:
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
                  source={require("../../../assets/images/plus-profile-pic.png")}
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
                  text={this.skipPhotoText(this.props.register.photoURI)}
                  onPress={() => this.props.onSubmit()} // moves to welcome page and will be logged in
                />
              </View>
            )}
          </View>
        );

      default:
        return (
          <View>
            <Text>error 404</Text>
          </View>
        );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  register: state.register,
  errors: state.errors,
  image: state.image
});

// connect and export
export default connect(
  mapStateToProps,
  {
    setName,
    setEmail,
    setPassword,
    setPasswordCfm,
    setPhotoURI,
    setRegisterStage,
    resetRegisterState,
    setUsername
  }
)(RegisterManager);
