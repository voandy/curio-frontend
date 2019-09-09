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
import ArtifactsScreen from "./Artifacts";

import { white } from "ansi-colors";
import { Image } from "react-native";

import { connect } from "react-redux";
import { loadFont, discardFont } from "../actions/fontLoaderActions";

import * as Font from "expo-font";

// login / signup stack
const AuthStack = createStackNavigator({
  Start: { screen: StartScreen },
  Register: { screen: RegisterScreen },
  Login: { screen: LoginScreen }
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
    Artifacts: {
      screen: ArtifactsScreen,
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

class Scenes extends React.Component {
  // load fonts TODO
  async componentDidMount() {
    this.props.discardFont();
    console.log("Scenes mounted! Font Loaded: " + this.props.fontLoaded);
    await Font.loadAsync({
      "HindSiliguri-Bold": require("../../assets/fonts//HindSiliguri-Bold.ttf"),
      "HindSiliguri-Light": require("../../assets/fonts/HindSiliguri-Light.ttf"),
      "HindSiliguri-Regular": require("../../assets/fonts/HindSiliguri-Regular.ttf")
    }).then(() => {
      this.props.loadFont();
      console.log("Font loaded! Font Loaded: " + this.props.fontLoaded);
    });
  }

  render() {
    return <AppContainer />;
  }
}

const mapStateToProps = state => ({
  fontLoaded: state.fontLoader.fontLoaded
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
