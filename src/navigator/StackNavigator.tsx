import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotScreen } from '../screens/auth/ForgotScreen';
import { AuthContext } from '../context/AuthContext';
import { DrawerNavigator } from './DrawerNavigator';
import { Loading } from '../components/ui/Loading';
import { ProductDetailScreen } from '../screens/products/ProductDetailScreen';
import constColor from '../constants/color';



export type rootStackParams = {

    RegisterScreen:  undefined,
    ForgotScreen:    undefined,
    DrawerNavigator: undefined,
    TabBottomNavigator: undefined,
    LoginScreen:     undefined,
    NewsScreen: undefined,
    ProductDetailScreen: undefined
} 

const Stack = createNativeStackNavigator<rootStackParams>();


export const StackNavigator = () => {
    
    const { status } = useContext(AuthContext);

    if( status === 'checking' ) return <Loading />

  return (

    <Stack.Navigator
        initialRouteName='LoginScreen'
        screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: { 
                backgroundColor: constColor.green,
            },
        }}

    >
        { ( status !== 'authenticated') 
        
        ? (
            <>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Registro de Usuario' }} />
                <Stack.Screen name="LoginScreen"    component={LoginScreen} options={{ title: 'Login' }}/>
                <Stack.Screen name="ForgotScreen"   component={ForgotScreen} options={{ title: 'Recuperar Clave' }} />
            </>
        ) : (
            <>
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }}/>
                {/* <Stack.Screen name="NewsScreen" component={NewsScreen} options={{ title: 'Detalle de Producto' }}/> */}
                <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{ title: 'Detalle de Producto' }}/>
            </>
        )}

    </Stack.Navigator>
  );
  
}
