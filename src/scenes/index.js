import React from "react";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import StartScreen from "./Start";
import RegisterScreen from "./Register";
import LoginScreen from "./Login";
import GroupsScreen from "./Groups";
import AuthLoadingScreen from "./AuthLoadingScreen";
import ProfileScreen from "./Profile";
import NotificationScreen from "./Notification";
import ArtefactsScreen from "./Artefacts";
import WelcomeScreen from "./Welcome";

import { white } from "ansi-colors";
import { Image } from "react-native";

import { connect } from "react-redux";
import { loadFont, discardFont } from "../actions/fontLoaderActions";

import * as Font from "expo-font";

class Scenes extends React.Component {
  // load required custom font here (root component)
  componentDidMount() {
    // the app is just launched, so we make sure fontLoaded = false in Redux state
    this.props.discardFont();
    console.log("Scenes mounted! Font Loaded: " + this.props.fontLoaded);
    // load the font here
    Font.loadAsync({
      "HindSiliguri-Bold": require("../../assets/fonts//HindSiliguri-Bold.ttf"),
      "HindSiliguri-Light": require("../../assets/fonts/HindSiliguri-Light.ttf"),
      "HindSiliguri-Regular": require("../../assets/fonts/HindSiliguri-Regular.ttf")
    }).then(() => {
      // make sure we set the fontLoaded = true only after loadAsync is completed
      this.props.loadFont();
      console.log("Font loaded! Font Loaded: " + this.props.fontLoaded);
    });
  }

  render() {
    return <AppContainer />;
  }
}

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
    Groups: {
      screen: GroupsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/images/icons/group.png")}
            style={{ height: 30, width: 30, tintColor: tintColor }}
          />
        )
      }
    },
    Artefacts: {
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
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/images/icons/notification.png")}
            style={{ height: 30, width: 30, tintColor: tintColor }}
          />
        )
      }
    },
    Profile: {
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

// connect to redux store for Scenes
const mapStateToProps = state => ({
  fontLoaded: state.fontLoader.fontLoaded,
  state: state
});

const mapDispatchToProps = dispatch => {
  return {
    loadFont: () => {
      dispatch(loadFont());
    },
    discardFont: () => {
      dispatch(discardFont());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scenes);
