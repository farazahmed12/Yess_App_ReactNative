import React from 'react';
import {TextInput} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const InputField = ({
  placeholder,
  handleOnChangeTxt,
  keyboardType,
  secureTextEntry = false,
  marginTailwind = '',
  paddingTailwind = '',
  isBorder = true,
  ...props
}) => {
  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      className={`${
        isBorder && 'border'
      } border-gray-400  ${marginTailwind} ${paddingTailwind}`}
      style={{borderRadius: widthPercentageToDP(100)}}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={handleOnChangeTxt}
      {...props}
    />
  );
};

export default InputField;
