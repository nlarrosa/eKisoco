import 'react-native-gesture-handler';
import { StackNavigator } from './src/navigator/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';
import { ProductProvider } from './src/context/ProductContext';
// import { DrawerNavigator } from './src/navigator/DrawerNavigator';
// import { TabBottomNavigator } from './src/navigator/TabBottomNavigator';


const AppState = ({ children}: any ) => {

  return(
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
          {children}
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
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


