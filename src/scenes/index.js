import React from 'react'
import {createSwitchNavigator, createAppContainer, createStackNavigator} from 'react-navigation'

import LinksScreen from './Links'
import RegisterScreen from './Register'
import LoginScreen from './Login'
import DashboardScreen from './Dashboard'
import AuthLoadingScreen from './AuthLoadingScreen'

const AuthStack = createStackNavigator({ 
	Links: {screen: LinksScreen},
	Login: {screen: LoginScreen},
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

