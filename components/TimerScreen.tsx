import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TimerPickerModal } from 'react-native-timer-picker';
import { useAudioPlayer } from "expo-audio";
import { useNavigation } from '@react-navigation/native';
import { MedievalButton } from './ui/MedievalButton';
import { Container } from './ui/Container';
import { Title } from './ui/Title';


export default function TimerScreen() {


  const [duration, setDuration] = React.useState(60);
  const [remaining, setRemaining] = React.useState(duration);
  const [isRunning, setIsRunning] = React.useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const audioSource = require("../assets/980363293.mp3");
  const player = useAudioPlayer(audioSource);

  const navigation = useNavigation();

  



  React.useEffect(() => {
    if(!isRunning) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          player.seekTo(0);
          player.play()
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, [isRunning, duration]);


  const nextTurn = async () => {
    if (player.playing) {
      await player.pause();
    }
    setRemaining(duration);
    setIsRunning(false);
  };


  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };


  return (
    <Container>
      <Title>Timekeeper</Title>

      <Text className='text-ink dark:text-gold font-medieval text-[70px] mb-3 text-bold text-center'>{formatTime(remaining)}</Text>
      <View style={{ 
        padding: 1,

       }}>
        <MedievalButton 
          
          label={isRunning ? "Pause" : "Start Turn"} 
          onPress={() => setIsRunning(!isRunning)} 
        />

        <MedievalButton 
          label="Next Turn" 
          onPress={nextTurn} 
        />
      
      <MedievalButton 
        label="Set Time" 
        onPress={() => setShowPicker(true)} 
      />
      </View>

      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        hideHours
        minuteLabel="min"
        secondLabel="sec"

        LinearGradient={LinearGradient}
        onConfirm={(val: { hours: number; minutes: number; seconds: number; }) => {
          const totalSeconds = val.hours * 3600 + val.minutes * 60 + val.seconds;
          setDuration(totalSeconds);
          setRemaining(totalSeconds);
          setShowPicker(false);
        }}

        modalTitle="Set time"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress={true}

        styles={{
          theme:"dark",
          pickerItem: {
              fontSize: 34,
          },
          pickerLabel: {
              fontSize: 26,
              right: -20,
          },
          pickerLabelContainer: {
              width: 60,
          },
          pickerItemContainer: {
              width: 150,
          },
        }}
        
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
      <MedievalButton label="Go back" onPress={() => navigation.goBack()} />
      
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 70,
    marginBottom: 20,
    marginTop: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#728546ff',
  }
});
