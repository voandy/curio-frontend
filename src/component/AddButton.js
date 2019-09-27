import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

/** general add button 
 *  used in groups, artefacts and selected groups pages */
class AddButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <TouchableOpacity style={styles.add} onPress={this.props.onPress}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({

    add: {
        width: 56,
        height: 56,
        borderRadius: 56 / 2,
        bottom: 30,            // default standard for material design
        right: 30,
        elevation: 5,
        position: "absolute",
        alignItems: "center",
        alignContent:"center",
        justifyContent: "center",
        backgroundColor: "#FF6E6E",
    },

    text: {
        fontSize: 28,
        color: "white",
    }

})

export default AddButton;