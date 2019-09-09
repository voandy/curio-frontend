import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
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

// import {
//   getName,
//   getEmail,
//   getPassword,
//   getPhoto
// } from "../../actions/registerActions";

// import all register Constants
import { C } from "../../actions/registerTypes";

// import reusable button component
import MyButton from "../../component/MyButton";

// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";

// Load new page after each completed stage in sign up
class RegisterManager extends Component {
  componentDidMount() {
    this.getPermissionAsync();
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

  render() {
    switch (this.props.registerStage) {
      case C.GET_NAME:
        return (
          <View style={styles.cardContainer}>
            {/* title */}
            <Text style={styles.inputText}>Hey, first tell us your name!</Text>

            <TextInput
              style={styles.inputField}
              placeholder="Jon Snow"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.props.nameHandler(val)}
              value={this.props.name}
            />

            {setToBottom(
              <MyButton
                style={styles.nextButton}
                onPress={() => this.props.stageHandler(C.GET_EMAIL)}
                text="Next"
              />
            )}
          </View>
        );
      case C.GET_EMAIL:
        return (
          <View style={styles.cardContainer}>
            {/* title */}
            <Text style={styles.inputText}>Now, enter your email address!</Text>

            <TextInput
              style={styles.inputField}
              placeholder="abc@email.com"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.props.emailHandler(val)}
              value={this.props.email}
            />

            {/* <Text style={styles.error}> {errors.email} </Text> */}

            {setToBottom(
              <View style={styles.buttom}>
                <TouchableOpacity
                  onPress={() => this.props.stageHandler(C.GET_NAME)}
                >
                  <Text style={styles.backButton}>Back</Text>
                </TouchableOpacity>

                <MyButton
                  style={styles.nextButton}
                  onPress={() => this.props.stageHandler(C.GET_PASSWORD)}
                  text="Next"
                />
              </View>
            )}
          </View>
        );
      case C.GET_PASSWORD:
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
              onChangeText={val => this.props.passwordHandler(val)}
              value={this.props.password}
            />

            {/* <Text style={styles.error}> {errors.password} </Text> */}

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
              // onChangeText={val => this.onChangeText("passwordCfm", val)}
            />

            {/* <Text style={styles.error}> {errors.passwordCfm} </Text> */}

            {setToBottom(
              <View style={styles.buttom}>
                <TouchableOpacity
                  onPress={() => this.props.stageHandler(C.GET_EMAIL)}
                >
                  <Text style={styles.backButton}>Back</Text>
                </TouchableOpacity>

                <MyButton
                  style={styles.nextButton}
                  onPress={() => this.props.stageHandler(C.GET_PHOTO)}
                  text="Next"
                />
              </View>
            )}
          </View>
        );

      case C.GET_PHOTO:
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
                  source={{ uri: this.props.photoURL }}
                />
              ) : (
                <Image
                  style={styles.profilePic}
                  source={require("../../../assets/images/default-profile-pic.png")}
                />
              )}
            </TouchableOpacity>

            {setToBottom(
              <View style={styles.buttom}>
                <TouchableOpacity
                  onPress={() => this.props.stageHandler(C.GET_PASSWORD)}
                >
                  <Text style={styles.backButton}>Back</Text>
                </TouchableOpacity>

                <MyButton
                  style={styles.nextButton}
                  onPress={() => this.props.stageHandler(C.LAST_STAGE)}
                  // text="Next"
                  text={this.skipPhotoText(this.props.photoURL)}
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
  // switch (register_stage) {
  //   case C.GET_NAME:
  //     return (
  //       <View>
  //         {/* name */}
  //         <Text style={styles.inputText}> Hey, first tell us your name! </Text>
  //         <TextInput
  //           style={styles.input}
  //           placeholder="Jon Snow"
  //           autoCapitalize="none"
  //           placeholderTextColor="#868686"
  //           onChangeText={val => this.props.nameHandler(val)}
  //         />
  //         {/* <Text style={styles.error}> {errors.name} </Text> */}
  //       </View>
  //     );
  // case 1:
  //   return (
  //     <View>
  //       {/* email */}
  //       <Text style={styles.inputText}> Now, enter your email address! </Text>
  //       <TextInput
  //         style={styles.input}
  //         placeholder="abc@email.com"
  //         autoCapitalize="none"
  //         placeholderTextColor="#868686"
  //         onChangeText={val => this.onChangeText("email", val)}
  //       />
  //       {/* <Text style={styles.error}> {errors.email} </Text> */}
  //     </View>
  //   );
  // case 2:
  //   return (
  //     <View>
  //       <Text style={[styles.inputText, styles.passwordTitle]}>
  //         {" "}
  //         Great, create your unique password!{" "}
  //       </Text>

  //       {/* password */}
  //       <Text style={[styles.inputText, styles.password]}> Password: </Text>
  //       <TextInput
  //         style={styles.input}
  //         secureTextEntry={true}
  //         autoCapitalize="none"
  //         placeholderTextColor="#868686"
  //         onChangeText={val => this.onChangeText("password", val)}
  //       />
  //       {/* <Text style={styles.error}> {errors.password} </Text> */}

  //       {/* Cfm password */}
  //       <Text style={[styles.inputText, styles.password]}>
  //         {" "}
  //         Confirm Password:{" "}
  //       </Text>
  //       <TextInput
  //         style={styles.input}
  //         secureTextEntry={true}
  //         autoCapitalize="none"
  //         placeholderTextColor="#868686"
  //         onChangeText={val => this.onChangeText("passwordCfm", val)}
  //       />
  //       {/* <Text style={styles.error}> {errors.passwordCfm} </Text> */}
  //     </View>
  //   );
  // case 3:
  //   return <View></View>;
  //   default:
  //     return (
  //       <View>
  //         <Text>error 404</Text>
  //       </View>
  //     );
  // }
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
  }

  // error: {
  //   color: "red"
  // }
});

export default RegisterManager;
