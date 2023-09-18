import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomStack from './BottomStack';
import BlogDetails from '../screens/BlogDetails';
import CategoryWise from '../screens/CategoryWise';
import Search from '../screens/Search';

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

      <Stack.Screen
        name="BlogDetails"
        component={BlogDetails}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CategoryWise"
        component={CategoryWise}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
