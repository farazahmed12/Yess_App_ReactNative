import React from 'react';
import {Text, Image, View, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {images} from '../images';

import Home from '../screens/Home';

const {width, height} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const BottomStack = () => {
  // Tab issue
  const BottomTabComponent =
    (name, image) =>
    ({focused}) => {
      return (
        <View
          style={{width: width * 0.25}}
          className={`items-center ${
            focused ? 'border-b-2 border-black' : ''
          }`}>
          <Image className="w-6 h-6" resizeMode="contain" source={image} />
          <Text className={`${focused ? 'font-bold ' : ''} text-xs uppercase`}>
            {name}
          </Text>
        </View>
      );
    };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: height * 0.09,
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: BottomTabComponent('Home', images.HomeLogo),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomStack;
