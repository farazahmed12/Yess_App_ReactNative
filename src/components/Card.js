import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {images} from '../images';
import color from '../constants/color';

const Card = ({category, title, time, onPress, src}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="shadow-md flex flex-row  rounded-lg mx-4 my-2 bg-gray-100">
      <Image
        source={{uri: src}}
        className="w-24 h-28 mr-3 object-cover rounded-l-lg"
      />
      <View className="flex flex-col justify-start mt-2 w-8/12">
        <Text
          className={`font-bold text-xs`}
          style={{color: color.colorPrimary}}>
          {category}
        </Text>
        <Text className="font-bold text-md text-black  flex ">{title}</Text>
        <Text className="text-gray-500 text-xs mt-3 font-semibold">{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({});
