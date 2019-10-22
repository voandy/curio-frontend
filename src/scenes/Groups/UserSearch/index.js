import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Text,
  RefreshControl
} from "react-native";

import { searchUsers } from "../../../actions/searchActions";
import { getSelectedGroup } from "../../../actions/groupsActions";

// Custom component
import SearchFeed from "../../../component/SearchFeed";
import HeaderSearch from "../../../component/HeaderSearch";

// responsive design component
import { deviceWidthDimension as wd } from "../../../utils/responsiveDesign";

// this class is only used by selectedGroup to search for user to invite
class UserSearch extends Component {
  constructor(props) {
    super(props);
    // extract navigation parameters
    const { groupId } = this.props.navigation.state.params;
    // set up initial state
    this.state = {
      // page parameters
      refreshing: false,
      // search parameters
      searchInput: "",
      searchPerformed: false, // has first search been done?
      // search results
      searchResults: [],
      // set selected group on start up (for invite user search)
      group: {},
      groupId
    };
    // populate group data
    if (groupId) {
      this.getGroupData();
    } else {
      alert("Something went wrong");
    }
  }

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  // user types new search terms
  onChangeSearchInput = searchInput => {
    this.setState({ searchInput });
  };

  //prettier-ignore
  getGroupData = () => {
    return new Promise((resolve, reject) => {
      // extract navigation parameters
      const { groupId } = this.props.navigation.state.params;
      // populate group data
      this.props.getSelectedGroup(groupId)
        .then(group => this.setState({ group }, () => resolve()))
        .catch(err => {
          alert("Please try again later");
          reject(err);
        });
    });
  };

  // re-retrieve all required data - also used in page refresh
  reloadData = async () => {
    this.setState({ refreshing: true });
    // redo user search
    await this.doUserSearch(this.state.searchInput);
    // resets refreshing state
    this.setState({ refreshing: false });
  };

  // search for users on backend
  doUserSearch = async searchInput => {
    // return early if search terms are empty
    if (!searchInput) return;
    // reload group data first to update search results components
    if (this.state.groupId) await this.getGroupData();
    // do both types of search at the same time
    return new Promise((resolve, reject) => {
      this.props
        .searchUsers({ searchTerms: searchInput })
        .then(searchResults => {
          // store new results into local states
          this.setState(
            {
              searchPerformed: true,
              searchResults
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

  // generate feed for user search results
  showSearchResults = () => {
    // extract data from local state
    const { searchResults, group } = this.state;
    // return early if there is no search result
    if (!searchResults.length && !this.state.refreshing) {
      return <Text style={styles.emptySearch}>No users found</Text>;
    }
    // extract all the required information
    const {
      toInvite,
      onPress,
      groupId,
      reloadDataAtOrigin
    } = this.props.navigation.state.params;
    // preprocess data
    const memberIds = group.members.map(x => x.memberId);
    const pendingInvites = group.pendingInvitations;
    // transform each search result into a search feed component
    const searchResultsFeed = searchResults.map(searchResult => {
      // get user's id
      const userId = searchResult._id;
      // check for conditions
      const isGroupMember = memberIds.includes(userId);
      const hasInvited = pendingInvites.includes(userId);
      // return a search feed component
      return (
        <SearchFeed
          key={userId}
          heading={searchResult.name}
          subHeading={searchResult.username}
          searchImage={searchResult.profilePic}
          toInvite={toInvite}
          hasInvited={hasInvited}
          isGroupMember={isGroupMember}
          userId={userId}
          groupId={groupId}
          onPress={onPress}
          reloadDataAtOrigin={reloadDataAtOrigin}
        />
      );
    });
    return searchResultsFeed;
  };

  render() {
    // groupId is not passed in, return early because this would not work
    // without it
    if (!this.state.groupId) return <View></View>;
    // normal renders
    return (
      <View style={styles.container}>
        {/* search header */}
        <HeaderSearch
          searchInput={this.state.searchInput}
          onChangeSearchInput={this.onChangeSearchInput}
          onSubmitEditing={event => {
            this.doUserSearch(event.nativeEvent.text);
          }}
          pressClear={() => this.onChangeSearchInput("")}
          pressSearch={() => {
            this.doUserSearch(this.state.searchInput);
          }}
        />

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

  search: {
    flexDirection: "row",
    marginHorizontal: wd(0.07),
    backgroundColor: "white",
    elevation: 9,
    marginVertical: 25,
    height: 45,
    borderRadius: 10
  },

  searchText: {
    flex: 1,
    marginLeft: 20,
    alignSelf: "center"
  },

  searchIcon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    marginRight: 20,
    tintColor: "#707070"
  },

  emptySearch: {
    alignItems: "center",
    marginVertical: wd(0.1),
    textAlign: "center",
    color: "#707070"
  }
});

UserSearch.propTypes = {
  searchUsers: PropTypes.func.isRequired
};

export default connect(
  null,
  { searchUsers, getSelectedGroup }
)(UserSearch);
