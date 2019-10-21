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

class Groups extends Component {
  constructor(props) {
    super(props);
    // setup initial state
    this.state = {
      isModalVisible: false,
      refreshing: false,
      searchInput: ""
    };
    // animation for pinned groups scroll indicators
    this.animVal = new Animated.Value(0);
  }

  // nav bar details
  static navigationOptions = {
    header: null
  };

  // setter for search bar input
  onChangeSearchInput = searchInput => {
    this.setState({ searchInput });
  };

  // re-retrieve all required data - also used in page refresh
  reloadData = async () => {
    this.setState({ refreshing: true });
    // get data from backend
    await this.props.getUserGroups(this.props.auth.user.id);
    // resets refreshing state
    this.setState({ refreshing: false });
  };

  // navigation functions //
  // user selects a specific group in the Groups scene
  onGroupPress = groupId => {
    // redirect user to selected group
    this.navigateToPage("SelectedGroup", { groupId });
  };

  // user wants to create a group
  onCreateNewGroup = () => {
    // navigate to group form
    this.navigateToPage("GroupsForm");
  };

  // user typed and enters search inputs
  onSearchInputSubmit = () => {
    // navigate to general search page
    this.navigateToPage("GeneralSearch", {
      searchTerms: this.state.searchInput
    });
  };

  // main navigation function
  navigateToPage = (page, options) => {
    const { push } = this.props.navigation;
    push(page, {
      origin: "Groups",
      ...options
    });
  };

  // component render functions //
  // show and renders groups components row-by-row
  showGroups = () => {
    var groups = this.props.groups.userGroups;
    // sort array based on date obtained (from earliest to oldest)
    groups.sort(function(a, b) {
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
        onPress={this.onGroupPress.bind(this)}
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
    let groups = this.props.groups.userGroups;
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
        onPress={this.onGroupPress.bind(this)}
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
  //prettier-ignore
  showScrollIndicator = () => {
    // extract pinned groups
    let groups = this.props.groups.userGroups;
    // only retains pinned groups
    groups = groups.filter(group => group.pinned);
    // prepare scroll indicator values
    numItems = groups.length;
    itemWidth = 10 / numItems - (numItems - 1) * 15;
    // generate dots based on pinned groups
    const indicatorComponents = groups.map((group, i) => {
      //scroll animation properties
      const scrollBarVal = this.animVal.interpolate({
        inputRange: [wd(1) * (i - 1), wd(1) * (i + 1)],
        outputRange: [itemWidth, -itemWidth],
        extrapolate: "clamp"
      });
      // View -> inactive indicator (outer shell)
      // Animated.View -> active indicator
      const dotIndicator = (
        <View
          key={`bar${i}`}
          style={[styles.inactiveScroll, { marginLeft: i === 0 ? 0 : 9 }]}
        >
          <Animated.View
            style={[ styles.activeScroll, { transform: [{ translateX: scrollBarVal }] } ]}
          />
        </View>
      );
      return dotIndicator;
    });
    return indicatorComponents;
  };

  offset = 0; // offset from previous position
  scrollDir = 0; // 0 means down, 1 means up
  // determine scroll direction
  onScroll = event => {
    var currentOffset = event.nativeEvent.contentOffset.y;
    var direction = currentOffset > this.offset ? 0 : 1;
    this.offset = currentOffset;
    this.scrollDir = direction;
  };

  render() {
    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            {/* scrollable area for CONTENT */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={this.onScroll}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.reloadData}
                />
              }
            >
              <SimpleHeader
                title="Groups"
                showSearch={true}
                searchInput={this.state.searchInput}
                onChangeSearchInput={this.onChangeSearchInput}
                pressClear={() => this.onChangeSearchInput("")}
                onSubmitEditing={() => this.onSearchInputSubmit()}
                pressSearch={() => this.onSearchInputSubmit()}
              />

              {/* carousel pinned groups */}
              <View style={{ height: wd(0.55), backgroundColor: "white" }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  decelerationRate={0.8}
                  style={{ backgroundColor: "white" }}
                  pagingEnabled
                  onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: this.animVal } } }
                  ])}
                >
                  {/* pinned groups in carousel */}
                  {this.showPinnedGroups()}
                </ScrollView>
                {/* indicator for the scroll */}
                <View style={styles.indicatorContainer}>
                  {this.showScrollIndicator()}
                </View>
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
            <AddButton
              onPress={this.onCreateNewGroup.bind(this)}
              scrollUp={this.scrollDir}
            />
            {/* <AddButton onPress={this.onCreateNewGroup.bind(this)} /> */}
          </View>
        )}
      </KeyboardShift>
    );
  }
}

// randomly generate a height value for group cards
function* randomHeight() {
  while (true) {
    yield wd(0.4);
    yield wd(0.25);
    yield wd(0.47);
    yield wd(0.35);
    yield wd(0.3);
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
    paddingHorizontal: wd(0.05),
    paddingBottom: wd(0.025)
  },

  emptyFeed: {
    flex: 1,
    height: hp(0.3),
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
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "#FF6E6E",
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
