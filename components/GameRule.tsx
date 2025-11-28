import React, { use, useEffect, useState } from 'react';
import { ref, push, set, onValue } from "firebase/database";
import { useNavigation, useRoute } from "@react-navigation/native";

import { View, ScrollView, Text } from 'react-native';
import { database } from '../config/firebase';
import { Title } from './ui/Title';
import { Container } from './ui/Container';
import { MedievalButton } from './ui/MedievalButton';



export default function GameRule() {

    const route = useRoute();
    const navigation = useNavigation<any>();

    const { gameId } = route.params as { gameId: string };

    const [game, setGame] = useState<{ name: string; rules: string } | null>(null);

    useEffect(() => {
        const gameRef = ref(database, `games/${gameId}`);
        onValue(gameRef, (snapshot) => {
        setGame(snapshot.val());
        });
    }, [gameId]);

    const goToEdit = () => {
        navigation.navigate("EditGameRules", { gameId });
    };

    if (!game) { return (<Container><Text className="font-medieval text-ink">Loading...</Text></Container>); }

    const paragraphs = game.rules.split('\n\n');

    return (
        <Container>
            <Title>{game.name}</Title>

            

            
            <ScrollView className="mt-6">
                {paragraphs.map((para, i) => (
                <Text
                    key={i}
                    className="font-medieval text-lg leading-7 mb-6 text-ink"
                >
                    {para.trim()}
                </Text>
                ))}
            </ScrollView>
            <MedievalButton label="Edit Rules" onPress={goToEdit} />
        </Container>
    );
};


