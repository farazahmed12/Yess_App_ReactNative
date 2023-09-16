import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {BASE_URL} from '../constants/baseurl';
import Toast from 'react-native-toast-message';

import Card from '../components/Card';
import InputField from '../components/Input';
import {images} from '../images';
import color from '../constants/color';
import {timeAgo} from '../constants/timeago';
import {useNavigation} from '@react-navigation/native';

const Search = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [allBlogs, setAllBlogs] = useState([]);

  // navigation
  const navigation = useNavigation();

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

  const _hanldeSearchSubmit = () => {
    axios
      .get(`${BASE_URL}/blog/search/blog/${query}`)
      .then(res => {
        console.log('res=====>', res.data);
        setAllBlogs(res?.data?.blog);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error While Searching For Blog ',
          visibilityTime: 1000,
          autoHide,
        });
      });
  };

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
          handleOnChangeTxt={e => setQuery(e)}
          onEndEditing={() => _hanldeSearchSubmit()}
        />

        {true ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => _hanldeSearchSubmit()}>
            <Image source={images.SearchLogo} className="w-5 h-5" />
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size={'small'} color={color.colorPrimary} />
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-black font-bold text-lg mt-2">
            Explore by Topics
          </Text>
        </View>
        <FlatList
          data={topics}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View
                className="rounded-2xl overflow-hidden mt-3 mr-5"
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
        <View className="mt-3">
          <FlatList
            data={allBlogs}
            ListFooterComponent={() => <View className="mb-20" />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              const timeAgoBlog = timeAgo(item.createdAt);

              return (
                <Card
                  category={'Tech'}
                  title={item.title}
                  time={timeAgoBlog}
                  src={item.featureImg}
                  className="mx-0 my-2"
                  onPress={() => navigation.navigate('BlogDetails', {item})}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
