import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TextBox = ({data}) => {
  //   console.log('Text ==>', data);
  return (
    <View className="w-full my-3">
      <Text className="text-black text-md leading-5 font-[650]">{data}</Text>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({});
