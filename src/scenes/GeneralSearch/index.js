import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from "react-native";

import {
  searchUsers,
  searchGroups,
  clearSearchResults
} from "../../actions/searchActions";

// Custom component
import SearchFeed from "../../component/SearchFeed";
import HeaderSearch from "../../component/HeaderSearch";

// custom responsive design component
import { deviceWidthDimension as wd } from "../../utils/responsiveDesign";

class Search extends Component {
  constructor(props) {
    super(props);

    // clear redux state in case user force quits the app and reopen it
    this.props.clearSearchResults();

    this.state = {
      searchInput: "",
      //search type: 0: user search, 1: group search
      searchType: 0,
      // has first search been done?
      searchPerformed: false
    };
  }

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  componentWillUpdate(nextProps) {
    // refresh search results
    if (nextProps.search !== this.props.search) {
      this.setState({
        search: nextProps.search
      });
    }
  }

  // navigate to user's profile
  gotoUserProfile = userId => {
    const { navigate } = this.props.navigation;
    // navigate to selected user profile
    navigate("PublicProfile", { userId });
  };

  // navigate to group page
  gotoGroupPage = groupId => {
    const { navigate } = this.props.navigation;
    // navigate to selected group
    navigate("SelectedGroup", { groupId });
  };

  // generate both user and group search feeds
  showSearchResults = function(userSearchResults, groupSearchResults) {
    if (this.state.searchType === 0) {
      return this.showUserResults(userSearchResults);
    } else if (this.state.searchType === 1) {
      return this.showGroupResults(groupSearchResults);
    } else {
      return <Text style={styles.emptySearch}>Invalid search type.</Text>;
    }
  };

  // generate feed for user search results
  showUserResults = function(userSearchResults) {
    if (userSearchResults.length === 0) {
      return <Text style={styles.emptySearch}>No users found</Text>;
    } else {
      var userResultsFeed = [];

      // create a view for each user result
      for (var i = 0; i < userSearchResults.length; i++) {
        const userId = userSearchResults[i]._id;
        userResultsFeed.push(
          <SearchFeed
            key={i}
            heading={userSearchResults[i].name}
            subHeading={userSearchResults[i].username}
            isGroup={false}
            searchImage={userSearchResults[i].profilePic}
            onPress={() => this.gotoUserProfile(userId)}
          />
        );
      }

      return userResultsFeed;
    }
  };

  // generate feed for group search results
  showGroupResults = function(groupSearchResults) {
    if (groupSearchResults.length === 0) {
      return <Text style={styles.emptySearch}>No groups found</Text>;
    } else {
      var groupResultsFeed = [];

      // create a view for each group result
      for (var i = 0; i < groupSearchResults.length; i++) {
        const groupId = groupSearchResults[i]._id;
        groupResultsFeed.push(
          <SearchFeed
            key={i}
            heading={groupSearchResults[i].title}
            subHeading={groupSearchResults[i].artefacts.length}
            isGroup={true}
            searchImage={groupSearchResults[i].coverPhoto}
            onPress={() => this.gotoGroupPage(groupId)}
          />
        );
      }

      return groupResultsFeed;
    }
  };

  switchUserResults = () => {
    this.setState({
      searchType: 0
    });
  };

  switchGroupResults = () => {
    this.setState({
      searchType: 1
    });
  };

  onChangeSearchInput = searchInput => {
    this.setState({
      searchInput
    });
  };

  // search for both users and groups on backend
  doGeneralSearch = async searchInput => {
    if (searchInput == "") {
      alert("Please enter some search terms.");
    } else {
      await Promise.all([
        this.props.searchUsers({ searchTerms: searchInput }),
        this.props.searchGroups({ searchTerms: searchInput })
      ]).then(() => {
        this.setState({
          searchPerformed: true
        });
      });
    }
  };

  render() {
    // navigation in app
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <HeaderSearch
          searchInput={this.state.searchInput}
          onChangeSearchInput={this.onChangeSearchInput}
          onSubmitEditing={event => {
            this.doGeneralSearch(event.nativeEvent.text);
          }}
        />

        {/* header tab */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={this.switchUserResults}
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
            onPress={this.switchGroupResults}
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
        >
          {this.state.searchPerformed === true ? (
            // user search results
            this.showSearchResults(
              this.props.search.userSearchResults,
              this.props.search.groupSearchResults
            )
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
    marginTop: StatusBar.currentHeight,
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
    marginTop: 10,
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
  searchGroups: PropTypes.func.isRequired,
  clearSearchResults: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  search: state.search
});

export default connect(
  mapStateToProps,
  { searchUsers, searchGroups, clearSearchResults }
)(Search);
