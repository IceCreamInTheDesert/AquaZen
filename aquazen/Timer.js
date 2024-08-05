import React, { useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function Timer() {

  const [grammar, setGrammar] = useState('seconds');
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [inputMin, setInputMin] = useState('');
  const [inputSec, setInputSec] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const soundObject = useRef(null);

  useEffect(() => {
    (async () => {
      soundObject.current = new Audio.Sound();
      try {
        await soundObject.current.loadAsync(require('./assets/sound.mp3'));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  

  useEffect(() => {
    let timer;
  
    if ((seconds > 0 || minutes > 0) && isRunning) {
      timer = setTimeout(() => {
        if (seconds > 0) {
          setSeconds(prevSeconds => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        }
        if (seconds === 0 && minutes === 0) {
          setIsOver(true);
        }
        if (isRunning && seconds === 2 ){
          setGrammar('second');
        } else {
          setGrammar('seconds');
        }
      }, 1000);
    }
  
    return () => clearTimeout(timer);


    
  }, [seconds, minutes, isRunning, grammar]);

  const startTimer = async() => {
    if (!inputMin || !inputSec) {
      window.alert('Please enter minutes and/or seconds.');
      return;
    }
    if (isRunning) {
      try {
        await soundObject.current.stopAsync();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await soundObject.current.playAsync();
      } catch (error) {
        console.log(error);
      }
    }
    setIsRunning(!isRunning);
    setSeconds(parseInt(inputSec));
    setMinutes(parseInt(inputMin));
  };

  const resetTimer = async() => {
    try {
      await soundObject.current.stopAsync();
    } catch (error) {
      console.log(error);
    }
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setInputMin('');
    setInputSec('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {isOver ? 'Time is up!' : `${minutes} minutes and ${seconds} ${grammar} left`}
      </Text>
      <TextInput
        style={styles.input}
        value={inputMin}
        onChangeText={setInputMin}
        keyboardType="numeric"
        placeholder="Enter timer duration for minutes."
      />
      <TextInput
        style={styles.input}
        value={inputSec}
        onChangeText={(text) => {
          if (parseInt(text) > 60) {
            window.alert('Seconds should be less than or equal to 60');
          } else {
            setInputSec(text);
          }
        }}
        keyboardType="numeric"
        placeholder="Enter timer duration for seconds."
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={startTimer}
          style={[styles.button, isRunning ? styles.buttonStop : styles.buttonStart]}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  timerText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'cornflowerblue',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonStart: {
    backgroundColor: '#009933',
  },
  buttonStop: {
    backgroundColor: 'cornflowerblue',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});