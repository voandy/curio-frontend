import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, ScrollView, View, Text, Image, TextInput, TouchableOpacity, Picker } from "react-native";

// redux actions
import DatePicker from "react-native-datepicker";

// Custom respondsive design component
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd,
    setToBottom
} from "../../../utils/responsiveDesign";

// import the loader modal to help show loading process
import ActivityLoaderModal from "../../../component/ActivityLoaderModal";
// custom components
import MySmallerButton from "../../../component/MySmallerButton";


class GroupsForm extends Component {
    // local state
    state = {
    };

    // nav details
    static navigationOptions = {
        title: "Create new group",
        headerStyle: {
            elevation: 0 // remove shadow on Android
        }
    };

    // setter function for "loading" to show user that something is loading
    setLoading = loading => {
        this.setState({
            ...this.state,
            loading
        });
    };

    onSubmit = async () => {
    };


    render() {
        return (
            <View style={styles.container}>

                {/* loading modal window */}
                <ActivityLoaderModal loading={this.state.loading} />

                {/* scrollable container for all content */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: "center" }}>
                        {/* Add image button */}
                        <View style={styles.imagePlaceholder}>
                            <Text style={[styles.font, styles.imageText]}>Create a group, share artefacts amongst yourselves</Text>

                            <TouchableOpacity activeOpacity={0.5} onPress={this._pickImage}>
                                {/* {this.props.newGroup.imageURI !== undefined &&
                                this.props.newGroup.imageURI !== "" ? ( */}
                                {this.props.imageURI !== undefined &&
                                    this.props.imageURI !== "" ? (
                                        <Image
                                            style={styles.imageSelected}
                                            source={{ uri: this.props.imageURI }}
                                        />
                                    ) : (
                                        <Image
                                            style={styles.imageSelected}
                                            source={require("../../../../assets/images/icons/addPicture.png")}
                                        />
                                    )}
                            </TouchableOpacity>

                            <Text style={[styles.subFont, styles.imageText]}>Add a cover photo</Text>
                        </View>

                        {/* input fields */}

                        {/* Title */}
                        <View style={styles.inputRow}>
                            <Image
                                style={styles.icon}
                                source={require("../../../../assets/images/icons/title.png")}
                            />
                            <View style={styles.inputField}>
                                <Text style={styles.font}>Group name</Text>
                                <TextInput
                                    placeholder="Title"
                                    autoCapitalize="none"
                                    placeholderTextColor="#868686"
                                    style={styles.inputFont}
                                // onChangeText={value => this.setCategory(value)}
                                // value={this.props.newArtefact.category}
                                />
                            </View>
                        </View>

                        {/* Description */}
                        <View style={styles.inputRow}>
                            <Image
                                style={styles.icon}
                                source={require("../../../../assets/images/icons/description.png")}
                            />
                            <View style={styles.inputField}>
                                <Text style={styles.font}>Description</Text>
                                <TextInput
                                    placeholder="Description of the group"
                                    autoCapitalize="none"
                                    placeholderTextColor="#868686"
                                    style={styles.inputFont}
                                // onChangeText={value => this.setCategory(value)}
                                // value={this.props.newArtefact.category}
                                />
                            </View>
                        </View>

                        {/* Privacy */}
                        <View style={styles.inputRow}>
                            <Image
                                style={styles.icon}
                                source={require("../../../../assets/images/icons/category.png")}
                            />
                            <View style={styles.inputField}>
                                <Text style={styles.font}>Privacy</Text>
                                <Picker
                                    style={styles.pickerLong}
                                // onValueChange={(itemValue, itemIndex) =>
                                // this.props.onNewGroupChange("privacy", itemValue)}
                                >
                                    <Picker.Item label="Public" />
                                    <Picker.Item label="Private" />
                                </Picker>
                            </View>
                        </View>

                        {/* submit button */}
                        <View style={{ alignItems: "flex-end", marginVertical: wd(0.05), width: wd(0.8) }}>
                            {/* TODO add onPress={() => onSubmit} */}
                            <MySmallerButton text="POST" />
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },

    font: {
        fontFamily: "HindSiliguri-Bold",
        fontSize: 16,
    },

    subFont: {
        fontFamily: "HindSiliguri-Regular",
        fontSize: 14,
        color: "#868686",
    },

    inputFont: {
        fontFamily: "HindSiliguri-Regular",
        fontSize: 14,
    },

    icon: {
        height: wd(0.04),
        width: wd(0.04),
        marginTop: 5,
        marginRight: 20,
        alignSelf: "flex-start",
    },

    imagePlaceholder: {
        marginTop: 5,
    },

    imageSelected: {
        alignSelf: "center",
        width: wd(0.25),
        height: wd(0.25),
        borderRadius: 5
    },

    imageText: {
        alignSelf: "center",
        marginVertical: hp(0.025),
    },

    inputRow: {
        flexDirection: "row",
        width: wd(0.8),
        marginVertical: hp(0.01)
    },

    inputField: {
        flex: 1,
        borderBottomWidth: 0.5,
    },

    date: {
        width: wd(0.3),
        marginTop: 5,
    },

    pickerShort: {
        width: wd(0.3),
        fontSize: 14,
        color: "black"
    },

    pickerLong: {
        width: wd(0.705),
        fontSize: 14,
        color: "black"
    },
});

// check for prop types correctness
GroupsForm.propTypes = {
    auth: PropTypes.object.isRequired,
};

// map required redux state to local props
const mapStateToProps = state => ({
    auth: state.auth
});

// map required redux state and actions to local props
export default connect(
    mapStateToProps,
)(GroupsForm);
