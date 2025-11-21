import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen'
import SettingScreen from './components/TimerScreen'


const Tab = createBottomTabNavigator();

  
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Timer" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}