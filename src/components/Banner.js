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
} from 'react-native';
import React, {useRef, useState} from 'react';
import color from '../constants/color';
const {width, height} = Dimensions.get('window');

const Banner = ({data}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const renderBanner = ({item}) => {
    return (
      <View style={styles.renderBannerStyle}>
        <Image
          source={{uri: item}}
          resizeMode="cover"
          style={styles.bannerImg}
        />
      </View>
    );
  };
  return (
    <View className="relative">
      <View style={styles.container}>
        <FlatList
          data={data ? data : []}
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
          {data &&
            data.map((_, imageIndex) => {
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
                      opacity: Math.round(activeIndex) == imageIndex ? 1 : 0.5,
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
    width: '100%',
    borderRadius: widthPercentageToDP(2),
    backgroundColor: 'gray',
    marginTop: heightPercentageToDP(3),
    height: heightPercentageToDP(30),
    overflow: 'hidden',
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
    width: width * 0.9,
    height: heightPercentageToDP(30),
    overflow: 'hidden',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
});
