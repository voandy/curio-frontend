import React, { Component } from "react";

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Text
} from "react-native";

class SelectedGroup extends Component {

  state = {
  }
  
  // nav details
  static navigationOptions = {
    header: null,
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ alignSelf: "center"}}>Pepe Group</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent: "center"
  },

});


// export 
export default SelectedGroup
