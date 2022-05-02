import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { ProfileScreen } from '../screens/user/ProfileScreen';
import constColor from '../constants/color';
import { Platform } from 'react-native';
import { NewsScreen } from '../screens/home/NewsScreen';
import { ProductScreen } from '../screens/products/ProductScreen';
import { OrdersScreen } from '../screens/cart/OrdersScreen';
import { CartContext } from '../context/CartContext';
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
    >
      <TabIos.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
      />
    </TabIos.Navigator>
  )
}



const TabBottomAndroid = () => {

  const { notificationOrders } = useContext(CartContext);

  return (
    
    <TabAndroid.Navigator
      initialRouteName='NewsScreen'
      activeColor={constColor.green}
      inactiveColor={ 'gray'}
      backBehavior={'firstRoute'}
      barStyle = {{
        backgroundColor: 'white',
        borderTopWidth: 0,
        borderColor: 'gray',
        shadowColor: "#000",
        elevation: 11,
      }}

      
    >


      <TabAndroid.Screen 
        name="NewsScreen" 
        component={NewsScreen} 
        options={{ 
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={24} />
          ),
        }}
      />


      <TabAndroid.Screen 
        name="OrdersScreen" 
        component={OrdersScreen} 
        options={{ 
          title: 'Mis Ordenes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping-outline" color={color} size={24} />
          ),
          tabBarBadge:  (notificationOrders > 0 ) ? notificationOrders : false,
        }}
      />


      <TabAndroid.Screen 
        name="ProductScreen" 
        component={ProductScreen} 
        options={{ 
          title: 'Productos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={24} />
          ),
        }}
      />
    </TabAndroid.Navigator>
  )
}
