import React from 'react';
import {Image, TextInput, View, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {images} from '../images';

const InputField = ({
  placeholder,
  handleOnChangeTxt,
  keyboardType,
  secureTextEntry = false,
  marginTailwind = '',
  paddingTailwind = '',
  isBorder = true,
  isImage = false,
  showPassword = false,
  onImagePress,
  ...props
}) => {
  return (
    <View
      style={{borderRadius: widthPercentageToDP(100)}}
      className={`${
        isBorder && 'border'
      } border-gray-400 flex flex-row justify-between items-center  ${marginTailwind} ${paddingTailwind}`}>
      <TextInput
        className="flex-1 text-black placeholder:text-black"
        secureTextEntry={
          secureTextEntry && showPassword == false ? true : false
        }
        placeholder={placeholder}
        placeholderTextColor={'black'}
        keyboardType={keyboardType}
        onChangeText={handleOnChangeTxt}
        {...props}
      />
      {isImage && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onImagePress}
          className="p-2">
          <Image
            source={showPassword ? images.EyeClose : images.EyeOpen}
            className="w-5 h-5"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
