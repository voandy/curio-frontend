import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
} from "../utils/responsiveDesign"

/** carousel for saved groups in groups page */
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
    width: wd(0.9),
    marginHorizontal: wd(0.05),
    height: wd(0.45),
    borderRadius: 15,
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
    width: wd(0.9),
    height: wd(0.45),
    borderRadius: 15,
  }

});

export default CardCarousel;
