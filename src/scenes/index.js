import React from 'react'
import {createSwitchNavigator, createAppContainer, createStackNavigator} from 'react-navigation'

import StartScreen from './Start'
import RegisterScreen from './Register'
import LoginScreen from './Login'

const AppStack = createStackNavigator({
	Start: {screen: StartScreen},
	Register: {screen: RegisterScreen},
  	Login: {screen: LoginScreen},
});

export default createAppContainer(AppStack);

