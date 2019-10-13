import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserData } from "../../actions/userActions";

import {
    StyleSheet,
    View,
    Image,
    Text,
    Animated,
    TouchableOpacity
} from "react-native";

// custom component
import MyButton from "../../component/MyButton";
import Line from "../../component/Line";

// import reusable components
import {
    deviceHeigthDimension as hp,
    deviceWidthDimension as wd
} from "../../utils/responsiveDesign";

import SimpleHeader from "../../component/SimpleHeader"


class Invitation extends Component {

    constructor(props) {
        super(props);
        this.fadeAnimation = new Animated.Value(0);

        this.state = {
            loading: false,
        }
    }

    // Nav bar details
    static navigationOptions = {
        title: "Invitation",
        headerStyle: {
            elevation: 0,
        },
    };

    // animation trigger
    componentDidMount() {
        Animated.timing(this.fadeAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    componentWillUpdate(nextProps) {
        // sets user data
        if (nextProps.user.userData !== this.props.user.userData) {
            this.setState({
                userData: nextProps.user.userData
            });
        }
    }

    // setter function for "loading" to show user that something is loading
    setLoading = loading => {
        this.setState({
            ...this.state,
            loading
        });
    };

    // TODO
    onSubmit = async () => {
        // show user the loading modal
        this.setLoading(true);
    }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <Animated.View style={[styles.container, { opacity: this.fadeAnimation }]}>

                {/* invitator's profile pic */}
                <View style={{ height: hp(0.3), width: wd(1), alignItems: "center", marginVertical: hp(0.1) }}>
                    {this.props.user.userData.profilePic != null ? (
                        <Image
                            style={styles.profilePic}
                            source={{ uri: this.props.user.userData.profilePic }}
                        />
                    ) : (
                            <Image
                                style={styles.profilePic}
                                source={require("../../../assets/images/default-profile-pic.png")}
                            />
                        )}

                    <Text style={styles.invite}>
                        @{this.props.user.userData.username} has invited you to join</Text>
                    <Text style={styles.group}>
                        [GROUP NAME] group</Text>
                </View>

                {/* invitation fields */}
                <View style={styles.buttons} >

                    {/* join group */}
                    <TouchableOpacity style={{ marginVertical: wd(0.05), alignItems: "center" }}>
                        <Text style={styles.accept}>Accept</Text>
                    </TouchableOpacity>

                    {/* delete account */}
                    <TouchableOpacity style={{ marginVertical: wd(0.05), alignItems: "center" }}>
                        <Text style={styles.decline}>Decline</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
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

    invite: {
        width: wd(0.7),
        color: "#939090",
        fontFamily: "HindSiliguri-Regular",
        fontSize: 16,
        textAlign: "center"
    },

    group: {
        width: wd(0.7),
        color: "black",
        fontFamily: "HindSiliguri-Bold",
        fontSize: 16,
        textAlign: "center"
    },

    buttons: {
        height: hp(0.6),
        width: wd(0.8),
        alignContent: "center"
    },

    accept: {
        fontFamily: "HindSiliguri-Bold",
        color: "#1183ca",
        fontSize: 16,
    },

    decline: {
        fontFamily: "HindSiliguri-Bold",
        color: "red",
        fontSize: 16,
    }
});

Invitation.propTypes = {
    getUserData: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    { getUserData }
)(Invitation);
