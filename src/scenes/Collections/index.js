import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";

import { white, black } from "ansi-colors";
import CardCarousel from "../../component/CardCarousel";
import Header from "../../component/Header";

class Collections extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <View style={styles.container}>
        <Header title="Collections" tab1="Public" tab2="Private" />

        {/* carousel pinned collections */}
        <View style={{ height: 130, marginTop: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <CardCarousel text="page 1" />
            <CardCarousel text="page 2" />
            <CardCarousel text="page 3" />
          </ScrollView>
        </View>

        <Text style={styles.titleText}>COLLECTIONS</Text>
      </View>
    );
  }
}

Collections.propTypes = {
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

  mainCollectionContainer: {
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
    marginLeft: Dimensions.get("window").width * 0.07
    // marginBottom: 50,
    // fontFamily: 'HindSiliguri-Bold'
  }
});

//  export
export default connect(
  mapStateToProps,
  { logoutUser }
)(Collections);
