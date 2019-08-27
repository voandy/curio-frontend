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
    TouchableOpacity,
  } from 'react-native'
import { white, black } from "ansi-colors";


class Collections extends Component {

  render() {
    const { user } = this.props.auth;
    console.log("user is" + user);

    return (
        <View style={styles.container}>

          {/* header */}
          <View style={ styles.header }>

            {/* header text */}
            <View style={{ flexDirection: 'row' }}>
              <Text style={ styles.headerText }>Collections</Text>
            </View>

            {/* header tab */}
            <View style={{flexDirection: 'row' }}>
              <TouchableOpacity
                // onPress
                style= { styles.headerButton }
              >
                <Text style={ styles.headerButtonText }>Public</Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress
                style= { styles.headerButton }
              >
                <Text style={ styles.headerButtonText }>Private</Text>
              </TouchableOpacity>
            </View>

          </View>

          <Text style = {styles.titleText}>COLLECTIONS</Text>

        </View>
      )
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
    flex: 1,
  },

  header: {
    height: 130,
    backgroundColor: white,
    elevation: 2,
    borderBottomColor: black,
    borderRadius: 1
  },  

  headerText : {
    fontSize: 24,
    marginTop: 40,
    marginLeft: 30,
    fontWeight: 'bold'
  },

  headerButton: {
    alignContent: 'center',
    marginTop: 20,
    marginLeft: 30,
    padding: 5,
    borderColor:'#FF6E6E',
    borderWidth: 0,
    borderBottomWidth: 3,
    justifyContent: 'center',
    // borderBottomColor: '#FF6E6E',
  },

  headerButtonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  mainCollectionContainer: {
    height: Dimensions.get('window').height * 0.3,
    top: 0,
    position: 'absolute',
    backgroundColor: '#E2E2E2',
  },  

  titleText: {
    fontSize: 30,
    marginTop: 210,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Dimensions.get('window').width * 0.07,
    // marginBottom: 50,
    // fontFamily: 'HindSiliguri-Bold'
  },

});


//  export
export default connect(
  mapStateToProps,
  { logoutUser }
)(Collections);