import React from 'react'
import {createSwitchNavigator, createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import StartScreen from './Start'
import RegisterScreen from './Register'
import LoginScreen from './Login'
import CollectionsScreen from './Collections'
import AuthLoadingScreen from './AuthLoadingScreen'
import ProfileScreen from './Profile'
import NotificationScreen from './Notification'
import ArtifactsScreen from './Artifacts'
import { white } from 'ansi-colors';

// login / signup stack
const AuthStack = createStackNavigator(
	{ 
		Start: {screen: StartScreen},
		Register: {screen: RegisterScreen},
		Login: {screen: LoginScreen},
	});

// default app stack
const AppStack = createBottomTabNavigator(
	{
		Collections: {screen: CollectionsScreen},
		Artifacts: {screen: ArtifactsScreen},
		Notification: {screen: NotificationScreen},
		Profile: {screen: ProfileScreen},
	},
	// styling for the tab bar
	{
		tabBarOptions:{
			activeTintColor: '#FF6E6E',
			inactiveTintColor: '#E2E2E2',
			style: {
				elevation: 1,
				backgroundColor: white,
				borderTopWidth: 0,
				height: 60,
				
			},
			labelStyle: {
				fontSize: 10,
				marginBottom: 10,

			  },		
		}
	}
	);

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

// export default AppStack;
