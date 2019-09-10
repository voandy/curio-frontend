import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserData } from "../../actions/userActions";
import { View, Image, StyleSheet, Text } from "react-native";

// get user data

// custom components
import MyButton from "../../component/MyButton";

// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";

import CustomFontText from "../../utils/customFontText";

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      userData: {}
    };
  }

  // remove nav details
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    console.log("0000");

    // get user authentication data
    const { user } = this.props.auth;
    this.props.getUserData(user.id);
    console.log("123");
  }

  componentWillUpdate(nextProps) {
    console.log("789 UPDATE");

    if (Object.keys(this.state.userData).length === 0) {
      this.setState({
        userData: nextProps.data.userData
      });
      console.log("456");
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {/* heading */}
        <CustomFontText style={styles.titleText}> All done! </CustomFontText>
        <CustomFontText style={styles.subTitleText}>
          {" "}
          Welcome {this.state.userData.name}.{" "}
        </CustomFontText>
        {/* <CustomFontText style={styles.subTitleText}> Welcome hue. </CustomFontText> */}

        <Image
          style={styles.profilePic}
          source={{ uri: this.state.userData.profilePic }}
        />
        {/* <Image style={styles.profilePic} source={require("../../../assets/images/default-profile-pic.png")} /> */}
        {/* button to collection/group page */}
        {setToBottom(
          <View style={styles.bottom}>
            <MyButton text="Get Started" onPress={() => navigate("App")} />
          </View>
        )}
      </View>
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
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: wd(0.25),
    marginLeft: wd(0.07)
    // fontFamily: 'HindSiliguri-Bold'
  },

  subTitleText: {
    fontSize: 25,
    marginBottom: 50,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: wd(0.07)
    // fontFamily: 'HindSiliguri-Bold'
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
    height: wd(0.35),
    alignItems: "flex-end"
  }
});

Welcome.propTypes = {
  getUserData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserData }
)(Welcome);
