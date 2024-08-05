import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Homepage() {
  const [time, setTime] = useState(new Date());
  let theText = 'The current time is '; //because I need that spacebar before the time

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AquaZen.</Text>
      <View style={styles.row}>
        <Text style={styles.clockText}>
          {theText}
        </Text>
        <Text style={styles.clock}>
          {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 150,
    textAlign: 'center',
    margin: 10,
    color: 'cornflowerblue',
    fontWeight: 'bold',
    marginBottom: 25,
  },
  clockText: {
    fontSize: 50,
    color: 'white',
  },
  clock: {
    color: 'cornflowerblue',
    fontWeight: 'bold',
    fontSize: 75,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});