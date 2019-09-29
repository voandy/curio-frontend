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
import WelcomeScreen from "./Welcome";
import AuthLoadingScreen from "./AuthLoadingScreen";
import GroupsScreen from "./Groups";
import ProfileScreen from "./Profile";
import NotificationScreen from "./Notification";
import ArtefactsScreen from "./Artefacts";
import PublicProfileScreen from "./PublicProfile";
import SelectedArtefactScreen from "./Artefacts/SelectedArtefact";
import SelectedGroupScreen from "./Groups/SelectedGroup";
import ArtefactsFormScreen from "./Artefacts/ArtefactsForm";
import GroupsFormScreen from "./Groups/GroupsForm";
import AccountSettingScreen from "./Profile/AccountSetting";
import SearchScreen from "./Search";

import { getUserData } from "../actions/userActions";
import { getUserArtefacts } from "../actions/artefactsActions";
import { getUserGroups } from "../actions/groupsActions";

//prettier-ignore
const { registerForPushNotificationsAsync } = require("../services/notification/registerForPushNotificationsAsync");

class Scenes extends Component {
  async componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      // get user authentication data
      const { user } = this.props.auth;

      // get user data and artefacts
      await this.props.getUserData(user.id);
      await this.props.getUserArtefacts(user.id);
      await this.props.getUserGroups(user.id);

      // post user's expo-push-token to backend if haven't already
      registerForPushNotificationsAsync(user.id);
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

      // post user's expo-push-token to backend if haven't already
      registerForPushNotificationsAsync(user.id);
    }
  }

  render() {
    return <AppContainer />;
  }
}

// group stack
const GroupStack = createStackNavigator({
  Groups: { screen: GroupsScreen },
  GroupsForm: { screen: GroupsFormScreen },
  SelectedGroup: { screen: SelectedGroupScreen },
  Search: {screen: SearchScreen},
});

const ArtefactStack = createStackNavigator({
  Artefacts: { screen: ArtefactsScreen },
  ArtefactsForm: { screen: ArtefactsFormScreen },
  SelectedArtefact: { screen: SelectedArtefactScreen }
});

const NotificationStack = createStackNavigator({
  Notification: { screen: NotificationScreen },
  SelectedArtefact: { screen: SelectedArtefactScreen },
  SelectedGroup: { screen: SelectedGroupScreen }
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen },
  AccountSetting: { screen: AccountSettingScreen }
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
    GroupTab: {
      screen: GroupStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/images/icons/group.png")}
            style={{ height: 27, width: 27, tintColor: tintColor }}
          />
        )
      }
    },
    ArtefactTab: {
      screen: ArtefactStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/images/icons/artefacts.png")}
            style={{ height: 27, width: 27, tintColor: tintColor }}
          />
        )
      }
    },
    NotificationTab: {
      screen: NotificationStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/images/icons/notification.png")}
            style={{ height: 27, width: 27, tintColor: tintColor }}
          />
        )
      }
    },
    ProfileTab: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/images/icons/profile.png")}
            style={{ height: 27, width: 27, tintColor: tintColor }}
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
        backgroundColor: white,
        borderColor: "#939090",
        borderTopWidth: 0.5,
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
