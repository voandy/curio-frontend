import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd
} from "../utils/responsiveDesign";

// date converter
import moment from "moment";

/**Notification rows in the notification screen
 * pressable and should link to the screen that invoked the notification
 */
class NotificationFeed extends Component {
  // unbolds text after notification has been read
  boldText(seenStatus) {
    // render text based on seenStatus
    const fontFamily = seenStatus
      ? "HindSiliguri-Regular"
      : "HindSiliguri-Bold";
    // return correct text style
    return {
      fontFamily
    };
  }

  render() {
    // extracts notification data passed in as props
    const {
      datePosted,
      thumbnailURL,
      seenStatus,
      data
    } = this.props.notification;
    // convert datePosted to a human readable datettme
    const readableDatePosted = moment(new Date(datePosted)).fromNow();

    return (
      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.props.onPress(this.props.notification)}
        >
          <View style={styles.card}>
            {/* Image  */}
            <View style={styles.picPlaceholder}>
              <Image
                style={styles.photo}
                source={{ uri: thumbnailURL }}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
            {/* Message */}
            <View style={styles.notificationPlaceholder}>
              <View style={styles.notification}>
                <Text
                  style={[styles.notificationTitle, this.boldText(seenStatus)]}
                >
                  {data.message}
                </Text>
              </View>
              {/* Date/Time */}
              <View style={styles.time}>
                <Text style={styles.timeTitle}> {readableDatePosted} </Text>
              </View>
            </View>
          </View>

          {/* line separator */}
          <View style={styles.line} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: wd(1),
    height: 100,
    flexDirection: "row",
    alignItems: "center"
  },

  picPlaceholder: {
    width: wd(0.2),
    height: wd(0.2),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wd(0.03)
  },

  photo: {
    width: wd(0.17),
    height: wd(0.17),
    borderRadius: wd(0.17)
  },

  notificationPlaceholder: {
    width: wd(0.75)
  },

  notification: {
    alignContent: "flex-start",
    marginTop: 15,
    flex: 0.7
  },

  notificationTitle: {
    paddingHorizontal: wd(0.03)
  },

  time: {
    alignContent: "flex-end",
    flex: 0.3,
    marginBottom: 10
  },

  timeTitle: {
    fontFamily: "HindSiliguri-Regular",
    paddingHorizontal: wd(0.03)
  },

  line: {
    borderBottomColor: "#939090",
    borderBottomWidth: 0.4,
    width: wd(0.9),
    alignSelf: "center"
  }
});

//  export
export default NotificationFeed;
