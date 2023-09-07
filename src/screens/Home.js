import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Banner from '../components/Banner';
import {images} from '../images';

const Home = () => {
  const imgData = [
    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1601132359864-c974e79890ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',

    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1601132359864-c974e79890ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3R8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
  ];
  return (
    <ScrollView className="flex-1 px-4 ">
      <View className="flex flex-row justify-between mt-3">
        <Text className="font-bold text-lg">Home</Text>
        <Image source={images.BellLogo} className="w-5 h-5" />
      </View>
      <Banner data={imgData} />

      <View className=""></View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
