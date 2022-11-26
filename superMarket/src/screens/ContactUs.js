/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { icons, SIZES, COLORS } from '../constants';

export default function ContactUs({ navigation, route }) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.rowFlex1}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={icons.close}
            resizeMode="contain"
            style={{
              marginLeft: 15,
              tintColor: COLORS.primary,
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Contact Us</Text>
        <Image
          resizeMode="contain"
          style={{
            tintColor: COLORS.primary,
            width: 25,
            height: 25,
          }}
        />
      </View>
      <View style={{ marginLeft: 20, marginTop: 20 }}>
        <View style={styles.box1}>
          <Text style={styles.message}>
            I have an issue with the following product,
          </Text>
          <Text style={styles.message}>
            Item No – {data.id}
            {'\n'}Color – Black {'\n'}PO No – 31861318{'\n'}
            Country of{'\n'}Origin/Manufacture – Sri Lanka
          </Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.message}>Hi,</Text>
          <Text style={styles.message}>
            Thank you for contacting us, Could you please elaborate the issue
            further ? You can send images if necessary.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowFlex1: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  centerFlex: {
    marginTop: SIZES.height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  message: {
    fontSize: 14,
    // fontWeight: 'bold',
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    marginLeft: -15,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  box1: {
    padding: 15,
    marginLeft: SIZES.width * 0.2,
    backgroundColor: '#FFEEEE',
    width: SIZES.width * 0.7,
    height: SIZES.height * 0.23,
    elevation: 18,
    borderRadius: 30,
  },
  box2: {
    padding: 15,
    marginRight: SIZES.width * 0.2,
    marginTop: SIZES.width * 0.1,
    backgroundColor: '#FAFAFA',
    width: SIZES.width * 0.7,
    height: SIZES.height * 0.2,
    elevation: 18,
    borderRadius: 30,
  },
  btnAcc: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
});
