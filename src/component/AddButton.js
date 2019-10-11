import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated
} from 'react-native';

// respondsive design components
import {
    deviceWidthDimension as wd
} from "../utils/responsiveDesign";

/** general add button 
 *  used in groups, artefacts and selected groups pages */
class AddButton extends Component {

    constructor(props) {
        super(props);
        this.slideAnimation = new Animated.ValueXY({ x: wd(1), y: 0 });
    }

    componentDidMount() {
        Animated.spring(this.slideAnimation, {
            toValue: { x: 0, y: 0 },
            friction: 7
        }).start();
    }


    render() {
        return (
            <Animated.View style={this.slideAnimation.getLayout()}>
                <TouchableOpacity style={styles.add} onPress={this.props.onPress}>
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>
            </Animated.View>

        )
    }
}


const styles = StyleSheet.create({

    add: {

        bottom: 30,            // default standard for material design
        right: 30,
        position: "absolute",
        width: 56,
        height: 56,
        borderRadius: 56 / 2,
        elevation: 5,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#FF6E6E",
    },

    text: {
        fontSize: 28,
        color: "white",
    }

})

export default AddButton;