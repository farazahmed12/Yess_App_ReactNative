import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import color from '../constants/color';
import axios from 'axios';
import {BASE_URL} from '../constants/baseurl';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import FastImage from 'react-native-fast-image';
import AppImageBackground from './AppImageBackground';

const Banner = ({data}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const [trending, settrending] = useState([]);

  // navigation
  const navigation = useNavigation();

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      axios
        .get(`${BASE_URL}/blog/search/blog/category/650a38af428497154edf2a3a`)
        .then(res => {
          settrending(res?.data?.blog?.slice(0, 5));
        })
        .catch(error => {
          console.log(error);
        });
    });
    return focusListener;
  }, []);

  const renderBanner = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('BlogDetails', {data: item})}
        style={styles.renderBannerStyle}
        className="rounded-2xl">
        <AppImageBackground
          source={{uri: item.featureImg}}
          resizeMode="cover"
          style={styles.bannerImg}
          contClass={styles.bannerImg}>
          <LinearGradient
            colors={['rgba(4,4,4,0.0)', 'rgba(4,4,4,0.90)']}
            className="absolute bottom-0  justify-end p-2 py-5  w-full">
            <Text className="text-white text-xl  ">
              {item.title?.length > 69
                ? item.title?.slice(0, 70) + '...'
                : item.title}
            </Text>
          </LinearGradient>
        </AppImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={styles.container} className="rounded-2xl">
        <FlatList
          data={trending ? trending?.reverse() : []}
          renderItem={renderBanner}
          keyExtractor={(_, index) => index.toString()}
          pagingEnabled
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          scrollEventThrottle={10}
          onMomentumScrollEnd={e => {
            setActiveIndex(
              e.nativeEvent.contentOffset.x / Dimensions.get('window').width,
            );
          }}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
        />
      </View>
      <View style={styles.dotConatiner}>
        <View style={styles.indicatorContainer}>
          {trending &&
            trending.map((_, imageIndex) => {
              const animatedWidth = scrollX.interpolate({
                inputRange: [
                  width * (imageIndex - 2),
                  width * imageIndex,
                  width * (imageIndex + 1),
                ],
                outputRange: [8, 20, 8],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={imageIndex}
                  style={[
                    styles.normalDot,
                    {
                      width: animatedWidth,
                      opacity: Math.round(activeIndex) == imageIndex ? 1 : 0.3,
                    },
                  ]}
                />
              );
            })}
        </View>
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    width: '92%',
    alignItems: 'center',

    // justifyContent: 'center',
    borderRadius: widthPercentageToDP(2),
    // marginTop: heightPercentageToDP(3),
    height: heightPercentageToDP(40),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  dotConatiner: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: heightPercentageToDP(1.2),
    width: '100%',
  },
  normalDot: {
    height: widthPercentageToDP(1.8),
    width: widthPercentageToDP(1.8),
    borderRadius: 100,
    backgroundColor: color.colorPrimary,
    marginHorizontal: widthPercentageToDP(0.6),
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderBannerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP(92),
    height: heightPercentageToDP(40),
    overflow: 'hidden',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
});
