import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../constants/baseurl';
import {useNavigation} from '@react-navigation/native';

import Card from '../components/Card';
import {useSelector} from 'react-redux';
import BackButton from '../components/BackButton';
import {images} from '../images';

const CategoryWise = ({route}) => {
  // data
  const id = route.params.data;

  // states
  const [allBlogs, setallBlogs] = useState([]);
  const [allSaved, setallSaved] = useState([]);
  const user = useSelector(state => state.user.user);

  // navigation
  const navigation = useNavigation();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  // get all saved
  const getAllSaved = () => {
    axios
      .get(`${BASE_URL}/user/saved/blogs`, config)
      .then(res => {
        setallSaved(res?.data);
      })
      .catch(error => {
        console.log('error');
      });
  };

  // get blogs by category
  const getBlogsByCAtegory = () => {
    axios
      .get(`${BASE_URL}/blog/search/blog/category/${id}`)
      .then(res => {
        const fillArr = res?.data?.blog?.map(item => {
          return {
            ...item,
            isSaved:
              allSaved?.length > 0
                ? allSaved.some(x => x?._id == item._id)
                : false,
          };
        });
        setallBlogs(fillArr);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllSaved();
    getBlogsByCAtegory();
  }, [id]);

  // handle saved
  const _handleSaved = (id, index) => {
    let tempData = [...allBlogs];
    if (tempData[index].isSaved) {
      tempData[index].isSaved = false;
    } else {
      tempData[index].isSaved = true;
    }
    setallBlogs(tempData);

    let data = {
      savedBlog: id,
    };

    axios
      .post(`${BASE_URL}/user/saved/blog`, data, config)
      .then(res => {})
      .catch(err => {
        console.log(err);
        let tempData = [...allBlogs];
        if (tempData[index].isSaved == false) {
          tempData[index].isSaved = true;
        } else {
          tempData[index].isSaved = false;
        }
        setallBlogs(tempData);
      });
  };

  return (
    <ScrollView className="flex-1   " showsVerticalScrollIndicator={false}>
      <View className="flex flex-row justify-between mt-3 mb-1 px-4">
        <Text className="font-bold text-lg text-black">Yess App</Text>
      </View>

      {/* Blogs */}
      <View className=" mt-3 flex items-center  ">
        {allBlogs?.length == 0 ? (
          <Text className="text-md text-black">No Blogs Found</Text>
        ) : (
          <View className="w-full ">
            <FlatList
              data={allBlogs}
              ListFooterComponent={() => <View className="mb-14" />}
              renderItem={({item, index}) => {
                return (
                  <Card
                    categories={item.categories}
                    title={item.title}
                    time={item.createdAt?.slice(0, 10)}
                    src={item.featureImg}
                    customClassName=" mx-0 my-3 self-center  w-12/13"
                    onPress={() =>
                      navigation.navigate('BlogDetails', {data: item})
                    }
                    saved={item.isSaved}
                    savedOnPress={() => _handleSaved(item._id, index)}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CategoryWise;

const styles = StyleSheet.create({});
