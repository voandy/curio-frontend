import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { white } from "ansi-colors";
import { Image } from "react-native";

import StartScreen from "./Start";
import RegisterScreen from "./Register";
import LoginScreen from "./Login";
import GroupsScreen from "./Groups";
import AuthLoadingScreen from "./AuthLoadingScreen";
import ProfileScreen from "./Profile";
import NotificationScreen from "./Notification";
import ArtefactsScreen from "./Artefacts";
import WelcomeScreen from "./Welcome";
import SelectedArtefactScreen from "./Artefacts/Selected";
import SelectedGroupScreen from "./Groups/SelectedGroup";

import { getUserData } from "../actions/userActions";
import { getUserArtefacts } from "../actions/artefactsActions";
import { getUserGroups } from "../actions/groupsActions";

class Scenes extends Component {
  async componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      // get user authentication data
      const { user } = this.props.auth;

      // get user data and artefacts
      await this.props.getUserData(user.id);
      await this.props.getUserArtefacts(user.id);
      await this.props.getUserGroups(user.id);
    }
  }

  // Temporary fix to retrieve user, groups and artefacts data
  // when after a user logs in
  componentWillUpdate(nextProps) {
    const previousUser = this.props.auth.user;
    const user = nextProps.auth.user;
    if (
      Object.keys(previousUser).length === 0 &&
      Object.keys(user).length > 0
    ) {
      const { user } = nextProps.auth;
      this.props.getUserData(user.id);
      this.props.getUserArtefacts(user.id);
      this.props.getUserGroups(user.id);
    }
  }

  render() {
    return <AppContainer />;
  }
}

const GroupStack = createStackNavigator({
  Groups: {screen: GroupsScreen},
  SelectedGroup: {screen: SelectedGroupScreen}
});

const NotificationStack = createStackNavigator({
  Notification: {screen: NotificationScreen},
  SelectedArtefact: {screen: SelectedArtefactScreen},
  SelectedGroup: {screen: SelectedGroupScreen}
});

// login / signup stack
const AuthStack = createStackNavigator({
  Start: { screen: StartScreen },
  Register: { screen: RegisterScreen },
  Login: { screen: LoginScreen },
  Welcome: { screen: WelcomeScreen }
});

// default app stack
const AppStack = createBottomTabNavigator(
  {
    GroupsTab: {
      screen: GroupStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/images/icons/group.png")}
            style={{ height: 30, width: 30, tintColor: tintColor }}
          />
        )
      }
    },
    ArtefactsTab: {
      screen: ArtefactsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/images/icons/artefacts.png")}
            style={{ height: 30, width: 30, tintColor: tintColor }}
          />
        )
      }
    },
    NotificationTab: {
      // screen: NotificationScreen,
      screen: NotificationStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/images/icons/notification.png")}
            style={{ height: 30, width: 30, tintColor: tintColor }}
          />
        )
      }
    },
    ProfileTab: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/images/icons/profile.png")}
            style={{ height: 30, width: 30, tintColor: tintColor }}
          />
        )
      }
    }
  },
  // styling for the tab bar
  {
    tabBarOptions: {
      activeTintColor: "#FF6E6E",
      inactiveTintColor: "#737373",
      showLabel: false,
      style: {
        elevation: 1,
        backgroundColor: white,
        borderTopWidth: 0,
        height: 60
      }
    }
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

Scenes.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  artefacts: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
  getUserArtefacts: PropTypes.func.isRequired,
  getUserGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  artefacts: state.artefacts,
  groups: state.groups
});

export default connect(
  mapStateToProps,
  { getUserData, getUserArtefacts, getUserGroups }
)(Scenes);
