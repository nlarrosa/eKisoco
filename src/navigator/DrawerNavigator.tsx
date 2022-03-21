import React, { Component, useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { Badge, Button, Icon } from 'react-native-elements';
import constColor from '../constants/color';

import { ProfileScreen } from '../screens/user/ProfileScreen';
import { AccountScreen } from '../screens/user/AccountScreen';
import { ProductScreen } from '../screens/reposiciones/ProductScreen';
import { AuthContext } from '../context/AuthContext';
import { CartScreen } from '../screens/cart/CartScreen';
import { TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';
import { StackScreenProps } from '@react-navigation/stack';
import { rootStackParams } from './StackNavigator';
import { useNavigation } from '@react-navigation/native';


export type rootDrawParams = {

    ProfileScreen: undefined,
    AccountScreen: undefined,
    ProductScreen: undefined,
    CartScreen: undefined,
}

const Drawer =  createDrawerNavigator<rootDrawParams>();



export const  DrawerNavigator = () => {

  const { totalQuantity } = useContext(CartContext);
  const navigation = useNavigation();


  return (
    <Drawer.Navigator
      initialRouteName='ProductScreen'
      screenOptions={{
        headerTitleStyle: {
          fontSize: 17,
        },
        headerRight:  () => (
          <TouchableOpacity
            onPress={ () =>  navigation.navigate('CartScreen' as never)}
          >
            <Icon
              type='ionicon'
              name='cart'
              style={{ marginRight: 20 }}
              color={ constColor.green }
              size={ 30 }
            />
            <Badge
            value={ totalQuantity }
              status="error"
              containerStyle={{ 
                position: 'absolute', 
                top: 1, 
                left: 20 }}
            />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
        headerStyle: {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,
            elevation: 10,
            borderBottomColor: constColor.green,
            borderBottomWidth: 1,
        }
    }}
      drawerContent={  (props)  => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name ="ProfileScreen" 
        component ={ProfileScreen} 
        options = {{
          title: 'Mi Perfil'
        }}
      />
      <Drawer.Screen 
        name ="AccountScreen" 
        component ={AccountScreen} 
        options = {{
          title: 'Mi cuenta'
        }}
      />
      <Drawer.Screen 
        name ="ProductScreen" 
        component ={ProductScreen} 
        options = {{
          title: 'Pedidos'
        }}
      />
      <Drawer.Screen 
        name ="CartScreen" 
        component ={CartScreen} 
        options = {{
          title: 'Reposiciones'
        }}
      />
    </Drawer.Navigator>
  );
}


/** Listado del menu personalizado  */
const CustomDrawerContent = (props: DrawerContentComponentProps) => {

    const { logOut } = useContext(AuthContext);

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Cerrar Sesion" onPress={logOut} />
      </DrawerContentScrollView>
    )
}