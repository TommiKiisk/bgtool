import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, FlatList, Alert, TextInput, View, Button } from "react-native";
import { database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { onValue, push, ref } from "firebase/database";
import { Container } from "./ui/Container";
import { MedievalButton } from "./ui/MedievalButton";
import { Title } from "./ui/Title";

type Game = {
  id: string;
  name: string;
  rules?: string;
};

export default function RuleList() {
    const [games, setGames] = useState<Game[]>([]);
    const [game, setGame] = useState<{ name: string; rules?: string }>({
      name: '',
      rules: ''
    });
    
    const navigation = useNavigation<any>();

    useEffect(() => {
        const gamesRef = ref(database, "games/");
        onValue(gamesRef, (snapshot) => {
            const gamesData = snapshot.val();
            if (gamesData) {
                const parsed: Game[] = Object.entries(gamesData).map(([id, value]) => ({
                    id,
                    ...(value as any)
                })) as Game[];
                setGames(parsed);
            } else {
                setGames([]);
            }
        });
    }, []);

    const handleSave = () => {
        if (game.name) {
            push(ref(database, 'games/'), game);
            setGame({ name: '', rules: '' });
        }
    };

    return (
      <Container>
        <Title>List of Games
        </Title>
        <View className="w-full mb-6">
            <Text className="font-medieval text-lg mb-1">Add a new game:</Text>
        <TextInput
            className=" border-2 border-black w-full p-2 mt-2 mb-6 font-medieval text-ink"
            placeholder="Game Name"
            placeholderTextColor="#d4af37"
            value={game.name}
            onChangeText={(text: string) => setGame({ ...game, name: text })}/>

        
        <MedievalButton label="Save Game" onPress={handleSave} />
        </View>

        <FlatList<Game>
            className="flex-1 w-full touchpan-y"
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => 
                    navigation.navigate("GameRule", { gameId: item.id })
                }>
                    <Text className="flex-1 font-medieval text-xl mb-3 border-black border-2">{item.name}</Text>
                </TouchableOpacity>
            )}
        />
        
      </Container>
    );
};