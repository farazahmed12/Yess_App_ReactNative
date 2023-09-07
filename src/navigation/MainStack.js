import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/Login';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

// stack
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName={false ? 'HomeStack' : 'AuthStack'}>
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
