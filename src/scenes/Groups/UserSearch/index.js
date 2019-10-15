import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TextInput,
  Image,
  Text
} from "react-native";

import {
  searchUsers,
  clearSearchResults
} from "../../../actions/searchActions";

// Custom component
import SearchFeed from "../../../component/SearchFeed";
import HeaderSearch from "../../../component/HeaderSearch";

// responsive design component
import { deviceWidthDimension as wd } from "../../../utils/responsiveDesign";

// this class is only used by selectedGroup to search for user to invite
class UserSearch extends Component {
  constructor(props) {
    super(props);
    // clear redux state in case user force quits the app and reopen it
    this.props.clearSearchResults();
    // set up initial state
    this.state = {
      searchInput: "",
      // has first search been done?
      searchPerformed: false
    };
  }

  // TODO change this when results fill in after search
  state = {
    searchResults: 0
  };

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  onChangeSearchInput = searchInput => {
    this.setState({
      searchInput
    });
  };

  doUserSearch = async searchInput => {
    if (searchInput == "") {
      alert("Please enter some search terms.");
    } else {
      await this.props.searchUsers({ searchTerms: searchInput }).then(() => {
        this.setState({
          searchPerformed: true
        });
      });
    }
  };

  // generate feed for user search results
  showUserResults = function(userSearchResults) {
    // extract all the required information
    const {
      toInvite,
      selectedGroup,
      onPress,
      groupId
    } = this.props.navigation.state.params;
    // preprocess data
    const memberIds = selectedGroup.members.map(x => x.memberId);
    const pendingInvites = selectedGroup.pendingInvitations;
    // create result feed
    if (userSearchResults.length === 0) {
      return <Text style={styles.emptySearch}>No users found</Text>;
    } else {
      var userResultsFeed = [];
      // create a view for each user result
      for (var i = 0; i < userSearchResults.length; i++) {
        // extract user id
        const userId = userSearchResults[i]._id;
        // check for conditions
        isGroupMember = memberIds.includes(userId);
        hasInvited = pendingInvites.includes(userId);
        // generate feed component based on conditions
        userResultsFeed.push(
          <SearchFeed
            key={i}
            heading={userSearchResults[i].name}
            subHeading={userSearchResults[i].username}
            searchImage={userSearchResults[i].profilePic}
            toInvite={toInvite}
            hasInvited={hasInvited}
            isGroupMember={isGroupMember}
            userId={userId}
            groupId={groupId}
            onPress={onPress}
          />
        );
      }
      return userResultsFeed;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* search header */}
        <HeaderSearch
          searchInput={this.state.searchInput}
          onChangeSearchInput={this.onChangeSearchInput}
          onSubmitEditing={event => {
            this.doUserSearch(event.nativeEvent.text);
          }}
        />

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {this.state.searchPerformed === true ? (
            // user search results
            this.showUserResults(this.props.search.userSearchResults)
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
  searchUsers: PropTypes.func.isRequired,
  clearSearchResults: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  search: state.search
});

export default connect(
  mapStateToProps,
  { searchUsers, clearSearchResults }
)(UserSearch);
