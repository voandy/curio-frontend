import React, { Component } from 'react';
import {Dimensions, 
        StyleSheet,
        TouchableOpacity,
        View,
        Text,
        Button } 
        from 'react-native';

export default class Links extends Component {

    static navigationOptions = {
        title: 'Links'
    }

    render() {

        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>

                {/* Register Button */}
                <TouchableOpacity 
                    onPress={ () => navigate('Register')} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Register</Text>
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
        width: Dimensions.get('window').width * 0.7,
        height: 50,
        margin: 10,
        borderRadius: 5,
        elevation: 3, 
    },

    buttonText: {
        fontSize: 20,
    }
})