import React, { useEffect, useRef, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Alert, Text, StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Container } from './ui/Container';
import { useRoute } from '@react-navigation/native';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';
import MlkitOcr from 'expo-mlkit-ocr';


declare module 'expo-mlkit-ocr' {
    interface ExpoMlkitOcrModule {
    detectFromUri(uri: string): Promise<Array<{ text: string; confidence: number; boundingBox: { x: number; y: number; width: number; height: number } }>>;
    }
}

export default function RuleScanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraReady, setCameraReady] = useState(false);
    const [scannedText, setScannedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const route = useRoute();
    const { gameId } = route.params as { gameId: string };

    const cameraRef = useRef<CameraView>(null);

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
                }
            }
        } catch (error) {
            console.error('OCR Error:', error);
            Alert.alert('OCR Failed', 'Could not read text. Try again with clearer image.');
        } finally {
            setIsProcessing(false);
        }
    };

    const takeAndScanPhoto = async () => {
        if (!cameraRef.current || isProcessing) return;

        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                skipProcessing: true,
            });

            if (photo?.uri) {
                await processImageWithOCR(photo.uri);
            }
        } catch (err) {
            console.log('Photo capture failed:', err);
            Alert.alert('Camera Error', 'Could not take photo.');
        }
    };

    

    

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
                facing="back"
            />

            <View className="px-6 mb-6">
                <TouchableOpacity
                    onPress={takeAndScanPhoto}
                    disabled={!cameraReady || isProcessing}
                    className={`py-5 rounded-xl items-center justify-center ${
                        cameraReady && !isProcessing
                            ? 'bg-amber-600 active:bg-amber-700'
                            : 'bg-gray-500'
                    }`}
                >
                    {isProcessing ? (
                        <View className="flex-row items-center gap-3">
                            <ActivityIndicator color="#f5e6d3" size="small" />
                            <Text className="font-medieval text-parchment text-xl">
                                Scanning...
                            </Text>
                        </View>
                    ) : (
                        <Text className="font-medieval text-parchment text-xl">
                            Scan Page
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({});
