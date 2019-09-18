import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

import Modal from "react-native-modal";
import DatePicker from "react-native-datepicker";
import Line from "./Line";

// custom responsive design component
import {
  deviceHeigthDimension as hp,
  deviceWidthDimension as wd,
  setToBottom
} from "../utils/responsiveDesign";

class ArtefactModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onRequestClose={this.props.toggleModal}
      >
        <View style={styles.modal}>
          {/* Title */}
          <TextInput
            placeholder="Add Title"
            autoCapitalize="none"
            placeholderTextColor="#868686"
            style={[styles.title, styles.font]}
            onChangeText={value =>
              this.props.onNewArtefactChange("title", value)
            }
            value={this.props.title}
          />

          <Line />

          {/* add category  */}
          <View style={styles.inputRow}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/category.png")}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Add Category"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              style={[styles.subTitle, styles.font]}
              onChangeText={value =>
                this.props.onNewArtefactChange("category", value)
              }
              value={this.props.category}
            />
          </View>

          {/* add description */}
          <View style={styles.inputRow}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/description.png")}
            />
            <TextInput
              placeholder="Add Description"
              autoCapitalize="none"
              placeholderTextColor="#868686"
              style={[styles.subTitle, styles.font]}
              onChangeText={value =>
                this.props.onNewArtefactChange("description", value)
              }
              value={this.props.description}
            />
          </View>

          <Line />

          {/* date */}
          <View style={styles.inputRow}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/calendar.png")}
            />
            <DatePicker
              style={{ width: 200 }}
              date={this.props.date}
              mode="date"
              value={this.props.dateObtained}
              placeholder="hue"
              format="YYYY-MM-DD"
              customStyles={{
                dateIcon: {
                  display: "none"
                },
                dateInput: {
                  borderWidth: 0,
                  fontFamily: "HindSiliguri-Bold"
                }
              }}
              onDateChange={date =>
                this.props.onNewArtefactChange("dateObtained", date)
              }
            />
          </View>

          {/* Add image button */}
          <View style={styles.imagePlaceholder}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.props.pickImage}
            >
              {this.props.imageURL !== "" ? (
                <Image
                  style={styles.imageSelected}
                  source={{ uri: this.props.imageURL }}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={require("../../assets/images/icons/addPicture.png")}
                />
              )}
            </TouchableOpacity>

            <Text style={[styles.imageText, styles.font]}>
              Add images of your artefacts
            </Text>
          </View>

          {/* post button */}
          <TouchableOpacity onPress={this.props.post} style={styles.button}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    alignSelf: "center",
    width: Dimensions.get("window").width,
    height: hp(0.6),
    bottom: -25,
    position: "absolute"
  },

  font: {
    fontFamily: "HindSiliguri-Bold"
  },

  icon: {
    height: wd(0.05),
    width: wd(0.05),
    marginLeft: 30,
    marginVertical: 20,
    alignSelf: "center"
  },

  inputRow: {
    flexDirection: "row",
    width: Dimensions.get("window").width
  },

  title: {
    fontSize: 24,
    marginHorizontal: 40,
    marginTop: 30,
    marginBottom: 5,
    width: Dimensions.get("window").width * 0.8
  },

  subTitle: {
    fontSize: 14,
    marginHorizontal: 30,
    marginVertical: 20,
    width: Dimensions.get("window").width * 0.8
  },

  imagePlaceholder: {
    flex: 1,
    marginTop: 5
  },

  image: {
    alignSelf: "center",
    width: wd(0.25),
    height: wd(0.25)
  },

  imageSelected: {
    alignSelf: "center",
    width: wd(0.3),
    height: wd(0.3),
    borderRadius: 5
  },

  imageText: {
    alignSelf: "center",
    color: "#868686",
    fontSize: 14
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FF6E6E",
    height: 35,
    elevation: 4,
    marginBottom: 10,
    borderRadius: 40,
    width: Dimensions.get("window").width * 0.2
  },

  buttonText: {
    fontSize: 14,
    color: "white",
    fontFamily: "HindSiliguri-Bold"
  }
});

export default ArtefactModal;
