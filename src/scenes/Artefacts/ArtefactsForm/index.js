import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Picker
} from "react-native";

// redux actions
import {
  createNewArtefacts,
  editSelectedArtefact
} from "../../../actions/artefactsActions";

import { addArtefactToGroup } from "../../../actions/groupsActions";
import { validator } from "./artefactFormValidator";
import DatePicker from "react-native-datepicker";
import KeyboardShift from "../../../component/componentHelpers/KeyboardShift";

// expo image modules
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../../utils/responsiveDesign";

// import the loader modal to help show loading process
import ActivityLoaderModal from "../../../component/ActivityLoaderModal";
// custom components
import MySmallerButton from "../../../component/MySmallerButton";

// temp state to store object with attributes required to create a new artefact
const newArtefact = {
  userId: "",
  title: "",
  description: "",
  category: "Art",
  dateObtained: "",
  imageURI: "",
  privacy: 1
};

class ArtefactsForm extends Component {
  constructor(props) {
    super(props);
    // extract artefact details if selectedArtefact is passed in
    const selectedArtefact = this.props.navigation.getParam("selectedArtefact");
    // setup initial state
    this.state = {
      artefact: {
        ...newArtefact,
        // add & replace artefact details if selectedArtefact is passed in
        // otherwise, it will not replace anything
        ...selectedArtefact,
        userId: this.props.auth.user.id
      },
      loading: false,
      errors: {
        imageError: "",
        titleError: "",
        categoryError: "",
        descriptionError: "",
        dateObtainedError: ""
      }
    };
  }

