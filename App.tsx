import 'react-native-gesture-handler';
import { StackNavigator } from './src/navigator/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/navigator/DrawerNavigator';
import { TabBottomNavigator } from './src/navigator/TabBottomNavigator';




export default function App() {
  return (

    <NavigationContainer>
      {/* <DrawerNavigator /> */}
      <TabBottomNavigator />
    </NavigationContainer>

  );
}


