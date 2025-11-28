import { useNavigation, useRoute } from "@react-navigation/native";
import { onValue, ref, update } from "firebase/database";
import React, { use, useEffect, useState } from 'react';
import { database } from "../config/firebase";
import { Alert, Text, TextInput, View } from "react-native";
import { Container } from "./ui/Container";
import { Title } from "./ui/Title";
import { MedievalButton } from "./ui/MedievalButton";



export default function EditGame() {
    const route = useRoute();
    const navigation = useNavigation<any>();

    const { gameId } = route.params as { gameId: string };

    const [name, setName] = useState("");
    const [rules, setRules] = useState("");
    
    useEffect(() => {
        const gameRef = ref(database, `games/${gameId}`);
        onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setName(data.name || "");
                setRules(data.rules || "");
            }
        });
    }, [gameId]);

    const handleSave = () => {
        if (!name.trim()) {
            Alert.alert("Game name cannot be empty.");
            return;
        }
        const gameRef = ref(database, `games/${gameId}`);
        update(gameRef, { 
            name: name.trim(),
            rules: rules.trim(), 
        })
            .then(() => {
                Alert.alert("Game updated successfully."), [
                    { text: "OK", onPress: () => navigation.goBack() },
                ];
            });
            
    };

    return (
        <Container>
            <Title>Edit {name || "Game"}</Title>
            <Text className="font-medieval text-lg mb-1 mt-6">Game Name:</Text>
            <TextInput
                className=" border-2 border-black w-full p-2 mt-2 mb-6 font-medieval text-ink"
                placeholder="Game Name"
                placeholderTextColor="#d4af37"
                value={name}
                onChangeText={setName}
            />

            <Text className="font-medieval text-lg mb-1">Game Rules:</Text>
            <TextInput
                className=" border-2 border-black w-full p-2 mt-2 mb-6 font-medieval text-ink"
                placeholder="Game Rules"
                placeholderTextColor="#d4af37"
                value={rules}
                onChangeText={setRules}
                multiline
                textAlignVertical="top"
            />
            <Container>
                <MedievalButton label="Scan Rules" onPress={() => navigation.navigate('ScannerScreen', {gameId} )} />
                <MedievalButton label="Save Changes" onPress={handleSave} />
                <MedievalButton label="Go back" onPress={() => navigation.goBack()} />
            </Container>
        </Container>

    );
};

