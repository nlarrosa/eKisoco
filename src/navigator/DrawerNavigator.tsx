import { createDrawerNavigator } from '@react-navigation/drawer';


import { StackNavigator } from './StackNavigator';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotScreen } from '../screens/auth/ForgotScreen';


const Drawer =  createDrawerNavigator();


export const  DrawerNavigator = () => {

  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name ="RegisterScreen" 
        component ={RegisterScreen} 
        options = {{
          title: 'Registro'
        }}
      />
      <Drawer.Screen 
        name ="LoginScreen" 
        component ={LoginScreen} 
        options = {{
          title: 'Login'
        }}
      />
      <Drawer.Screen 
        name ="ForgotScreen" 
        component ={ForgotScreen} 
        options = {{
          title: 'Recuperar Clave'
        }}
      />
    </Drawer.Navigator>
  );

}