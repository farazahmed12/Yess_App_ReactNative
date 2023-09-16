import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {images} from '../images';
import color from '../constants/color';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Card = ({
  categories,
  title,
  time,
  onPress,
  src,
  className = 'mx-4 my-2',
  saved = false,
  savedOnPress,
}) => {
  // navigation
  const navigation = useNavigation();

  return (
    // <View></View>
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`shadow-md flex flex-row  rounded-lg bg-gray-100 ${className}`}>
      <Image
        source={{uri: src}}
        className="w-24 h-28 mr-3 object-cover rounded-l-lg"
      />
      <View className="flex flex-col justify-start mt-2 w-8/12">
        <FlatList
          data={categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <Text
                className={`font-bold text-xs underline`}
                style={{color: color.colorPrimary}}>
                {item.name}
              </Text>
            );
          }}
        />

        <Text className="font-bold text-md text-black  flex ">{title}</Text>
        <View className="flex flex-row justify-between my-2 mr-2 items-center">
          <Text className="text-gray-500 text-xs  font-semibold">{time}</Text>
          {saved == true ? (
            <TouchableOpacity className="px-4 pt-2 " onPress={savedOnPress}>
              <Image source={images.HeartFill} className="w-4 h-4 " />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={savedOnPress}
              activeOpacity={0.7}
              className="px-4 pt-2 ">
              <Image source={images.HeartEmpty} className="w-4 h-4 " />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({});
