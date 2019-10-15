import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";

// responsive design component
import { deviceWidthDimension as wd } from "../utils/responsiveDesign";

/**Main header for most pages, to use custom font and design */
class HeaderSearch extends Component {
  render() {
    return (
      <View style={styles.header}>
        {/* header search */}
        <View style={styles.search}>
          <TextInput
            onSubmitEditing={this.props.onSubmitEditing}
            underlineColorAndroid="transparent"
            pointerEvents="none"
            placeholder="Search"
            placeholderTextColor="#707070"
            style={[styles.searchText, styles.font]}
            value={this.props.searchInput}
            onChangeText={value => this.props.onChangeSearchInput(value)}
          />
          {this.props.searchInput.length > 0 && (
            <TouchableOpacity style={styles.iconContainer} onPress={this.props.pressClear}>
              <Image
                style={styles.xIcon}
                source={require("../../assets/images/icons/x_icon.png")}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.iconContainer} onPress={this.props.pressSearch}>
            <Image
              style={styles.searchIcon}
              source={require("../../assets/images/icons/search.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  font: {
    fontFamily: "HindSiliguri-Bold"
  },

  header: {
    height: 80
  },

  search: {
    flexDirection: "row",
    marginHorizontal: wd(0.07),
    backgroundColor: "white",
    elevation: 3,
    marginTop: 25,
    height: 38,
    borderRadius: 10
  },

  searchText: {
    flex: 1,
    marginLeft: 20,
    alignSelf: "center"
  },

  searchIcon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    marginRight: 20,
    tintColor: "#707070"
  },

  xIcon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    marginRight: 7,
    tintColor: "#C0C0C0"
  },

  iconContainer: {
    marginTop: 9
  },

  activeHighlight: {
    borderColor: "#FF6E6E",
    borderWidth: 0,
    borderBottomWidth: 3
  }
});

export default HeaderSearch;
