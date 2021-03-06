import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import * as Permissions from "expo-permissions";

// redux 
import { C } from "../../types/registerTypes";
import {
  setRegisterStage,
  resetRegisterState
} from "../../actions/registerActions";

// import entry field validators
import * as validator from "./registerValidator";
// import helper components
import RegisterNameField from "./RegisterFields/registerNameField";
import RegisterEmailField from "./RegisterFields/registerEmailField";
import RegisterUsernameField from "./RegisterFields/registerUsernameField";
import RegisterPasswordField from "./RegisterFields/registerPasswordField";
import RegisterPhotoField from "./RegisterFields/registerPhotoField";

// manage and render the correct sign-up page accordingly
class RegisterManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameErrorMessage: "",
      emailErrorMessage: "",
      passwordErrorMessage: "",
      usernameErrorMessage: ""
    };
  }

  componentDidMount() {
    // get the permission from user to access their storage
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

  // error handlers //
  // make sure the name is valid
  async checkNameForError(name) {
    await this.setState({
      nameErrorMessage: validator.validateName(name)
    });
    // if there's no errors, proceed to next page
    if (!this.state.nameErrorMessage) {
      this.props.setRegisterStage(C.SET_EMAIL);
    }
  }
  // check if email is valid and unique
  async checkEmailForError(email) {
    validator.validateEmail(email).then(res => {
      this.setState({ emailErrorMessage: res });
      // with no errors, proceed to next page
      if (!this.state.emailErrorMessage) {
        this.props.setRegisterStage(C.SET_USERNAME);
      }
    });
  }
  // check if username is valid and unique
  async checkUsernameForError(username) {
    validator.validateUsername(username).then(res => {
      this.setState({ usernameErrorMessage: res });
      // with no errors, proceed to next page
      if (!this.state.usernameErrorMessage) {
        this.props.setRegisterStage(C.SET_PASSWORD);
      }
    });
  }
  // check if password and passwordCfm matches and valid
  async checkPasswordForError(password, passwordCfm) {
    await this.setState({
      passwordErrorMessage: validator.validatePassword(password, passwordCfm)
    });
    // with no errors, proceed to next page
    if (!this.state.passwordErrorMessage) {
      this.props.setRegisterStage(C.SET_PHOTO);
    }
  }

  // render pages according to user's current register stage
  render() {
    switch (this.props.register.register_stage) {
      case C.SET_NAME:
        return (
          <RegisterNameField
            nameErrorMessage={this.state.nameErrorMessage}
            checkNameForError={this.checkNameForError.bind(this)}
          />
        );
      case C.SET_EMAIL:
        return (
          <RegisterEmailField
            emailErrorMessage={this.state.emailErrorMessage}
            checkEmailForError={this.checkEmailForError.bind(this)}
          />
        );
      case C.SET_USERNAME:
        return (
          <RegisterUsernameField
            usernameErrorMessage={this.state.usernameErrorMessage}
            checkUsernameForError={this.checkUsernameForError.bind(this)}
          />
        );
      case C.SET_PASSWORD:
        return (
          <RegisterPasswordField
            passwordErrorMessage={this.state.passwordErrorMessage}
            checkPasswordForError={this.checkPasswordForError.bind(this)}
          />
        );
      case C.SET_PHOTO:
        return <RegisterPhotoField onSubmit={() => this.props.onSubmit()} />;
      // if error occurs, render error 404
      default:
        return (
          <View>
            <Text>error 404</Text>
          </View>
        );
    }
  }
}
// map required redux state to local props
const mapStateToProps = state => ({
  register: state.register
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { setRegisterStage, resetRegisterState }
)(RegisterManager);
