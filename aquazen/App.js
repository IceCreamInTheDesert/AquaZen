import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Stopwatch from './Stopwatch.js';
import Timer from './Timer.js';
import Homepage from './HomePage.js';


const Tab = createBottomTabNavigator();

export default function App() {

  return (

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ size }) => {
              let iconName;
              
              if (route.name === 'Home') {
                iconName = '🏠';
              } else if (route.name === 'Stopwatch') {
                iconName = '⏱️';
              } else if (route.name === 'Timer') {
                iconName = '⏲️';
              } 

              return (
                <Text style={{ fontSize: size, color: '#000000' }}>{iconName}</Text>
              );
            },
            tabBarStyle: {
              backgroundColor: 'cornflowerblue',
            },
          })}
          tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: 'grey',
          }}
        >

          <Tab.Screen name="Home" component={Homepage} />
          <Tab.Screen name="Stopwatch" component={Stopwatch} />
          <Tab.Screen name="Timer" component={Timer} />

        </Tab.Navigator>
      </NavigationContainer>
  );
}