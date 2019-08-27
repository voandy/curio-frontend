import React, { Component } from 'react';
import {Dimensions, 
        StyleSheet,
        TouchableOpacity,
        View,
        Image,
        Text
        }from 'react-native';

export default class Notification extends Component {

    render() {

        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>

                {/* heading */}
                <Text style = {styles.titleText}>NOTIFICATION</Text>

     
            </View>
        );
    }
}

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