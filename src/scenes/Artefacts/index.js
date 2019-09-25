import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dimensions, StyleSheet, ScrollView, View, Text, RefreshControl, TouchableOpacity, Image } from "react-native";
// custom components
import SimpleHeader from "../../component/SimpleHeader";
import ArtefactFeed from "../../component/ArtefactFeed";
import ArtefactModal from "../../component/ArtefactModal";
import AddButton from "../../component/AddButton";

// redux actions
import { createNewArtefacts, selectArtefact, getUserArtefacts } from "../../actions/artefactsActions";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
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

  // Navbar details
  static navigationOptions = {
    header: null
  };

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

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  // update selectedArtefact when it has already been changed
  componentWillUpdate(nextProps) {
    if (this.props.artefacts !== nextProps.artefacts) { 
    
      // reload userArtefacts to update userArtefacts in redux state
      this.props.getUserArtefacts(this.props.auth.user.id);
    }
  }

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

  // click a specific artefact and navigate to it
  clickArtefact = async (artefactId) => {
    const { navigate } = this.props.navigation;

    // get artefact information and navigate to it
    await this.props.selectArtefact(artefactId);

    // navigate to selected artefact
    navigate("SelectedArtefact");
  }

  // return ArtefactFeedRows containing ArtefactFeed in different rows
  showArtefacts = artefacts => {
    let artefactFeedRows = [];
    let artefactFeeds = [];
    let rowKey = 0;
    let artefactKey = 0;

    // sort array based on date obtained (from earliest to oldest)
    artefacts.sort(function (a, b) {
      return new Date(b.datePosted) - new Date(a.datePosted);
    });
    // create ArtefactFeed object out of artefact and push it into artefactFeeds array
    for (var i = 0; i < artefacts.length; i++) {
      const artefactId = artefacts[i]._id;
      
      artefactFeeds.push(
        // DOES NOT WORK!!!!!!!!
        // <ArtefactFeed
        //   onPress={() => this.clickArtefact.bind(this)}
        //   artefactId = {artefacts[i]._id}
        //   key={artefactKey}
        //   image={{ uri: artefacts[i].images[0].URL }}
        // />

        <View style={styles.card} key={artefactKey}>
            <TouchableOpacity onPress={() => this.clickArtefact(artefactId)} activeOpacity={0.5} >     
                <Image style={styles.photo} source={{ uri: artefacts[i].images[0].URL }} />
            </TouchableOpacity>
        </View>
      );
      artefactKey++;
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
        {/* <AddButton onPress={() => navigate("ArtefactsForm")} /> */}

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
  // ARTEFACT FEED
  photo: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
  },
  card: {
      width: Dimensions.get('window').width * 0.3,
      height: Dimensions.get('window').width * 0.3,
      margin: Dimensions.get('window').width * 0.006,
  },

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
  { createNewArtefacts, selectArtefact, getUserArtefacts }
)(Artefacts);
