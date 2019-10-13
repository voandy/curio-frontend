import React, { Component } from "react";
import { RefreshControl } from "react-native";

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

import { StatusBar, StyleSheet, ScrollView, View, Text } from "react-native";

// Custom component
import SimpleHeader from "../../component/SimpleHeader";
import NotificationFeed from "../../component/NotificationFeed";

class Notification extends Component {
  state = {
    refreshing: false
  };
  // Nav bar details
  static navigationOptions = {
    header: null
  };

  // navigate to page accordingly
  clickNotification = async notif => {
    // get notification details
    const { refId, category } = notif;
    // user has read notification
    await this.props.setSeenStatusToTrue(notif._id);
    // reload notification data on the page asynchronously
    this.props.getUserNotifications(this.props.auth.user.id);
    // navigate based on category
    switch (category) {
      case "artefact":
        this.navigateToArtefactNotif(refId);
        return;
      case "group":
        this.navigateToGroupNotif(refId);
        return;
      default:
        console.log("Oops, check your notification type.");
        return;
    }
  };

  // helper function to navigate to selected group page
  navigateToGroupNotif = async groupId => {
    const { navigate } = this.props.navigation;
    // redirect user
    navigate("SelectedGroup", { groupId });
  };

  // helper function to navigate to selected artefact page
  navigateToArtefactNotif = async artefactId => {
    const { navigate } = this.props.navigation;
    // redirect user
    navigate("SelectedArtefact", { artefactId });
  };

  // refresh page
  refreshNotificationsPage = async () => {
    this.setState({ refreshing: true });
    // get data from backend
    await this.props.getUserNotifications(this.props.auth.user.id);
    // resets refreshing state
    this.setState({ refreshing: false });
  };

  // create all the notifications components to be rendered
  renderAllNotifications = notifications => {
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
    
    return (
      <View style={styles.container}>
        <SimpleHeader title="Notifications" onSubmit={()=> navigate("GeneralSearch")}/>

        {/* scrollable area for CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshNotificationsPage}
            />
          }
        >
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
            Hooray no more notifications{" "}
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
