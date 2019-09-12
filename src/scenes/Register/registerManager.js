import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Text
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

// redux
import { connect } from "react-redux";
import { C } from "../../types/registerTypes";
import { setName, setEmail, setPassword, setPasswordCfm, setPhotoURL, setRegisterStage } from "../../actions/registerActions";

// import reusable button component
import MyButton from "../../component/MyButton";

// import entry field validators
import {
  validateName,
  validateEmail,
  validatePassword
} from "./registerValidator";

// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";

// Load new page after each completed stage in sign up
class RegisterManager extends Component {
  state = {
    nameErrorMessage: "",
    emailErrorMessage: "",
    pwdErrorMessage: ""
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  componentWillUpdate(nextProps) {


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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4]
    });

    // set image
    if (!result.cancelled) {
      this.props.photoURLHandler(result.uri);
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

  // error handlers
  async errorName() {
    
    this.setState({
      nameErrorMessage: await validateName(this.props.register.name)
    });

    // with no errors, proceed to next page
    if (this.state.nameErrorMessage === null) {
      this.props.setRegisterStage(C.SET_EMAIL);
    }
  }

  async errorEmail() {
    this.setState({
      emailErrorMessage: await validateEmail(this.props.email)
    });

    // with no errors, proceed to next page
    if (this.state.emailErrorMessage === "") {
      this.props.setRegisterStage(C.SET_PASSWORD);
    }
  }

  async errorPassword() {
    this.setState({
      pwdErrorMessage: await validatePassword(
        this.props.register.password,
        this.props.register.passwordCfm
      )
    });

    // with no errors, proceed to next page
    if (this.state.pwdErrorMessage === "") {
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
              onChangeText={val => this.props.setName(val)}
              value={this.props.register.name}
              onSubmitEditing={() => this.errorName()}
            />

            {this.state.nameErrorMessage !== "" && (
              <Text style={styles.error}> {this.state.nameErrorMessage} </Text>
            )}

            {setToBottom(
              <MyButton
                style={styles.nextButton}
                onPress={() => this.errorName()}
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
              onChangeText={val => this.props.setEmail(val)}
              value={this.props.register.email}
              onSubmitEditing={() => this.errorEmail()}
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
                  onPress={() => this.errorEmail()}
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
              onChangeText={val => this.props.setPassword(val)}
              value={this.props.register.password}
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
              onChangeText={val => this.props.setPasswordCfm(val)}
              value={this.props.register.passwordCfm}
              onSubmitEditing={() => this.errorPassword()}
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
                  onPress={() => this.errorPassword()}
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
              {this.props.photoURL != null ? (
                <Image
                  style={[styles.profilePic, styles.profilePicBorder]}
                  source={{ uri: this.props.register.photoURL }}
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
                  text={this.skipPhotoText(this.props.register.photoURL)}
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

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    padding: wd(0.05)
  },

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

  inputText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: hp(0.026)
  },

  passwordTitle: {
    marginBottom: hp(0.024),
    fontSize: hp(0.024)
  },

  photoMainTitle: {
    fontWeight: "bold",
    fontSize: hp(0.028),
    marginBottom: hp(0.02)
  },

  photoSubTitle: {
    fontWeight: "bold",
    fontSize: hp(0.024)
  },

  passwordFieldTitle: {
    fontSize: hp(0.022),
    alignSelf: "flex-start",
    marginLeft: wd(0.015)
  },

  passwordField: {
    marginTop: hp(0.01),
    fontSize: hp(0.02),
    height: hp(0.03),
    marginBottom: hp(0.05)
  },

  profilePic: {
    marginTop: 30,
    width: wd(0.3),
    height: wd(0.3),
    alignSelf: "center"
  },

  profilePicBorder: {
    borderRadius: wd(0.3) / 2
  },

  buttom: {
    alignSelf: "center",
    flexDirection: "row",
    width: wd(0.7935),
    alignItems: "center",
    justifyContent: "space-between"
  },

  backButton: {
    fontSize: hp(0.022),
    alignSelf: "center",
    marginLeft: wd(0.03),
    textDecorationLine: "underline",
    color: "#FF6E6E",
    fontFamily: "HindSiliguri-Regular"
  },

  nextButton: {
    alignSelf: "flex-end"
  },

  error: {
    color: "red",
    alignSelf: "center"
  }
});


const mapStateToProps = state => ({
  auth: state.auth,
  register: state.register,
  errors: state.errors
});


const mapDispatchToProps = dispatch => {
  return {
    setName: () => {
      dispatch(setName());
    },
    setEmail: () => {
      dispatch(setEmail());
    },
    setPassword: () => {
      dispatch(setPassword());
    },
    setPasswordCfm: () => {
      dispatch(setPasswordCfm());
    },
    setPhotoURL: () => {
      dispatch(setPhotoURL());
    },
    setRegisterStage: () => {
      dispatch(setRegisterStage());
    }
  };
};

// connect and export
export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(RegisterManager);
