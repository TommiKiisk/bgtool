import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import React, { useState } from 'react';
import { runOnJS } from 'react-native-reanimated';
import { performOcr } from '@bear-block/vision-camera-ocr';
import { Text } from 'react-native';
import { Container } from './ui/Container';



export default function RuleScanner() {
    const {hasPermission , requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const [scannedText, setScannedText] = useState('');
    const updateText = runOnJS((text: string) => setScannedText(text));
    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        const result = performOcr(frame);
        if (result && result.text) {
            updateText(result.text);
        }
    }, []);


    if (!hasPermission) {
        return <Text onPress={requestPermission}>Grant Camera Permission</Text>;
    }
    if (!device) return <Text>No camera</Text>
    

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
                    <Text>{scannedText}</Text>
                </Container>
            ) : null}
        </Container>

    );
}