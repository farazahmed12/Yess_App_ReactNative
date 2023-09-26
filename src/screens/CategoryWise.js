import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../constants/baseurl';
import {useNavigation} from '@react-navigation/native';

import Card from '../components/Card';
import {useDispatch, useSelector} from 'react-redux';
import BackButton from '../components/BackButton';
import {images} from '../images';
import color from '../constants/color';
import {setLoader} from '../redux/globalState';

const CategoryWise = ({route}) => {
  // data
  const data = route.params.data;

  // dispatch
  const dispatch = useDispatch();

  // states
  const [allBlogs, setallBlogs] = useState([]);
  const [allSaved, setallSaved] = useState([]);
  const user = useSelector(state => state.user.user);
  const [loading, setloading] = useState(false);

  // navigation
  const navigation = useNavigation();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  // get all saved
  const getBlogsByCAtegory = () => {
    dispatch(setLoader(true));
    axios
      .get(`${BASE_URL}/user/saved/blogs`, config)
      .then(resb => {
        axios
          .get(`${BASE_URL}/blog/search/blog/category/${data?._id}/?limit=100`)
          .then(res => {
            const fillArr = res?.data?.data?.blog?.map(item => {
              return {
                ...item,
                isSaved:
                  resb?.data?.length > 0
                    ? resb?.data?.some(x => x?._id == item._id)
                    : false,
              };
            });
            setallBlogs(fillArr);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log('error');
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    getBlogsByCAtegory();
  }, [data?._id]);

  // handle saved
  const _handleSaved = (id, index) => {
    let tempData = [...allBlogs];
    tempData[index].isSaved = !tempData[index].isSaved;

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

        tempData[index].isSaved = !tempData[index].isSaved;
        setallBlogs(tempData);
      });
  };

  return (
    <View className="flex-1   ">
      <View className="flex flex-row justify-between mt-3 mb-1 px-4">
        <Text className="font-bold text-lg text-black">
          Category/{data?.name}
        </Text>
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
                    categories={[{name: data?.name}]}
                    title={item.title}
                    time={item.createdAt?.slice(0, 10)}
                    src={item.featureImg}
                    customClassName=" mx-4 my-3 self-center  w-12/13"
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
    </View>
  );
};

export default CategoryWise;

const styles = StyleSheet.create({});
