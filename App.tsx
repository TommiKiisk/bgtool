import { createStaticNavigation, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimerScreen from './components/TimerScreen'
import DiceScreen from './components/Dice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';


const Tab = createBottomTabNavigator();



function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to Boardgametool</Text>
      <Button title="Timer" onPress={() => navigation.navigate('Timer')}/>
      <Button title="Dice" onPress={() => navigation.navigate('Dice')}/>
    </View>
  );
}


  
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Dice" component={DiceScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomeScreen,
    Timer: TimerScreen,
    Dice: DiceScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);
