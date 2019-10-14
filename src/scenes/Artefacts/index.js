import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  Image
} from "react-native";

// custom components
import ArtefactFeed from "../../component/ArtefactFeed";
import SimpleHeader from "../../component/SimpleHeader";
import AddButton from "../../component/AddButton";

// redux actions
import {
  createNewArtefacts,
  getSelectedArtefact,
  getUserArtefacts,
  getArtefactComments
} from "../../actions/artefactsActions";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

// import the loader modal to help show loading process
import ActivityLoaderModal from "../../component/ActivityLoaderModal";

class Artefacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      loading: false,
      refreshing: false,
      isPublicTab: true
    };
    this.onChangePrivacyTab = this.onChangePrivacyTab.bind(this);
  }

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  // toggle the modal for new artefact creation
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  // setter function for "loading" to show user that something is loading
  setLoading = loading => {
    this.setState({
      ...this.state,
      loading
    });
  };

  // change privacy tab
  onChangePrivacyTab = () => {
    this.setState({
      isPublicTab: !this.state.isPublicTab
    });
  };

  // click a specific artefact and navigate to it
  clickArtefact = async artefactId => {
    const { navigate } = this.props.navigation;
    // navigate to selected artefact
    navigate("SelectedArtefact", { origin: "Artefacts", artefactId });
  };

  onNewArtefactCreate = () => {
    const { navigate } = this.props.navigation;
    navigate("ArtefactsForm", { origin: "Artefacts" });
  };

  // return ArtefactFeedRows containing ArtefactFeed in different rows
  showArtefacts = (artefacts, privacy) => {
    let artefactFeedRows = [];
    let artefactFeeds = [];
    let rowKey = 0;
    let artefactKey = 0;

    // sort array based on date obtained (from earliest to oldest)
    artefacts.sort(function(a, b) {
      return new Date(b.datePosted) - new Date(a.datePosted);
    });

    // create ArtefactFeed object out of artefact and push it into artefactFeeds array
    for (var i = 0; i < artefacts.length; i++) {
      const artefactId = artefacts[i]._id;

      if (artefacts[i].privacy === privacy) {
        artefactFeeds.push(
          
          // click-able artefact images which will navigate to selectedArtefact
          <ArtefactFeed
            onPress={() => this.clickArtefact(artefactId)}
            key= {artefactKey}
            image={{ uri: artefacts[i].images[0].URL }}
          />
        );
        artefactKey++;
      }
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
    this.setState({ refreshing: true });

    // get data from backend
    await this.props.getUserArtefacts(this.props.auth.user.id);

    // resets refreshing state
    this.setState({ refreshing: false });
  };

  //prettier-ignore
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/* loading modal window */}
        <ActivityLoaderModal loading={this.state.loading} />
        {/* header */}
        <SimpleHeader
          title="My Artefacts"
          showTab={true}
          onChangePrivacyTab={this.onChangePrivacyTab}
          isPublicTab={this.state.isPublicTab}
          tab1="Public"
          tab2="Private"
          onSubmit={() => navigate("GeneralSearch")}
        />
        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshArtefacts}
            />
          }
        >
          {/* all artefacts posted by the user based on the their privacy settings */}
          {Object.keys(this.props.artefacts.userArtefacts).length !== 0 ? (
            <View>
              {this.state.isPublicTab === true && this.showArtefacts(this.props.artefacts.userArtefacts, 0)}
              {this.state.isPublicTab === false && this.showArtefacts(this.props.artefacts.userArtefacts, 1)}
            </View>
          ) : (
            <View style={styles.emptyFeed}>
              <Text style={{ fontSize: 16, fontFamily: "HindSiliguri-Regular" }}>
                Looks like you haven't posted any artefacts
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "HindSiliguri-Regular" }}>
                Click the "+" button to add some
              </Text>
            </View>
          )}
        </ScrollView>

        {/* create new Group */}
        <AddButton onPress={this.onNewArtefactCreate.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    width: wd(0.3),
    height: wd(0.3)
  },

  card: {
    width: wd(0.3),
    height: wd(0.3),
    margin: wd(0.006)
  },

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
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
  createNewArtefacts: PropTypes.func.isRequired
};

// map required redux state to local props
const mapStateToProps = state => ({
  artefacts: state.artefacts,
  auth: state.auth
});

// map required redux state and actions to local props
export default connect(
  mapStateToProps,
  {
    createNewArtefacts,
    getSelectedArtefact,
    getUserArtefacts,
    getArtefactComments
  }
)(Artefacts);
