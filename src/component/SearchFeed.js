import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from "react-native";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

/**searching feed that searches for either users or groups
 * used in SearchPage */
class SearchFeed extends Component {
  constructor(props) {
    super(props);
    // setup initial state
    this.state = {
      inviteButtonPressed: false
    };
  }

  // select subheading text
  showSubHeading = () => {
    const { isGroupMember, hasInvited, subHeading, isGroup } = this.props;
    if (isGroup) return `${subHeading} artefacts`;
    if (isGroupMember) return `@${subHeading} is already a member`;
    if (hasInvited) return `@${subHeading} has already been invited`;
    return `@${subHeading}`;
  };

  // show invite button only in group -> invite member search page
  showButton = () => {
    // extracts props passed in
    const {
      isGroupMember,
      hasInvited,
      toInvite,
      groupId,
      userId,
      reloadDataAtOrigin
    } = this.props;
    // only enable button if user hasn't joined or been invited
    const buttonCondition =
      hasInvited || isGroupMember || this.state.inviteButtonPressed
        ? styles.inviteButtonDisabled
        : styles.inviteButtonEnabled;
    // show invite button
    //prettier-ignore
    return toInvite ? (
      <View style={styles.inviteButtonContainer}>
        <TouchableOpacity
          style={[styles.inviteButton, buttonCondition]}
          disabled={hasInvited || isGroupMember || this.state.inviteButtonPressed}
          onPress={() => {
            this.setState({ inviteButtonPressed: true })
            this.props.onPress(groupId, userId).then(() => {
              // reload data on origin page if required (it is not null)
              if (reloadDataAtOrigin) reloadDataAtOrigin();
            })
          }}
        >
          <Text style={styles.text}>Invite</Text>
        </TouchableOpacity>
      </View>
    ) : (
        <View />
      );
  };

  //prettier-ignore
  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.card}
          onPress={() => this.props.onPress()}
          disabled={this.props.toInvite}
        >
          {/* search result */}
          <View style={styles.userDetailsContainer}>
            {/* search results image  */}
            <View style={styles.picPlaceholder}>
              <Image
                style={styles.image}
                source={ this.props.searchImage }
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>

            {/* search results details */}
            <View style={styles.searchPlaceholder}>
              <Text style={styles.heading}>{this.props.heading}</Text>
              <Text style={styles.subHeading}>{this.showSubHeading()}</Text>
            </View>
          </View>

          {/* invite button */}
          {this.showButton()}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: wd(1),
    height: hp(0.095),
    flexDirection: "row",
    alignItems: "center"
  },

  userDetailsContainer: {
    flex: 0.75,
    flexDirection: "row",
    paddingHorizontal: wd(0.01)
  },

  picPlaceholder: {
    width: hp(0.071),
    height: hp(0.071),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wd(0.032),
    paddingLeft: wd(0.014)
  },

  image: {
    width: hp(0.071),
    height: hp(0.071),
    borderRadius: hp(0.71)
  },

  searchPlaceholder: {
    flexWrap: "wrap",
    flex: 1,
    alignSelf: "center"
  },

  heading: {
    fontFamily: "HindSiliguri-Bold",
    fontSize: wd(0.04)
  },

  subHeading: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: wd(0.032),
    color: "#939090"
  },

  inviteButtonContainer: {
    flex: 0.25,
    alignSelf: "center"
  },

  inviteButton: {
    alignItems: "center",
    justifyContent: "center",
    width: wd(0.2),
    height: wd(0.08),
    borderRadius: wd(0.13)
  },

  inviteButtonEnabled: {
    backgroundColor: "#FF6E6E"
  },

  inviteButtonDisabled: {
    backgroundColor: "#e0e0e0"
  },

  line: {
    borderBottomColor: "#939090",
    borderBottomWidth: 0.4,
    width: wd(0.9),
    alignSelf: "center"
  },

  text: {
    fontSize: wd(0.032),
    color: "white",
    fontFamily: "HindSiliguri-Bold"
  }
});

//  export
export default SearchFeed;
