import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar
} from "react-native";

import {
  searchUsers,
  searchGroups,
  clearSearchResults
} from "../../actions/searchActions";

// Custom component
import SearchFeed from "../../component/SearchFeed";
import HeaderSearch from "../../component/HeaderSearch";

class Search extends Component {
  constructor() {
    super();

    // clear redux state in case user force quits the app and reopen it
    // this.props.clearSearchResults();
  }

  // Nav bar details
  static navigationOptions = {
    header: null
  };

  componentWillUpdate(nextProps) {
    // refresh search results
    if (nextProps.props.userSearchResults !== this.props.userSearchResults) {
      this.setState({
        userData: nextProps.userSearchResults
      });
      console.log(this.props.userSearchResults);
    }
  }

  doGeneralSearch = () => {
    this.props.searchUsers({ "searchTerms": "Doe" }).then(() => {
      console.log(this.props.userSearchResults);
      alert("I done search!");
    });
  }

  render() {

    // navigation in app
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <HeaderSearch tab1="Users" tab2="Groups" onSubmitEditing={event => {this.doGeneralSearch()}}/>

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >

            <SearchFeed heading="Bob" subHeading="bob" isGroup={false}
                image={require("../../../assets/images/test-delete-this/boi1.jpg")}/>
            <SearchFeed heading="Sarah" subHeading="sarahLeee" isGroup={false}
                image={require("../../../assets/images/test-delete-this/boi2.jpg")}/>
            <SearchFeed heading="MEME LEGEND" subHeading="5" isGroup={true}
                image={require("../../../assets/images/test-delete-this/boi4.jpg")}/>

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
});

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  searchGroups: PropTypes.func.isRequired,
  clearSearchResults: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  search: state.reducers
});

export default connect(
  mapStateToProps,
  { searchUsers, searchGroups, clearSearchResults }
)(Search);