import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

// Custom respondsive design component
import { deviceWidthDimension as wd } from "../utils/responsiveDesign";

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

  // TODO add more logic
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

  // allows search
  showSearch = () => {
    if (this.props.showSearch === false) {
      return null;
    } else {
      return (
        <TouchableOpacity
          style={styles.iconPlaceholder}
          onPress={this.props.onSubmit}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/images/icons/search.png")}
          />
        </TouchableOpacity>
      );
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

  render() {
    return (
      <View style={styles.header}>
        {/* header text */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headerText}>{this.props.title}</Text>
          {this.showSearch()}
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

  headerText: {
    width: wd(0.7),
    fontSize: 24,
    marginTop: 20,
    marginLeft: 30,
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
    marginTop: 10,
    marginHorizontal: 15
  },

  headerButtonText: {
    fontFamily: "HindSiliguri-Bold",
    fontSize: 18,
    borderColor: "#FF6E6E",
    borderWidth: 0
  },

  activeHighlight: {
    borderColor: "#FF6E6E",
    borderWidth: 0,
    borderBottomWidth: 3
  }
});

export default SimpleHeader;
