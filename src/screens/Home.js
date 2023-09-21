import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Banner from '../components/Banner';
import {images} from '../images';
import color from '../constants/color';
import Card from '../components/Card';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../constants/baseurl';
import {useSelector} from 'react-redux';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const Home = () => {
  // states
  const [refreshing, setRefreshing] = React.useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setloading] = useState(false);
  const [allSaved, setallSaved] = useState([]);
  const user = useSelector(state => state.user.user);
  const [selCategory, setSelCategory] = useState('ALL');

  // config
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  // navigation
  const navigation = useNavigation();

  const imgData = [
    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1601132359864-c974e79890ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',

    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1601132359864-c974e79890ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
  ];

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

  // get all blogs
  const getAllBlogs = () => {
    axios
      .get(`${BASE_URL}/blog/all/blogs`)
      .then(res => {
        const fillArr = res.data.data.map(item => {
          return {
            ...item,
            isSaved:
              allSaved?.length > 0
                ? allSaved.some(x => x?._id == item._id)
                : false,
          };
        });
        setAllBlogs(fillArr);

        setTotalPages(res?.data?.totalPages);
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
    const focusListener = navigation.addListener('focus', () => {
      getAllSaved();
      getAllCategories();
      getAllBlogs();
    });
    return focusListener;
  }, []);

  const onRefresh = React.useCallback(() => {
    if (selCategory == 'ALL') {
      setRefreshing(true);
      getAllBlogs();
      getAllCategories();
      setPageNumber(2);
      setPageNumber(1);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }
  }, []);

  // get Pagenation data
  const getData = () => {
    setloading(true);
    axios
      .get(`${BASE_URL}/blog/all/blogs?page=${pageNumber}`)
      .then(res => {
        setPageNumber(pageNumber + 1);
        const fillArr = res.data.data.map(item => {
          return {
            ...item,
            isSaved:
              allSaved?.length > 0
                ? allSaved.some(x => x?._id == item._id)
                : false,
          };
        });
        setAllBlogs([...allBlogs, ...fillArr]);
      })
      .catch(err => {
        console.log('error ==>', err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  // flatlist footer
  const renderFooter = () => {
    if (totalPages < pageNumber || selCategory != 'ALL') {
      return <View className="mb-20" />;
    } else {
      return (
        <View
          style={{marginBottom: heightPercentageToDP(10)}}
          className="px-4 mb-20 mt-3 ">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={getData}
            style={{backgroundColor: color.colorPrimary}}
            className=" w-full flex flex-row rounded-md justify-center items-center py-2">
            <Text className="text-white text-md font-semibold">Load More</Text>
            {loading ? (
              <ActivityIndicator color="white" style={{marginLeft: 8}} />
            ) : null}
          </TouchableOpacity>
        </View>
      );
    }
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
        let tempData = [...allBlogs];
        if (tempData[index].isSaved == false) {
          tempData[index].isSaved = true;
        } else {
          tempData[index].isSaved = false;
        }
        setAllBlogs(tempData);
      });
  };

  // handle All category
  const headerAllCategory = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelCategory('ALL');
          getAllBlogs();
        }}
        activeOpacity={0.7}
        className={` ${
          selCategory == 'ALL' ? 'opacity-100' : 'opacity-70'
        }  px-3 py-1 rounded-full text-xs mr-2`}
        style={{backgroundColor: color.colorPrimary}}>
        <Text className="text-white  uppercase">all</Text>
      </TouchableOpacity>
    );
  };

  // handle category select
  const _handleCatSelect = (name, id) => {
    setSelCategory(name);
    axios
      .get(`${BASE_URL}/blog/search/blog/category/${id}`)
      .then(res => {
        const newArr = res?.data?.blog?.map(item => {
          return {
            ...item,
            isSaved:
              allSaved?.length > 0
                ? allSaved.some(x => x?._id == item._id)
                : false,
          };
        });
        setAllBlogs(newArr);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ScrollView
      className="flex-1 "
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View className="flex flex-row px-4 justify-between mt-3 mb-3">
        <Text className="font-bold text-lg flex-1  text-black">Home</Text>
      </View>
      <Banner data={imgData} />

      <View className="mt-5 flex flex-row items-center gap-x-2 px-4">
        <FlatList
          ListHeaderComponent={headerAllCategory}
          data={allCategories}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => _handleCatSelect(item.name, item._id)}
                className={` px-2 py-1 rounded-full text-xs mr-2 ${
                  item.name == selCategory ? 'opacity-100' : 'opacity-70'
                } `}
                style={{backgroundColor: color.colorPrimary}}>
                <Text className="text-white capitalize">{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View className="mt-3">
        <FlatList
          initialNumToRender={5}
          data={allBlogs}
          ListFooterComponent={renderFooter}
          renderItem={({item, index}) => {
            return (
              <Card
                categories={item.categories}
                title={item.title}
                time={item.createdAt?.slice(0, 10)}
                src={item.featureImg}
                onPress={() => navigation.navigate('BlogDetails', {data: item})}
                saved={item.isSaved}
                savedOnPress={() => _handleSaved(item._id, index)}
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
