import 'react-native-gesture-handler';
import { StackNavigator } from './src/navigator/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/navigator/DrawerNavigator';
import { TabBottomNavigator } from './src/navigator/TabBottomNavigator';
import { Authprovider } from './src/context/AuthContext';


const AppState = ({ children}: any ) => {

  return(
    <Authprovider>
      {children}
    </Authprovider>
  )
}


export default function App() {

  return (

    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>

  );
}


