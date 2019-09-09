import React from "react";
import {
    createMaterialTopTabNavigator
} from "react-navigation";

import followingScreen from './following'
import mineScreen from './mine'
  
 const groupsTabs = createMaterialTopTabNavigator ({
    Following:{
        screen: followingScreen,
        navigationOptions:{
        }
    },
    Mine:{
        screen: mineScreen,
        navigationOptions:{
        }
    }},
    {
        initialRouteName: "Following"
    });

export default groupsTabs