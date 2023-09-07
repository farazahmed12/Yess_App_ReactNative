import React from 'react';
import {TextInput} from 'react-native';

const InputField = ({
  placeholder,
  handleOnChangeTxt,
  keyboardType,
  secureTextEntry = false,
  marginTailwind = '',
  paddingTailwind = '',
  ...props
}) => {
  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      className={`border border-gray-400 rounded-md ${marginTailwind} ${paddingTailwind}`}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={handleOnChangeTxt}
      {...props}
    />
  );
};

export default InputField;
