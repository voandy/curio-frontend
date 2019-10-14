import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  RefreshControl
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

class Artefacts extends Component {
  constructor(props) {
    super(props);
    // setup initial state
    this.state = {
      loading: false,
      refreshing: false,
      isPublicTab: true
    };
  }

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  // setter functions //
  // setter function for change privacy tab
  onChangePrivacyTab = () => {
    this.setState({ isPublicTab: !this.state.isPublicTab });
  };

  // refresh page
  refreshArtefacts = async () => {
    this.setState({ refreshing: true });
    // get data from backend
    await this.props.getUserArtefacts(this.props.auth.user.id);
    // resets refreshing state
    this.setState({ refreshing: false });
  };

  // user press + button to create a new artefact
  onNewArtefactCreate = () => {
    const { navigate } = this.props.navigation;
    // redirect user
    navigate("ArtefactsForm", { origin: "Artefacts" });
  };

  // artefact feed functions //
  // for each individual artefact clicked by user
  onArtefactClick = async artefactId => {
    const { navigate } = this.props.navigation;
    // redirect user
    navigate("SelectedArtefact", { origin: "Artefacts", artefactId });
  };

  // show artefacts by privacy settings
  showArtefacts = () => {
    // extract required data
    artefacts = this.props.artefacts.userArtefacts;
    privacy = this.state.isPublicTab ? 0 : 1;
    // filter artefacts by their privacy settings
    artefacts = artefacts.filter(x => x.privacy == privacy);
    // return modularized feed component
    return (
      <ArtefactFeed
        artefacts={artefacts}
        onPress={this.onArtefactClick.bind(this)}
      />
    );
  };

  //prettier-ignore
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
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

        {/* scrollable area for artefact feeds */}
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
          {Object.keys(this.props.artefacts.userArtefacts).length !== 0 
            ? this.showArtefacts() 
            : // if user has no artefacts 
              (
                <View style={styles.emptyFeed}>
                  <Text style={styles.emptyfeedText}>
                    Looks like you haven't posted any artefacts
                  </Text>
                  <Text style={styles.emptyfeedText}>
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
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },

  emptyFeed: {
    flex: 1,
    height: hp(0.7),
    alignItems: "center",
    justifyContent: "center"
  },

  emptyfeedText: {
    fontSize: hp(0.02),
    fontFamily: "HindSiliguri-Regular"
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
