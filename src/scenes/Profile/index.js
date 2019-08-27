import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import {Dimensions, 
        StyleSheet,
        TouchableOpacity,
        View,
        Image,
        Button,
        Text
        }from 'react-native';

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

                {/* heading */}
                <Text style = {styles.titleText}>PROFILE</Text>
                
                <Button
                     title='Log out'
                     onPress={this.onLogoutClick}
                />    
     
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: Dimensions.get('window').width * 0.07,
        // marginBottom: 50,
        // fontFamily: 'HindSiliguri-Bold'
    },

    imageStyle: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.9,
        resizeMode: 'contain',
        marginTop: 40,
        marginBottom: 10,
    },

    button : {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF6E6E',
        width: Dimensions.get('window').width * 0.8,
        height: 50,
        margin: 10,
        borderRadius: 540,
        elevation: 3, 
    },

    buttonText : {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white',
        // fontFamily: 'HindSiliguri-Regular'
    },

    buttonSignUp: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.8,
        borderWidth: 2,
        borderColor: '#FF6E6E'
    },

    buttonTextSignUp: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#FF6E6E',
        // fontFamily: 'HindSiliguri-Regular'
    },
})

//  export
export default connect(
    mapStateToProps,
    { logoutUser }
  )(Profile);