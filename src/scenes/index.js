import React from 'react'
import {createSwitchNavigator, createAppContainer, createStackNavigator} from 'react-navigation'

import StartScreen from './Start'
import RegisterScreen from './Register'
import LoginScreen from './Login'
import DashboardScreen from './Dashboard'
import AuthLoadingScreen from './AuthLoadingScreen'

const AppStack = createStackNavigator({
	Start: {screen: StartScreen},
	Register: {screen: RegisterScreen},
});

const AppStack = createStackNavigator({
	Dashboard: {screen: DashboardScreen},
});

export default createAppContainer(createSwitchNavigator(
  {
	AuthLoading: AuthLoadingScreen,
	Auth: AuthStack,
	App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

// export default createAppContainer(AppStack);

