import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const ImageCard = ({src}) => {
  return (
    <FastImage
      source={{uri: src}}
      className="w-full h-32 my-4 rounded-lg self-end "
    />
  );
};

export default ImageCard;

const styles = StyleSheet.create({});
