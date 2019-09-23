import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RefreshControl } from 'react-native';
import { Dimensions, StyleSheet, ScrollView, View, Text } from "react-native";

// custom components
import SimpleHeader from "../../component/SimpleHeader";
import ArtefactFeed from "../../component/ArtefactFeed";
import ArtefactModal from "../../component/ArtefactModal";
import AddButton from "../../component/AddButton";

// redux actions
import { createNewArtefacts, getUserArtefacts } from "../../actions/artefactsActions";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

// import the loader modal to help show loading process
import ActivityLoaderModal from "../../component/ActivityLoaderModal";

// temp state to store object with attributes required to create a new artefact
const newArtefact = {
  userId: "",
  title: "",
  description: "",
  category: "",
  dateObtained: "",
  imageURI: ""
};

class Artefacts extends Component {
  // local state
  state = {
    newArtefact: {
      ...newArtefact,
      userId: this.props.auth.user.id
    },
    isModalVisible: false,
    loading: false,
    refreshing: false,
  };

  // toggle the modal for new artefact creation
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  // new artefact's attribute change
  setNewArtefact = (key, value) => {
    this.setState({
      newArtefact: {
        ...this.state.newArtefact,
        [key]: value
      }
    });
  };

  // revert newArtefact to initial state
  resetNewArtefact = () => {
    this.setState({
      ...this.state,
      newArtefact: {
        ...newArtefact,
        userId: this.props.auth.user.id
      }
    });
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };

  // post new artefact to the backend
  onSubmit = async () => {
    // show user the loading modal
    this.setLoading(true);
    // send and create artefact to the backend
    //prettier-ignore
    this.props.createNewArtefacts(this.state.newArtefact)
      .then(() => {
        // stop showing user the loading modal
        this.setLoading(false);
        // close loading modal
        this.toggleModal();
        this.resetNewArtefact();
      })
      .catch(err => {
        // stop showing user the loading modal
        this.setLoading(false);
        // show error
        console.log(err.response.data);
      });
  };

  // return ArtefactFeedRows containing ArtefactFeed in different rows
  showArtefacts = artefacts => {
    let artefactFeedRows = [];
    let artefactFeeds = [];
    let rowKey = 0;
    // sort array based on date obtained (from earliest to oldest)
    artefacts.sort(function (a, b) {
      return new Date(b.datePosted) - new Date(a.datePosted);
    });
    // create ArtefactFeed object out of artefact and push it into artefactFeeds array
    for (var i = 0; i < artefacts.length; i++) {
      artefactFeeds.push(
        <ArtefactFeed
          key={artefacts[i]._id}
          image={{ uri: artefacts[i].images[0].URL }}
        />
      );
      // create a new row after the previous row has been filled with 3 artefacts and fill the previous row into artefactFeedRows
      if (artefactFeeds.length === 3 || i === artefacts.length - 1) {
        artefactFeedRows.push(
          <View style={styles.feed} key={rowKey}>
            {artefactFeeds}
          </View>
        );
        artefactFeeds = [];
        rowKey++;
      }
    }
    return <>{artefactFeedRows}</>;
  };

  // refresh page
  refreshArtefacts = async () => {
    
    this.setState({ refreshing: true })

    console.log("userArtefacts before reloading", this.props.artefacts.userArtefacts);

    // get data from backend  
    await this.props.getUserArtefacts(this.props.auth.user.id)

    // resets refreshing state
    this.setState({ refreshing: false })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* loading modal window */}
        <ActivityLoaderModal loading={this.state.loading} />
        {/* header */}
        <SimpleHeader title="My Artefacts" />
        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshArtefacts} />
          }
        >
          {/* all artefacts posted by the user */}
          {Object.keys(this.props.artefacts.userArtefacts).length !== 0 ? (
            <View>
              {this.showArtefacts(this.props.artefacts.userArtefacts)}
            </View>
          ) : (
              <View style={styles.emptyFeed}>
                <Text
                  style={{ fontSize: 16, fontFamily: "HindSiliguri-Regular" }}
                >
                  Looks like you haven't posted any artefacts
              </Text>
                <Text
                  style={{ fontSize: 16, fontFamily: "HindSiliguri-Regular" }}
                >
                  Click the "+" button to add some
              </Text>
              </View>
            )}
        </ScrollView>

        {/* create new Group */}
        <AddButton onPress={() => this.toggleModal()} />

        <ArtefactModal
          isModalVisible={this.state.isModalVisible}
          toggleModal={this.toggleModal}
          newArtefact={this.state.newArtefact}
          onSubmit={this.onSubmit.bind(this)}
          setNewArtefact={this.setNewArtefact.bind(this)}
        />
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
    marginLeft: wd(0.032),
    marginRight: wd(0.032)
  },

  emptyFeed: {
    flex: 1,
    height: hp(0.7),
    alignItems: "center",
    justifyContent: "center"
  }
});

// check for prop types correctness
Artefacts.propTypes = {
  artefacts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getUserArtefacts: PropTypes.func.isRequired,
  createNewArtefacts: PropTypes.func.isRequired,
};

// map required redux state to local props
const mapStateToProps = state => ({
  artefacts: state.artefacts,
  auth: state.auth
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  { createNewArtefacts, getUserArtefacts }
)(Artefacts);
