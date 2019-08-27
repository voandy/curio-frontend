import React, { Component } from 'react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native'

import { registerUser } from "../../actions/authActions"
import * as ImagePicker from 'expo-image-picker';

const initialState = {
  name: '',
  email: '',
  password: '',
  passwordCfm: '',
  photo: null,
  stage: 0,
  errors: {}
}

class Register extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  // Nav bar details
  static navigationOptions = {
    headerStyle: {
        elevation: 0, // remove shadow on Android
      },
  }

  // image picker (camera roll)
  handleChoosePhoto = () =>{
    const option = {
      noData: true
    };
    ImagePicker.launchImageLibrary(option, response =>{
      console.log("Camera Roll", response)

      // saving the selected photo
      if(response.uri){
        this.setState({ photo:response })
      }
    })
  }

  // show profile picture
  renderProfile(){

    const { photo } = this.state;

    // photo selected
    if(this.state.photo){
      return(
        <Image source={{ uri:photo.uri }} style={styles.photo} />
      )
    }
    // default pic
    else{
      return(
        <Image source={ require('../../../assets/images/default-profile-pic.png') } style={styles.photo} />
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  // send new user data
  onSubmit = (e) => {

    const { navigate } = this.props.navigation;

    // create new user
    const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordCfm: this.state.passwordCfm
    };
    
    this.props.registerUser(newUser, this.props.history)
      .then(res => {
        if (Object.keys(this.state.errors).length === 0) {
          navigate("Login")
          this.state = initialState;
        }
      });
  }

  nextPage() {
    this.setState.stage = 1;
    console.log(this.state.stage);
  }

  // Load new page after each completed stage in sign up
  loadPage(errors) {

    switch (this.state.stage) {
      case 0:
        return (
          <View>
            {/* name */}
            <Text style = { styles.inputText }> Hey, first tell us your name! </Text> 
            <TextInput
              style={styles.input}
              placeholder='Jon Snow'
              autoCapitalize="none"
              placeholderTextColor='#868686'
              onChangeText={val => this.onChangeText('name', val)}
            />
            <Text style = {styles.error}> {errors.name} </Text>
          </View>
        );
      case 1:
        return (
          <View>
            {/* email */}
            <Text style = { styles.inputText }> Now, enter your email address! </Text> 
              <TextInput
                style={styles.input}
                placeholder='abc@email.com'
                autoCapitalize="none"
                placeholderTextColor='#868686'
                onChangeText={val => this.onChangeText('email', val)}
              />
            <Text style = {styles.error}> {errors.email} </Text>
          </View>
        );
      case 2:
        return (
          <View>
            <Text style = { [styles.inputText, styles.passwordSpacing] }> Great, create your unique password! </Text> 
         
              {/* password */}
              <Text style = { [styles.inputText, styles.password] }> Password: </Text> 
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderTextColor='#868686'
                onChangeText={val => this.onChangeText('password', val)}
              />
            <Text style = {styles.error}> {errors.password} </Text>
              
            {/* Cfm password */}
            <Text style = { [styles.inputText, styles.password] }> Confirm Password: </Text> 
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderTextColor='#868686'
                onChangeText={val => this.onChangeText('passwordCfm', val)}
            />
         <Text style = {styles.error}> {errors.passwordCfm} </Text>



          </View>
          );
      case 3:
        return (
          <View>



          </View>
        );
      default:
        return (
          <View>
            <Text>error 404</Text>
          </View>
          );
    }
  }


 
  render() {
    const { errors } = this.state;
    
    return (
      <View style={styles.container}>

        {/* heading */}
        <Text style = {styles.titleText}> Welcome, </Text>
        <Text style = {styles.subTitleText}> Enter your details to signup. </Text>

        {/* main card view */}
        <View style= { styles.card }>

          
          <Text style = { [styles.inputText, styles.passwordSpacing] }> Great, create your unique password! </Text> 
         
          {/* password */}
          <Text style = { [styles.inputText, styles.password] }> Password: </Text> 
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor='#868686'
            onChangeText={val => this.onChangeText('password', val)}
          />
          <Text style = {styles.error}> {errors.password} </Text>
          
          {/* Cfm password */}
          <Text style = { [styles.inputText, styles.password] }> Confirm Password: </Text> 
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor='#868686'
            onChangeText={val => this.onChangeText('passwordCfm', val)}
          />
          <Text style = {styles.error}> {errors.passwordCfm} </Text>


          {/* { this.loadPage(errors) } */}

          {/* button */}
          <TouchableOpacity 
            onPress={ (this.nextPage()) } 
            style={styles.button}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
      
        </View>

      </View>
    )
  }
}

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
    marginTop: 20,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    fontSize: 16
  },

  inputText: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: Dimensions.get('window').width * 0.05,
    marginTop: 30,
    fontSize: 20
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

  passwordSpacing: {
    marginBottom: 30,
  },  

  password: {
    marginTop: 5,
    fontSize: 16,
  },  

  error : {
    color: 'red'
  },
})

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);