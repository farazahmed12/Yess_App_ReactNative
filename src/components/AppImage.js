import React, {useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import color from '../constants/color';
import {images} from '../images';

function AppImage({...props}) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Image
        {...props}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={error => alert(`error ==>`, error)}
      />
      {loading && (
        <View
          className={`${props.contClass} absolute bg-gray-100 flex  justify-center items-center  `}>
          <Image
            blurRadius={2}
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'cover',
            }}
            source={images.PlaceholderImage}
          />
          <ActivityIndicator
            color={color.colorPrimary}
            style={{
              position: 'absolute',
            }}
            animating={loading}
            size={'small'}
          />
        </View>
      )}
    </>
  );
}

export default AppImage;
