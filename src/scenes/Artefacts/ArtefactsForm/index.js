import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Picker } from "react-native";

// redux actions
import { createNewArtefacts } from "../../../actions/artefactsActions";
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

// temp state to store object with attributes required to create a new artefact
const newArtefact = {
    userId: "",
    title: "",
    description: "",
    category: "",
    dateObtained: "",
    imageURI: ""
};

class ArtefactsForm extends Component {
    // local state
    state = {
        newArtefact: {
            ...newArtefact,
            userId: this.props.auth.user.id
        },
        isModalVisible: false,
        loading: false,
        refreshing: false,
    };

    // nav details
    static navigationOptions = {
        title: "Add New Artefact",
        headerStyle: {
            elevation: 0 // remove shadow on Android
        }
    };

    // new artefact's attribute change
    setNewArtefact = (key, value) => {
        this.setState({
            newArtefact: {
                ...this.state.newArtefact,
                [key]: value
            }
        });
    };

    // revert newArtefact to initial state
    resetNewArtefact = () => {
        this.setState({
            ...this.state,
            newArtefact: {
                ...newArtefact,
                userId: this.props.auth.user.id
            }
        });
    };

    // setter function for "loading" to show user that something is loading
    setLoading = loading => {
        this.setState({
            ...this.state,
            loading
        });
    };

    // post new artefact to the backend
    onSubmit = async () => {
        // show user the loading modal
        this.setLoading(true);
        // send and create artefact to the backend
        //prettier-ignore
        this.props.createNewArtefacts(this.state.newArtefact)
            .then(() => {
                // stop showing user the loading modal
                this.setLoading(false);
                // close loading modal
                this.toggleModal();
                this.resetNewArtefact();
            })
            .catch(err => {
                // stop showing user the loading modal
                this.setLoading(false);
                // show error
                console.log(err.response.data);
            });
    };


    render() {
        return (
            <View style={styles.container}>

                {/* loading modal window */}
                <ActivityLoaderModal loading={this.state.loading} />

                {/* invisible container for all content */}
                <View style={{ height: hp(0.7) }} >
                    {/* Add image button */}
                    <View style={styles.imagePlaceholder}>
                        <Text style={[styles.font, styles.imageText]}>Share your artefacts for others to view</Text>

                        <TouchableOpacity activeOpacity={0.5} onPress={this._pickImage}>
                            {this.state.newArtefact.imageURI !== undefined &&
                                this.state.newArtefact.imageURI !== "" ? (
                                    <Image
                                        style={styles.imageSelected}
                                        source={{ uri: this.state.newArtefact.imageURI }}
                                    />
                                ) : (
                                    <Image
                                        style={styles.imageSelected}
                                        source={require("../../../../assets/images/icons/addPicture.png")}
                                    />
                                )}
                        </TouchableOpacity>

                        <Text style={[styles.subFont, styles.imageText]}>Add images of your artefacts</Text>
                    </View>

                    {/* input fields */}

                    {/* Title */}
                    <View style={styles.inputRow}>
                        <Image
                            style={styles.icon}
                            source={require("../../../../assets/images/icons/title.png")}
                        />
                        <View style={styles.inputField}>
                            <Text style={styles.font}>Title</Text>
                            <TextInput
                                placeholder="'My First Car'"
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
                                placeholder="Describe your artefact"
                                autoCapitalize="none"
                                placeholderTextColor="#868686"
                                style={styles.inputFont}
                            // onChangeText={value => this.setCategory(value)}
                            // value={this.props.newArtefact.category}
                            />
                        </View>
                    </View>

                    {/* Category */}
                    <View style={styles.inputRow}>
                        <Image
                            style={styles.icon}
                            source={require("../../../../assets/images/icons/category.png")}
                        />
                        <View style={styles.inputField}>
                            <Text style={styles.font}>category</Text>
                            <Picker
                                style={styles.pickerLong}
                                // onValueChange={(itemValue, itemIndex) =>
                                // this.props.onNewGroupChange("privacy", itemValue)}
                            >
                                <Picker.Item label="Art" />
                                <Picker.Item label="Books" />
                                <Picker.Item label="Furniture" />
                                <Picker.Item label="Clothing and Fabric" />
                                <Picker.Item label="Coins and Currency" />
                                <Picker.Item label="Pottery" />
                                <Picker.Item label="Flims and Television" />
                                <Picker.Item label="Kitchen Collectable" />
                                <Picker.Item label="Music" />
                                <Picker.Item label="Technology" />
                                <Picker.Item label="Pepe" />
                                <Picker.Item label="Others" />
                            </Picker>
                        </View>
                    </View>

                    {/* Dropdown selector fields */}
                    <View style={styles.inputRow}>
                        {/* Date */}
                        <View style={{ flex: 0.5, flexDirection: "row" }}>
                            <Image
                                style={styles.icon}
                                source={require("../../../../assets/images/icons/calendar.png")}
                            />
                            <View>
                                <Text style={styles.font}>Date</Text>
                                <DatePicker
                                    mode="date"
                                    style={styles.date}
                                    // value={this.state.newArtefact.dateObtained}
                                    format="YYYY-MM-DD"
                                    customStyles={{
                                        dateIcon: {
                                            display: "none"
                                        },
                                        dateInput: {
                                            borderWidth: 0,
                                            color: "black",
                                            alignItems: "flex-start"
                                        }
                                    }}
                                    onDateChange={date => this.setDateObtained(date)}
                                />
                            </View>
                        </View>

                        {/* Privacy */}
                        <View style={{ flex: 0.5, flexDirection: "row" }}>

                            <Image style={styles.icon} source={require("../../../../assets/images/icons/privacy.png")} />
                            <View>
                                <Text style={styles.font}>Privacy</Text>
                                <Picker
                                    style={styles.pickerShort}
                                // onValueChange={(itemValue, itemIndex) =>
                                //     this.props.onNewGroupChange("privacy", itemValue)}
                                >
                                    <Picker.Item label="Private" />
                                    <Picker.Item label="Public" />
                                </Picker>
                            </View>
                        </View>

                    </View>
                </View>

                <View style={{ alignItems: "flex-end", marginTop: wd(0.05), width: wd(0.8) }}>
                    {/* TODO add onPress={() => onSubmit} */}
                    <MySmallerButton text="POST" />
                </View>
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
ArtefactsForm.propTypes = {
    artefacts: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    createNewArtefacts: PropTypes.func.isRequired,
};

// map required redux state to local props
const mapStateToProps = state => ({
    artefacts: state.artefacts,
    auth: state.auth
});

// map required redux state and actions to local props
export default connect(
    mapStateToProps,
    { createNewArtefacts }
)(ArtefactsForm);
