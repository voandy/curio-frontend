import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Picker
} from "react-native";

// redux actions
import DatePicker from "react-native-datepicker";
import * as ImagePicker from "expo-image-picker";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
} from "../../../utils/responsiveDesign";

// import the loader modal to help show loading process
import ActivityLoaderModal from "../../../component/ActivityLoaderModal";
// custom components
import MySmallerButton from "../../../component/MySmallerButton";

class GroupsForm extends Component {
  // local state
  state = {
    image: "",
    groupName:"",
    description:"",

    privacySetting: "Private",
  };

  // nav details
  static navigationOptions = {
    title: "Create new group",
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // access camera roll
  pickImage = async () => {
    // obtain image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4]
    });

    // set image
    if (!result.cancelled) {
      // TODO: upload image to Google Cloud Storage
      // this.props.onNewGroupChange("imageURI", result.uri);
      this.setState({
        image: result
      })
    }
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };


  // TODO
  onSubmit = async () => {
    console.log("hue")
  };

  render() {
    return (
      <View style={styles.container}>
        {/* loading modal window */}
        <ActivityLoaderModal loading={this.state.loading} />

        {/* scrollable container for all content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center" }}>
            {/* Add image button */}
            <View style={styles.imagePlaceholder}>
              <Text style={[styles.font, styles.imageText]}>
                Create a group, share artefacts amongst yourselves
              </Text>

              <TouchableOpacity activeOpacity={0.5} onPress={this.pickImage}>
                {/* {this.props.newGroup.imageURI !== undefined &&
                                this.props.newGroup.imageURI !== "" ? ( */}
                {this.state.image !== undefined &&
                  this.state.image !== "" ? (
                    <Image
                      style={styles.imageSelected}
                      source={this.state.image}
                    />
                  ) : (
                    <Image
                      style={styles.imageSelected}
                      source={require("../../../../assets/images/icons/addPicture.png")}
                    />
                  )}
              </TouchableOpacity>

              <Text style={[styles.subFont, styles.imageText]}>
                Add a cover photo
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
                <Text style={styles.font}>Group name</Text>
                <TextInput
                  placeholder="Title"
                  autoCapitalize="none"
                  placeholderTextColor="#868686"
                  style={styles.inputFont}
                  onChangeText={value => this.setState({groupName:value})}
                  value={this.state.groupName}
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
                  placeholder="Description of the group"
                  autoCapitalize="none"
                  placeholderTextColor="#868686"
                  style={styles.inputFont}
                  onChangeText={value => this.setState({description:value})}
                  value={this.state.description}
                />
              </View>
            </View>

            {/* Privacy */}
            <View style={styles.inputRow}>
              <Image
                style={styles.icon}
                source={require("../../../../assets/images/icons/category.png")}
              />
              <View style={styles.inputField}>
                <Text style={styles.font}>Privacy</Text>

                <Picker
                  style={styles.pickerLong}
                  selectedValue={this.state.privacySetting}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ privacySetting: itemValue })}
                >
                  <Picker.Item label="Public" value="Public" />
                  <Picker.Item label="Private" value="Private" />
                </Picker>

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
              <MySmallerButton text="POST" onPress={() => this.onSubmit()} />
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
    fontSize: 14
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
GroupsForm.propTypes = {
  auth: PropTypes.object.isRequired
};

// map required redux state to local props
const mapStateToProps = state => ({
  auth: state.auth
});

// map required redux state and actions to local props
export default connect(mapStateToProps)(GroupsForm);
