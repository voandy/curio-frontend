import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

// responsive design component
import { deviceWidthDimension as wd } from "../utils/responsiveDesign";

/** artefacts shown in squares in artefacts page */
class ArtefactFeed extends Component {
  constructor(props) {
    super(props);
  }

  // generate a feed component based on artefacts props
  createArtefactsFeed = () => {
    // sort array based on date obtained (from earliest to oldest)
    this.props.artefacts.sort(function(a, b) {
      return new Date(b.datePosted) - new Date(a.datePosted);
    });
    // tranform each artefact element into a component
    const feedComponent = this.props.artefacts.map(artefact => (
      <View style={styles.card} key={artefact._id}>
        <TouchableOpacity
          onPress={() => this.props.onPress(artefact._id)}
          activeOpacity={0.5}
        >
          <Image
            style={styles.photo}
            source={{ uri: artefact.images[0].URL }}
            resizeMethod="resize"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    ));
    // prep a temporary array for row-by-row grouping logic
    //prettier-ignore
    var tempMapArray = [...Array(feedComponent.length).keys()].filter(n => !(n % 3))
    // put artefact component into row-by-row feed
    const arrangedFeedComponent = tempMapArray.map(n => (
      <View style={styles.feed} key={n}>
        {[feedComponent[n], feedComponent[n + 1], feedComponent[n + 2]]}
      </View>
    ));
    return <View style={styles.feedContainer}>{arrangedFeedComponent}</View>;
  };

  render() {
    return this.createArtefactsFeed();
  }
}

const styles = StyleSheet.create({
  photo: {
    width: wd(0.3),
    height: wd(0.3)
  },
  card: {
    width: wd(0.3),
    height: wd(0.3),
    margin: wd(0.006)
  },
  feed: {
    flexDirection: "row"
  },
  feedContainer: {
    alignSelf: "center"
  }
});

export default ArtefactFeed;
