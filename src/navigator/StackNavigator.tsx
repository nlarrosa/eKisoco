import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotScreen } from '../screens/auth/ForgotScreen';


export type rootStackParams = {

    RegisterScreen: undefined,
    ForgotScreen: undefined,
    LoginScreen: undefined,
} 

const Stack = createNativeStackNavigator<rootStackParams>();


export const StackNavigator = () => {

  return (

    <Stack.Navigator
        screenOptions={{
            contentStyle: {
                backgroundColor: 'white',
            },
            headerStyle: {
                backgroundColor: 'white',
            },
        }}
    >

        <Stack.Screen 
            name="RegisterScreen" 
            component={RegisterScreen} 
        />
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: 'Login' }}
        />
        <Stack.Screen
            name="ForgotScreen"
            component={ForgotScreen}
            options={{ title: 'Recuperar Clave' }}
        />
    </Stack.Navigator>
  )
  
}
