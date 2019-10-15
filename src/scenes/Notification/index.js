import React, { Component } from "react";
import {
  RefreshControl,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Text
} from "react-native";

// redux actions
import { connect } from "react-redux";
import {
  getUserNotifications,
  setSeenStatusToTrue
} from "../../actions/notificationActions";
import {
  getSelectedGroup,
  getSelectedGroupAllArtefacts,
  getSelectedGroupAllMembers
} from "../../actions/groupsActions";
import {
  getSelectedArtefact,
  getArtefactComments
} from "../../actions/artefactsActions";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

// Custom component
import SimpleHeader from "../../component/SimpleHeader";
import NotificationFeed from "../../component/NotificationFeed";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      searchInput: ""
    };
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

  // navigate to page accordingly
  clickNotification = async notif => {
    const { navigate } = this.props.navigation;
    // get notification details
    const { refId, category, seenStatus, data } = notif;
    const { type } = data;
    // only send api request when user has not seen it
    if (!seenStatus) this.props.setSeenStatusToTrue(notif._id);
    // navigate based on category
    switch (category) {
      case "artefact":
        navigate("SelectedArtefact", { artefactId: refId });
        return;
      case "group":
        navigate("SelectedGroup", { groupId: refId });
        return;
      case "invitation":
        // another layer of conditions
        switch (type) {
          case "invite":
            navigate("Invitation", { notif });
            return;
          case "accept":
            navigate("SelectedGroup", { groupId: refId });
            return;
          default:
            console.log("Error: invalid notification invitation type");
            return;
        }
      default:
        console.log("Error: invalid notification type");
        return;
    }
  };

  // refresh page
  refreshPage = async () => {
    this.setState({ refreshing: true });
    // get data from backend
    await this.props.getUserNotifications(this.props.auth.user.id);
    // resets refreshing state
    this.setState({ refreshing: false });
  };

  // create all the notifications components to be rendered
  renderAllNotifications = () => {
    const { notifications } = this.props.notification;
    // sort array based on date posted (from earliest to oldest)
    notifications.sort(function(a, b) {
      return new Date(b.datePosted) - new Date(a.datePosted);
    });
    // create an individual component for each notification
    const notificationsComponent = notifications.map(notif => (
      <NotificationFeed
        notification={notif}
        key={notif._id}
        onPress={this.clickNotification}
      />
    ));
    // return the components array
    return notificationsComponent;
  };

  render() {
    const { navigate } = this.props.navigation;
    const { notifications } = this.props.notification;

    return (
      <View style={styles.container}>
        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshPage}
            />
          }
        >
          <SimpleHeader
            title="Notifications"
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

          {this.renderAllNotifications(this.props.notification.notifications)}

          {/* no more notifications ! */}
          <Text
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginVertical: 40,
              fontFamily: "HindSiliguri-Regular"
            }}
          >
            {" "}
            No more notifications.{" "}
          </Text>
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

  line: {
    borderBottomColor: "#939090",
    borderBottomWidth: 0.4,
    width: wd(0.9),
    alignSelf: "center"
  }
});

// map required redux state to local props
const mapStateToProps = state => ({
  auth: state.auth,
  notification: state.notification
});

export default connect(
  mapStateToProps,
  {
    getUserNotifications,
    setSeenStatusToTrue,
    getSelectedGroup,
    getSelectedGroupAllArtefacts,
    getSelectedGroupAllMembers,
    getSelectedArtefact,
    getArtefactComments
  }
)(Notification);
