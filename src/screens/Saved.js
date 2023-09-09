import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {images} from '../images';
import color from '../constants/color';
import SmallCardWithIcon from '../components/SmallCardWithIcon';

const Saved = () => {
  const category = ['For You', 'Education', 'Technology', 'Entertainment'];

  const data = [
    {
      title: 'Project Tailwind: Here is how Google AI has Reshaped the World',
      category: 'Education',
      time: '1 min ago',
      img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWQlMjBmcm9tJTIwcGxhbmV8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'Project Tailwind: Here is how Google AI has Reshaped the World',
      category: 'Education',
      time: '2 min ago',
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybCUyMHdpdGglMjB2cmJveHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'Project Tailwind: Here is how Google AI has Reshaped the World',
      category: 'Education',
      time: '3 min ago',
      img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvYm90fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'Project Tailwind: Here is how Google AI has Reshaped the World',
      category: 'Education',
      time: '1 min ago',
      img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWQlMjBmcm9tJTIwcGxhbmV8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'Project Tailwind: Here is how Google AI has Reshaped the World',
      category: 'Education',
      time: '2 min ago',
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybCUyMHdpdGglMjB2cmJveHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
    },
    {
      title: 'Project Tailwind: Here is how Google AI has Reshaped the World',
      category: 'Education',
      time: '3 min ago',
      img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvYm90fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
    },
  ];
  return (
    <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
      <View className="flex flex-row justify-between mt-3 mb-1">
        <Text className="font-bold text-lg">Yes App</Text>
        <Image source={images.BellLogo} className="w-5 h-5" />
      </View>

      <View className="mt-5 flex flex-row items-center gap-x-2 ">
        <Image source={images.AddLogo} className="w-5 h-5" />
        <FlatList
          data={category}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View
                className=" px-2 py-1 rounded-full text-xs mr-2"
                style={{backgroundColor: color.colorPrimary}}>
                <Text className="text-white">{item}</Text>
              </View>
            );
          }}
        />
      </View>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <SmallCardWithIcon
              title={item.title}
              category={item.category}
              time={item.time}
              isIcon={true}
              iconSrc={images.AddLogo}
              imgSrc={item.img}
            />
          );
        }}
        ListFooterComponent={() => <View className="mb-14" />}
      />
    </ScrollView>
  );
};

export default Saved;

const styles = StyleSheet.create({});
