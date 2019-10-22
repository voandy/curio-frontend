import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  RefreshControl,
  TouchableOpacity
} from "react-native";

import { searchUsers, searchGroups } from "../../actions/searchActions";

// Custom component
import SearchFeed from "../../component/SearchFeed";
import HeaderSearch from "../../component/HeaderSearch";

// custom responsive design component
import {
  deviceWidthDimension as wd,
  deviceHeigthDimension as hp
} from "../../utils/responsiveDesign";

class Search extends Component {
  constructor(props) {
    super(props);
    // extract navigation parameters
    const { searchTerms } = this.props.navigation.state.params;
    // setup initial state
    this.state = {
      // page parameters
      refreshing: false,
      // search parameters
      searchInput: searchTerms ? searchTerms : "",
      searchType: 0, //search type: 0: user search, 1: group search
      searchPerformed: false, // has first search been done?
      // search results
      userSearchResults: [],
      groupSearchResults: []
    };
    // perform search immediately if search terms are passed to this page
    if (searchTerms) this.doGeneralSearch(this.state.searchInput);
  }

  // nav bar details
  static navigationOptions = {
    header: null
  };

  // user wants to see user results
  switchToUserResults = () => {
    this.setState({ searchType: 0 });
  };

  // user wants to see group results
  switchToGroupResults = () => {
    this.setState({ searchType: 1 });
  };

  // user types new search terms
  onChangeSearchInput = searchInput => {
    this.setState({ searchInput });
  };

  // re-retrieve all required data - also used in page refresh
  reloadData = async () => {
    // show refreshing animation
    this.setState({ refreshing: true });
    // get search results from backend
    await this.doGeneralSearch(this.state.searchInput);
    // resets refreshing state
    this.setState({ refreshing: false });
  };

  // search for both users and groups on backend
  doGeneralSearch = searchInput => {
    // return early if search terms are empty
    if (!searchInput) return;
    // do both types of search at the same time
    return new Promise((resolve, reject) => {
      Promise.all([
        this.props.searchUsers({ searchTerms: searchInput }),
        this.props.searchGroups({ searchTerms: searchInput })
      ])
        .then(data => {
          // extract data
          let userSearchResults = data[0];
          let groupSearchResults = data[1];
          // store new results into local states
          this.setState(
            {
              searchPerformed: true,
              userSearchResults,
              groupSearchResults
            },
            // setState callback, success
            () => resolve()
          );
        })
        // failure in getting new search result
        .catch(err => {
          alert("Please try again later");
          reject(err);
        });
    });
  };

  // navigation functions //
  // navigate to user's profile
  gotoUserProfile = userId => {
    // navigate to selected user profile
    this.navigateToPage("PublicProfile", { userId });
  };

  // navigate to group page
  gotoGroupPage = groupId => {
    // navigate to selected group
    this.navigateToPage("SelectedGroup", { groupId });
  };

  // main navigation function
  navigateToPage = (page, options) => {
    const { push } = this.props.navigation;
    push(page, {
      origin: "GeneralSearch",
      ...options
    });
  };

  // component render functions //
  // decided what search results to show (user or group type)
  showSearchResults = () => {
    // show results based on current search type
    switch (this.state.searchType) {
      case 0:
        return this.showUserResults();
      case 1:
        return this.showGroupResults();
      default:
        return <Text style={styles.emptySearch}>Invalid search type.</Text>;
    }
  };

  // generate feed for user search results
  showUserResults = () => {
    // extract search results from local state
    const { userSearchResults } = this.state;
    // return early if there is no search result
    if (!userSearchResults.length) {
      return <Text style={styles.emptySearch}>No users found</Text>;
    }
    // transform each search result into a search feed component
    const userResultsFeed = userSearchResults.map(searchResult => {
      const userId = searchResult._id;
      // show user profile pic
      const imageSource = !searchResult.profilePic
        ? require("../../../assets/images/default-profile-pic.png")
        : { uri: searchResult.profilePic }
      return (
        <SearchFeed
          key={userId}
          heading={searchResult.name}
          subHeading={searchResult.username}
          isGroup={false}
          searchImage={imageSource}
          onPress={() => this.gotoUserProfile(userId)}
        />
      );
    });
    return userResultsFeed;
  };

  // generate feed for group search results
  showGroupResults = () => {
    // extract search results from local state
    const { groupSearchResults } = this.state;
    // return early if there is no search result
    if (!groupSearchResults.length) {
      return <Text style={styles.emptySearch}>No groups found</Text>;
    }
    // transform each search result into a search feed component
    const groupResultsFeed = groupSearchResults.map(searchResult => {
      const groupId = searchResult._id;
      return (
        <SearchFeed
          key={groupId}
          heading={searchResult.title}
          subHeading={searchResult.artefacts.length}
          isGroup={true}
          searchImage={searchResult.coverPhoto}
          onPress={() => this.gotoGroupPage(groupId)}
        />
      );
    });
    return groupResultsFeed;
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderSearch
          searchInput={this.state.searchInput}
          onChangeSearchInput={this.onChangeSearchInput}
          onSubmitEditing={event => {
            this.doGeneralSearch(event.nativeEvent.text);
          }}
          pressClear={() => this.onChangeSearchInput("")}
          pressSearch={() => {
            this.doGeneralSearch(this.state.searchInput);
          }}
        />

        {/* header tab */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: hp(0.01)
          }}
        >
          <TouchableOpacity
            onPress={this.switchToUserResults}
            style={styles.headerButton}
            activeOpacity={0.5}
          >
            {this.state.searchType === 0 ? (
              <Text style={[styles.highlightButtonText, styles.font]}>
                Users
              </Text>
            ) : (
                <Text style={[styles.headerButtonText, styles.font]}>Users</Text>
              )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.switchToGroupResults}
            style={styles.headerButton}
            activeOpacity={0.5}
          >
            {this.state.searchType === 1 ? (
              <Text style={[styles.highlightButtonText, styles.font]}>
                Groups
              </Text>
            ) : (
                <Text style={[styles.headerButtonText, styles.font]}>Groups</Text>
              )}
          </TouchableOpacity>
        </View>

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.reloadData}
            />
          }
        >
          {this.state.searchPerformed ? (
            // user search results
            this.showSearchResults()
          ) : (
              // group search results
              <Text style={styles.emptySearch}>
                Please enter search query above.
            </Text>
            )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },

  font: {
    fontFamily: "HindSiliguri-Bold"
  },

  emptySearch: {
    alignItems: "center",
    marginVertical: wd(0.1),
    textAlign: "center",
    color: "#707070"
  },

  headerButton: {
    alignContent: "center",
    marginHorizontal: 15
  },

  headerButtonText: {
    fontSize: 18,
    color: "black"
  },

  highlightButtonText: {
    fontSize: 18,
    color: "black",
    borderColor: "#FF6E6E",
    borderWidth: 0,
    borderBottomWidth: 3
  }
});

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  searchGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  search: state.search
});

export default connect(
  mapStateToProps,
  { searchUsers, searchGroups }
)(Search);
