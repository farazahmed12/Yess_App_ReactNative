import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

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
} from 'react-native';
import React, {useState} from 'react';
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

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const state = useSelector(state => state.userSlice);
  console.log('state ==>', state);

  const [loading, setloading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    user_name: Yup.string()
      .required('User Name is required')
      .min(3)
      .label('User Name'),
    name: Yup.string().required('Name is required').min(3).label('Name'),
    phone_number: Yup.number('Phone Number is required')
      .min(11)
      .label('Phone Number'),
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

  let fcmToken = '';
  const getFCMToken = async () => {
    fcmToken = await AsyncStorage.getItem('fcmToken');
  };
  getFCMToken();

  const signIn = async value => {
    setloading(true);
    axios
      .post(`${BASE_URL}/user/create/user`, value)
      .then(res => {
        axios
          .post(`${BASE_URL}/user/login/user`, {
            email: value.email,
            password: value.password,
          })
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
              text1: 'User Registered Successfully',
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
          });
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error while Registering User',
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
            <Image source={images.logo} className="w-28 h-28 self-center" />

            <Formik
              initialValues={{
                user_name: '',
                email: '',
                name: '',
                password: '',
                phone_number: '',
                devicetoken: fcmToken,
              }}
              onSubmit={value => {
                signIn(value);
              }}
              validationSchema={RegisterSchema}>
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
                    {/* name */}
                    <InputField
                      placeholder="Name"
                      value={values.name}
                      handleOnChangeTxt={handleChange('name')}
                      onBlur={() => setFieldTouched('name')}
                      keyboardType={'default'}
                      marginTailwind="my-1"
                      paddingTailwind="px-3"
                    />
                    {errors?.name && touched?.name && (
                      <Text className="text-red-700">{errors?.name}</Text>
                    )}
                    {/* username */}
                    <InputField
                      placeholder="User Name"
                      value={values.user_name}
                      handleOnChangeTxt={handleChange('user_name')}
                      onBlur={() => setFieldTouched('user_name')}
                      keyboardType={'default'}
                      marginTailwind="my-1"
                      paddingTailwind="px-3"
                    />
                    {errors?.user_name && touched?.user_name && (
                      <Text className="text-red-700">{errors?.user_name}</Text>
                    )}

                    {/* Email */}
                    <InputField
                      placeholder="Email Address"
                      value={values.email}
                      handleOnChangeTxt={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      keyboardType={'email-address'}
                      marginTailwind="my-1"
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
                      marginTailwind="my-1"
                      paddingTailwind="px-3"
                      secureTextEntry={true}
                      isImage={true}
                      onImagePress={() => setshowPassword(!showPassword)}
                      showPassword={showPassword}
                    />
                    {errors?.password && touched?.password && (
                      <Text className="text-red-700">{errors?.password}</Text>
                    )}

                    {/* phone number */}
                    <InputField
                      placeholder="Phone Number"
                      value={values.phone_number}
                      handleOnChangeTxt={handleChange('phone_number')}
                      onBlur={() => setFieldTouched('phone_number')}
                      keyboardType={'default'}
                      marginTailwind="my-3"
                      paddingTailwind="px-3"
                    />
                    {errors?.phone_number && touched?.phone_number && (
                      <Text className="text-red-700">
                        {errors?.phone_number}
                      </Text>
                    )}

                    <PillButton
                      loading={loading}
                      name={'Register'}
                      marginTailwind="mt-3"
                      onPress={handleSubmit}
                    />
                  </View>
                );
              }}
            </Formik>

            <View className="flex flex-row justify-center gap-x-2 mx-4 mt-4 items-center">
              <View className="border border-[#ddd] w-6/12 h-0"></View>
              <Text className="text-center uppercase ">or</Text>
              <View className="border border-[#ddd] w-6/12 h-0"></View>
            </View>

            <Pressable>
              <Text className="text-center text-sm mt-2">
                Already Have An Account?{' '}
                <Text
                  onPress={() => navigation.navigate('Login')}
                  className="text-center underline text-sm mt-2">
                  Log In
                </Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Register;

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
