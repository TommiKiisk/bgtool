import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimerScreen from './components/TimerScreen'
import DiceScreen from './components/Dice';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RuleListScreen from './components/RuleList';
import HomeScreen from './components/Homescreen';
import "./global.css"


const Stack = createStackNavigator();




const Tab = createBottomTabNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RuleList" component={RuleListScreen} />
      <Stack.Screen name="DiceScreen" component={DiceScreen} />
      <Stack.Screen name="TimerScreen" component={TimerScreen} />
    </Stack.Navigator>
  );
}


  
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name ="Home" component={HomeStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Dice" component={DiceScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
}




