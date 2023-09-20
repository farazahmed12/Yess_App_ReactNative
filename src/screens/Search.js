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
import React, {useState, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

const Search = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [allBlogs, setAllBlogs] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allSaved, setallSaved] = useState([]);
  const user = useSelector(state => state.user.user);

  // config
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

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

  // get all saved
  const getAllSaved = () => {
    axios
      .get(`${BASE_URL}/user/saved/blogs`, config)
      .then(res => {
        setallSaved(res.data);
      })
      .catch(error => {
        console.log('error');
      });
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      getAllCategories();
      getAllSaved();
    });
    return focusListener;
  }, []);

  const _hanldeSearchSubmit = () => {
    axios
      .get(`${BASE_URL}/blog/search/blog/${query}`)
      .then(res => {
        console.log('res ==>', res);
        const fillArr = res?.data?.blog.map(item => {
          return {
            ...item,
            isSaved:
              allSaved?.length > 0
                ? allSaved.some(x => x?._id == item._id)
                : false,
          };
        });
        setAllBlogs(fillArr);
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

  // handle saved
  const _handleSaved = (id, index) => {
    let tempData = [...allBlogs];
    if (tempData[index].isSaved) {
      tempData[index].isSaved = false;
    } else {
      tempData[index].isSaved = true;
    }
    setAllBlogs(tempData);

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
        setAllBlogs(tempData);
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
          paddingTailwind="w-10/12 "
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
            Explore by Categories
          </Text>
        </View>
        <FlatList
          data={allCategories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('CategoryWise', {data: item._id})
                }
                className="rounded-2xl overflow-hidden mt-3 mr-5"
                style={{
                  height: heightPercentageToDP(30),
                  width: widthPercentageToDP(35),
                }}>
                <ImageBackground
                  source={{uri: item.img}}
                  className="h-full w-full flex flex-col justify-end items-start rounded-2xl">
                  <LinearGradient
                    colors={['rgba(4,4,4,0.0)', 'rgba(4,4,4,0.90)']}
                    className="absolute bottom-0  justify-end w-full">
                    <View className="p-4">
                      <Text className="text-white font-bold text-lg">
                        {item.name}
                      </Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
        />

        <FlatList
          className="mt-3"
          data={allBlogs}
          ListFooterComponent={() => <View className="mb-20" />}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Card
                category={'Tech'}
                title={item.title}
                time={item.createdAt?.slice(0, 10)}
                src={item.featureImg}
                className="mx-4 my-2 w-full"
                onPress={() => navigation.navigate('BlogDetails', {data: item})}
                saved={item.isSaved}
                savedOnPress={() => _handleSaved(item._id, index)}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
