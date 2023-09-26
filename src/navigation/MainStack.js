import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import Login from '../screens/Login';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import Profile from '../screens/Profile';
import {DrawerStack} from './DrawerStack';
import {useSelector} from 'react-redux';
import Loader from '../components/Loader';

// stack
const Stack = createNativeStackNavigator();

const MainStack = () => {
  // state user
  const user = useSelector(state => state.user.user);
  const isLoader = useSelector(state => state.globalState.isLoader);

  return (
    <Stack.Navigator
      initialRouteName={
        Object.keys(user).length > 0 ? 'HomeStack' : 'AuthStack'
      }>
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
