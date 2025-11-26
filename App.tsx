import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimerScreen from './components/TimerScreen'
import DiceScreen from './components/Dice';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RuleListScreen from './components/RuleList';
import HomeScreen from './components/Homescreen';
import "./global.css"
import { Container } from './components/ui/Container';
import { useEffect, useMemo, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { loadFonts } from './hooks/useFonts';
import GameRuleScreen from './components/GameRule';
import EditGameScreen from './components/EditGame';
import ScannerScreen from './components/RuleScanner'



const Stack = createStackNavigator();




const Tab = createBottomTabNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RuleList" component={RuleListScreen} />
      <Stack.Screen name="GameRule" component={GameRuleScreen} options={{headerShown: true}} />
      <Stack.Screen name="EditGameRules" component={EditGameScreen} />
      <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
      <Stack.Screen name="DiceScreen" component={DiceScreen} />
      <Stack.Screen name="TimerScreen" component={TimerScreen} />
    </Stack.Navigator>
  );
}


  
export default function App() {
  useEffect(() => {
    loadFonts();
  }, []);

  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => setDark(prev => !prev);


  const navTheme = useMemo(() => {
    const base = dark ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: dark ? "#1b1b1b" : "#ebd6adff",
        card: dark ? "#1b1b1b" : "#ebd6adff",
        text: dark ? "#ebd6adff" : "#3a2e2a",
        primary: "#6b7a47",
      },
    };
  }, [dark]);

  const tabBarStyle = {
    backgroundColor: dark ? "#1b1b1b" : "#ebd6adff",
    borderTopColor: dark ? "#333" : "#e5e5e5",
  };

  return (
    <View className={dark ? "dark flex-1" : "flex-1"}>
      
      
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: () => { 
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Dice') {
                iconName = 'dice-multiple';
              } else if (route.name === 'Timer') {
                iconName = 'timer';
              }

              return <MaterialCommunityIcons name={iconName as any} size={30} color={dark ? "Black" : "White"} />;
            },

              headerShown: false,
              tabBarStyle,
              tabBarActiveTintColor: dark ? "#f4ecd8" : "#3a2e2a",
              tabBarInactiveTintColor: dark ? "#999" : "#777",
            })
          }
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }}/>
          <Tab.Screen name="Timer" component={TimerScreen} />
          <Tab.Screen name="Dice" component={DiceScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    
    </View>
  );
}




