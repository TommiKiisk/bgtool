import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import React, { useState } from 'react';
import { runOnJS } from 'react-native-reanimated';
import { performOcr } from '@bear-block/vision-camera-ocr';
import { Text } from 'react-native';
import { Container } from './ui/Container';
import { useRoute } from '@react-navigation/native';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';



export default function RuleScanner() {
    const {hasPermission , requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const [scannedText, setScannedText] = useState('');

    const route = useRoute();
    const { gameId } = route.params as { gameId: string };
    
    const updateText = runOnJS((text: string) => {
        setScannedText(text);
        if (gameId && text) {
            const gameRef = ref(database, `games/${gameId}/rules`);
            set(gameRef, text)
                .then(() => console.log('Rules saved!'))
                .catch(err => console.error('Error saving rules:', err));
        }
    });    
    
    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        const result = performOcr(frame);
        if (result && result.text) {
            updateText(result.text);
        }
    }, []);


    if (!hasPermission) {
        return <Text className='font-medieval text-ink dark:text-parchment' onPress={requestPermission}>Grant Camera Permission</Text>;
    }
    if (!device) return <Text className='font-medieval text-ink dark:text-parchment'>No camera</Text>
    

    return (

        <Container>
            <Camera 
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
                pixelFormat="yuv"
            />

            {scannedText ? (
                <Container>
                    <Text className='font-medieval text-ink dark:text-parchment'>{scannedText}</Text>
                </Container>
            ) : null}
        </Container>

    );
}