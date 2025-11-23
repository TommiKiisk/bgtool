import { View, Text, Button } from "react-native";
import React from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';



type RootStackParamList = {
    Home: undefined;
    RuleList: undefined;
    DiceScreen: undefined;
    TimerScreen: undefined;
};

type HomeNavProp = StackNavigationProp<RootStackParamList, 'Home'>;


export default function HomeScreen() {
    const navigation = useNavigation<HomeNavProp>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button onPress={() => navigation.navigate('RuleList')} title="List of games" />
        <Button onPress={() => navigation.navigate('DiceScreen')} title="Throw Dice" />
        <Button onPress={() => navigation.navigate('TimerScreen')} title="Timer" />
    </View>
  );
}