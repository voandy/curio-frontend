import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  RefreshControl,
  Animated
} from "react-native";

// import redux actions for groups
import { createNewGroup, getUserGroups } from "../../actions/groupsActions";

// custom components
import CardCarousel from "../../component/CardCarousel";
import CardGroup from "../../component/CardGroup";
import SimpleHeader from "../../component/SimpleHeader";
import AddButton from "../../component/AddButton";
import KeyboardShift from "../../component/componentHelpers/KeyboardShift";

// Custom respondsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

// randomly* generated height for the cards
function* randomHeight() {
  while (true) {
    yield wd(0.4);
    yield wd(0.25);
    yield wd(0.47);
    yield wd(0.35);
    yield wd(0.3);
  }
}

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      refreshing: false,
      searchInput: ""
    };

    this.animVal = new Animated.Value(0);
  }
  // Nav bar details
  static navigationOptions = {
    header: null
  };

  onChangeSearchInput = searchInput => {
    this.setState({
      searchInput
    });
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

  // click a specific group on the Groups scene
  clickGroup = async groupId => {
    const { navigate } = this.props.navigation;
    navigate("SelectedGroup", { origin: "Groups", groupId });
  };

  onCreateNewGroup = () => {
    const { navigate } = this.props.navigation;
    // navigate to group form
    navigate("GroupsForm", { origin: "Groups" });
  };

  // show and renders groups components row-by-row
  showGroups = () => {
    var groups = this.props.groups.userGroups;
    // sort array based on date obtained (from earliest to oldest)
    groups.sort(function (a, b) {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    });
    // random height for cards to make things look spicier :)
    var cardHeight = randomHeight();

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
        cardHeight={cardHeight.next().value}
      />
    ));
    // prep a temporary array for row-by-row grouping logic
    //prettier-ignore
    var tempMapArray = [...Array(groupComponent.length).keys()].filter(n => !(n % 2))
    // fill up left and right columns in the page
    var arrayLeft = [];
    var arrayRight = [];
    for (index of tempMapArray) {
      arrayLeft.push(groupComponent[index]);
      arrayRight.push(groupComponent[index + 1]);
    }
    // groups cards feed
    return (
      <View style={styles.feed}>
        {/* left column */}
        <View style={{ width: wd(0.43) }}>{arrayLeft}</View>
        {/* middle spacing */}
        <View style={{ width: wd(0.05) }} />
        {/* right column */}
        <View style={{ width: wd(0.43), marginRight: wd(0.05) }}>
          {arrayRight}
        </View>
      </View>
    );
  };

  // show all the pinned groups in carousel
  showPinnedGroups = () => {
    var groups = this.props.groups.userGroups;
    // retain only pinned groups
    groups = groups.filter(group => group.pinned);
    // sort array based on date obtained (from earliest to oldest)
    groups.sort(function (a, b) {
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
      ? (<View style={styles.emptyCard}>
        <Text style={styles.warning}>Press and hold on a group to pin them</Text>
      </View>)
      : pinnedGroupComponent;
  };

  // display scroll indicator for pinned groups
  showScrollIndicator = () => {
    // extract pinned groups
    let groups = this.props.groups.userGroups;

    // TEMPORARY HERE, NICK THE MASTER CLEANER CLEAN THIS
    // BAR_WIDTH = 10; // this.BAR_WIDTH aint working lol idk why
    // SPACE_WIDTH = 15;
    numItems = groups.filter(group => group.pinned).length;
    itemWidth = 10 / numItems - (numItems - 1) * 15;

    groups = groups.filter(group => group.pinned);

    var indicatorArray = [];

    // create an indicator for each group present
    groups.forEach((group, i) => {
      // scroll animation properties
      const scrollBarVal = this.animVal.interpolate({
        inputRange: [wd(1) * (i - 1), wd(1) * (i + 1)],
        outputRange: [itemWidth, -itemWidth],
        extrapolate: "clamp"
      });

      console.log(scrollBarVal);

      // View -> inactive indicator (outer shell)
      // Animated.View -> active indicator
      const thisScrollIndicator = (
        <View
          key={`bar${i}`}
          style={[styles.inactiveScroll, { marginLeft: i === 0 ? 0 : 9 }]}
        >
          <Animated.View
            style={[
              styles.activeScroll,
              {
                transform: [{ translateX: scrollBarVal }]
              }
            ]}
          />
        </View>
      );
      // add into array
      indicatorArray.push(thisScrollIndicator);
    });
    return indicatorArray;
  };

  render() {
    // navigate between pages
    const { navigate } = this.props.navigation;
    // scroll indicator
    let scrollIndicator = this.showScrollIndicator();

    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            {/* scrollable area for CONTENT */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              // style={{ backgroundColor: "#FAFAFA" }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refreshGroupPage}
                />
              }
            >
              <SimpleHeader
                title="Groups"
                showSearch={true}
                searchInput={this.state.searchInput}
                onChangeSearchInput={this.onChangeSearchInput}
                pressClear={() => this.onChangeSearchInput("")}
                onSubmitEditing={() =>
                  navigate("GeneralSearch", {
                    searchTerms: this.state.searchInput
                  })
                }
                pressSearch={() =>
                  navigate("GeneralSearch", {
                    searchTerms: this.state.searchInput
                  })
                }
              />

              {/* carousel pinned groups */}
              <View style={{ height: wd(0.55), backgroundColor: "white" }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  decelerationRate={0.8}
                  style={{ backgroundColor: "white" }}
                  // snapToAlignment={"center"}
                  // snapToInterval={Dimensions.get("window").width}
                  pagingEnabled
                  onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: this.animVal } } }
                  ])}
                >
                  {/* pinned groups in carousel */}
                  {this.showPinnedGroups()}
                </ScrollView>
                {/* indicator for the scroll */}
                <View style={styles.indicatorContainer}>{scrollIndicator}</View>
              </View>

              {/* unpinned groups */}
              {this.props.groups.userGroups.length !== 0 ? (
                <View>{this.showGroups()}</View>
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
            <AddButton onPress={this.onCreateNewGroup.bind(this)} />
          </View>
        )}
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#FAFAFA"
  },

  feed: {
    flexDirection: "row",
    paddingHorizontal: wd(0.05)
  },

  emptyFeed: {
    flex: 1,
    height: hp(0.6),
    alignItems: "center",
    justifyContent: "center"
  },

  emptyCard: {
    width: wd(0.9),
    marginHorizontal: wd(0.05),
    height: wd(0.45),
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#E2E2E2",
    alignContent: "center",
    justifyContent: "center"
  },

  warning: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "HindSiliguri-Regular"
  },

  // scroll indicator
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: wd(0.05)
  },
  inactiveScroll: {
    backgroundColor: "#adadad",
    overflow: "hidden",
    height: 10,
    width: 10,
    borderRadius: 5
  },
  activeScroll: {
    backgroundColor: "#FF6E6E", // current carousel
    height: 10,
    width: 10,
    borderRadius: 5,
    position: "absolute",
    left: 0,
    top: 0
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
