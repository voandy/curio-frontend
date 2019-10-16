import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  StyleSheet,
  Alert,
  View,
  Image,
  Text
} from "react-native";

// redux actions
import { getUserData, editUserData } from "../../../actions/userActions";

// custom component
import SettingField from "../../../component/SettingField";
import ActivityLoaderModal from "../../../component/ActivityLoaderModal";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

// import reusable components
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../../utils/responsiveDesign";

class AccountSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userData: {
        name: "",
        imageURI: "",
        id: this.props.user.userData._id
      }
    }
  }

  // Nav bar details
  static navigationOptions = {
    title: "Account Settings",
    headerStyle: {
      elevation: 0,
    },
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };

  // deleting account handlers
  toggleDeleteModal = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This cannot be undone.",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          // onPress: () => this.onDeleteSelectedArtefact()
        }
      ],
      { cancelable: false }
    );
  };

  // editing account handlers
  toggleEditModal = async () => {
    Alert.alert(
      "Edit Account details",
      "Are you sure you want to edit your account details?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => this.editUserdata()
        }
      ],
      { cancelable: false }
    );
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
      // set into state
      this.setUserData("imageURI", manipResult.uri)
    }
  };

  // when user presses "edit" with newly added fields
  editUserdata = async () => {
    const { navigate } = this.props.navigation;
    const { origin } = this.props.navigation.state.params;

    // show user the loading modal
    this.setLoading(true);

    // fill in unchanged values (name)
    if (this.state.userData.name === "") {
      this.setUserData("name", this.props.user.userData.name)
    }

    await this.props.editUserData(this.state.userData)
      .then(() => {
        // stop showing user the loading modal
        this.setLoading(false);
        // redirect back
        navigate(origin);
      })
      .catch(err => {
        // stop showing user the loading modal
        this.setLoading(false);
        // show error
        console.log(err.response.data);
      });
  }

  // new artefact's attribute change
  setUserData = (key, value) => {
    this.setState({
      userData: {
        ...this.state.userData,
        [key]: value
      }
    });
  };

  // change text in each Field
  setName = name => {
    this.setUserData("name", name)
  }

  render() {

    // image source for profile pic
    var imageSource = !this.state.userData.imageURI
      ? // check for any uploaded profilePic
      !this.props.user.userData.profilePic
        ? // No image uploaded, use default pic
        require("../../../../assets/images/default-profile-pic.png")
        : // use previously uploaded profilePic
        { uri: this.props.user.userData.profilePic }
      :
      // use newly Uploaded profilePic
      { uri: this.state.userData.imageURI }

    return (
      <View style={styles.container}>
        <ActivityLoaderModal loading={this.state.loading} />

        {/* user profile pic */}
        <View style={{ height: hp(0.3), width: wd(1), alignItems: "center" }}>
          <TouchableOpacity activeOpacity={0.5} onPress={this._pickImage}>
            <Image style={styles.profilePic} source={imageSource} />
          </TouchableOpacity>

          <Text style={styles.userName}>Press image to change your profile picture</Text>
        </View>

        {/* setting fields */}
        <View style={styles.settings} >
          <SettingField
            editable={true}
            field="Name"
            isPassword={false}
            input={this.props.user.userData.name}
            onChangeText={value => this.setName(value)} />
          <SettingField editable={false} field="Username" isPassword={false} input={this.props.user.userData.username} />
          <SettingField editable={false} field="Email" isPassword={false} input={this.props.user.userData.email} />
          <SettingField editable={true} field="Password" isPassword={true} input="********" />

          <Text style={styles.warning}>* cannot be edited</Text>

          {/* make edit changes */}
          <TouchableOpacity style={{ marginVertical: wd(0.05), alignItems: "center" }}>
            <Text style={styles.edit} onPress={this.toggleEditModal}>Edit changes</Text>
          </TouchableOpacity>

          {/* delete account */}
          <TouchableOpacity style={{ marginVertical: wd(0.05), alignItems: "center" }}>
            <Text style={styles.delete} onPress={this.toggleDeleteModal}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  profilePic: {
    marginTop: 50,
    marginBottom: 20,
    width: wd(0.3),
    height: wd(0.3),
    borderRadius: wd(0.3) / 2,
    alignSelf: "center"
  },

  userName: {
    color: "#939090",
    fontFamily: "HindSiliguri-Regular",
    fontSize: 12
  },

  settings: {
    height: hp(0.6),
    width: wd(0.8),
    alignContent: "center"
  },

  warning: {
    marginVertical: wd(0.03),
    fontFamily: "HindSiliguri-Regular",
    fontSize: 12,
    width: wd(0.8),
  },

  edit: {
    fontFamily: "HindSiliguri-Bold",
    color: "#1183ca",
    fontSize: 16,
  },

  delete: {
    fontFamily: "HindSiliguri-Bold",
    color: "red",
    fontSize: 16,
  }
});

AccountSetting.propTypes = {
  getUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserData, editUserData }
)(AccountSetting);
