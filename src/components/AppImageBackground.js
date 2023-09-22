import React, {Children, useState} from 'react';
import {ActivityIndicator, Image, ImageBackground, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import color from '../constants/color';
import {images} from '../images';

function AppImageBackground({children, ...props}) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <ImageBackground
        {...props}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={error => console.log('Error =========>', error)}>
        {children}
      </ImageBackground>
      {loading && (
        <View
          style={props.contClass}
          className={`  bg-gray-100 flex absolute  justify-center items-center  `}>
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
            size={'large'}
          />
        </View>
      )}
    </>
  );
}

export default AppImageBackground;
