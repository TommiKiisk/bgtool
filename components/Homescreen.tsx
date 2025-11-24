import { View, Text, Button } from "react-native";
import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { MedievalButton } from "./ui/MedievalButton";
import { Title } from "./ui/Title";
import "../global.css";
import { Container } from "./ui/Container";



type RootStackParamList = {
    Home: undefined;
    RuleList: undefined;
    DiceScreen: undefined;
    TimerScreen: undefined;
};

type HomeNavProp = StackNavigationProp<RootStackParamList, 'Home'>;


export default function HomeScreen() {
    const navigation = useNavigation<HomeNavProp>();
    const [dark, setDark] = useState(false);
  return (
    <Container>
      <Title>Board Game Tool</Title>
        <MedievalButton onPress={() => navigation.navigate('RuleList')} label="List of games" />
        <MedievalButton onPress={() => navigation.navigate('DiceScreen')} label="Throw Dice" />
        <MedievalButton onPress={() => navigation.navigate('TimerScreen')} label="Timer" />
        {/*<MedievalButton label="Change theme" onPress={() => setDark(d => !d)} />*/}

    </Container>
  );
}