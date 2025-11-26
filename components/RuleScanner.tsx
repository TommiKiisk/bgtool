import React, { useEffect, useRef, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Alert, Text, StyleSheet } from 'react-native';
import { Container } from './ui/Container';
import { useRoute } from '@react-navigation/native';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';
import MlkitOcr from 'react-native-mlkit-ocr';

export default function RuleScanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraReady, setCameraReady] = useState(false);
    const [scannedText, setScannedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const route = useRoute();
    const { gameId } = route.params as { gameId: string };

    const cameraRef = useRef<CameraView>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (permission === null) {
            requestPermission();
        }
    }, []);

    useEffect(() => {
        if (gameId && scannedText.trim()) {
            const gameRef = ref(database, `games/${gameId}/rules`);
            set(gameRef, scannedText)
                .then(() => console.log('Rules saved to Firebase!'))
                .catch(err => console.error('Firebase save error:', err));
        }
    }, [scannedText, gameId]);

    const processImageWithOCR = async (photoUri: string) => {
        if (isProcessing) return;
        setIsProcessing(true);

        try {
            const result = await MlkitOcr.detectFromUri(photoUri);

            if (result && result.length > 0) {
                const allText = result.map(block => block.text).join('\n');
                const cleanText = allText.trim();

                if (cleanText) {
                    setScannedText(cleanText);
                    stopScanning();
                }
            }
        } catch (error) {
            console.error('OCR Error:', error);
            Alert.alert('OCR Failed', 'Could not read text. Try again with clearer image.');
        } finally {
            setIsProcessing(false);
        }
    };

    const startScanning = () => {
        if (intervalRef.current) return;

        intervalRef.current = setInterval(async () => {
            if (!cameraRef.current) return;
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.7,
                    skipProcessing: true,
                });

                if (photo?.uri) {
                    await processImageWithOCR(photo.uri);
                }
            } catch (err) {
                console.log('Photo capture failed:', err);
            }
        }, 2200);
    };

    const stopScanning = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        if (permission?.granted && cameraReady) {
            startScanning();
        }
        return () => stopScanning();
    }, [permission, cameraReady]);

    if (permission === null) {
        return <Text className='font-medieval text-ink dark:text-parchment'>Requesting camera permission</Text>;
    }

    if (!permission.granted) {
        return (
            <Container>
                <Text
                    className='font-medieval text-ink dark:text-parchment text-center'
                    onPress={requestPermission}
                >
                    Tap to grant camera permission
                </Text>
            </Container>
        );
    }

    return (
        <Container>
            <CameraView
                ref={cameraRef}
                style={{ width: '100%', height: 400 }}
                ratio="16:9"
                onCameraReady={() => setCameraReady(true)}
            />

            {scannedText ? (
                <Container>
                    <Text className='font-medieval text-ink dark:text-parchment'>{scannedText}</Text>
                </Container>
            ) : null}
        </Container>
    );
}

const styles = StyleSheet.create({});
