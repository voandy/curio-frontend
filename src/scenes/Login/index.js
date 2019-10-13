import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text
} from "react-native";

// redux
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

// utils
import { setToBottom } from "../../utils/responsiveDesign";

// reusable components
import MyButton from "../../component/MyButton";
import ActivityLoaderModal from "../../component/ActivityLoaderModal";
import KeyboardShift from "../../component/componentHelpers/KeyboardShift";

const initialState = {
  email: "",
  password: "",
  errors: {},
  loading: false
};

class Login extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // nav details
  static navigationOptions = {
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // set error generated from redux store
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // toggle function to show/hide loading modal
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };

  // change text
  onChangeText = (key, val) => {
    this.setState({
      [key]: val,
      errors: {}
    });
  };

  // reset state to its initialState
  resetState = () => {
    this.setState(initialState);
  };

  // send user's data to backend to log user in
  onSubmit = () => {
    // show modal screen for loading process
    this.setLoading(true);
    const { navigate } = this.props.navigation;
    // prepare user details
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    // tries to log user in
    //prettier-ignore
    this.props.loginUser(user)
      // success
      .then(() => {
        // stop showing modal screen for loading process
        this.setLoading(false);
        // reset state
        this.state = initialState;
        // redirect user to main App page
        navigate("App");
      })
      // failure to login
      .catch(err => {
        this.setLoading(false);
        // set state to display error
        this.setState({ ...this.state, errors: err.response.data })
      });
  };

  render() {
    const { errors } = this.state;

    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            {/* loading modal window */}
            <ActivityLoaderModal loading={this.state.loading} />
            {/* heading */}
            <Text style={styles.titleText}> Alrighty, </Text>
            <Text style={styles.subTitleText}> Enter your details to login. </Text>
            {/* main card view */}
            <View style={styles.card}>
              {/* Email */}
              <Text style={styles.inputText}> EMAIL / USERNAME </Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholderTextColor="#454545"
                onChangeText={val => this.onChangeText("email", val)}
              />
              <Text style={styles.error}>
                {errors.email}
                {errors.emailnotfound}
              </Text>
              {/* Password */}
              <Text style={styles.inputText}> PASSWORD </Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderTextColor="#454545"
                onChangeText={val => this.onChangeText("password", val)}
              />
              {/* error messages, if any */}
              <Text style={styles.error}>
                {errors.password}
                {errors.passwordincorrect}
              </Text>
              {/* forgot password */}
              <TouchableOpacity style={styles.forgot}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
              {/* login button */}
              {setToBottom(
                <View style={{ marginBottom: 30 }}>
                  <MyButton onPress={this.onSubmit} text="LOGIN" />
                </View>
              )}
            </View>
          </View>
        )}
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  titleText: {
    fontSize: 30,
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.07,
    fontFamily: "HindSiliguri-Bold"
  },

  subTitleText: {
    fontSize: 25,
    marginBottom: 50,
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.07,
    fontFamily: "HindSiliguri-Bold"
  },

  card: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.6,
    borderColor: "#E2E2E2",
    borderRadius: 30,
    borderTopWidth: 0.5,
    borderRightWidth: 2,
    borderLeftWidth: 0.5,
    borderBottomWidth: 2,
    marginBottom: 50,
    alignContent: "center",
    alignItems: "center"
  },

  input: {
    width: Dimensions.get("window").width * 0.78,
    height: 30,
    marginTop: 10,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    fontSize: 16
  },

  inputText: {
    fontFamily: "HindSiliguri-Bold",
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.05,
    marginTop: 40,
    fontSize: 16
  },

  button: {
    justifyContent: "center",
    backgroundColor: "#FF6E6E",
    width: Dimensions.get("window").width * 0.4,
    height: 50,
    margin: 10,
    borderRadius: 40,
    elevation: 3,
    position: "absolute",
    bottom: 40
  },

  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    color: "white",
    fontFamily: "HindSiliguri-Bold"
  },

  forgot: {
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.05
  },

  forgotText: {
    color: "#868686",
    fontFamily: "HindSiliguri-Bold"
  },

  error: {
    color: "red"
  }
});

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//  export
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
