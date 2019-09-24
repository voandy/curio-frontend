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

// date converter
import Moment from "moment";

// custom component
import UserDetail from "../../../component/UserDetail"
import Line from "../../../component/Line"
import Comments from "../../../component/Comments"
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../../utils/responsiveDesign"


// remove this
const comment1 = "Ravioli, ravioli, give me the formuoli"
const comment2 = "is mayonnaise an instrument? No patrick, mayonnaise is not an instrument... Horseradish is not either"
const comment3 = "Goodbye everyone, I'll remember you all in therapy"

class SelectedGroup extends Component {

  state = {
    isImageViewVisible: false,
  }
  
  // nav details
  static navigationOptions = {
    header: null,
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  render() {

    // date format
    Moment.locale("en");
    // const dt = this.state.userData.dateJoined;

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
