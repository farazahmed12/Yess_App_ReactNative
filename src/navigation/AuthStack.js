import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgetPassword from '../screens/ForgetPassword';
import BackButton from '../components/BackButton';
import {TouchableOpacity, Text, Image} from 'react-native';
import {images} from '../images';
import {useNavigation} from '@react-navigation/native';
import VerifyOTP from '../screens/VerifyOTP';
import NewPassword from '../screens/NewPassword';

// stack
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  // navigation
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          headerShown: true,
          title: 'Forget Password',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              style={{backgroundColor: color.colorPrimary}}
              className=" p-2 mr-3 rounded-full">
              <Image
                tintColor={'white'}
                className=" w-4 h-4 "
                source={images.AngleLeft}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="VerifyOTP"
        component={VerifyOTP}
        options={{
          headerShown: true,
          title: 'Verify OTP',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              style={{backgroundColor: color.colorPrimary}}
              className=" p-2 mr-3 rounded-full">
              <Image
                tintColor={'white'}
                className=" w-4 h-4 "
                source={images.AngleLeft}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          headerShown: true,
          title: 'New Password',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              style={{backgroundColor: color.colorPrimary}}
              className=" p-2 mr-3 rounded-full">
              <Image
                tintColor={'white'}
                className=" w-4 h-4 "
                source={images.AngleLeft}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
