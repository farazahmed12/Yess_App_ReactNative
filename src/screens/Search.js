import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import InputField from '../components/Input';
import {images} from '../images';
import color from '../constants/color';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const Search = () => {
  const topics = [
    {
      title: 'Technology',
      img: 'https://images.unsplash.com/photo-1525540810550-5032f5d191b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dnIlMjBoZWFkc2V0fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'Health',
      img: 'https://plus.unsplash.com/premium_photo-1664110691125-e89512988baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHV6emxlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'Technology',
      img: 'https://images.unsplash.com/photo-1525540810550-5032f5d191b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dnIlMjBoZWFkc2V0fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'Health',
      img: 'https://plus.unsplash.com/premium_photo-1664110691125-e89512988baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHV6emxlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
    },
  ];

  return (
    <View className="flex-1 px-4 ">
      <Text className="text-black font-bold text-lg mt-3">Explore</Text>
      {/* Search bar */}
      <View className="flex flex-row items-center justify-around border bg-gray-200 border-gray-400 rounded-lg w-full mt-4">
        <InputField
          placeholder={'Search Here'}
          isBorder={false}
          paddingTailwind="w-10/12 py-2"
          keyboardType={'default'}
        />

        <Image source={images.SearchLogo} className="w-5 h-5" />
      </View>

      <View className="flex flex-row justify-between items-center">
        <Text className="text-black font-bold text-lg mt-5">
          Explore by Topics
        </Text>
        <Text
          className="text-black font-bold text-sm mt-5"
          style={{color: color.colorPrimary}}>
          View all
        </Text>
      </View>
      <FlatList
        data={topics}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View
              className="rounded-2xl overflow-hidden mt-4  mr-5"
              style={{
                height: heightPercentageToDP(30),
                width: widthPercentageToDP(35),
              }}>
              <ImageBackground
                source={{uri: item.img}}
                className="h-full w-full flex flex-col justify-end items-start rounded-2xl">
                <View className="p-4">
                  <Text className="text-white font-bod text-lg">
                    {item.title}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
