import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    Image,
    TouchableOpacity,
    Picker
} from "react-native";

import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';
import Line from "./Line";
import * as ImagePicker from "expo-image-picker";

// custom responsive design component
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd,
    setToBottom
} from "../utils/responsiveDesign"
 
// DESTROYYYYY
class GroupModal extends Component {

    // access camera roll
    pickImage = async () => {
        // obtain image
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4]
        });

        // set image
        if (!result.cancelled) {
            // upload image to Google Cloud Storage
            this.props.onNewGroupChange("imageURI", result.uri);
        }
    };

    render() {
        return (
            <Modal isVisible={this.props.isModalVisible} onRequestClose={this.props.toggleModal}>
                <View style={styles.modal}>

                    {/* group name */}
                    <TextInput
                        style={[styles.title, styles.font]}
                        placeholder="Title"
                        autoCapitalize="none"
                        placeholderTextColor="#868686"
                        onChangeText={value =>
                            this.props.onNewGroupChange("title", value)
                        }
                        value={this.props.title}
                    />

                    <Line />

                    <View style={styles.inputRow}>

                        {/* Description of group */}
                        <Image style={styles.icon} source={require("../../assets/images/icons/description.png")} />
                        <TextInput
                            style={[styles.subTitle, styles.font]}
                            placeholder="Description"
                            autoCapitalize="none"
                            placeholderTextColor="#868686"
                            onChangeText={value =>
                                this.props.onNewGroupChange("description", value)
                            }
                            value={this.props.description}
                        />
                    </View>

                    <Line />

                    <View style={styles.inputRow}>

                        <Image style={styles.icon} source={require("../../assets/images/icons/privacy.png")} />
                        <Picker
                            selectedValue="select ur privacy setting"
                            style={styles.subTitle}
                            onValueChange={(itemValue, itemIndex) =>
                                this.props.onNewGroupChange("privacy", itemValue)}
                            >
        
                            <Picker.Item label="Private" style={{ fontFamily: "HindSiliguri-Bold" }} />
                            <Picker.Item label="Public" />
                        </Picker>

                    </View>

                    {/* Add image button */}
                    <View style={styles.imagePlaceholder}>
                        <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.pickImage}
                        >
                        {this.props.newGroup.imageURI !== undefined &&
                        this.props.newGroup.imageURI !== "" ? (
                            <Image
                            style={styles.imageSelected}
                            source={{ uri: this.props.newGroup.imageURI }}
                            />
                        ) : (
                            <Image
                            style={styles.image}
                            source={require("../../assets/images/icons/addPicture.png")}
                            />
                        )}
                        </TouchableOpacity>

                        <Text style={[styles.imageText, styles.font]}>
                            Add images of your group
                        </Text>
                    </View>

                    {/* create group button */}
                    <TouchableOpacity onPress={this.props.post} style={styles.button}>
                        <Text style={styles.buttonText}>Create Group</Text>
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
        width: Dimensions.get("window").width,
    },

    title: {
        fontSize: 24,
        marginHorizontal: 40,
        marginTop: 30,
        marginBottom: 5,
        width: Dimensions.get("window").width * 0.8,
    },

    subTitle: {
        fontSize: 14,
        marginHorizontal: 30,
        marginVertical: 20,
        width: Dimensions.get("window").width * 0.8,
    },

    imagePlaceholder: {
        flex: 1,
        marginTop: 5,
    },

    image: {
        alignSelf: "center",
        width: wd(0.25),
        height: wd(0.25),
    },

    imageSelected: {
        alignSelf: "center",
        width: wd(0.3),
        height: wd(0.3),
        borderRadius: 5,
    },

    imageText: {
        alignSelf: "center",
        color: "#868686",
        fontSize: 14,
    },

    button: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#FF6E6E",
        height: 40,
        elevation: 4,
        marginBottom: 10,
        borderRadius: 40,
        width: Dimensions.get("window").width * 0.4,
    },

    buttonText: {
        fontSize: 14,
        color: "white",
        fontFamily: 'HindSiliguri-Bold'
    }
});


export default GroupModal;
