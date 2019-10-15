import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
    StyleSheet,
    Alert,
    View,
    Image,
    Text
} from "react-native";

// redux actions
import { getUserData } from "../../../actions/userActions";

// custom component
import SettingField from "../../../component/SettingField";

// import reusable components
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd
} from "../../../utils/responsiveDesign";

class AccountSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // Nav bar details
    static navigationOptions = {
        title: "Account Settings",
        headerStyle: {
            elevation: 0,
        },
    };

    // deleting account handlers
    toggleDeleteModal = async () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This cannot be undone.",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    // onPress: () => this.onDeleteSelectedArtefact()
                }
            ],
            { cancelable: false }
        );
    };

    // editing account handlers
    toggleEditModal = async () => {
        Alert.alert(
            "Edit Account details",
            "Are you sure you want to edit your account details?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    // onPress: () => this.onDeleteSelectedArtefact()
                }
            ],
            { cancelable: false }
        );
    };

    // cancel setting a ccount
    handleCancel = () => {
        this.setState({ deleteModal: false });
    };

    // delete account
    handleDelete = () => {
        // TODO add logic
        this.setState({ deleteModal: false });
    };

    render() {
        return (
            <View style={styles.container}>
                {/* user profile pic */}
                <View style={{ height: hp(0.3), width: wd(1), alignItems: "center" }}>
                    {this.props.user.userData.profilePic != null ?
                        (<Image
                            style={styles.profilePic}
                            source={{ uri: this.props.user.userData.profilePic }}
                        />)
                        :
                        (<Image
                            style={styles.profilePic}
                            source={require("../../../../assets/images/default-profile-pic.png")}
                        />)
                    }
                    <Text style={styles.userName}>
                        @{this.props.user.userData.username}</Text>
                </View>

                {/* setting fields */}
                <View style={styles.settings} >
                    <SettingField editable={true} field="Name" isPassword={false} input={this.props.user.userData.name} />
                    <SettingField editable={false} field="Username" isPassword={false} input={this.props.user.userData.username} />
                    <SettingField editable={false} field="Email" isPassword={false} input={this.props.user.userData.email} />
                    <SettingField editable={true} field="Password" isPassword={true} input="********" />

                    <Text style={styles.warning}>* cannot be edited</Text>

                    {/* make edit changes */}
                    <TouchableOpacity style={{ marginVertical: wd(0.05), alignItems: "center" }}>
                        <Text style={styles.edit} onPress={this.toggleEditModal}>Edit changes</Text>
                    </TouchableOpacity>

                    {/* delete account */}
                    <TouchableOpacity style={{ marginVertical: wd(0.05), alignItems: "center" }}>
                        <Text style={styles.delete} onPress={this.toggleDeleteModal}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },

    profilePic: {
        marginTop: 50,
        marginBottom: 20,
        width: wd(0.3),
        height: wd(0.3),
        borderRadius: wd(0.3) / 2,
        alignSelf: "center"
    },

    userName: {
        color: "#939090",
        fontFamily: "HindSiliguri-Regular",
        fontSize: 16
    },

    settings: {
        height: hp(0.6),
        width: wd(0.8),
        alignContent: "center"
    },

    settingsField: {

    },

    warning: {
        marginVertical: wd(0.03),
        fontFamily: "HindSiliguri-Regular",
        fontSize: 12,
        width: wd(0.8),
    },

    edit: {
        fontFamily: "HindSiliguri-Bold",
        color: "#1183ca",
        fontSize: 16,
    },

    delete: {
        fontFamily: "HindSiliguri-Bold",
        color: "red",
        fontSize: 16,
    }
});

AccountSetting.propTypes = {
    getUserData: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    { getUserData }
)(AccountSetting);
