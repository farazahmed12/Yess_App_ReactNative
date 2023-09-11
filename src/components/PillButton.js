import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import color from '../constants/color';

const PillButton = ({name, onPress, marginTailwind = '', loading = false}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{backgroundColor: color.colorPrimary}}
      className={`rounded-3xl ${marginTailwind} mt-10`}>
      {loading ? (
        <ActivityIndicator color={'white'} size={'small'} className="py-3" />
      ) : (
        <Text className="text-white font-semibold text-sm text-center font-serif py-3 ">
          {name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PillButton;

const styles = StyleSheet.create({});
