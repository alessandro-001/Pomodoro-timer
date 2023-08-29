import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CountdownDisplay } from './Components/CountdownDisplay';
import { TimerButton } from './Components/Timerbutton';

import { Picker } from '@react-native-picker/picker';



const focusTimeMinutes = 0.2 * 60 * 1000;
const breakTimeMinutes = 0.1 * 60 * 1000; 

export default function App() {

  const [timerCount, setTimerCount] = useState<number>(focusTimeMinutes);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const [mode, setMode] = useState<"Focus Time" | "Break Time">("Focus Time");
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  function startTimer() {
    setTimerRunning(true);
    const id = setInterval(() => setTimerCount(prev => prev - 1000), 1000);
    timerInterval.current = id; // Store the interval ID
  }

  function stopTimer() {
    if (timerInterval.current !== null) {
      clearInterval(timerInterval.current);
    }
    setTimerRunning(false);
  }

  useEffect(() => {
    if (timerCount === 0) {
      if (mode === "Focus Time") {
        setMode("Break Time");
        setTimerCount(breakTimeMinutes);
      } else { 
        setMode("Focus Time");
        setTimerCount(focusTimeMinutes);
      }
      stopTimer();
    }
  }, [timerCount]);

 
  return (
    <View style={mode === "Focus Time" ? styles.focusMode : styles.relaxMode }>
      <Text style={styles.title}>POMODORO TIMER</Text>
      <StatusBar style="auto" />
      <TimerButton timerRunning={timerRunning} startTimer={startTimer} stopTimer={stopTimer} />
      <Text style={styles.modeStyle}>{mode}:</Text>
      <CountdownDisplay timerDate={new Date(timerCount)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusMode:{
    flex: 1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  relaxMode:{
    flex: 1,
    backgroundColor: '#167D7F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title :{
    fontSize: 37,
    fontWeight: "bold",
  },
  modeStyle: {
    fontSize: 27,
    fontWeight: "bold",
  }
});
