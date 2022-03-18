import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps, DrawerItemList, DrawerItem } from '@react-navigation/drawer';


import { ProfileScreen } from '../screens/user/ProfileScreen';
import { AccountScreen } from '../screens/user/AccountScreen';
import { ProductScreen } from '../screens/reposiciones/ProductScreen';
import { AuthContext } from '../context/AuthContext';
import { CartScreen } from '../screens/CartScreen';


export type rootDrawParams = {

    ProfileScreen: undefined,
    AccountScreen: undefined,
    ProductScreen: undefined,
    CartScreen: undefined,
}

const Drawer =  createDrawerNavigator<rootDrawParams>();


export const  DrawerNavigator = () => {


  return (
    <Drawer.Navigator
      initialRouteName='ProductScreen'
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
          title: 'Carrito de Compra'
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