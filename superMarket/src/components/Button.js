import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from '../constants/styling';

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text style={styles.buttonTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
