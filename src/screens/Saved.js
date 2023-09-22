import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {images} from '../images';
import color from '../constants/color';
import SmallCardWithIcon from '../components/SmallCardWithIcon';
import {BASE_URL} from '../constants/baseurl';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Card from '../components/Card';
import {useNavigation} from '@react-navigation/native';

const Saved = () => {
  // state
  const [allCategories, setAllCategories] = useState([]);
  const [allSaved, setAllSaved] = useState([]);
  const user = useSelector(state => state.user.user);
  const [refreshing, setRefreshing] = React.useState(false);

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
        console.log('res ==>', res.data);
        const fillArr = res?.data?.map(item => {
          return {
            ...item,
            isSaved: true,
          };
        });
        setAllSaved(fillArr?.reverse());
      })
      .catch(error => {
        console.log('error =+>', error);
      });
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      getAllSaved();
      getAllCategories();
    });
    return focusListener;
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllSaved();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // handle saved
  const _handleSaved = (id, index) => {
    let tempData = [...allSaved];
    if (tempData[index].isSaved) {
      tempData[index].isSaved = false;
    } else {
      tempData[index].isSaved = true;
    }
    setAllSaved(tempData);

    let data = {
      savedBlog: id,
    };

    axios
      .post(`${BASE_URL}/user/saved/blog`, data, config)
      .then(res => {})
      .catch(err => {
        console.log(err);
        let tempData = [...allSaved];
        if (tempData[index].isSaved == false) {
          tempData[index].isSaved = true;
        } else {
          tempData[index].isSaved = false;
        }
        setAllSaved(tempData);
      });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="flex-1 "
      showsVerticalScrollIndicator={false}>
      <View className="flex flex-row justify-between mt-3 mb-1 px-4">
        <Text className="font-bold text-lg text-black">Saved</Text>
      </View>

      {/* All Saved */}
      <View className=" mt-3 flex   ">
        {allSaved?.length == 0 ? (
          <Text className="text-md text-black ml-5">No Saved Blogs</Text>
        ) : (
          <FlatList
            data={allSaved}
            ListFooterComponent={() => <View className="mb-14" />}
            renderItem={({item, index}) => {
              return (
                <Card
                  categories={item.categories}
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
        )}
      </View>
    </ScrollView>
  );
};

export default Saved;

const styles = StyleSheet.create({});
