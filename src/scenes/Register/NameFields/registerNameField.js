import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import { connect } from "react-redux";
import styles from "../style";

import { setName } from "../../../actions/registerActions";
// import reusable button component
import MyButton from "../../../component/MyButton";
import { setToBottom } from "../../../utils/responsiveDesign";

export class RegisterNameField extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    if (this.props.register.name) {
      this.setState({ name: this.props.register.name });
    }
  }

  setLocalName = name => {
    this.setState({ ...this.state, name });
  };

  render() {
    return (
      <View style={styles.cardContainer}>
        {/* title */}
        <Text style={styles.inputText}>Hey, first tell us your name!</Text>

        <TextInput
          style={styles.inputField}
          placeholder="Jon Snow"
          autoCapitalize="none"
          placeholderTextColor="#868686"
          onChangeText={val => {
            this.setLocalName(val);
            this.props.setName(val);
          }}
          value={this.state.name}
          onSubmitEditing={() => {
            this.props.setName(this.state.name);
            this.props.checkNameForError(this.state.name);
          }}
        />

        {this.props.nameErrorMessage !== "" && (
          <Text style={styles.error}> {this.props.nameErrorMessage} </Text>
        )}

        {setToBottom(
          <MyButton
            style={styles.nextButton}
            onPress={() => {
              this.props.setName(this.state.name);
              this.props.checkNameForError(this.state.name);
            }}
            text="Next"
          />
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
  { setName }
)(RegisterNameField);
