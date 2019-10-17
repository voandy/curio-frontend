import React from "react";
import { View, Image, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { getUserNotifications } from "../../src/actions/notificationActions";

// custom notification tab bar icon to show user
// whether there exists unseen notifications
class NotificationTabBarIcon extends React.Component {
  constructor(props) {
    super(props);
    // set up initial state
    this.state = { hasUnseen: false };
  }

  // Check for unseen notifications on component launch
  componentDidMount() {
    // set local state unseen
    this.hasUnseenNotification();
  }

  // Check for unseen notifications on new notifications received
  componentDidUpdate(prevProps) {
    // extract required notif data
    const prevNotif = prevProps.notification.notifications;
    const currentNotif = this.props.notification.notifications;
    // set local state unseen
    if (prevNotif !== currentNotif) {
      this.hasUnseenNotification();
    }
  }

  // from notifications, check if there exists unseen notifications
  //prettier-ignore
  hasUnseenNotification = () => {
    // extract data from redux
    var { notifications } = this.props.notification;
    // filter notif by seenStatus === false, then check if there exists unseen notif
    const hasUnseen = notifications.filter(x => x.seenStatus === false).length > 0;
    // set local state to reflect changes
    this.setState({ hasUnseen });
  };

  render() {
    return (
      <View style={{ height: 27, width: 27 }}>
        {/* tab bar icon */}
        <Image
          source={require("../../assets/images/icons/notification.png")}
          style={{ height: 27, width: 27, tintColor: this.props.tintColor }}
        />
        {/* show/hide to user to let them know if there is unseen notif */}
        {this.state.hasUnseen ? <View style={styles.dot} /> : <View />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dot: {
    top: -2,
    right: -2,
    position: "absolute",
    height: 8,
    width: 8,
    borderRadius: 10,
    backgroundColor: "#FF6E6E"
  }
});

// map required redux state to local props
const mapStateToProps = state => ({
  notification: state.notification
});

export default connect(
  mapStateToProps,
  { getUserNotifications }
)(NotificationTabBarIcon);
