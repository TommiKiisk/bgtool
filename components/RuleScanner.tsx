import React, { useEffect, useRef, useState } from 'react';
import Camera, { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Alert, Text, StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Container } from './ui/Container';
import { useRoute } from '@react-navigation/native';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';
import TextExtractor from 'expo-text-extractor';
import { MedievalButton } from './ui/MedievalButton';




export default function RuleScanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraReady, setCameraReady] = useState(false);
    const [scannedText, setScannedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [capturedPhotoUri, setCapturedPhotoUri ] = useState<string | null>(null);

    const route = useRoute();
    const { gameId } = route.params as { gameId: string };

    const cameraRef = useRef(null);

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
            const textArray = await TextExtractor.extractTextFromImage(photoUri);

            if (Array.isArray(textArray) && textArray.length > 0) {
                const allText = textArray.join('\n').trim();
                setScannedText(allText)
                console.log('OCR Result:', allText);

                
            } else {
                Alert.alert('No text detected', 'Try capturing a clearer image.');
            }
        } catch (error) {
            console.error('OCR Error:', error);
            Alert.alert('OCR Failed', 'Could not read text.');
        } finally {
            setIsProcessing(false);
        }
    };

    const takeAndScanPhoto = async () => {
        if (!cameraRef.current || isProcessing) return;

        try {
            const photo = await (cameraRef.current as any).takePictureAsync({
                base64: true,
                quality: 1,
                skipProcessing: true,
            });

            if (!photo.uri) return;

            setCapturedPhotoUri(photo.uri);
            await new Promise(resolve => setTimeout(resolve, 500));
            await processImageWithOCR(photo.uri);

        } catch (err) {
            console.log('Photo capture failed:', err);
            Alert.alert('Camera Error', 'Could not take photo.');
        }
    };

    

    

    if (permission === null) {
        return <Text className='font-medieval text-ink'>Requesting camera permission</Text>;
    }

    if (!permission.granted) {
        return (
            <Container>
                <Text
                    className='font-medieval text-ink text-center'
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

            <View className="px-6 mb-6">
                <MedievalButton
                    onPress={takeAndScanPhoto}
                    disabled={!cameraReady || isProcessing}
                    label={isProcessing ? 'Scanning...' : 'Scan Page'}
                    loading={isProcessing}
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({});
