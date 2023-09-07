/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import MainStack from './src/navigation/MainStack';

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <StatusBar backgroundColor={'black'} />
      </SafeAreaView>
      <MainStack />
    </NavigationContainer>
  );
}

export default App;
