import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Banner from '../components/Banner';
import {images} from '../images';
import color from '../constants/color';
import Card from '../components/Card';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../constants/baseurl';
import {timeAgo} from '../constants/timeago';
import {useSelector} from 'react-redux';

const Home = () => {
  // states
  const [refreshing, setRefreshing] = React.useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const state = useSelector(state => state);
  console.log('state ==>', state);

  // navigation
  const navigation = useNavigation();

  const imgData = [
    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1601132359864-c974e79890ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',

    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1601132359864-c974e79890ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
  ];

  const category = ['For You', 'Education', 'Technology', 'Entertainment'];

  const BlogsList = [
    {
      category: 'Education',
      title:
        'Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
      time: '1 min ago',
    },
    {
      category: 'Technology',
      title:
        'Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
      time: '10 min ago',
    },
    {
      category: 'Entertainment',
      title:
        'Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
      time: '22 min ago',
    },
  ];

  // get all blogs
  const getAllBlogs = () => {
    axios
      .get(`${BASE_URL}/blog/all/blogs`)
      .then(res => {
        setAllBlogs(res?.data?.allBlog);
      })
      .catch(err => {
        console.log('error ==>', err);
      });
  };

  // get all Categories
  const getAllCategories = () => {
    axios
      .get(`${BASE_URL}/blog/all/category`)
      .then(res => {
        setAllCategories(res?.data?.allCategory);
      })
      .catch(err => {
        console.log('error ==>', err);
      });
  };

  useEffect(() => {
    getAllBlogs();
    getAllCategories();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllBlogs();
    getAllCategories();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      className="flex-1 "
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View className="flex flex-row px-4 justify-between mt-3 mb-3">
        <Text className="font-bold text-lg">Home</Text>
        <Image source={images.BellLogo} className="w-5 h-5" />
      </View>
      <Banner data={imgData} />

      <View className="mt-5 flex flex-row items-center gap-x-2 px-4">
        <Image source={images.AddLogo} className="w-5 h-5" />
        <FlatList
          data={allCategories}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View
                className=" px-2 py-1 rounded-full text-xs mr-2"
                style={{backgroundColor: color.colorPrimary}}>
                <Text className="text-white capitalize">{item.name}</Text>
              </View>
            );
          }}
        />
      </View>

      <View className="mt-3">
        <FlatList
          data={allBlogs}
          ListFooterComponent={() => <View className="mb-14" />}
          renderItem={({item}) => {
            const timeAgoBlog = timeAgo(item.createdAt);
            console.log('item ==>', item);
            return (
              <Card
                category={'Tech'}
                title={item.title}
                time={timeAgoBlog}
                src={item.featureImg}
                onPress={() => navigation.navigate('BlogDetails', {item})}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
