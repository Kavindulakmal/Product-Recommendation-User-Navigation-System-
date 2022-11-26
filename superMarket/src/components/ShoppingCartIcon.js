import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { icons, COLORS } from '../constants';

function ShoppingCartIcon(props) {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ItemsScreen')}
      style={styles.button}>
      <View style={styles.itemCountContainer}>
        <Text style={styles.itemCountText}>{cartItems.length}</Text>
      </View>
      <Image
        source={icons.cart}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
          tintColor: COLORS.primary,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  itemCountContainer: {
    position: 'absolute',
    height: 15,
    width: 15,
    borderRadius: 15,
    backgroundColor: COLORS.black,
    left: 20,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  itemCountText: {
    color: 'white',
    fontSize: 10,
  },
});
export default ShoppingCartIcon;
