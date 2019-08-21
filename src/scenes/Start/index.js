import React, { Component } from 'react';
import {Dimensions, 
        StyleSheet,
        TouchableOpacity,
        View,
        Text
        }from 'react-native';

export default class Start extends Component {

    // Nav bar details
    static navigationOptions = {
        title: 'Start',
        header: null
    }

    render() {

        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>

                {/* Logo */}
                {/* <Image style={styles.imageStyle} source={require('../../assets/Images/logo.png')} /> */}
                <Text style={styles.subTitleText }>Welcome To</Text>
                <Text style={styles.titleText }>Curio</Text>

                {/* Register Button */}
                <TouchableOpacity 
                    onPress={ () => navigate('Register')} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity 
                    onPress={ () => navigate('Login')} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
     
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

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        width: Dimensions.get('window').width * 0.3,
        height: 40,
        margin: 10,
        borderRadius: 5,
        elevation: 3, 
    },

    buttonText: {
        fontSize: 18,
        fontFamily: 'HindSiliguri-Regular'
    },

    imageStyle: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },

    subTitleText: {
        fontSize: 15,
        color: 'gray',
        // fontFamily: 'HindSiliguri-Regular'
    },

    titleText: {
        fontSize: 70,
        marginBottom: 250,
        // fontFamily: 'HindSiliguri-Bold'
    }
})