import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "../style";
import { C } from "../../../types/registerTypes";

import { setEmail, setRegisterStage } from "../../../actions/registerActions";
// import reusable button component
import MyButton from "../../../component/MyButton";
import { setToBottom } from "../../../utils/responsiveDesign";

export class RegisterEmailField extends Component {
  state = {
    email: ""
  };

  componentDidMount() {
    if (this.props.register.email) {
      this.setState({ email: this.props.register.email });
    }
  }

  setLocalEmail = email => {
    this.setState({ ...this.state, email });
  };

  render() {
    return (
      <View style={styles.cardContainer}>
        {/* title */}
        <Text style={styles.inputText}>Now, enter your email address!</Text>

        <TextInput
          style={styles.inputField}
          placeholder="abc@email.com"
          autoCapitalize="none"
          placeholderTextColor="#868686"
          onChangeText={val => {
            this.setLocalEmail(val);
            this.props.setEmail(val);
          }}
          value={this.state.email}
          onSubmitEditing={() => {
            this.props.setEmail(this.state.email);
            this.props.checkEmailForError(this.state.email);
          }}
        />

        {this.props.emailErrorMessage !== "" && (
          <Text style={styles.error}> {this.props.emailErrorMessage} </Text>
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
              onPress={() => {
                this.props.setEmail(this.state.email);
                this.props.checkEmailForError(this.state.email);
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
  { setEmail, setRegisterStage }
)(RegisterEmailField);
