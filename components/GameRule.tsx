import React, { use, useEffect, useState } from 'react';
import { ref, push, set, onValue } from "firebase/database";
import { useRoute } from "@react-navigation/native";

import { View, ScrollView, Text } from 'react-native';
import { database } from '../firebaseConfig';



export default function GameRule() {

    const route = useRoute();

    const { gameId } = route.params as { gameId: string };

    const [rules, setRules] = useState("");

    useEffect(() => {
        
        const rulesRef = ref( database, `games/${gameId}/rules` );
        const unsubscribe = onValue(rulesRef, (snapshot) => {
            const data = snapshot.val();
            setRules(data || "No rules available.");
        });
        
        return () => unsubscribe();
        
    }, [gameId]);

    return (
        <View style={{ flex: 1 }}>
            <Text>Game Rules</Text>
        <ScrollView style={{ padding: 16 }}>
        </ScrollView>
        </View>
    );
};


