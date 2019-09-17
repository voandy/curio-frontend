import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../style";
import { C } from "../../../types/registerTypes";

import {
  setPassword,
  setPasswordCfm,
  setRegisterStage
} from "../../../actions/registerActions";
// import reusable button component
import MyButton from "../../../component/MyButton";
import { setToBottom } from "../../../utils/responsiveDesign";

export class RegisterPasswordField extends Component {
  state = {
    password: "",
    passwordCfm: ""
  };

  componentDidMount() {
    if (this.props.register.password) {
      this.setState({ password: this.props.register.password });
    }
    if (this.props.register.passwordCfm) {
      this.setState({ passwordCfm: this.props.register.passwordCfm });
    }
  }

  setLocalPassword = password => {
    this.setState({ ...this.state, password });
  };

  setLocalPasswordCfm = passwordCfm => {
    this.setState({ ...this.state, passwordCfm });
  };

  render() {
    return (
      <View style={styles.cardContainer}>
        {/* Title */}
        <Text style={[styles.inputText, styles.passwordTitle]}>
          Great, now create your password!
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
          onChangeText={val => {
            this.setLocalPassword(val);
            this.props.setPassword(val);
          }}
          value={this.state.password}
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
          onChangeText={val => {
            this.setLocalPasswordCfm(val);
            this.props.setPasswordCfm(val);
          }}
          value={this.state.passwordCfm}
        />

        {this.props.passwordErrorMessage !== "" && (
          <Text style={styles.error}> {this.props.passwordErrorMessage} </Text>
        )}

        {setToBottom(
          <View style={styles.buttom}>
            <TouchableOpacity
              onPress={() => this.props.setRegisterStage(C.SET_USERNAME)}
            >
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>

            <MyButton
              style={styles.nextButton}
              onPress={() => {
                this.props.setPassword(this.state.password);
                this.props.setPasswordCfm(this.state.passwordCfm);
                this.props.checkPasswordForError(
                  this.state.password,
                  this.state.passwordCfm
                );
              }}
              text="Next"
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
  { setPassword, setPasswordCfm, setRegisterStage }
)(RegisterPasswordField);
