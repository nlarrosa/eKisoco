import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { ProfileScreen } from '../screens/user/ProfileScreen';
import constColor from '../constants/color';
import { Text, Platform } from 'react-native';
import { AccountScreen } from '../screens/user/AccountScreen';


const TabIos = createBottomTabNavigator();
const TabAndroid = createMaterialBottomTabNavigator();


export const TabBottomNavigator = () => {

    return Platform.OS === 'ios'
            ? <TabBottomIos/>
            : <TabBottomAndroid/>
}


const TabBottomIos = () => {


  return (
    
    <TabIos.Navigator
      sceneContainerStyle = {{
        backgroundColor: 'white',
      }}

      screenOptions = { ({ route }) => ({
          tabBarIcon: ({ color, focused, size }) => {

            let iconName: string = '';

            switch (route.name) {
              case 'ProfileScreen':
                iconName = 'PF';
              break;
            
              default:
                break;
            }

            return <Text>{ iconName }</Text>
          }
      })}
    >
      <TabIos.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
      />
    </TabIos.Navigator>
  )
}



const TabBottomAndroid = () => {


  return (
    
    <TabAndroid.Navigator
      initialRouteName='ProfileScreen'
      activeColor={constColor.green}
      inactiveColor='#979c98'

      barStyle = {{
        backgroundColor: 'white',
        elevation: 5,
      }}

      // screenOptions = { ({ route }) => ({
          
      //     tabBarIcon: ({ color, focused }) => {

      //       let iconName: string = '';

      //       switch (route.name) {
      //         case 'ProfileScreen':
      //           iconName = 'person-circle-outline';
      //         break;
            
      //         default:
      //           break;
      //       }

      //       return <Icon>{ iconName }</Text>
      //     }
      // })}
    >
      <TabAndroid.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ 
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />
      <TabAndroid.Screen 
        name="AccountScreen" 
        component={AccountScreen} 
        options={{ 
          title: 'Mi Cuenta',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-box-multiple-outline" color={color} size={26} />
          ),
        }}
      />
    </TabAndroid.Navigator>
  )


}
