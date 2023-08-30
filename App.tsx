import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CountdownDisplay } from './Components/CountdownDisplay';
import { TimerButton } from './Components/Timerbutton';
import { Audio } from 'react-native';


// Timers Settings: //
const focusTimeMinutes = 25 * 60 * 1000; // Modify focus time duration (in milliseconds)
const breakTimeMinutes = 5 * 60 * 1000;  // Adjust break time duration (in milliseconds)
 

export default function App() {

  // States: //
  const [timerCount, setTimerCount] = useState<number>(focusTimeMinutes);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const [mode, setMode] = useState<"Focus Time" | "Break Time">("Focus Time");
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  function startTimer() {
    setTimerRunning(true);
    const id = setInterval(() => setTimerCount(prev => prev - 1000), 1000);
    timerInterval.current = id;
  }

  function stopTimer() {
    if (timerInterval.current !== null) {
      clearInterval(timerInterval.current);
    }
    setTimerRunning(false);
  }

  const handleModeSwitch = () => {
    stopTimer(); 

    if (mode === "Focus Time") {
      setMode("Break Time");
      setTimerCount(breakTimeMinutes);
    } else {
      setMode("Focus Time");
      setTimerCount(focusTimeMinutes);
    }
  };

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

  // Rendering: //
  return (
    <View style={mode === "Focus Time" ? styles.focusMode : styles.relaxMode } >
      <Text style={styles.title} >POMODORO TIMER</Text>
      <StatusBar style="auto" />
      <TimerButton timerRunning={timerRunning} startTimer={startTimer} stopTimer={stopTimer} />
      <Text style={styles.modeStyle} >{mode}:</Text>
      <CountdownDisplay timerDate={new Date(timerCount)} />
      <View style={styles.switchButtonContainer}>
        <TouchableOpacity onPress={handleModeSwitch} style={mode === "Focus Time" ? styles.switchBtnFocus : styles.switchBtnRelax} >
          <Text>Switch Mode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles: //
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
    marginBottom: 20,
  },
  switchButtonContainer: {
    marginBottom: -30,
  },
  switchBtnRelax: {
    backgroundColor: '#167D7F',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: "black",
  },
  switchBtnFocus: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: "black",
  },
});
