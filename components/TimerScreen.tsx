import { Button, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TimerPicker as _TimerPicker} from 'react-native-timer-picker';
import { TimerPickerModal } from 'react-native-timer-picker';
import { Audio } from "expo-av";


const TimerPicker = _TimerPicker as unknown as React.ComponentType<any>;


export default function TimerScreen() {


  const [duration, setDuration] = React.useState(60);
  const [remaining, setRemaining] = React.useState(duration);
  const [isRunning, setIsRunning] = React.useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [sound, setSound] = React.useState<Audio.Sound | null>(null);




  async function playSound() {

    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      require("../assets/980363293.mp3")
    );

    setSound(newSound);
    await newSound.playAsync();
  }



  React.useEffect(() => {
    if(!isRunning) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          playSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  

    return () => clearInterval(interval);
  }, [isRunning, duration]);

  const nextTurn = async () => {
    if (sound) {
      await sound.stopAsync();
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
    <View style={styles.container}>

      <Text style={styles.time}>{formatTime(remaining)}</Text>

      <Button 
        title={isRunning ? "Pause" : "Start Turn"} 
        onPress={() => setIsRunning(!isRunning)} 
      />

      <Button 
        title="Next Turn" 
        onPress={nextTurn} 
      />
      
      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => setShowPicker(true)}>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}>
            <Text
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 18,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,
                  overflow: "hidden",
                  borderColor: "#007c48ff",
                  color: "#05aca3ff"
                  }}>
              {"Set Time"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
    </View>
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
    fontSize: 48,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
