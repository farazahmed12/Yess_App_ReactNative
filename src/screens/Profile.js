import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {images} from '../images';
import color from '../constants/color';
import SmallCardWithIcon from '../components/SmallCardWithIcon';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/userSlice';

const Profile = () => {
  const [tab, setTab] = React.useState('saved');
  const img =
    'https://images.unsplash.com/photo-1556632973-57d167636a3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21pbGxpbmclMjBnaXJsfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60';

  const data = [
    {
      title: 'Project Tailwind: Here is how Google AI has Reshaped the World',
      category: 'Education',
      time: '1 min ago',
    },
    {
      title: 'Project Tailwind: Here is how Google AI has Reshaped the World',
      category: 'Education',
      time: '2 min ago',
    },
    {
      title: 'Project Tailwind: Here is how Google AI has Reshaped the World',
      category: 'Education',
      time: '3 min ago',
    },
  ];

  // navigation
  const navigation = useNavigation();

  // dispatch
  const dispatch = useDispatch();

  // state
  const {user} = useSelector(state => state.user.user);

  const _handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthStack'}],
    });
    dispatch(setUser({}));
  };

  return (
    <View className="flex-1 px-4">
      <View className="flex flex-row justify-between mt-3 mb-1 ">
        <Text className="font-bold text-lg text-black">Profile</Text>
      </View>
      {/* Profile Image */}
      <View className="flex justify-center items-center mt-1">
        <Image
          style={{tintColor: 'rgba(4,4,4,0.50)'}}
          source={images.UserLogo}
          className="w-16 h-16 rounded-full"
        />
      </View>

      <View className="my-2 py-5 px-7 flex flex-row justify-between rounded-md shadow">
        <Text className="text-sm text-black">Name:</Text>
        <Text className="text-sm text-black">{user?.name}</Text>
      </View>

      <View className="my-2 py-5 px-7 flex flex-row justify-between rounded-md shadow">
        <Text className="text-sm text-black">Email:</Text>
        <Text className="text-sm text-black">{user?.email}</Text>
      </View>

      <View className="my-2 py-5 px-7 flex flex-row justify-between rounded-md shadow">
        <Text className="text-sm text-black">Phone Number:</Text>
        <Text className="text-sm text-black">{user?.phone_number}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => _handleLogout()}
        className="my-2 py-5 px-7 flex flex-row justify-center rounded-md shadow bg-red-600">
        <Text className="text-md uppercase flex-1 text-center font-bold text-white">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