  // nav details
  static navigationOptions = {
    title: "Add New Artefact",
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // new artefact's attribute change
  setArtefact = (key, value) => {
    this.setState({
      artefact: {
        ...this.state.artefact,
        [key]: value
      }
    });
  };

  // revert newArtefact to initial state
  resetArtefact = () => {
    this.setState({
      artefact: {
        ...newArtefact,
        userId: this.props.auth.user.id
      }
    });
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      loading
    });
  };

  // Setters for all the local state for newArtefacts
  setDateObtained = dateObtained => {
    this.setArtefact("dateObtained", dateObtained);
  };
  setTitle = title => {
    this.setArtefact("title", title);
  };
  setCategory = category => {
    this.setArtefact("category", category);
  };
  setDescription = description => {
    this.setArtefact("description", description);
  };
  setImageURI = imageURI => {
    this.setArtefact("imageURI", imageURI);
  };
  setPrivacy = privacy => {
    this.setArtefact("privacy", privacy);
  };

  // use Promise at setState callback to ensure load sequence
  validateField(errorField, inputField) {
    // extract field name and value
    let field = Object.keys(inputField)[0];
    let value = Object.values(inputField)[0];
    // set local error states
    return this.setState(
      state => {
        return {
          errors: {
            ...state.errors,
            [errorField]: validator(field, value)
          }
        };
      },
      () => Promise.resolve(true)
    );
  }

  // validate inputs make sure no fields are empty
  //prettier-ignore
  validateAllFields = () => {
    const { title, imageURI, category, description, dateObtained } = this.state.artefact;
    // validates against all field at the same time
    Promise.all([
      this.validateField("titleError", {title}),
      this.validateField("imageError", {imageURI}),
      this.validateField("categoryError", {category}),
      this.validateField("descriptionError", {description}),
      this.validateField("dateObtainedError", {dateObtained})
    ]).then(() => {
      // done, can check the state now
      console.log("error is->", this.state.errors);

      // -- complete the logic here -- //
      // checkForAllErrors, return true if every thing is good, if any error araises, return false

      // valid inputs
    //   if (
    //     this.state.imageError != "" ||
    //     this.state.titleError != "" ||
    //     this.state.descriptionError != "" ||
    //     this.state.categoryError != "" ||
    //     this.state.dateError != ""
    //   ) {
    //     return false;
    //   }
    //   // invalid inputs
    //   else {
    //     return true;
    //   }
      // dummy return logic now
      return false;
    })
  };

  //prettier-ignore
  onSubmit = () => {
    const { navigate } = this.props.navigation;
    // extract required parameters
    const { origin, isEditMode, addToGroup, groupId } = this.props.navigation.state.params;
    // validates all field field
    // if it return false (gt errors)
    // wait for it to complete first (await)
    if (!this.validateAllFields()) {
      console.log("input invalid")
      // early return
      return;
    }
    console.log("submit!")
    // all fields are valid //
    // show user the loading modal
    this.setLoading(true);
    // use appropriate action based on current page mode (either editing or creating)
    (() => {
      return isEditMode
        ? this.props.editSelectedArtefact(this.state.artefact)
        : this.props.createNewArtefacts(this.state.artefact).then(res => {
          // check if it should add the artefact to group
          return addToGroup
            ? this.props.addArtefactToGroup(groupId, res.data._id)
            : Promise.resolve();
        });
    })()
      .then(() => {
        // stop showing user the loading modal
        this.setLoading(false);
        // reset new artefacts details
        this.resetArtefact();
        // navigate back to origin
        navigate(origin);

      })
      .catch(err => {
        // stop showing user the loading modal
        this.setLoading(false);
        // show error response
        console.log(err.response.data);
      });

  };

  // access camera roll to pick an image
  _pickImage = async () => {
    // wait for user to pick an image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true
    });
    // set imageURI in local state
    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 1024 } }],
        { format: "jpeg", compress: 0.5 }
      );
      this.setImageURI(manipResult.uri);
    }
  };

  render() {
    // extract selected artefact detail from parameter passed in
    const selectedArtefact = this.props.navigation.getParam("selectedArtefact");
    // decide which image source to use
    // if there no imageURI in state (no new changes or null)
    var imageSource = !this.state.artefact.imageURI
      ? // then check if there's a URL to selected Artefact image
        !selectedArtefact || !selectedArtefact.images[0].URL
        ? // if no, then use default pic
          require("../../../../assets/images/icons/addPicture.png")
        : // there's URL to image, so use it
          { uri: selectedArtefact.images[0].URL }
      : // User picks a new image to be uploaded
        { uri: this.state.artefact.imageURI };

    // error messaged for fields
    const { errors } = this.state;

    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            {/* loading modal window */}
            <ActivityLoaderModal loading={this.state.loading} />

            {/* invisible container for all content */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {/* Add image button */}
                <View style={styles.imagePlaceholder}>
                  <Text style={[styles.font, styles.imageText]}>
                    Share your artefacts for others to view
                  </Text>
                  {/* show current selected artefact image if exists  */}
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this._pickImage}
                  >
                    <Image style={styles.imageSelected} source={imageSource} />
                  </TouchableOpacity>

                  {/* error messages if there's any */}
                  {this.state.titleError !== "" ? (
                    <Text style={[styles.error, { alignSelf: "center" }]}>
                      {" "}
                      {this.state.imageError}{" "}
                    </Text>
                  ) : (
                    <Text style={[styles.subFont, styles.imageText]}>
                      Add images of your artefacts
                    </Text>
                  )}
                </View>

                {/* input fields */}

                {/* Title */}
                <View style={styles.inputRow}>
                  <Image
                    style={styles.icon}
                    source={require("../../../../assets/images/icons/title.png")}
                  />
                  <View style={styles.inputField}>
                    <Text style={styles.font}>Title</Text>
                    <TextInput
                      placeholder="'My First Car'"
                      autoCapitalize="none"
                      placeholderTextColor="#868686"
                      style={styles.inputFont}
                      onChangeText={value => this.setTitle(value)}
                      value={this.state.artefact.title}
                    />
                  </View>
                </View>
                {/* error messages if there's any */}
                {this.state.titleError !== "" && (
                  <Text style={[styles.error, { marginLeft: wd(0.08) }]}>
                    {" "}
                    {this.state.titleError}{" "}
                  </Text>
                )}

                {/* Description */}
                <View style={styles.inputRow}>
                  <Image
                    style={styles.icon}
                    source={require("../../../../assets/images/icons/description.png")}
                  />
                  <View style={styles.inputField}>
                    <Text style={styles.font}>Description</Text>
                    <TextInput
                      placeholder="Describe your artefact"
                      autoCapitalize="none"
                      placeholderTextColor="#868686"
                      style={styles.inputFont}
                      onChangeText={value => this.setDescription(value)}
                      value={this.state.artefact.description}
                    />
                  </View>
                </View>
                {/* error messages if there's any */}
                {this.state.descriptionError !== "" && (
                  <Text style={[styles.error, { marginLeft: wd(0.08) }]}>
                    {" "}
                    {this.state.descriptionError}{" "}
                  </Text>
                )}

                {/* Category */}
                <View style={styles.inputRow}>
                  <Image
                    style={styles.icon}
                    source={require("../../../../assets/images/icons/category.png")}
                  />
                  <View style={styles.inputField}>
                    <Text style={styles.font}>category</Text>
                    <Picker
                      style={styles.pickerLong}
                      selectedValue={this.state.artefact.category}
                      onValueChange={this.setCategory.bind(this)}
                    >
                      <Picker.Item label="Art" value="Art" />
                      <Picker.Item label="Books" value="Books" />
                      <Picker.Item label="Furniture" value="Furniture" />
                      <Picker.Item
                        label="Clothing and Fabric"
                        value="Clothing and Fabric"
                      />
                      <Picker.Item
                        label="Coins and Currency"
                        value="Coins and Currency"
                      />
                      <Picker.Item label="Pottery" value="Pottery" />
                      <Picker.Item
                        label="Flims and Television"
                        value="Flims and Television"
                      />
                      <Picker.Item
                        label="Kitchen Collectable"
                        value="Kitchen Collectable"
                      />
                      <Picker.Item label="Music" value="Music" />
                      <Picker.Item label="Technology" value="Technology" />
                      <Picker.Item label="Pepe" value="Pepe" />
                      <Picker.Item label="Others" value="Others" />
                    </Picker>
                  </View>
                </View>
                {/* error messages if there's any */}
                {this.state.categoryError !== "" && (
                  <Text style={[styles.error, { marginLeft: wd(0.08) }]}>
                    {" "}
                    {this.state.categoryError}{" "}
                  </Text>
                )}

                {/* Dropdown selector fields */}
                <View style={styles.inputRow}>
                  {/* Date */}
                  <View style={{ flex: 0.5, flexDirection: "row" }}>
                    <Image
                      style={styles.icon}
                      source={require("../../../../assets/images/icons/calendar.png")}
                    />
                    <View>
                      <Text style={styles.font}>Date</Text>
                      <DatePicker
                        mode="date"
                        date={this.state.artefact.dateObtained}
                        style={styles.date}
                        placeholder="select date             ▾"
                        format="YYYY-MM-DD"
                        customStyles={{
                          dateIcon: {
                            display: "none"
                          },
                          dateInput: {
                            borderWidth: 0,
                            color: "black",
                            alignItems: "flex-start"
                          }
                        }}
                        selectedValue={this.state.artefact.dateObtained}
                        onDateChange={date => this.setDateObtained(date)}
                      />
                    </View>
                  </View>

                  {/* Privacy */}
                  <View style={{ flex: 0.5, flexDirection: "row" }}>
                    <Image
                      style={styles.icon}
                      source={require("../../../../assets/images/icons/privacy.png")}
                    />
                    <View>
                      <Text style={styles.font}>Privacy</Text>
                      <Picker
                        style={styles.pickerShort}
                        selectedValue={this.state.artefact.privacy}
                        onValueChange={this.setPrivacy.bind(this)}
                      >
                        <Picker.Item label="Private" value={1} />
                        <Picker.Item label="Public" value={0} />
                      </Picker>
                    </View>
                  </View>
                </View>
                {/* error messages for date */}
                {this.state.dateError !== "" && (
                  <Text style={[styles.error, { marginLeft: wd(0.08) }]}>
                    {" "}
                    {this.state.dateError}{" "}
                  </Text>
                )}

                {/* submit button */}
                <View
                  style={{
                    alignItems: "flex-end",
                    marginVertical: wd(0.05),
                    width: wd(0.8)
                  }}
                >
                  {/* edit artefact or create new artefact */}
                  <MySmallerButton
                    text="POST"
                    onPress={() => this.onSubmit()}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  font: {
    fontFamily: "HindSiliguri-Bold",
    fontSize: hp(0.02)
  },

  subFont: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: hp(0.015),
    color: "#868686"
  },

  inputFont: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: hp(0.015)
  },

  icon: {
    height: wd(0.04),
    width: wd(0.04),
    marginTop: 5,
    marginRight: 20,
    alignSelf: "flex-start"
  },

  imagePlaceholder: {
    marginTop: 5
  },

  imageSelected: {
    alignSelf: "center",
    width: wd(0.25),
    height: wd(0.25),
    borderRadius: 5
  },

  imageText: {
    alignSelf: "center",
    marginVertical: hp(0.025)
  },

  inputRow: {
    flexDirection: "row",
    width: wd(0.8),
    marginVertical: hp(0.01)
  },

  inputField: {
    flex: 1,
    borderBottomWidth: 0.5
  },

  date: {
    width: wd(0.3),
    marginTop: 5
  },

  pickerShort: {
    width: wd(0.3),
    fontSize: hp(0.015),
    color: "black"
  },

  pickerLong: {
    width: wd(0.705),
    fontSize: hp(0.015),
    color: "black"
  },

  error: {
    color: "red"
  }
});

// check for prop types correctness
ArtefactsForm.propTypes = {
  artefacts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createNewArtefacts: PropTypes.func.isRequired
};

// map required redux state to local props
const mapStateToProps = state => ({
  artefacts: state.artefacts,
  auth: state.auth
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { createNewArtefacts, editSelectedArtefact, addArtefactToGroup }
)(ArtefactsForm);
