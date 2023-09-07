import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomStack from './BottomStack';

// stack
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomStack"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="BottomStack"
        component={BottomStack}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="RegisterComplain"
        component={RegisterComplain}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
