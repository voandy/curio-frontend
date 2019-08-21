import React, { Component } from 'react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native'

import { registerUser } from "../../actions/authActions"

const initialState = {
  name: '',
  email: '',
  password: '',
  passwordCfm: '',
  errors: {}
}

class Register extends Component {
  constructor() {
    super();
    this.state = initialState;
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
 
  render() {
    const { errors } = this.state;
    
    return (
      <View style={styles.container}>
        <Text style = {styles.title}> Register </Text>

        <TextInput
          style={styles.input}
          placeholder='Name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('name', val)}
        />
        <Text style = {styles.error}> {errors.name} </Text>

        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <Text style = {styles.error}> {errors.email} </Text>

        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Text style = {styles.error}> {errors.password} </Text>
        
        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('passwordCfm', val)}
        />
        <Text style = {styles.error}> {errors.passwordCfm} </Text>
        
        <Button
          title='Sign Up'
          onPress={this.onSubmit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    marginBottom: 30,
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  error : {
    color: 'red'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);