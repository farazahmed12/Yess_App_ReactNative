import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HeadingBox = ({data}) => {
  //   console.log('HeadingBox ==>', data);
  return (
    <View className="w-12/12 flex ">
      <Text className="text-black font-bold text-lg ">{data}</Text>
    </View>
  );
};

export default HeadingBox;

const styles = StyleSheet.create({});
