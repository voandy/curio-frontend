import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dialog from "react-native-dialog";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text
} from "react-native";

// redux actions
import { getUserData } from "../../../actions/userActions";

// custom component
import MyButton from "../../../component/MyButton";
import Line from "../../../component/Line";
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
            dialogVisible: false
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
    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    // cancel setting a ccount
    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    // delete account
    handleDelete = () => {
        // TODO add logic
        this.setState({ dialogVisible: false });
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
                        {/* TODO ADD onPress() */}
                        <Text style={styles.edit}>Edit changes</Text>
                    </TouchableOpacity>

                    {/* delete account */}
                    <TouchableOpacity style={{ marginVertical: wd(0.05), alignItems: "center" }}>
                        <Text style={styles.delete} onPress={this.showDialog}>Delete Account</Text>
                    </TouchableOpacity>
                </View>

                {/* deleting account dialog warning */}
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Delete Account</Dialog.Title>
                    <Dialog.Description>
                        Do you want to delete this account? You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                    <Dialog.Button label="Delete" onPress={this.handleDelete} />
                </Dialog.Container>
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
