import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from 'react-native';

import BottomStack from './BottomStack';
import BlogDetails from '../screens/BlogDetails';
import React, {useState} from 'react';
import {images} from '../images';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/userSlice';
import CategoryWise from '../screens/CategoryWise';

const Drawer = createDrawerNavigator();
const {width, height} = Dimensions.get('window');

function CustomDrawerContent(props) {
  const [categories, setCategories] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const drawerItems = ['Home', 'Search', 'Saved', 'Profile'];

  // dispatch
  const dispatch = useDispatch();

  const _handleLogout = () => {
    props.navigation.navigate(`AuthStack`);
    dispatch(setUser({}));
  };

  return (
    <DrawerContentScrollView
      {...props}
      bounces={false}
      scrollEnabled={false}
      contentContainerStyle={{
        backgroundColor: 'transparent',
        height: height,
        paddingTop: 0,
      }}>
      <View className={'flex-1 pt-24  '}>
        <TouchableOpacity
          onPress={() => props.navigation.closeDrawer()}
          activeOpacity={0.7}
          style={{
            position: 'absolute',
            top: height * 0.06,
            right: width * 0.03,
            width: width * 0.08,
            height: width * 0.08,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}>
          <Image
            style={{
              width: width * 0.06,
              height: width * 0.06,
            }}
            source={images.CrossLogo}
          />
        </TouchableOpacity>
        {!isLoader ? (
          <FlatList
            ListFooterComponent={
              <TouchableOpacity
                onPress={() => _handleLogout()}
                activeOpacity={0.7}
                className="mx-4">
                <Text className="font-bold text-md text-red-600 py-3 uppercase">{`log out`}</Text>
              </TouchableOpacity>
            }
            data={drawerItems}
            renderItem={({item, index}) => {
              // console.log('props ==>', props.navigation);
              return (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate(`${item}`)}
                  activeOpacity={0.7}
                  className="mx-4">
                  <Text className="font-bold text-md py-3 border-b-2 capitalize text-black">
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <ActivityIndicator
            className={'self-center mt-24'}
            size={'small'}
            color={'#fff'}
          />
        )}
      </View>
    </DrawerContentScrollView>
  );
}

export const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        // swipeEnabled:false,
        drawerType: 'front',
        headerShown: false,
        labelStyle: {fontSize: width * 0.04},
        activeTintColor: '#0095FF',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: 'transparent',
        width: width * 0.8,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60,
      }}>
      <Drawer.Screen name="BottomStack" component={BottomStack} />
      <Drawer.Screen name="BlogDetails" component={BlogDetails} />
      <Drawer.Screen name="CategoryWise" component={CategoryWise} />
    </Drawer.Navigator>
  );
};
