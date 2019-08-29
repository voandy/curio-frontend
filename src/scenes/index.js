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
import { white } from 'ansi-colors'

import {
	Image
  } from 'react-native'

const defaultTintColor = '#E2E2E2';

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
		Collections: {
			screen: CollectionsScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor}) => (
					<Image source={ require('../../assets/images/icons/collection.png') } 
					style = {{ height:24, width:24, tintColor:defaultTintColor}}/>
				)
			}},
		Artifacts: {
			screen: ArtifactsScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor}) => (
					<Image source={ require('../../assets/images/icons/artefact.png') } 
					style = {{ height:24, width:30, tintColor:defaultTintColor}}/>
				)
			}},
		Notification: {
			screen: NotificationScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor}) => (
					<Image source={ require('../../assets/images/icons/notification.png') } 
					style = {{ height:24, width:30, tintColor:defaultTintColor }}/>
				)
			}},
		Profile: {
			screen: ProfileScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor}) => (
					<Image source={ require('../../assets/images/icons/profile.png') } 
					style = {{ height:24, width:24, tintColor:defaultTintColor }}/>
				)
			}},
	},
	// styling for the tab bar
	{
		tabBarOptions:{
			activeTintColor: '#FF6E6E',
			inactiveTintColor: '#E2E2E2',
			showLabel: false,
			style: {
				elevation: 1,
				backgroundColor: white,
				borderTopWidth: 0,
				height: 60,
				
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
