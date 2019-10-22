import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../style";
// redux types
import { C } from "../../../types/registerTypes";
// redux actions
import {
  setPassword,
  setPasswordCfm,
  setRegisterStage
} from "../../../actions/registerActions";
// import reusable button component
import MyButton from "../../../component/MyButton";
import { setToBottom } from "../../../utils/responsiveDesign";

export class RegisterPasswordField extends Component {
  constructor(props) {
    super(props);

    // local state to fix textInput flickering issue with redux
    this.state = {
      password: "",
      passwordCfm: ""
    };
  }

  componentDidMount() {
    // fill in the inputField's value if user has already input their password
    // e.g. when user backs from another register stage
    if (this.props.register.password) {
      this.setState({ password: this.props.register.password });
    }
    if (this.props.register.passwordCfm) {
      this.setState({ passwordCfm: this.props.register.passwordCfm });
    }
  }

  // setter function for local state
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
        {/* password title text */}
        <Text style={[styles.inputText, styles.passwordFieldTitle]}>
          {" "}
          Password:{" "}
        </Text>
        {/* inputfield for password */}
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
        {/* title text for passwordCfm */}
        <Text style={[styles.inputText, styles.passwordFieldTitle]}>
          {" "}
          Confirm Password:{" "}
        </Text>
        {/* inputfield for passwordCfm */}
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
          onSubmitEditing={() => {
            this.props.setPassword(this.state.password);
            this.props.setPasswordCfm(this.state.passwordCfm);
            this.props.checkPasswordForError(
              this.state.password,
              this.state.passwordCfm
            )
          }}
        />
        {/* error messages if there's any */}
        {this.props.passwordErrorMessage !== "" && (
          <Text style={styles.error}> {this.props.passwordErrorMessage} </Text>
        )}
        {/* back button + next button */}
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

// map required redux state to local props
const mapStateToProps = state => ({
  register: state.register
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { setPassword, setPasswordCfm, setRegisterStage }
)(RegisterPasswordField);
