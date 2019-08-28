import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

class MyButton extends Component {

    constructor(props){
        super(props)
      }

    render() {
        return(
            <TouchableOpacity 
                onPress={this.props.onPress}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{ this.props.text }</Text>
            </TouchableOpacity>
        )
        }
}


const styles = StyleSheet.create({

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
})

export default MyButton;