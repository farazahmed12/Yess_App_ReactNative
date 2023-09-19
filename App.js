/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

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
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from './src/redux/store';
import persistStore from 'redux-persist/es/persistStore';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Loader from './src/components/Loader';
import {
  notificationListner,
  requestUserNotificationPermission,
} from './src/utils/notificationHelper';
import {setNavigator} from './src/utils/navigationHepler';

let persistor = persistStore(store);

function App() {
  useEffect(() => {
    requestUserNotificationPermission();
    notificationListner();
  }, []);

  let user = undefined;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer ref={ref => setNavigator(ref)}>
            <SafeAreaView>
              <StatusBar backgroundColor={'black'} />
            </SafeAreaView>
            <MainStack />
            <Toast />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
