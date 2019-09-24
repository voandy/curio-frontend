import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';

class ArtefactFeed extends Component {

    render() {
        return (
            <View style={styles.card}>
                {/* artefact image preview */}
                {/* TODO ADD BELOW ===>   onPress={ () => this.props.func() } */}
                <TouchableOpacity onPress={this.props.onPress(this.props.artefactId)} activeOpacity={0.5} >     
                    <Image style={styles.photo} source={this.props.image} />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    photo: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3,
    },

    card: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3,
        margin: Dimensions.get('window').width * 0.006,
    }
})

export default ArtefactFeed;