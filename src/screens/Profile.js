import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {images} from '../images';
import color from '../constants/color';
import SmallCardWithIcon from '../components/SmallCardWithIcon';

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

  return (
    <View className="flex-1 px-4 mt-5">
      <View className="flex flex-row justify-end">
        <Image source={images.MenuLogo} className="w-5 h-5" />
      </View>
      {/* Profile Image */}
      <View className="flex justify-center items-center mt-1">
        <Image
          source={{
            uri: img,
          }}
          className="w-28 h-28 rounded-full"
        />
        <Text className="text-md font-semibold  text-black mt-1 ">
          Mellisia Jane
        </Text>

        <Text className="text-sm text-gray-400 mt-1 mb-2">@mellisia_jane</Text>
      </View>
      {/* Tabs View */}
      <View className="flex flex-row self-center w-full justify-between mt-1 rounded-md bg-gray-300">
        <Text
          onPress={() => setTab('saved')}
          className={`px-8 py-2 ${
            tab == 'saved' ? 'text-white' : 'text-black'
          } font-semibold rounded-md`}
          style={{
            backgroundColor: tab == 'saved' ? color.colorPrimary : '#d1d5db',
          }}>
          Saved
        </Text>
        <Text
          onPress={() => setTab('history')}
          className={`px-8 py-2 ${
            tab == 'history' ? 'text-white' : 'text-black'
          } font-semibold rounded-md`}
          style={{
            backgroundColor: tab == 'history' ? color.colorPrimary : '#d1d5db',
          }}>
          History
        </Text>
        <Text
          className={`px-8 py-2 ${
            tab == 'following' ? 'text-white' : 'text-black'
          } font-semibold rounded-md`}
          onPress={() => setTab('following')}
          style={{
            backgroundColor:
              tab == 'following' ? color.colorPrimary : '#d1d5db',
          }}>
          Following
        </Text>
      </View>

      {tab == 'saved' && (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View className="mb-14" />}
          renderItem={({item}) => {
            return (
              <SmallCardWithIcon
                title={item.title}
                category={item.category}
                time={item.time}
                isIcon={true}
                iconSrc={images.DotsLogo}
              />
            );
          }}
        />
      )}

      {tab == 'history' && (
        <FlatList
          data={data.slice(0, 1)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View className="mb-14" />}
          renderItem={({item}) => {
            return (
              <SmallCardWithIcon
                title={item.title}
                category={item.category}
                time={item.time}
              />
            );
          }}
        />
      )}

      {tab == 'following' && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.slice(0, 2)}
          ListFooterComponent={() => <View className="mb-14" />}
          renderItem={({item}) => {
            return (
              <SmallCardWithIcon
                title={item.title}
                category={item.category}
                time={item.time}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
