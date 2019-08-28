import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import {Dimensions, 
        StyleSheet,
        TouchableOpacity,
        View,
        Image,
        Text
        }from 'react-native';

import Header from "../../component/Header"

class Profile extends Component {

    // logout button
    onLogoutClick = e => {
        const { navigate } = this.props.navigation;
        this.props.logoutUser()
        .then(res => {
            navigate("Auth");
        });
    };

    render() {

        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>

                <Header title="Profile" tab1="" tab2=""/>         

                {/* heading */}
                <Text style = {styles.titleText}>PROFILE</Text>
  
                <TouchableOpacity 
                    onPress={this.onLogoutClick}
                    style={ styles.button }>
                    <Text style= { styles.buttonText }>Log Out</Text>
                </TouchableOpacity>  
     
            </View>
        );
    }
}


Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    titleText: {
        fontSize: 30,
        marginTop: 250,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: Dimensions.get('window').width * 0.07,
        // fontFamily: 'HindSiliguri-Bold'
      },

      button: {
        justifyContent: 'center',
        backgroundColor: '#FF6E6E',
        width: Dimensions.get('window').width * 0.4,
        height: 50,
        margin: 10,
        borderRadius: 40,
        elevation: 3, 
      },
    
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white',
        // fontFamily: 'HindSiliguri-Regular'
      },
})

//  export
export default connect(
    mapStateToProps,
    { logoutUser }
  )(Profile);