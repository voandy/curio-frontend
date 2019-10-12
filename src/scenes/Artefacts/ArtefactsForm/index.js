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
import { createNewArtefacts, editSelectedArtefact } from "../../../actions/artefactsActions";
import DatePicker from "react-native-datepicker";

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
  privacy: "Private"
};

class ArtefactsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newArtefact: {
        ...newArtefact,
        
        // get newArtefact information
        ...this.props.navigation.getParam("newArtefact", "NO-NEW-ARTEFACT"),

        userId: this.props.auth.user.id
      },
      loading: false,
    };

    // add image to ArtefactsForm if it is for editing
    if (this.props.navigation.getParam("isEditingArtefact") === true) {
      this.state = {
        newArtefact: {
          ...newArtefact,
          imageURI: this.props.artefacts.selectedArtefact.images[0].URL,          

          // get newArtefact information
          ...this.props.navigation.getParam("newArtefact", "NO-NEW-ARTEFACT"),
  
          userId: this.props.auth.user.id
        },
        loading: false,
      };
    }
  }

  // nav details
  static navigationOptions = {
    title: "Add New Artefact",
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // new artefact's attribute change
  setNewArtefact = (key, value) => {
    this.setState({
      newArtefact: {
        ...this.state.newArtefact,
        [key]: value
      }
    });
  };

  // revert newArtefact to initial state
  resetNewArtefact = () => {
    this.setState({
      ...this.state,
      newArtefact: {
        ...newArtefact,
        userId: this.props.auth.user.id
      }
    });
  };

  // Setters for all the local state for newArtefacts
  setDateObtained = dateObtained => {
    this.setNewArtefact("dateObtained", dateObtained);
  };
  setTitle = title => {
    this.setNewArtefact("title", title);
  };
  setCategory = category => {
    this.setNewArtefact("category", category);
  };
  setDescription = description => {
    this.setNewArtefact("description", description);
  };
  setDate = date => {
    this.setNewArtefact("date", date);
  };
  setImageURI = imageURI => {
    this.setNewArtefact("imageURI", imageURI);
  };
  setPrivacy = privacy => {
    this.setNewArtefact("privacy", privacy);
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };

  // post new artefact to the backend
  onNewArtefactSubmit = () => {
    const { navigate } = this.props.navigation;
    // show user the loading modal
    this.setLoading(true);
    // send and create artefact to the backend
    this.props.createNewArtefacts(this.state.newArtefact)
      .then(() => {
          // stop showing user the loading modal
          this.setLoading(false);
          // reset new artefacts details
          this.resetNewArtefact();
          navigate("Artefacts");
      })
      .catch(err => {
          console.log(err);
          // stop showing user the loading modal
          this.setLoading(false);
          // show error
          console.log(err.response.data);
      });
  };

  // post edited artefact to the backend
  onEditArtefactSubmit = async () => {
    const { navigate } = this.props.navigation;
    // show user the loading modal
    this.setLoading(true);
    // send and create artefact to the backend
    this.props.editSelectedArtefact(this.state.newArtefact)
      .then(() => {
        // stop showing user the loading modal
        this.setLoading(false);
        // reset new artefacts details
        this.resetNewArtefact();
        navigate("SelectedArtefact");
      })
      .catch(err => {
        // stop showing user the loading modal
        this.setLoading(false);
        // show error
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
    return (
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

              <TouchableOpacity activeOpacity={0.5} onPress={this._pickImage}>
                {this.state.newArtefact.imageURI !== undefined &&
                this.state.newArtefact.imageURI !== "" ? (
                  <Image
                    style={styles.imageSelected}
                    source={{ uri: this.state.newArtefact.imageURI }}
                  />
                ) : (
                  <Image
                    style={styles.imageSelected}
                    source={require("../../../../assets/images/icons/addPicture.png")}
                  />
                )}
              </TouchableOpacity>

              <Text style={[styles.subFont, styles.imageText]}>
                Add images of your artefacts
              </Text>
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
                  value={this.state.newArtefact.title}
                />
              </View>
            </View>

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
                  value={this.state.newArtefact.description}
                />
              </View>
            </View>

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
                  selectedValue={this.state.newArtefact.category}
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
                    date={this.state.newArtefact.dateObtained}
                    style={styles.date}
                    placeholder="select date"
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
                    selectedValue={this.state.newArtefact.dateObtained}
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
                    selectedValue={this.state.newArtefact.privacy}
                    onValueChange={this.setPrivacy.bind(this)}
                  >
                    <Picker.Item label="Private" value="Private" />
                    <Picker.Item label="Public" value="Public" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* submit button */}
            <View
              style={{
                alignItems: "flex-end",
                marginVertical: wd(0.05),
                width: wd(0.8)
              }}
            >
              {/* TODO add onPress={() => onSubmit} */}

              {/* edit artefact or create new artefact */}
              <MySmallerButton text="POST" onPress={() => 
                {this.props.navigation.getParam("isEditingArtefact") === true ? this.onEditArtefactSubmit() 
                : this.onNewArtefactSubmit()
                }
              } />
            </View>
          </View>
        </ScrollView>
      </View>
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
  { createNewArtefacts, editSelectedArtefact }
)(ArtefactsForm);
