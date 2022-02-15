import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { ProfileScreen } from '../screens/user/ProfileScreen';


const Tab = createBottomTabNavigator();


export const TabBottomNavigator = () => {


  return (
    
    <Tab.Navigator>
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  )


}
