import React from 'react'
import {createSwitchNavigator, createAppContainer, createStackNavigator} from 'react-navigation'

import LinksScreen from './Links'
import RegisterScreen from './Register'
import LoginScreen from './Login'

const AppStack = createStackNavigator({
	Links: {screen: LinksScreen},
	Register: {screen: RegisterScreen},
  	Login: {screen: LoginScreen},
});

export default createAppContainer(AppStack);

