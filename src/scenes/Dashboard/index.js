import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { AsyncStorage } from "react-native";
import {
    View,
    Button,
    StyleSheet,
    Text,
  } from 'react-native'

class Dashboard extends Component {
  // constructor() {
  //   this.state = {
  //     name: ""
  //   }
  // }

  onLogoutClick = async() => {

    const { navigate } = this.props.navigation;

    this.props.logoutUser()
      .then(res => {
          // testing 
          // const { user, isAuthenticated } = this.props.auth;
          // console.log("LOGGED OUT in Dashboard");
          // console.log("user's name is " + user.name);
          // console.log("user is authenticated? " + isAuthenticated);
          // AsyncStorage.getItem('userToken').then((res) => console.log("user token is " + res));

          navigate("Auth");
      });

    
  };

  componentDidMount() {

    // testing
    const { user, isAuthenticated } = this.props.auth;
    console.log("LOGGED IN in Dashboard");
    console.log("user's name is " + user.name);
    console.log("user is authenticated? " + isAuthenticated);
    AsyncStorage.getItem('userToken').then((res) => console.log("user token is " + res));
    
  }

  render() {

    return (
        <View style={styles.container}>
          <Text style = {styles.title}>
            Hey mate, you are logged in!
            {/* Hey there {user.name.split(" ")[0]}, You look Good! */}
          </Text>

          <Button
            title='Log out'
            onPress={this.onLogoutClick}
          />
        </View>
      )
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);

const styles = StyleSheet.create({
    title: {
      fontSize: 50,
      marginBottom: 30,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});