import React from 'react';
import {Text, Image, View, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {images} from '../images';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import color from '../constants/color';
import Saved from '../screens/Saved';

const {width, height} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const BottomStack = () => {
  // Tab issue
  const BottomTabComponent =
    (name, image) =>
    ({focused}) => {
      return (
        <View
          style={{
            width: width * 0.25,
            borderColor: color.colorPrimary,
          }}
          className={`items-center ${focused ? `border-b-2 ` : ''}`}>
          <Image
            style={{tintColor: focused ? color.colorPrimary : 'black'}}
            className="w-6 h-6"
            resizeMode="contain"
            source={image}
          />
          <Text
            style={{color: focused ? color.colorPrimary : 'black'}}
            className={`${focused ? `font-bold ` : ''} text-xs uppercase`}>
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
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: BottomTabComponent('Search', images.SearchLogo),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: BottomTabComponent('Saved', images.StarLogo),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: BottomTabComponent('Profile', images.UserLogo),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomStack;
