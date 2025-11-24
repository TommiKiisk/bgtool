import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Container } from './ui/Container';
import { MedievalButton } from './ui/MedievalButton';
import { Title } from './ui/Title';


export default function Dice() {

    const [number, setNumber] = React.useState(1);

    const rollDice = () => {
        const random = Math.floor(Math.random() * 6) + 1;
        setNumber(random);
    };

      const navigation = useNavigation();





    return (
        <Container>
            <Title>Dice Roller</Title>
            <Text className='font-medieval text-center mt-12 flex'>Tap to roll</Text>
            

        <TouchableOpacity onPress={rollDice} style={styles.dice}>
            <MaterialCommunityIcons name={`dice-${number}-outline` as any} size={300} color="#251e1bff" />

        </TouchableOpacity>

            <MedievalButton label="Go back" onPress={() => navigation.goBack()} />
        </Container>
    );
}

const styles = StyleSheet.create({
    dice: {
        marginTop: 20, marginBottom: 50, alignItems: "center", backgroundColor: '#728546ff', borderRadius: 30, borderWidth: 4, borderColor: '#3a2e2a'
    },
});