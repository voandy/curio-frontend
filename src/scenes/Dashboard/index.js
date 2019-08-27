import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
    View,
    Button,
    StyleSheet,
    Text,
  } from 'react-native'

class Dashboard extends Component {
  onLogoutClick = async() => {

    const { navigate } = this.props.navigation;

    this.props.logoutUser()
      .then(res => {
          navigate("Auth");
      });
  };

  render() {
    const { user } = this.props.auth;

    console.log("user is" + user);

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