import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";

import { logoutUser } from "../../actions/authActions";
import CardCarousel from "../../component/CardCarousel";
import Header from "../../component/Header";
import Tabs from './groupManager';
import * as Font from 'expo-font';

class Groups extends Component {
  state = {
    isModalVisible: false
  };

  componentDidMount() {
    // font
    Font.loadAsync({
        'HindSiliguri-Bold': require('../../../assets/fonts/HindSiliguri-Bold.ttf'),
        'HindSiliguri-Regular': require('../../../assets/fonts/HindSiliguri-Regular.ttf'),
    });
  }
  
  render() {
    const { user } = this.props.auth;

    return (
      <View style={styles.container}>
        <Header tab1="Public" tab2="Private" />

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {/* carousel pinned groups */}
          <View style={{ height: 130, marginTop: 20 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                  decelerationRate={0.8} snapToAlignment={"center"}
                  snapToInterval={Dimensions.get('window').width * 0.85} >
              <CardCarousel text="page 1" />
              <CardCarousel text="page 2" />
              <CardCarousel text="page 3" />
              
            </ScrollView>
          </View>

          <Text style={styles.titleText}>Groups</Text>
          <Text style={styles.titleText}>Groups</Text>
          <Text style={styles.titleText}>Groups</Text>
          <Text style={styles.titleText}>Groups</Text>
          <Text style={styles.titleText}>Groups</Text>

        </ScrollView>

        {/* <Tabs /> */}
      </View>
    );
  }
}

Groups.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    height: 130,
    elevation: 2,
    borderRadius: 1
  },

  headerText: {
    fontSize: 24,
    marginTop: 40,
    marginLeft: 30,
    fontWeight: "bold"
  },

  headerButton: {
    alignContent: "center",
    marginTop: 20,
    marginLeft: 30,
    padding: 5,
    borderColor: "#FF6E6E",
    borderWidth: 0,
    borderBottomWidth: 3,
    justifyContent: "center"
  },

  headerButtonText: {
    fontSize: 18,
    fontWeight: "bold"
  },

  mainGroupContainer: {
    height: Dimensions.get("window").height * 0.3,
    top: 0,
    position: "absolute",
    backgroundColor: "#E2E2E2"
  },

  titleText: {
    fontSize: 30,
    marginTop: 100,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Dimensions.get("window").width * 0.07,
    fontFamily: 'HindSiliguri-Bold'
  }
});

//  export
export default connect(
  mapStateToProps,
  { logoutUser }
)(Groups);
