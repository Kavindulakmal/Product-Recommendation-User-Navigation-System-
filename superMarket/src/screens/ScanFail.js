import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

import ShoppingCartIcon from '../components/ShoppingCartIcon';

import { icons, SIZES, COLORS } from '../constants';
export default function ScanResult({ navigation }) {
  const header = (
    <View style={styles.rowFlex1}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={icons.close}
          resizeMode="contain"
          style={{
            tintColor: COLORS.primary,
            width: 25,
            height: 25,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>Scan Result</Text>
      <ShoppingCartIcon />
    </View>
  );
  return (
    <View style={styles.container}>
      {header}
      <View style={styles.centerFlex}>
        <Image
          source={icons.ic_round}
          resizeMode="contain"
          style={{
            width: SIZES.width * 0.36,
            height: SIZES.width * 0.36,
          }}
        />
      </View>
      <View style={styles.centerFlex}>
        <Text
          style={{
            width: SIZES.width * 0.7,
            color: 'black',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 10,
          }}>
          This is a counterfeit product
        </Text>
        <Text
          style={{
            width: SIZES.width * 0.7,
            color: COLORS.thrid,
            fontSize: 16,
            textAlign: 'center',
          }}>
          If you are in a store, please seek assistance from a sales manager or
          contact us for further assistance
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerFlex: {
    marginTop: SIZES.height * 0.1,
    alignItems: 'center',
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  rowFlex1: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
  container: {
    flex: 1,
  },
  headerText: {
    color: COLORS.black,
    fontSize: 15,
    width: SIZES.width * 0.5,
    textAlign: 'center',
  },
});
