import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

// responsive design component
import {
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";


/**Main header for most pages, to use custom font and design */
class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        {/* header search */}
        <View style={styles.search}>
          {/* <Text style={[styles.headerText, styles.font]}> {this.props.title} </Text > */}
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Search"
            placeholderTextColor="#707070"
            style={[styles.searchText, styles.font]}
          />
          <Image
            style={styles.searchIcon}
            source={require("../../assets/images/icons/search.png")}
          />
        </View>

        {/* header tab */}
        {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            // onPress
            style={styles.headerButton}
          >
            <Text style={[styles.headerButtonText, styles.font]}>
              {" "}
              {this.props.tab1}{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress
            style={styles.headerButton}
          >
            <Text style={[styles.headerButtonText, styles.font]}>
              {" "}
              {this.props.tab2}{" "}
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  font: {
    fontFamily: "HindSiliguri-Bold"
  },

  header: {
    height: 130
  },

  search: {
    flexDirection: "row",
    marginHorizontal: wd(0.07),
    backgroundColor: "white",
    elevation: 9,
    marginTop: 40,
    height: 45,
    borderRadius: 10
  },

  searchText: {
    flex: 1,
    marginLeft: 20
  },

  searchIcon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    marginRight: 20,
    tintColor: "#707070"
  },

  headerButton: {
    alignContent: "center",
    marginTop: 10,
    marginHorizontal: 15,
    borderColor: "#FF6E6E",
    borderWidth: 0,
    borderBottomWidth: 3
  },

  headerButtonText: {
    fontSize: 18
  }
});

export default Header;
