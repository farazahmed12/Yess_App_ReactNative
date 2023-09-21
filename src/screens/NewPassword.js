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

const NewPassword = ({route}) => {
  // New Password schema
  const newPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be 6 character long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password does not match!')
      .required('Confirm Password is Required')
      .min(6, 'Password must be 6 character long'),
  });

  // navigation
  const navigation = useNavigation();

  // states
  const [loading, setloading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

  const email = route.params.data;

  // handle submit
  const _handleSubmit = val => {
    let data = {
      password: val.password,
    };

    setloading(true);
    axios
      .post(`${BASE_URL}/user/reset-password/${email}`, data)
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Password Changed Successfully',
          autoHide: true,
          visibilityTime: 1000,
          onHide: () =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            }),
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
                password: '',
                confirmPassword: '',
              }}
              onSubmit={value => {
                _handleSubmit(value);
              }}
              validationSchema={newPasswordSchema}>
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
                    {/* password */}
                    <InputField
                      placeholder="Enter New Password"
                      value={values.password}
                      handleOnChangeTxt={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      keyboardType={'default'}
                      marginTailwind="my-3"
                      paddingTailwind="px-3"
                      isImage={true}
                      onImagePress={() => setshowPassword(!showPassword)}
                      showPassword={showPassword}
                      secureTextEntry={true}
                      autoCapitalize="none"
                    />
                    {errors?.password && touched?.password && (
                      <Text className="text-red-700">{errors?.password}</Text>
                    )}

                    {/* confirm password */}
                    <InputField
                      placeholder="Confirm New Password"
                      value={values.confirmPassword}
                      handleOnChangeTxt={handleChange('confirmPassword')}
                      onBlur={() => setFieldTouched('confirmPassword')}
                      keyboardType={'default'}
                      marginTailwind="my-3"
                      paddingTailwind="px-3"
                      isImage={true}
                      onImagePress={() => setshowPassword(!showPassword)}
                      showPassword={showPassword}
                      secureTextEntry={true}
                      autoCapitalize="none"
                    />
                    {errors?.confirmPassword && touched?.confirmPassword && (
                      <Text className="text-red-700">
                        {errors?.confirmPassword}
                      </Text>
                    )}

                    <PillButton
                      loading={loading}
                      name={'Reset Password'}
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

export default NewPassword;

const styles = StyleSheet.create({});
