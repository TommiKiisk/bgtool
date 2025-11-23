import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


export default function Dice() {

    const [number, setNumber] = React.useState(1);

    const rollDice = () => {
        const random = Math.floor(Math.random() * 6) + 1;
        setNumber(random);
    };

      const navigation = useNavigation();





    return (
        <View style={styles.container}>
            <Text>Tap to roll</Text>

        <TouchableOpacity onPress={rollDice} style={{marginTop: 20, padding: 0, backgroundColor: 'mediumseagreen', borderRadius: 5}}>
            <MaterialCommunityIcons name={`dice-${number}-outline` as any} size={300} color="#000000ff" />

        </TouchableOpacity>

            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    dice: {
        fontSize: 100,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});