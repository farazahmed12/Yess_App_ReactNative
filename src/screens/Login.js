import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Input';
import PillButton from '../components/PillButton';
import {images} from '../images';
import axios from 'axios';
import {BASE_URL} from '../constants/baseurl';
import {setUser} from '../redux/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const state = useSelector(state => state.userSlice);
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('This email address is not valid')
      .required('Please enter your email address!')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'This email address is not valid',
      ),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be 6 character long'),
  });

  const signIn = async value => {
    setloading(true);
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    axios
      .post(`${BASE_URL}/user/login/user`, value)
      .then(res => {
        console.log('res ==>', res?.data?.user?.devicetoken);
        dispatch(setUser(res.data));
        if (res?.data?.user?.devicetoken != fcmToken) {
          axios
            .put(`${BASE_URL}/user/update/${res?.data?.user?._id}`, {
              devicetoken: fcmToken,
            })
            .then(res => {
              console.log('res ===>', res);
            })
            .catch(error => {
              console.log(error);
            });
        }

        Toast.show({
          type: 'success',
          text1: 'Login Successfully',
          onHide: () => navigation.navigate('DrawerStack'),
        });
      })
      .catch(error => {
        // console.log('error ==>', error);
        Toast.show({
          type: 'error',
          text1: 'Error While Logging In',
          autoHide: true,
          visibilityTime: 1000,
        });
      })
      .finally(() => {
        setloading(false);
      });
  };

  return (
    <View className="flex-1 ">
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <View className="self-center w-[90%]">
            <Image source={images.logo} className="w-40 h-40 self-center" />

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={value => {
                signIn(value);
              }}
              validationSchema={SignInSchema}>
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldTouched,
                isValid,
                handleSubmit,
              }) => {
                return (
                  <View className="w-full">
                    {/* email */}
                    <InputField
                      placeholder="Email Address"
                      value={values.email}
                      handleOnChangeTxt={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      keyboardType={'email-address'}
                      marginTailwind="my-3"
                      paddingTailwind="px-3"
                    />
                    {errors?.email && touched?.email && (
                      <Text className="text-red-700">{errors?.email}</Text>
                    )}
                    {/* password */}
                    <InputField
                      placeholder="Password"
                      value={values.password}
                      handleOnChangeTxt={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      keyboardType={'default'}
                      secureTextEntry={true}
                      marginTailwind="my-3 "
                      paddingTailwind="px-3"
                      isImage={true}
                      onImagePress={() => setshowPassword(!showPassword)}
                      showPassword={showPassword}
                    />
                    {errors?.password && touched?.password && (
                      <Text className="text-red-700">{errors?.password}</Text>
                    )}

                    <PillButton
                      loading={loading}
                      name={'Login'}
                      marginTailwind="mt-3"
                      onPress={handleSubmit}
                    />
                    <View className="flex flex-row justify-center gap-x-2 mx-4 mt-4 items-center">
                      <View className="border border-[#ddd] w-6/12 h-0"></View>
                      <Text className="text-center uppercase my-2">or</Text>
                      <View className="border border-[#ddd] w-6/12 h-0"></View>
                    </View>

                    <Pressable onPress={() => navigation.navigate('Register')}>
                      <Text className="text-center underline text-sm mt-5">
                        Create An Account
                      </Text>
                    </Pressable>
                  </View>
                );
              }}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    // fontSize: fontsSize.xl2,
    // fontFamily: fontsFamily.bold,
    // color: colors.textDark,
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  titleStyle: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    // fontSize: fontsSize.md1,
    // fontFamily: fontsFamily.regular,
    // color: colors.textDark,
    marginTop: heightPercentageToDP(2),
  },
  text2: {
    textAlign: 'center',
    alignSelf: 'center',
    // fontSize: fontsSize.md1,
    // fontFamily: fontsFamily.regular,
    marginTop: heightPercentageToDP(2),
    // color: colors.secondary,
    textDecorationLine: 'underline',
  },
});
