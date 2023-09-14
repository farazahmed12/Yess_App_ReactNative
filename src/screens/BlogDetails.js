import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {images} from '../images';
import color from '../constants/color';
import TextBox from '../components/TextBox';
import ImageCard from '../components/ImageCard';
import HeadingBox from '../components/HeadingBox';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {timeAgo} from '../constants/timeago';

const BlogDetails = ({route}) => {
  // navigation
  const navigation = useNavigation();

  // data
  const data = route.params.item || [];

  return (
    <ScrollView className="px-4 flex-1 mt-2">
      <ImageBackground
        source={{
          uri: data.featureImg,
        }}
        className="w-full h-44 rounded-2xl overflow-hidden ">
        <View className="flex flex-row justify-between">
          <TouchableOpacity
            activeOpacity={0.7}
            style={{backgroundColor: color.colorPrimary}}
            className="p-2 m-2 rounded-full "
            onPress={() => navigation.goBack()}>
            <Image
              source={images.AngleLeft}
              className="w-4 h-4  "
              style={{
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View className="flex ">
        <Text className="text-black font-serif text-lg font-bold mt-4 leading-5">
          {data.title}
        </Text>
        <View className="flex flex-row items-center my-4 gap-x-3">
          <Text
            style={{borderColor: color.colorPrimary, color: color.colorPrimary}}
            className={`border-2 px-4  rounded-3xl text-sm`}>
            {data?.categories}
          </Text>
          <Text style={{color: color.colorPrimary}} className={`text-sm `}>
            {timeAgo(data.createdAt)}
          </Text>
        </View>
        <FlatList
          data={data?.data}
          renderItem={({item}) => {
            if (item.ctype == 'image') {
              console.log('img');
              return <ImageCard key={item._id} src={item.content} />;
            } else if (item.ctype == 'heading') {
              return <HeadingBox key={item._id} data={item.content} />;
            } else if (item.ctype == 'text') {
              return <TextBox key={item._id} data={item.content} />;
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default BlogDetails;

const styles = StyleSheet.create({});
