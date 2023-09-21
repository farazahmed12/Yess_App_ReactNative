import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {images} from '../images';
import color from '../constants/color';
import FastImage from 'react-native-fast-image';

const SmallCardWithIcon = ({
  title,
  category,
  time,
  isIcon = false,
  iconSrc = '',
  imgSrc = images.HomeLogo,
}) => {
  return (
    <View className="shadow-md flex flex-row  rounded-lg  my-2 bg-gray-100">
      <View className="w-3/12">
        <Image
          source={typeof imgSrc === 'string' ? {uri: imgSrc} : imgSrc}
          className={`w-24 h-24 m-3 object-cover rounded-lg bg-[${color.colorPrimary}]`}
        />
      </View>
      <View className="flex flex-col justify-start mt-4 w-9/12">
        <View className="flex flex-row justify-between  self-center gap-x-1 w-9/12">
          <Text className="font-bold text-md text-black flex w-full ">
            {title}
          </Text>
          {isIcon && <FastImage className=" h-5 w-5 mt-1" source={iconSrc} />}
        </View>
        <View className="flex flex-row mt-2 gap-x-3 w-12/12 ml-6">
          <Text
            className={`font-bold text-xs`}
            style={{color: color.colorPrimary}}>
            {category}
          </Text>
          <Text className="text-gray-500 text-xs font-semibold">{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default SmallCardWithIcon;

const styles = StyleSheet.create({});
