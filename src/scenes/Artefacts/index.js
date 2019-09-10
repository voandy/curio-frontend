import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserArtefacts } from "../../actions/artefactsActions";

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text
} from "react-native";

//  custom components
import Header from "../../component/Header";
import ArtefactsFeed from "../../component/ArtefactFeed";
import CustomFontText from "../../utils/customFontText";

class Artefacts extends Component {
    constructor() {
        super();
        this.state = {
            userArtefacts: {}
        };
    }

    async componentDidMount() {
        // get user authentication data
        const { user } = this.props.auth;
        await this.props.getUserArtefacts(user.id);
    }

    async componentWillUpdate(nextProps) {
        if (Object.keys(this.state.userArtefacts).length === 0) {
            await this.setState({
                userArtefacts: nextProps.artefacts.userArtefacts
            });
        }
    }

    showArtefacts = (artefacts) => (
        <>
          {artefacts.map(artefact => (
            <ArtefactsFeed key={artefact._id} image={{uri: artefact.imageURLs[0]}} />
          ))}
        </>
    );


  render() {

    return (
      <View style={styles.container}>
        <Header title="Artefacts" tab1="All" tab2="Mine" />

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {Object.keys(this.state.userArtefacts).length !== 0 &&
            <View>
                {this.showArtefacts(this.state.userArtefacts)}
            </View>
          }
          
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  feed: {
    flexDirection: "row",
    marginLeft: Dimensions.get("window").width * 0.032,
    marginRight: Dimensions.get("window").width * 0.032
  },

  titleText: {
    fontSize: 30,
    marginTop: 250,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.07,
    fontFamily: "HindSiliguri-Bold"
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6E6E",
    width: Dimensions.get("window").width * 0.4,
    height: 50,
    margin: 10,
    borderRadius: 540,
    elevation: 3
  }
});

Artefacts.propTypes = {
    getUserArtefacts: PropTypes.func.isRequired,
    artefacts: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    artefacts: state.artefacts,
    auth: state.auth,
});

// export
export default connect(
    mapStateToProps,
    { getUserArtefacts }
)(Artefacts);
