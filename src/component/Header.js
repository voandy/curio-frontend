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

  state = {
    tab1: {
      visible: true,
    },
    tab2: {
      visible: false,
    }
  }


  // TODO add more logic
  // highlight the active tab when pressed
  clickTab = (tab) => {

    if (tab == this.state.tab1) {
      this.setState(prevState => ({
        tab1: {
          ...prevState,
          visible: true
        },
        tab2: {
          ...prevState,
          visible: false
        }
      }))
    }
    else {
      this.setState(prevState => ({
        tab1: {
          ...prevState,
          visible: false
        },
        tab2: {
          ...prevState,
          visible: true
        }
      }))
    }
  }


  // change style properties for the tabs
  activeTab = (tab) => {

    if (tab.visible === true) {
      return {
        borderBottomWidth: 3
      }
    }
    else {
      return {
        borderBottomWidth: 0
      }
    }
  }

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
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => this.clickTab(this.state.tab1)}
            style={styles.headerButton}
            activeOpacity={0.5}
          >
            <Text style={[styles.headerButtonText, styles.font, this.activeTab(this.state.tab1)]}>
              {this.props.tab1}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.clickTab(this.state.tab2)}
            style={styles.headerButton}
            activeOpacity={0.5}
          >
            <Text style={[styles.headerButtonText, styles.font, this.activeTab(this.state.tab2)]}>
              {this.props.tab2}
            </Text>
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
    height: 120
  },

  search: {
    flexDirection: "row",
    marginHorizontal: wd(0.07),
    backgroundColor: "white",
    elevation: 9,
    marginTop: 25,
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
  },

  headerButtonText: {
    fontSize: 18,
    borderColor: "#FF6E6E",
    borderWidth: 0,
  },

  activeHighlight: {
    borderColor: "#FF6E6E",
    borderWidth: 0,
    borderBottomWidth: 3
  },
});

export default Header;
