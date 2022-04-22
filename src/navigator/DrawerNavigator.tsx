import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { Badge, Icon } from 'react-native-elements';
import constColor from '../constants/color';

import { ProfileScreen } from '../screens/user/ProfileScreen';
import { AccountScreen } from '../screens/user/AccountScreen';
import { ProductScreen } from '../screens/products/ProductScreen';
import { AuthContext } from '../context/AuthContext';
import { CartScreen } from '../screens/cart/CartScreen';
import { TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { OrdersScreen } from '../screens/cart/OrdersScreen';
import { TabBottomNavigator } from './TabBottomNavigator';


export type rootDrawParams = {

    ProfileScreen: undefined,
    AccountScreen: undefined,
    ProductScreen: undefined,
    CartScreen: undefined,
    OrdersScreen: undefined,
    NewsScreen: undefined,
    TabBottomNavigator: undefined
}

const Drawer =  createDrawerNavigator<rootDrawParams>();



export const  DrawerNavigator = () => {

  const { totalQuantity } = useContext(CartContext);
  const navigation = useNavigation();


  return (
    <Drawer.Navigator
      initialRouteName='NewsScreen'
      screenOptions={{ headerTitleStyle: { fontSize: 18 },
        headerRight:  () => (
          <TouchableOpacity
            onPress={ () =>  navigation.navigate('CartScreen' as never)}
          >
            <Icon
              tvParallaxProperties
              type='ionicon'
              name='cart'
              style={{ marginRight: 20 }}
              color={ constColor.green }
              size={ 30 }
            />
            { totalQuantity > 0 && (
              <Badge
              value={ totalQuantity }
                status="error"
                containerStyle={{ 
                  position: 'absolute', 
                  top: 1, 
                  left: 20 }}
              />
            )}
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
        name ="TabBottomNavigator" 
        component ={TabBottomNavigator} 
        options = {{
          title: 'Inicio',
          drawerIcon: () => (
            <Icon 
              tvParallaxProperties
              type='ionicon' 
              name='home-outline' 
              color={constColor.greyDark} 
              size={20}
            />
          ),
        }}
      />
      <Drawer.Screen 
        name ="ProfileScreen" 
        component ={ProfileScreen} 
        options = {{
          title: 'Mi Perfil',
          drawerIcon: () => (
            <Icon 
              tvParallaxProperties
              type='ionicon' 
              name='person-circle-outline' 
              color={constColor.greyDark} 
              size={20}
            />
          ),
        }}
      />
      <Drawer.Screen 
        name ="AccountScreen" 
        component ={AccountScreen} 
        options = {{
          title: 'Mi cuenta',
          drawerIcon: () => (
            <Icon 
              tvParallaxProperties
              type='ionicon' 
              name='settings-outline' 
              color={constColor.greyDark} 
              size={20}
            />
          ),
        }}
      />
      <Drawer.Screen 
        name ="OrdersScreen" 
        component ={OrdersScreen} 
        options = {{
          title: 'Mis Ordenes',
          drawerIcon: () => (
            <Icon 
              tvParallaxProperties
              type='ionicon' 
              name='document-text-outline' 
              color={constColor.greyDark} 
              size={20}
            />
          ),
        }}
      />
      <Drawer.Screen 
        name ="ProductScreen" 
        component ={ProductScreen} 
        options = {{
          title: 'Productos',
          drawerIcon: () => (
            <Icon 
              tvParallaxProperties
              type='ionicon' 
              name='newspaper-outline' 
              color={constColor.greyDark} 
              size={20}
            />
          ),
        }}
      />
      <Drawer.Screen 
        name ="CartScreen" 
        component ={CartScreen} 
        options = {{
          title: 'Carrito',
          drawerIcon: () => (
            <Icon 
              tvParallaxProperties
              type='ionicon' 
              name='cart-outline' 
              color={constColor.greyDark} 
              size={20}
            />
          ),
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
        <DrawerItem 
          label="Cerrar Sesion" 
          onPress={logOut} 
          icon={() => <Icon 
              tvParallaxProperties
              type='ionicon'
              name='log-out-outline'
              color={constColor.green} 
              size={20} 
              /> 
          }
        />
      </DrawerContentScrollView>
    )
}