import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function Stopwatch() {

  const [grammar, setGrammar] = useState('seconds');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
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
    let interval = 0;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      
      if (seconds != 1){
        setGrammar('seconds');
      } else {
        setGrammar('second');
      }
      
    } else if (isActive && seconds != 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = async () => {
    if (isActive) {
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
    setIsActive(!isActive);
  };
  
  const resetTimer = async () => {
    try {
      await soundObject.current.stopAsync();
    } catch (error) {
      console.log(error);
    }
    setSeconds(0);
    setIsActive(!isActive);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{seconds} {grammar} relaxed so far.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={toggleTimer}
          style={[styles.button, isActive ? styles.buttonStop : styles.buttonStart]}
        >
      <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
