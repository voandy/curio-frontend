import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserData } from "../../../actions/userActions";

import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text
} from "react-native";

// custom component
import MyButton from "../../../component/MyButton";
import Line from "../../../component/Line";
import SettingField from "../../../component/SettingField";

// import reusable components
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd
} from "../../../utils/responsiveDesign";
import { TouchableOpacity } from "react-native-gesture-handler";

class AccountSetting extends Component {
    constructor() {
        super();
    }

    // Nav bar details
    static navigationOptions = {
        title: "Account Settings",
        headerStyle: {
            elevation: 0,
        },
    };

    componentWillUpdate(nextProps) {
        // sets user data
        if (nextProps.user.userData !== this.props.user.userData) {
            this.setState({
                userData: nextProps.user.userData
            });
        }
    }

    render() {

        return (
            <View style={styles.container}>
                {/* user profile pic */}
                <View style={{ height: hp(0.3), width: wd(1), alignItems: "center" }}>
                    {this.props.user.userData.profilePic != null ? (
                        <Image
                            style={styles.profilePic}
                            source={{ uri: this.props.user.userData.profilePic }}
                        />
                    ) : (
                            <Image
                                style={styles.profilePic}
                                source={require("../../../../assets/images/default-profile-pic.png")}
                            />
                        )}

                    <Text style={styles.userName}>
                        @{this.props.user.userData.username}</Text>
                </View>

                {/* setting fields */}
                <View style={styles.settings} >
                    <SettingField editable={true} field="Name" input={this.props.user.userData.name} />
                    <SettingField editable={false} field="Email" input={this.props.user.userData.email} />
                    <SettingField editable={true} field="Password" />

                    <TouchableOpacity style={{ marginVertical: wd(0.1), alignItems: "center" }}>
                        <Text style={styles.delete}>Delete Account</Text>
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
        alignContent: "center"
    },

    settingsField: {

    },

    delete: {
        fontFamily: "HindSiliguri-Bold",
        color:"red",
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
