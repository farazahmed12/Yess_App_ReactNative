import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import color from '../constants/color';

const BackButton = ({onPress, img}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{backgroundColor: color.colorPrimary}}
      className=" p-2 absolute top-0 rounded-full">
      <Image tintColor={'white'} className=" w-4 h-4 " source={img} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
