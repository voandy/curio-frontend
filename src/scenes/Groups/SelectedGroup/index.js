import React, { Component } from "react";

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  View,
  Image,
  Text
} from "react-native";

// custom component
import UserIcon from "../../../component/UserIcon"
import AddButton from "../../../component/AddButton"
import PostFeed from "../../../component/PostFeed"
import Line from "../../../component/Line"
import Comments from "../../../component/Comments"

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
} from "../../../utils/responsiveDesign"

class SelectedGroup extends Component {

  // nav details
  static navigationOptions = {
    header: null,
    headerStyle: {
      elevation: 0 // remove shadow on Android
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* group cover photo */}
          <View style={styles.coverPhoto}>
            {/* TODO USE THIS <Image style={styles.cover} source={this.props.coverPhoto} /> */}
            <Image style={styles.cover} source={require("../../../../assets/images/test-delete-this/boi3.jpg")} />
          </View>

          {/* group description */}
          <View style={styles.groupInfo}>
            {/* TODO USE THIS <Text style={styles.groupTitle}>{this.props.groupTitle}</Text> */}
            <Text style={[styles.groupTitle, styles.font]}>The Simpsons Fam</Text>

            <Text style={[styles.groupDescription, styles.subFont]}>Holmer and bart is enjoying their showering time</Text>

            {/* TODO USE THIS <Text style={[styles.groupCount, styles.subFont]}>{this.props.groupCount} Members</Text> */}
            <Text style={[styles.groupCount, styles.subFont]}>5 Members</Text>

            {/* member scrollable view */}
            <View style={styles.groupMember}>
              <ScrollView
                style={{ flex: 0.7 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>

                <UserIcon image={require("../../../../assets/images/default-profile-pic.png")} />
                <UserIcon image={require("../../../../assets/images/default-profile-pic.png")} />
                <UserIcon image={require("../../../../assets/images/default-profile-pic.png")} />
                <UserIcon image={require("../../../../assets/images/default-profile-pic.png")} />
                <UserIcon image={require("../../../../assets/images/default-profile-pic.png")} />
                <UserIcon image={require("../../../../assets/images/default-profile-pic.png")} />
                <UserIcon image={require("../../../../assets/images/default-profile-pic.png")} />
                <UserIcon image={require("../../../../assets/images/default-profile-pic.png")} />
                <UserIcon image={require("../../../../assets/images/default-profile-pic.png")} />
                <UserIcon image={require("../../../../assets/images/default-profile-pic.png")} />

              </ScrollView>
              <TouchableOpacity
                //onPress{this.func}
                style={styles.memberButton}>
                <Text style={styles.buttonText}>Add Members</Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* content */}
          <View>
            {/* {this.props.groups.userGroups.length !== 0 ? (
              <View>{"ADD CONTENT HERE"}</View>
            ) : (
                <View style={styles.emptyFeed}>
                  <Text
                    style={{ textAlign: "center", marginTop: hp(0.05), marginBottom:hp(0.1), fontSize: 16, fontFamily: "HindSiliguri-Regular" }}
                  >
                    Get started by adding new memeber to the group {"\n"} and start post items here !
                  </Text>
                </View>
              )} */}

            <PostFeed
              userName="Bob"
              title="cold boi iz sad boi"
              profileImage={require("../../../../assets/images/test-delete-this/boi5.png")}
              image={require("../../../../assets/images/test-delete-this/boi5.png")}
            // onPress={this.navigate("selectedArtefact")}
            />

            <PostFeed
              userName="Bill"
              title="Boooo"
              profileImage={require("../../../../assets/images/test-delete-this/boi4.jpg")}
              image={require("../../../../assets/images/test-delete-this/boi4.jpg")}
            />

            <PostFeed
              userName="Francis"
              title="cold boi iz sad boi"
              profileImage={require("../../../../assets/images/test-delete-this/boi3.jpg")}
              image={require("../../../../assets/images/test-delete-this/boi3.jpg")}
            />

          </View>
        </ScrollView>

        {/* toggle modal to add artefacts into groups */}
        {/* <AddButton onPress={() => navigate("ArtefactsForm")} /> */}
        <AddButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },

  font: {
    fontFamily: "HindSiliguri-Bold",
    fontSize: hp(0.03),
  },

  subFont: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: hp(0.02),
  },

  cover: {
    width: wd(1),
    height: hp(0.4),
  },

  groupInfo: {
    alignItems: "center",
    paddingHorizontal: wd(0.1),
    backgroundColor: "white",
  },

  groupTitle: {
    textAlign: "center",
    marginTop: hp(0.02),
    marginBottom: hp(0.01),
  },

  groupDescription: {
    textAlign: "center",
    marginBottom: hp(0.01),
  },

  groupCount: {
    color: "#737373",
    marginBottom: hp(0.01),
  },

  groupMember: {
    height: wd(0.15),
    flexDirection: "row",
    alignItems: "center"
  },

  memberButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6E6E",
    margin: wd(0.03),
    width: wd(0.3),
    height: wd(0.1),
    borderRadius: 40,
    elevation: 3
  },

  buttonText: {
    fontSize: wd(0.037),
    color: "white",
    fontFamily: "HindSiliguri-Bold"
  },

});


// export 
export default SelectedGroup
