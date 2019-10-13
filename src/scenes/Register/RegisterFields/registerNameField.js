import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import { connect } from "react-redux";
import styles from "../style";
// redux action
import { setName } from "../../../actions/registerActions";
// import reusable button component
import MyButton from "../../../component/MyButton";
import { setToBottom } from "../../../utils/responsiveDesign";

export class RegisterNameField extends Component {
  constructor(props) {
    super(props);

    // local state to fix textInput flickering issue with redux
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    // fill in the inputField's value if user has already input their name
    // e.g. when user backs from another register stage
    if (this.props.register.name) {
      this.setState({ name: this.props.register.name });
    }
  }

  // setter function for local state
  setLocalName = name => {
    this.setState({ ...this.state, name });
  };

  render() {
    return (
      <View style={styles.cardContainer}>
        {/* title */}
        <Text style={styles.inputText}>Hey, first tell us your name!</Text>
        {/* inputfield for name */}
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
        {/* error messages if there's any */}
        {this.props.nameErrorMessage !== "" && (
          <Text style={styles.error}> {this.props.nameErrorMessage} </Text>
        )}
        {/* next button */}
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

// map required redux state to local props
const mapStateToProps = state => ({
  register: state.register
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { setName }
)(RegisterNameField);
