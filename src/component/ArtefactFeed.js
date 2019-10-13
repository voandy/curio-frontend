import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';

// responsive design component
import {
    deviceWidthDimension as wd
  } from "../utils/responsiveDesign";

/** artefacts shown in squares in artefacts page */
class ArtefactFeed extends Component {

    render() {
        return (
            <View style={styles.card}>
                {/* artefact image preview */}
                <TouchableOpacity 
                    onPress={this.props.onPress} 
                    activeOpacity={0.5} 
                    artefactId = {this.props.artefactId}
                    artefactKey={this.props.artefactKey} >     
                    <Image style={styles.photo} source={this.props.image} />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    photo: {
        width:wd(0.3),
        height:wd(0.3),
    },

    card: {
        width:wd(0.3),
        height:wd(0.3),
        margin:wd(0.006),
    }
})

export default ArtefactFeed;