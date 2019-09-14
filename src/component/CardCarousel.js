import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../utils/responsiveDesign"

class CardCarousel extends Component {
  render() {
    return (
      <View style={styles.card}>

        <TouchableOpacity>
          {/* Image  */}
          <View style={styles.picPlaceholder}>
            <Image style={styles.photo} source={this.props.image} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.85,
    marginHorizontal: 10,
    height: wd(0.45),
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    alignContent: "center",
    alignItems: "center"
  },

  picPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },

  photo:{
    width: Dimensions.get("window").width * 0.85,
    height: wd(0.45),
    borderRadius: 30,
  }

});

export default CardCarousel;
