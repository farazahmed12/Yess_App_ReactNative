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
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import PillButton from '../components/PillButton';
import InputField from '../components/Input';
import BackButton from '../components/BackButton';
import {images} from '../images';
import color from '../constants/color';
import {BASE_URL} from '../constants/baseurl';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const ForgetPassword = () => {
  // email schema
  const forgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('This email address is not valid')
      .required('Please enter your email address!')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'This email address is not valid',
      ),
  });

  // navigation
  const navigation = useNavigation();

  // states
  const [loading, setloading] = useState(false);

  // handle submit
  const _handleSubmit = val => {
    setloading(true);
    axios
      .post(`${BASE_URL}/user/forgot-password`, val)
      .then(res => {
        navigation.navigate('VerifyOTP', {
          data: {
            token: res?.data?.token,
            email: val?.email,
          },
        });
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error?.response?.data || 'SomeThing Went Wrong',
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
          justifyContent: 'start',
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <View className="self-center w-[90%] mt-4">
            <Formik
              initialValues={{
                email: '',
              }}
              onSubmit={value => {
                _handleSubmit(value);
              }}
              validationSchema={forgetPasswordSchema}>
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

                    <PillButton
                      loading={loading}
                      name={'Submit'}
                      marginTailwind="mt-3"
                      onPress={handleSubmit}
                    />
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

export default ForgetPassword;

const styles = StyleSheet.create({});
