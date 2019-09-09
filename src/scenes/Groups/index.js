import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-native-modal";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
  TextInput
} from "react-native";

import { logoutUser } from "../../actions/authActions";
import CardCarousel from "../../component/CardCarousel";
import Header from "../../component/Header";
import Tabs from './groupManager'
import * as Font from 'expo-font';

// CHANGE THIS LATER
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../utils/responsiveDesign";

const newGroup = {
  title: "",
  description: ""
}

class Groups extends Component {
  state = {
    isModalVisible: false,
    newGroup
  };

  componentDidMount() {
    // font
    Font.loadAsync({
        'HindSiliguri-Bold': require('../../../assets/fonts/HindSiliguri-Bold.ttf'),
        'HindSiliguri-Regular': require('../../../assets/fonts/HindSiliguri-Regular.ttf'),
    });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const { user } = this.props.auth;

    return (
      <View style={styles.container}>
        <Header tab1="Public" tab2="Private" />
        
        {/*********************** CHANGE THIS LATER ********************/}
        {/* create new Group */}
        <Button title="Create New Group" onPress={this.toggleModal} />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <Button title="Close" onPress={this.toggleModal} />
          
            <TextInput
              style={styles.inputField}
              placeholder="Title"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.props.nameHandler(val)}
              value= { this.props.name }
            />

            <TextInput
              style={styles.inputField}
              placeholder="Description"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              onChangeText={val => this.props.nameHandler(val)}
              value= { this.props.name }
            />
            
            <Button 
              title= "Create Group"
            />
          </View>
        </Modal>
        {/****************************************************************/}

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

  // CHANGE THIS LATER
  inputField: {
    textAlign: "center",
    width: wd(0.7),
    height: hp(0.05),
    marginTop: 20,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    fontSize: 16,
    alignSelf: "center"
  },

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
  },
});

//  export
export default connect(
  mapStateToProps,
  { logoutUser }
)(Groups);
