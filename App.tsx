import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimerScreen from './components/TimerScreen'
import DiceScreen from './components/Dice';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RuleListScreen from './components/RuleList';

const Stack = createStackNavigator();




const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RuleList" component={RuleListScreen} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
}
  
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name ="Home" component={HomeStack}/>
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Dice" component={DiceScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
}




