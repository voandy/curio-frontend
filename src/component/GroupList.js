import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

/**searching feed that searches for either users or groups
 * used in SearchPage */
class GroupList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { details, groupId } = this.props.group;
    const { coverPhoto, title, artefacts } = details;
    return (
      <View>
        <TouchableOpacity
          style={styles.card}
          onPress={() => this.props.onPress(groupId)}
        >
          {/* group details */}
          <View style={styles.groupDetailsContainer}>
            {/* search results image  */}
            <View style={styles.picPlaceholder}>
              <Image
                style={styles.image}
                source={{ uri: coverPhoto }}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>

            {/* search results details */}
            <View style={styles.titleContainer}>
              <Text style={styles.heading}>{title}</Text>
              <Text style={styles.subHeading}>
                {artefacts.length} artefacts
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: wd(1),
    height: hp(0.095),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(0.002)
  },

  groupDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: wd(0.01)
  },

  picPlaceholder: {
    width: hp(0.071),
    height: hp(0.071),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wd(0.032),
    paddingLeft: wd(0.014)
  },

  image: {
    width: hp(0.071),
    height: hp(0.071),
    borderRadius: hp(0.71)
  },

  titleContainer: {
    flexWrap: "wrap",
    flex: 1,
    alignSelf: "center"
  },

  heading: {
    fontFamily: "HindSiliguri-Bold",
    fontSize: wd(0.04)
  },

  subHeading: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: wd(0.032),
    color: "#939090"
  }
});

//  export
export default GroupList;
