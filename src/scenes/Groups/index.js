import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  StatusBar,
  RefreshControl
} from "react-native";

// import redux actions for groups
import { createNewGroup, getUserGroups } from "../../actions/groupsActions";

// custom components
import CardCarousel from "../../component/CardCarousel";
import CardGroup from "../../component/CardGroup";
import SimpleHeader from "../../component/SimpleHeader";
import AddButton from "../../component/AddButton";
import GroupModal from "../../component/GroupModal";
import KeyboardShift from "../../component/componentHelpers/KeyboardShift";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

// default gray colour
const gray = "#F7F7F7";

const newGroup = {
  adminId: "",
  title: "",
  description: "",
  private: true,
  imageURI: ""
};

class Groups extends Component {
  // Nav bar details
  static navigationOptions = {
    header: null
  };

  state = {
    isModalVisible: false,
    newGroup,
    refreshing: false
  };

  // CHANGE THIS LATER
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  // refresh page
  refreshGroupPage = async () => {
    this.setState({ refreshing: true });
    // get data from backend
    await this.props.getUserGroups(this.props.auth.user.id);
    // resets refreshing state
    this.setState({ refreshing: false });
  };

  // revert newGroup to initial state
  resetNewGroup = () => {
    this.setState({
      newGroup
    });
  };

  // new group's attribute change
  onNewGroupChange = (key, value) => {
    this.setState({
      newGroup: {
        ...this.state.newGroup,
        [key]: value
      }
    });
  };

  // post new group into the backend
  postNewGroup = async () => {
    await this.onNewGroupChange("adminId", this.props.auth.user.id);
    // redux action to create new group at the backend
    //prettier-ignore
    this.props.createNewGroup(this.state.newGroup)
      .then(() => {
        this.toggleModal();
        this.resetNewGroup();
      })
      .catch(err => console.log(err));
  };

  // click a specific group on the Groups scene
  clickGroup = async groupId => {
    const { navigate } = this.props.navigation;
    navigate("SelectedGroup", { groupId });
  };

  // show and renders groups components row-by-row
  showGroups = () => {
    var groups = this.props.groups.userGroups;
    // sort array based on date obtained (from earliest to oldest)
    groups.sort(function(a, b) {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    });
    // tranform each group element into a component
    const groupComponent = groups.map(group => (
      <CardGroup
        key={group.groupId}
        userId={this.props.auth.user.id}
        groupId={group.groupId}
        image={{ uri: group.details.coverPhoto }}
        title={group.details.title}
        onPress={this.clickGroup.bind(this)}
        pinned={group.pinned}
      />
    ));
    // prep a temporary array for row-by-row grouping logic
    //prettier-ignore
    var tempMapArray = [...Array(groupComponent.length).keys()].filter(n => !(n % 2))
    // put group component into row-by-row card groups
    const cardGroupComponent = tempMapArray.map(n => (
      <View style={styles.feed} key={n}>
        {[groupComponent[n], groupComponent[n + 1]]}
      </View>
    ));
    return cardGroupComponent;
  };

  // show all the pinned groups in carousel
  showPinnedGroups = () => {
    var groups = this.props.groups.userGroups;
    // retain only pinned groups
    groups = groups.filter(group => group.pinned);
    // sort array based on date obtained (from earliest to oldest)
    groups.sort(function(a, b) {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    });
    const pinnedGroupComponent = groups.map(group => (
      <CardCarousel
        key={group.groupId}
        image={group.details.coverPhoto}
        groupId={group.groupId}
        userId={this.props.auth.user.id}
        onPress={this.clickGroup.bind(this)}
      />
    ));
    // if no groups are pinned
    //prettier-ignore
    return (!pinnedGroupComponent || !pinnedGroupComponent.length) 
      ? (<View style={{justifyContent:"center", alignItems:"center", width:wd(1)}}>
          <Text style={styles.warning}>Press and hold on a group to pin them</Text>
         </View>) 
      : pinnedGroupComponent;
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            <SimpleHeader
              title="Groups"
              onSubmit={() => navigate("GeneralSearch")}
            />

            {/* scrollable area for CONTENT */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              style={{ backgroundColor: gray }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refreshGroupPage}
                />
              }
            >
              {/* carousel pinned groups */}
              <View style={{ height: wd(0.52), backgroundColor: "white" }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  decelerationRate={0.8}
                  snapToAlignment={"center"}
                  snapToInterval={Dimensions.get("window").width}
                >
                  {this.showPinnedGroups()}
                </ScrollView>
              </View>

              {/* unpinned groups */}
              {this.props.groups.userGroups.length !== 0 ? (
                <View style={{ marginBottom: 10 }}>{this.showGroups()}</View>
              ) : (
                <View style={styles.emptyFeed}>
                  <Text style={styles.warning}>
                    Looks like you're not part of any groups yet {"\n"}Click the
                    "+" button to create a group
                  </Text>
                </View>
              )}
            </ScrollView>

            {/* create new Group */}
            <AddButton onPress={() => navigate("GroupsForm")} />
          </View>
        )}
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },

  feed: {
    flexDirection: "row"
  },

  emptyFeed: {
    flex: 1,
    height: hp(0.6),
    alignItems: "center",
    justifyContent: "center"
  },

  warning: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "HindSiliguri-Regular"
  }
});

Groups.propTypes = {
  createNewGroup: PropTypes.func.isRequired,
  groups: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groups: state.groups,
  auth: state.auth,
  user: state.user
});

//  connect to redux and export
export default connect(
  mapStateToProps,
  { createNewGroup, getUserGroups }
)(Groups);
