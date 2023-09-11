import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import Login from '../screens/Login';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import Profile from '../screens/Profile';
import {DrawerStack} from './DrawerStack';
import {useSelector} from 'react-redux';

// stack
const Stack = createNativeStackNavigator();

const MainStack = () => {
  // state user
  const user = useSelector(state => state.user.user);

  return (
    <Stack.Navigator
      initialRouteName={
        Object.keys(user).length > 0 ? 'DrawerStack' : 'AuthStack'
      }>
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
