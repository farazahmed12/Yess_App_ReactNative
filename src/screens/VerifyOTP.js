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

const VerifyOTP = ({route}) => {
  // email schema
  const tokenSchema = Yup.object().shape({
    token: Yup.number().required('Required'),
    emailToken: Yup.number()
      .oneOf([Yup.ref('token'), null], 'OTP does not match!')
      .required('Required'),
  });

  // navigation
  const navigation = useNavigation();

  // states
  const [loading, setloading] = useState(false);
  const [token, setToken] = useState(route?.params?.data?.token);

  // handle submit
  const _handleSubmit = val => {
    setloading(true);
    navigation.navigate('NewPassword', {data: route?.params?.data?.email});
    setloading(false);
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
                token: token,
                emailToken: '',
              }}
              onSubmit={value => {
                _handleSubmit(value);
              }}
              validationSchema={tokenSchema}>
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
                    <View>
                      <Text className="text-gray-400 text-md font-semibold  mt-2">
                        OTP has been sent to your Email, Please Check your Inbox
                      </Text>
                    </View>
                    {/* token */}
                    <InputField
                      placeholder="Enter Your OTP"
                      value={values.emailToken}
                      handleOnChangeTxt={handleChange('emailToken')}
                      onBlur={() => setFieldTouched('emailToken')}
                      keyboardType={'number-pad'}
                      marginTailwind="my-3"
                      paddingTailwind="px-3"
                    />
                    {errors?.emailToken && touched?.emailToken && (
                      <Text className="text-red-700">{errors?.emailToken}</Text>
                    )}

                    <PillButton
                      loading={loading}
                      name={'Verify'}
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

export default VerifyOTP;

const styles = StyleSheet.create({});
