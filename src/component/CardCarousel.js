import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';

class CardCarousel extends Component {

  render() {
      return(
        <View style={ styles.card }>
          {/* <Image source={ this.props.imageUri } /> */}
          <Text> { this.props.text } </Text>
        </View>
      )
    }
}


const styles = StyleSheet.create({

  card : {
    width: Dimensions.get('window').width * 0.85,
    marginLeft: 10,
    marginRight: 10,
    height: 130,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    alignContent: 'center',
    alignItems: 'center',
  }
})

export default CardCarousel;