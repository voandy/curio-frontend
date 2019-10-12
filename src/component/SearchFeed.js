import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text
} from "react-native";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

/**searching feed that searches for either users or groups
 * used in SearchPage */
// props->
// heading : name or groupname
// subHeading: username or number of members
class SearchFeed extends Component {
  // checks for search type (either user or groups)
  // returns the right subHeading
  searchType = () => {
    // Group
    if (this.props.isGroup === true) {
      return (
        <Text style={styles.subHeading}>{this.props.subHeading} members</Text>
      );
    }
    // user
    else {
      return <Text style={styles.subHeading}>@{this.props.subHeading}</Text>;
    }
  };

  render() {
    return (
      <View style={styles.card}>
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.card}>
            {/* Image  */}
            <View style={styles.picPlaceholder}>
              <Image
                style={styles.image}
                source={{ uri: this.props.userProfilePic }}
              />
            </View>

            {/* Search results */}
            <View style={styles.searchPlaceholder}>
              <Text style={styles.heading}>{this.props.heading}</Text>

              {this.searchType()}
            </View>
          </View>

          {/* line separator */}
          <View style={styles.line} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: wd(1),
    height: wd(0.17),
    flexDirection: "row",
    alignItems: "center"
  },

  picPlaceholder: {
    width: wd(0.15),
    height: wd(0.17),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wd(0.03)
  },

  image: {
    width: wd(0.13),
    height: wd(0.13),
    borderRadius: wd(0.13) / 2
  },

  heading: {
    fontFamily: "HindSiliguri-Bold"
  },

  subHeading: {
    fontFamily: "HindSiliguri-Regular",
    color: "#939090"
  },

  line: {
    borderBottomColor: "#939090",
    borderBottomWidth: 0.4,
    width: wd(0.9),
    alignSelf: "center"
  }
});

//  export
export default SearchFeed;
