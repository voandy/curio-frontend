import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../style";
import { C } from "../../../types/registerTypes";

import {
  setUsername,
  setRegisterStage
} from "../../../actions/registerActions";
// import reusable button component
import MyButton from "../../../component/MyButton";
import { setToBottom } from "../../../utils/responsiveDesign";

export class RegisterUsernameField extends Component {
  state = {
    username: ""
  };

  componentDidMount() {
    if (this.props.register.username) {
      this.setState({ username: this.props.register.username });
    }
  }

  setLocalUsername = username => {
    this.setState({ ...this.state, username });
  };

  render() {
    return (
      <View style={styles.cardContainer}>
        {/* title */}
        <Text style={styles.inputText}>Next, find an unique username!</Text>

        <TextInput
          style={styles.inputField}
          placeholder="sillyjon"
          autoCapitalize="none"
          placeholderTextColor="#868686"
          onChangeText={val => {
            this.setLocalUsername(val);
            this.props.setUsername(val);
          }}
          value={this.state.username}
          onSubmitEditing={() => {
            this.props.setUsername(this.state.username);
            this.props.checkUsernameForError(this.state.username);
          }}
        />

        {this.props.usernameErrorMessage !== "" && (
          <Text style={styles.error}> {this.props.usernameErrorMessage} </Text>
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
                this.props.setUsername(this.state.username);
                this.props.checkUsernameForError(this.state.username);
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
  { setUsername, setRegisterStage }
)(RegisterUsernameField);
