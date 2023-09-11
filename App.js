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
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from './src/redux/store';
import persistStore from 'redux-persist/es/persistStore';

let persistor = persistStore(store);

function App() {
  let user = undefined;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <SafeAreaView>
            <StatusBar backgroundColor={'black'} />
          </SafeAreaView>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
