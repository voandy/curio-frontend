import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { StyleSheet, ScrollView, View, Text, StatusBar } from "react-native";

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

  showSearchResults = function (userSearchResults, groupSearchResults) {
    if (this.state.searchType === 0) {
      return this.showUserResults(userSearchResults);
    } else if (this.state.searchType === 0) {
      return this.showGroupResults(groupSearchResults);
    } else {
      return <Text style={styles.emptySearch}>Invalid search type.</Text>
    }
  }

  showUserResults = function (userSearchResults) {
    if (userSearchResults.length === 0) {
      return <Text style={styles.emptySearch}>No users found</Text>;
    } else {
      var userResultsFeed = [];

      // create a view for each user result
      for (var i = 0; i < userSearchResults.length; i++) {
        userResultsFeed.push(
          <SearchFeed
            key={i}
            heading={userSearchResults[i].name}
            subHeading={userSearchResults[i].username}
            isGroup={false}
            userProfilePic={userSearchResults[i].profilePic}
          />
        );
      }

      return userResultsFeed;
    }
  };

  showGroupResults = function (groupSearchResults) {
    if (userSearchResults.length === 0) {
      return <Text style={styles.emptySearch}>No users found</Text>;
    } else {
      var groupResultsFeed = [];

      // create a view for each group result
      for (var i = 0; i < groupSearchResults.length; i++) {
        userResultsFeed.push(
          <SearchFeed
            key={i}
            heading={groupSearchResults[i].name}
            subHeading={groupSearchResults[i].username}
            isGroup={false}
            userProfilePic={groupSearchResults[i].profilePic}
          />
        );
      }

      return groupResultsFeed;
    }
  };

  switchUserResults = () => {
    console.log("here");
    this.setState({
      searchType: 0
    });
  };

  switchGroupResults = () => {
    console.log("here2");
    this.setState({
      searchType: 1
    });
  };

  onChangeSearchInput = searchInput => {
    this.setState({
      searchInput
    });
  };

  doGeneralSearch = async searchInput => {
    await Promise.all([
      this.props.searchUsers({ searchTerms: searchInput }),
      this.props.searchGroups({ searchTerms: searchInput })
    ]).then(() => {
      this.setState({
        searchPerformed: true
      });
    });
  };

  render() {
    // navigation in app
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <HeaderSearch
          tab1="Users"
          tab2="Groups"
          searchInput={this.state.searchInput}
          onChangeSearchInput={this.onChangeSearchInput}
          onSubmitEditing={event => {
            this.doGeneralSearch(event.nativeEvent.text);
          }}
          switchUserResults={this.switchUserResults}
          switchGroupResults={this.switchGroupResults}
        />

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {this.state.searchPerformed === true
            ? // user search results
            this.showSearchResults(this.props.search.userSearchResults, this.props.search.groupSearchResults)
            : // group search results
            <Text style={styles.emptySearch}>Please enter search query above.</Text>}
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
    marginVertical: wd(0.2)
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
