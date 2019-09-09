import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  View,
  Image,
  StyleSheet,
  Text,
} from "react-native";

import { registerUser } from "../../actions/authActions";
import { C } from "../../actions/registerTypes";
import MyButton from "../../component/MyButton";
import * as Font from 'expo-font';

// import width/height responsive functions
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";


class Welcome extends Component {
  
  state = {
    name: "",
    email: "",
    password: "",
    photoURL: null,
  };

  constructor() {
    super();
  }

  // nav details
  static navigationOptions = {
    headerStyle: {
      elevation: 0, // remove shadow on Android
    },
  }

  async componentDidMount() {
    // font
    await Font.loadAsync({
        'HindSiliguri-Bold': require('../../../assets/fonts/HindSiliguri-Bold.ttf'),
        'HindSiliguri-Regular': require('../../../assets/fonts/HindSiliguri-Regular.ttf'),
    });
  }

  render() {

    return(
        <View style={styles.container}>
    
            {/* heading */}
            <Text style={styles.titleText}> All done! </Text>
            <Text style={styles.subTitleText}> Welcome {this.state.name}. </Text>

            <Image style= { styles.profilePic } source={ {uri:this.state.photoURL} } />
            {/* button to collection/group page */}
            {setToBottom(
            <View style={ styles.bottom }>
                <MyButton
                text="Get Started"
                onPress={ this.props.navigation("Login") } 
                />
            </View>
            )}

        </View>
    )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: wd(0.07),
    fontFamily: 'HindSiliguri-Bold'
  },

  subTitleText: {
    fontSize: 25,
    marginBottom: 50,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: wd(0.07),
    fontFamily: 'HindSiliguri-Bold'
  },

  profilePic: {
    marginTop: 40,
    width: wd(0.4),
    height: wd(0.4),
    alignSelf: 'center',
    borderRadius: wd(0.4)/2,
  },

  bottom: {
    width: wd(0.8),
    height: wd(0.3),
    alignItems: "flex-end",
  },  
});

Welcome.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// export
export default connect(
  mapStateToProps,
  { registerUser }
)(Welcome);


