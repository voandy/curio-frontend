import React, { Component } from 'react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  AsyncStorage
} from 'react-native'

import { loginUser } from "../../actions/authActions"
import MyButton from "../../component/MyButton"

// state
const initialState = {
  email: '',
  password: '',
  errors: {}
}


class Login extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // nav details
  static navigationOptions = {
    headerStyle: {
      elevation: 0, // remove shadow on Android
    },
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
  };
  
  onChangeText = (key, val) => {
    this.setState({
      [key]: val,
      errors: {}
    })
  }

  // send user data
  onSubmit = async() => {

    const { navigate } = this.props.navigation;

    // logged-in user
    const user = {
        email: this.state.email,
        password: this.state.password,
    };

    this.props.loginUser(user, this.props.history)
      .then(res => {
        AsyncStorage.getItem('userToken')
          .then((res) => {
            if (res !== null) {
              navigate("App");
              this.state = initialState;
            }
          });
      });
  }
 
  render() {
    const { errors } = this.state;

    return (
      <View style={styles.container}>

        {/* heading */}
        <Text style = {styles.titleText}> Alrighty, </Text>
        <Text style = {styles.subTitleText}> Enter your details to login. </Text>

        {/* main card view */}
        <View style={ styles.card }>

          {/* Email */}
          <Text style = { styles.inputText }> EMAIL ADDRESS </Text> 
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor='#454545'
            onChangeText={val => this.onChangeText('email', val)}
          />
          <Text style={styles.error}> 
            {errors.email} 
            {errors.emailnotfound}  
          </Text>

          {/* Password */}
          <Text style = { styles.inputText }> PASSWORD </Text> 
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor='#454545'
            onChangeText={val => this.onChangeText('password', val)}
          />
          <Text style={styles.error}> 
            {errors.password}
            {errors.passwordincorrect} 
          </Text>

          <TouchableOpacity 
              style={styles.forgot}
          >
              <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* button */}
          <MyButton onPress={ (this.onSubmit) } text="LOG IN"/>

        </View>
      </View>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: Dimensions.get('window').width * 0.07,
    // fontFamily: 'HindSiliguri-Bold'
  },

  subTitleText: {
    fontSize: 25,
    marginBottom: 50,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: Dimensions.get('window').width * 0.07,
    // fontFamily: 'HindSiliguri-Bold'
  },

  card: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.6,
    borderColor: '#E2E2E2',
    borderRadius: 30,
    borderTopWidth: 0.5,
    borderRightWidth: 2,
    borderLeftWidth: 0.5,
    borderBottomWidth: 2,
    marginBottom: 50,
    alignContent: 'center',
    alignItems: 'center',
  },

  input: {
    width: Dimensions.get('window').width * 0.78,
    height: 30,
    marginTop: 10,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    fontSize: 16
  },

  inputText: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: Dimensions.get('window').width * 0.05,
    marginTop: 40,
    fontSize: 16
  },

  button: {
    justifyContent: 'center',
    backgroundColor: '#FF6E6E',
    width: Dimensions.get('window').width * 0.4,
    height: 50,
    margin: 10,
    borderRadius: 40,
    elevation: 3, 
    position: 'absolute',
    bottom:40,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
    // fontFamily: 'HindSiliguri-Regular'
  },

  forgot : {
    alignSelf: "flex-start",
    marginLeft: Dimensions.get('window').width * 0.05,
  },

  forgotText : {
    color: "#868686",
    fontWeight: "bold",
  },

  error : {
    color: 'red'
  },
})


//  export
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);