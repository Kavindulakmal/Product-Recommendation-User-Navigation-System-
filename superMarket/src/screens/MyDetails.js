import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { icons, SIZES, COLORS } from '../constants';

export default function MyDetails({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.centerFlex}>
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
          <Text style={styles.headerText}>Profile</Text>
          <View
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={icons.user}
            resizeMode="contain"
            style={{
              tintColor: COLORS.primary,
              width: 65,
              height: 65,
              marginBottom: 30,
            }}
          />
          <Text>UserName</Text>
          <Text>Email</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: COLORS.black,
    fontSize: 15,
    width: SIZES.width * 0.5,
    textAlign: 'center',
  },
  rowFlex1: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
});
