import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Input';
import PillButton from '../components/PillButton';

const Login = () => {
  const navigation = useNavigation();

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
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeStack'}],
      });
    }, 2000);
    // dispatch(setLoader(true));
    // const fcmToken = await AsyncStorage.getItem('fcmToken');
    // let payload = {
    //   email: value.email,
    //   password: value.password,
    //   deviceToken: fcmToken ? fcmToken : '1234567890',
    //   deviceType: Platform.OS,
    // };
    // apiRequest
    //   .post(endPoints.login, payload)
    //   .then(res => {
    //     dispatch(setLoader(false));
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     dispatch(setLoader(false));
    //     Toast.show({
    //       type: 'error',
    //       text1: err.data.message,
    //     });
    //   });
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
            <Text className="text-center items-start font-bold text-black ">{`Login`}</Text>
            <Formik
              initialValues={{
                email: 'abc@gmail.com',
                password: '12345678',
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
                    {/* <Text className="text-left items-start font-normal mt-3 ">
                      Please Enter Your Email Address and Password
                    </Text> */}

                    <InputField
                      placeholder="Email Address"
                      value={values.email}
                      handleOnChangeTxt={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      keyboardType={'email-address'}
                      marginTailwind="my-3"
                      paddingTailwind="px-3"
                    />

                    <InputField
                      placeholder="Password"
                      value={values.password}
                      handleOnChangeTxt={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      keyboardType={'default'}
                      secureTextEntry={true}
                      marginTailwind="my-3 "
                      paddingTailwind="px-3"
                    />

                    <PillButton name={'Login'} marginTailwind="mt-3" />
                    <View className="flex flex-row justify-center gap-x-2 mx-4 mt-4 items-center">
                      <View className="border border-[#ddd] w-6/12 h-0"></View>
                      <Text className="text-center uppercase my-2">or</Text>
                      <View className="border border-[#ddd] w-6/12 h-0"></View>
                    </View>

                    <Pressable onPress={() => navigation.navigate('Register')}>
                      <Text className="text-center underline text-sm mt-5">
                        Create Account
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
