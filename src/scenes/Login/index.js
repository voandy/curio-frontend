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

import { loginUser } from "../../actions/authActions"

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
        if (Object.keys(this.state.errors).length === 0) {
          navigate("App");
          this.state = initialState;
        }
      });
  }
 
  render() {
    const { errors } = this.state;

    return (
      <View style={styles.container}>
        <Text style = {styles.title}> Login </Text>

        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <Text style={styles.error}> 
          {errors.email} 
          {errors.emailnotfound}  
        </Text>

        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />

        <Text style={styles.error}> 
          {errors.password}
          {errors.passwordincorrect} 
        </Text>
        
        <Button
          title='Login'
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
  error : {
    color: 'red'
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);