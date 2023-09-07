import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/Login';

// stack
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
