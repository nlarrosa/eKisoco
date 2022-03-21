import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotScreen } from '../screens/auth/ForgotScreen';
import { AuthContext } from '../context/AuthContext';
import { ProfileScreen } from '../screens/user/ProfileScreen';
import { AccountScreen } from '../screens/user/AccountScreen';
import { DrawerNavigator } from './DrawerNavigator';
import { Loading } from '../components/Loading';



export type rootStackParams = {

    RegisterScreen:  undefined,
    ForgotScreen:    undefined,
    DrawerNavigator: undefined,
    LoginScreen:     undefined,
    ProfileScreen:   undefined,
    AccountScreen:   undefined,
} 

const Stack = createNativeStackNavigator<rootStackParams>();


export const StackNavigator = () => {
    
    const { status } = useContext(AuthContext);

    if( status === 'checking' ) return <Loading />

  return (

    <Stack.Navigator
        initialRouteName='LoginScreen'
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
            </>

        )}

    </Stack.Navigator>
  );
  
}
