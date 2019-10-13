import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";

// redux action
import { registerUser, loginUser } from "../../actions/authActions";

// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

// import manager to manage register stage
import RegisterManager from "./registerManager";

// custom components
import ActivityLoaderModal from "../../component/ActivityLoaderModal";
import KeyboardShift from "../../component/componentHelpers/KeyboardShift";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }
  
  // nav details
  static navigationOptions = {
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };

  // post new user to the backend (massive function)
  onSubmit = async () => {
    // show user the loading modal
    this.setLoading(true);
    // get the navigate function from props
    const { navigate } = this.props.navigation;
    // register user to the backend
    //prettier-ignore
    this.props.registerUser().then(() => {
      const user = {
        email: this.props.register.email,
        password: this.props.register.password
      };
      // try to login user
      this.props.loginUser(user).then(() => {
        // stop showing user the loading modal
        this.setLoading(false);
        // navigate user to Welcome page
        navigate("Welcome");
      })
        // error with logging in the user
        .catch(err => {
          this.setLoading(false);
          // log error
          console.log("At Registration: " + err);
        });
    })
      // failed to register
      .catch(err => {
        this.setLoading(false);
        // log error
        console.log(err);
      });
  };

  render() {
    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            {/* loading modal window */}
            <ActivityLoaderModal loading={this.state.loading} />
            {/* heading */}
            <Text style={styles.titleText}> Welcome, </Text>
            <Text style={styles.subTitleText}> Enter your details to signup. </Text>

            {/* main card view */}
            <View style={styles.card}>
              <RegisterManager onSubmit={this.onSubmit.bind(this)} />
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
    marginLeft: wd(0.07),
    fontFamily: "HindSiliguri-Bold"
  },

  subTitleText: {
    fontSize: 25,
    marginBottom: 50,
    alignSelf: "flex-start",
    marginLeft: wd(0.07),
    fontFamily: "HindSiliguri-Bold"
  },

  card: {
    width: wd(0.9),
    height: hp(0.6),
    borderColor: "#E2E2E2",
    borderRadius: 30,
    borderTopWidth: 0.5,
    borderRightWidth: 2,
    borderLeftWidth: 0.5,
    borderBottomWidth: 2,
    marginBottom: 50
  },

  lastContainer: {
    flex: 1,
    alignItems: "center"
  },

  profilePic: {
    marginTop: 40,
    width: wd(0.4),
    height: wd(0.4),
    alignSelf: "center",
    borderRadius: wd(0.4) / 2
  },

  bottom: {
    width: wd(0.8),
    height: wd(0.3),
    alignItems: "flex-end"
  }
});

// map required redux state to local props
const mapStateToProps = state => ({
  register: state.register
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { registerUser, loginUser }
)(Register);
