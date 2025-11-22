import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, FlatList, Alert, TextInput, View, Button } from "react-native";
import { database } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { onValue, push, ref } from "firebase/database";

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
        else {
            Alert.alert('Error', 'Type product and amount first');
        }
    };

    return (
      <View>
        <FlatList<Game>
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => 
                    navigation.navigate("GameRule", { gameId: item.id })
                }>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
        <TextInput
            placeholder="Game Name"
            value={game.name}
            onChangeText={(text: string) => setGame({ ...game, name: text })}/>
        <Button title="Save Game" onPress={handleSave} />
      </View>
    );
};