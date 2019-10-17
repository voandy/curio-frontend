import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";

// Custom respondsive design component
import {
  deviceWidthDimension as wd,
  deviceHeigthDimension as hp
} from "../utils/responsiveDesign";

/**Simpler header design from Header
 * used in Notifications, Artefacts, profile page
 */
class SimpleHeader extends Component {
  state = {
    tab1: {
      visible: true
    },
    tab2: {
      visible: false
    }
  };

  // highlight the active tab when pressed
  clickTab = tab => {
    if (tab === this.state.tab1) {
      this.setState(prevState => ({
        tab1: {
          ...prevState,
          visible: true
        },
        tab2: {
          ...prevState,
          visible: false
        }
      }));

      // change privacy settings to public in the parent component
      if (this.props.isPublicTab === false) {
        this.props.onChangePrivacyTab();
      }
    } else {
      this.setState(prevState => ({
        tab1: {
          ...prevState,
          visible: false
        },
        tab2: {
          ...prevState,
          visible: true
        }
      }));

      // change privacy settings to public in the parent component
      if (this.props.isPublicTab === true) {
        this.props.onChangePrivacyTab();
      }
    }
  };

  // change style properties for the tabs
  activeTab = tab => {
    if (tab.visible === true) {
      return {
        borderBottomWidth: 3
      };
    } else {
      return {
        borderBottomWidth: 0
      };
    }
  };

  // show tabs for filtering search options
  showTab = () => {
    if (this.props.showTab != true) {
      return null;
    } else {
      return (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => this.clickTab(this.state.tab1)}
            style={styles.headerButton}
            activeOpacity={0.5}
          >
            <Text
              style={[styles.headerButtonText, this.activeTab(this.state.tab1)]}
            >
              {this.props.tab1}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.clickTab(this.state.tab2)}
            style={styles.headerButton}
            activeOpacity={0.5}
          >
            <Text
              style={[styles.headerButtonText, this.activeTab(this.state.tab2)]}
            >
              {this.props.tab2}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  // show search bar
  showSearch = () => {
    if (this.props.showSearch === false) {
      // add margin to the top of page without a search bar
      return (
        <View style={{height:hp(0.02)}}/>
      );
    } else {
      return (
        <View style={styles.search}>
          <TextInput
            onSubmitEditing={this.props.onSubmitEditing}
            underlineColorAndroid="transparent"
            pointerEvents="none"
            placeholder="Search"
            placeholderTextColor="#adadad"
            style={[styles.searchText, styles.font]}
            value={this.props.searchInput}
            onChangeText={value => this.props.onChangeSearchInput(value)}
          />
          {this.props.searchInput.length > 0 && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={this.props.pressClear}
            >
              <Image
                style={styles.xIcon}
                source={require("../../assets/images/icons/x_icon.png")}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={this.props.pressSearch}
          >
            <Image
              style={styles.searchIcon}
              source={require("../../assets/images/icons/search.png")}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.header}>
        {this.showSearch()}

        {/* header text */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>

        {this.showTab()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    borderBottomColor: "black",
    borderRadius: 1,
    marginBottom: 10
  },

  font: {
    fontFamily: "HindSiliguri-Bold"
  },

  headerText: {
    width: wd(0.7),
    // fontSize: 22,
    fontSize: hp(0.033),
    marginTop: 8,
    marginBottom: 2,
    marginLeft: 25,
    fontFamily: "HindSiliguri-Bold"
  },

  iconPlaceholder: {
    marginTop: 20,
    width: wd(0.2),
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },

  icon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    tintColor: "#707070"
  },

  headerButton: {
    alignContent: "center",
    marginTop: 0,
    marginHorizontal: 15
  },

  headerButtonText: {
    fontFamily: "HindSiliguri-Bold",
    fontSize: 16,
    borderColor: "#FF6E6E",
    borderWidth: 0
  },

  search: {
    flexDirection: "row",
    marginHorizontal: wd(0.055),
    backgroundColor: "white",
    elevation: 3,
    marginTop: 25,
    height: 38,
    borderRadius: 10
  },

  searchText: {
    flex: 1,
    marginLeft: 15,
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
  }
});

export default SimpleHeader;
