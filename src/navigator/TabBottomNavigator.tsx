import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { ProfileScreen } from '../screens/user/ProfileScreen';
import constColor from '../constants/color';
import { Platform } from 'react-native';
import { NewsScreen } from '../screens/home/NewsScreen';
import { ProductScreen } from '../screens/products/ProductScreen';
import { OrdersScreen } from '../screens/cart/OrdersScreen';



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
      initialRouteName='NewsScreen'
      activeColor={constColor.green}
      inactiveColor={ constColor.green}

      barStyle = {{
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderColor: constColor.green,
        shadowColor: "#000",
        elevation: 9,
      }}
    >


      <TabAndroid.Screen 
        name="NewsScreen" 
        component={NewsScreen} 
        options={{ 
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />


      <TabAndroid.Screen 
        name="OrdersScreen" 
        component={OrdersScreen} 
        options={{ 
          title: 'Mis Ordenes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={26} />
          ),
          tabBarBadge: 3,
        }}
      />


      <TabAndroid.Screen 
        name="ProductScreen" 
        component={ProductScreen} 
        options={{ 
          title: 'Buscar',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="search-web" color={color} size={26} />
          ),
        }}
      />
    </TabAndroid.Navigator>
  )
}
