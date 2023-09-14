import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {images} from '../images';
import color from '../constants/color';
import SmallCardWithIcon from '../components/SmallCardWithIcon';
import {BASE_URL} from '../constants/baseurl';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {timeAgo} from '../constants/timeago';
import Card from '../components/Card';
import {useNavigation} from '@react-navigation/native';

const Saved = () => {
  // state
  const [allCategories, setAllCategories] = useState([]);
  const [allSaved, setAllSaved] = useState([]);
  const user = useSelector(state => state.user.user);

  // navigation
  const navigation = useNavigation();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
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

  // get all Saved
  const getAllSaved = () => {
    axios
      .get(`${BASE_URL}/user/saved/blogs`, config)
      .then(res => {
        // console.log('res ==>', res.data);
        setAllSaved(res?.data);
      })
      .catch(error => {
        console.log('error =+>', error);
      });
  };

  useEffect(() => {
    getAllCategories();
    getAllSaved();
  }, []);

  return (
    <ScrollView className="flex-1  " showsVerticalScrollIndicator={false}>
      <View className="flex flex-row justify-between mt-3 mb-1 px-4">
        <Text className="font-bold text-lg">Yes App</Text>
        {/* <Image source={images.BellLogo} className="w-5 h-5" /> */}
      </View>

      <View className="mt-5 flex flex-row items-center gap-x-2 px-4 ">
        {/* Category */}
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

      {/* All Saved */}
      <View className=" mt-3 flex items-center  ">
        <FlatList
          data={allSaved}
          ListFooterComponent={() => <View className="mb-14" />}
          renderItem={({item}) => {
            const timeAgoBlog = timeAgo(item.createdAt);
            return (
              <Card
                categories={item.categories}
                title={item.title}
                time={timeAgoBlog}
                src={item.featureImg}
                className=" mx-0 my-3 self-center  w-12/13"
                onPress={() => navigation.navigate('BlogDetails', {item})}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Saved;

const styles = StyleSheet.create({});
