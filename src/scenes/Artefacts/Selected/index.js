import React, { Component } from "react";

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Text
} from "react-native";

// date converter
import Moment from "moment";

// custom component
import UserDetail from "../../../component/UserDetail"
import Line from "../../../component/Line"
import Comments from "../../../component/Comments"
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../../../utils/responsiveDesign"

class Selected extends Component {

  // nav details
  static navigationOptions = {
    header: null,
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  render() {

    // date format
    Moment.locale("en");
    // const dt = this.state.userData.dateJoined;

    return (
      <View style={styles.container}>

        <HeaderImageScrollView
          maxHeight={Dimensions.get("window").height * 0.5}
          minHeight={Dimensions.get("window").height * 0.2}

          // use this to dynamically get image data
          // headerImage={{ uri: this.props.user.image }}
          headerImage={require("../../../../assets/images/test-delete-this/boi5.png")}

          renderForeground={() => (
            // change this to open the image in full screen
            <TouchableOpacity style={styles.cover} onPress={() => console.log("Open the image fool!")} />
          )}
        >

          <View style={styles.descriptionPlaceholder}>
            <Text style={styles.description}>This is patrick star, he is cold</Text>
            {/* <Text style={styles.description}>{this.props.description}</Text> */}
          </View>

          {/* user detail */}
          <UserDetail image={require("../../../../assets/images/default-profile-pic.png")} userName="Patrick Star" />

          {/* line separator */}
          <Line />

          {/* comments */}
          <View style={styles.comments}>
            <Text style={styles.title}>Comments</Text>

            <Comments image={require("../../../../assets/images/default-profile-pic.png")} userName="bob" time="4 hours ago" />
            <Comments image={require("../../../../assets/images/default-profile-pic.png")} userName="Spongebob Squarepants" time="4 hours ago" />
            <Comments image={require("../../../../assets/images/default-profile-pic.png")} userName="uwuwewewe onyetenyevwe ugwemuhwem osas" time="4 hours ago" />

            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
            <Text>Comments</Text>
          </View>
        </HeaderImageScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  cover: {
    height: Dimensions.get("window").height * 0.5,
    width: Dimensions.get("window").width,
  },

  descriptionPlaceholder: {
    width: Dimensions.get("window").width * 0.88,
    marginHorizontal: wd(0.06),
    borderRadius: 5,
    borderWidth: 1,
    borderColor:"black",
  },

  description:{
    fontFamily:"HindSiliguri-Regular",
  },

  comments: {
    alignItems: "center",
    backgroundColor:"#FAFAFA"
  },

  title:{
    marginHorizontal: wd(0.05),
    marginTop: wd(0.05),
    fontFamily:"HindSiliguri-Bold",
    alignSelf:"flex-start",
    fontSize: 24,
  },

});


// export 
export default Selected
