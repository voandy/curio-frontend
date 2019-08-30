import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logoutUser } from "../../actions/authActions"
import { getUserData } from "../../actions/dataActions"
import axios from "axios"
import {Dimensions, 
        StyleSheet,
        TouchableOpacity,
        ScrollView,
        View,
        Image,
        Text
        }from 'react-native';

import Header from "../../component/Header"

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            userData: {}
        };
    }
    
    componentDidMount() {
        // get user authentication data
        const { user } = this.props.auth;

        this.props.getUserData(user.id);
    }

    componentWillUpdate(nextProps) {
        if (Object.keys(this.state.userData).length === 0) {
            this.setState({
                userData: nextProps.data.userData
            })
        }
    }

    // logout button
    onLogoutClick = () => {
        const { navigate } = this.props.navigation;
        this.props.logoutUser()
        .then(res => {
            navigate("Auth");
        });
    };    

    render() {
        console.log(this.state.userData);
        return(

            <View style={styles.container}>

                <Header title="Profile" tab1="" tab2=""/> 

                {/* scrollable area for CONTENT */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}>   

                    {/* TODO add user image */}
                    <Image style= { styles.profilePic }
                        source={require('../../../assets/images/default-profile-pic.png')} />

                    {/* user heading */}
                    <Text style = {styles.userName}> 
                        {this.state.userData.name}
                    </Text>
                    <Text style = {styles.userDetails}>
                        You have joined since {this.state.userData.dateJoined} {"\n"}
                    </Text>
    
                    <TouchableOpacity 
                        onPress={this.onLogoutClick}
                        style={ styles.button }>
                        <Text style= { styles.buttonText }>Log Out</Text>
                    </TouchableOpacity>  

                </ScrollView>
     
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    userName: {
        fontSize: 24,
        marginTop: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
        // fontFamily: 'HindSiliguri-Bold'
    },

    userDetails: {
        fontSize: 14,
        marginTop: 3,
        alignSelf: 'center',
    },  

    profilePic: {
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').width * 0.45,
        borderRadius: Dimensions.get('window').width * 0.45/2,
        alignSelf: 'center',
        marginTop: 50,
    },

    button: {
        justifyContent: 'center',
        backgroundColor: '#FF6E6E',
        width: Dimensions.get('window').width * 0.4,
        height: 50,
        margin: 10,
        borderRadius: 40,
        elevation: 3, 
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white',
        // fontFamily: 'HindSiliguri-Regular'
    },
})

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    data: state.data
});

//  export
export default connect(
    mapStateToProps,
    { logoutUser, getUserData }
)(Profile);

