import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';

import ShoppingCartIcon from '../components/ShoppingCartIcon';
import Discount from '../components/Discount';
import Description from '../components/Description';

import { icons, SIZES, COLORS } from '../constants';
import BASE_URL from '../shared/configs';

// const _data = {
//   productId: '4baa331e-9f43-473a-af9e-3839e9f2101e',
//   code: '298KDF679',
//   name: "Men's Dry-FIT Tee",
//   colorCode: '#141414',
//   colorName: 'Black',
//   size: 'S',
//   desc: "The Nike Dri-FIT Men's T-Shirt delivers a soft feel, \nsweat-wicking performance and great range of motion to get you through your \nworkout in total comfort.The Nike men's workout shirt has a standard fit for a \nrelaxed, easy feel during physical activity.The Nike Dry fabric material moves \nwith you for optimal range while you play. The Nike t-shirt for men has a ribbed\ncrew neck that gives you a comfortable fit when active. The cut is designed to \nlay smoothly against the skin. ",
//   images: ['298KDF679-1.jpeg', '298KDF679-2.jpeg'],
//   price: 16.81,
//   discount: 10,
//   poNumber: '4537DF0978',
//   countryOfOrigin: 'Sri Lanka',
//   dateCode: '3121',
// };

export default function ScanResult({ route, navigation }) {
  const userAuthToken = useSelector(state => state.auth.token);
  const data = route.params.item;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          <Text style={styles.headerText}>Item</Text>
          <ShoppingCartIcon />
        </View>
        <View style={styles.centerFlex}>
          <ScrollView
            horizontal
            decelerationRate={0}
            snapToInterval={SIZES.width * 0.8 + 25}
            snapToAlignment="center"
            contentInset={{
              top: 0,
              left: 10,
              bottom: 0,
              right: 10,
            }}
            contentContainerStyle={{
              paddingHorizontal: Platform.OS === 'android' ? 20 : 0,
            }}>
            {data.images.map(item => {
              return (
                <View
                  key={item}
                  style={{
                    marginLeft: 10,
                  }}>
                  <Image
                    source={{
                      uri: `${BASE_URL}/assets/${item}`,
                      headers: {
                        Authorization: `Bearer ${userAuthToken}`,
                      },
                    }}
                    resizeMode="contain"
                    style={{
                      height: SIZES.width * 0.7,
                      width: SIZES.width * 0.8,
                      marginLeft: SIZES.width * 0.05,
                      marginRight: SIZES.width * 0.05,
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ height: 50 }} />
        <View style={styles.rowFlex2}>
          <Text style={styles.itemTextStyle}>{data.name}</Text>
          <View style={styles.rowFlex}>
            <TouchableOpacity style={styles.colorDot2} />
            <Text style={styles.itemPriceStyle}> {data.size}</Text>
          </View>
        </View>
        <View style={styles.rowFlex2}>
          <View style={styles.rowFlex}>
            <Discount discount={data.discount} price={data.price} />
          </View>
          <View style={styles.rowFlex}>
            <TouchableOpacity
              style={styles.buttonStyle3}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('ContactUs', { data })}>
              <Text style={styles.itemOfferStyle}>Contact us</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 30,
            marginTop: 10,
          }}>
          Details
        </Text>
        <Description text={data.desc} />

        <Text
          style={{
            color: COLORS.thrid,
            fontSize: 10,
            marginLeft: 30,
            marginTop: 10,
          }}>
          Product Code : {data.poNumber}
        </Text>
        <Text
          style={{
            color: COLORS.thrid,
            fontSize: 10,
            marginLeft: 30,
            marginTop: 1,
          }}>
          Color : {data.colorName}
        </Text>
        <View style={styles.centerFlex}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            🚯🚱📵🚭
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },

  rowFlex2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 10,
    marginBottom: 10,
  },
  rowFlex1: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
  container: {
    flex: 1,
  },

  buttonStyle: {
    backgroundColor: COLORS.black,
    color: COLORS.white,
    height: 55,
    width: SIZES.width * 0.9,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 15,
  },
  buttonStyle2: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    color: COLORS.white,
    height: 30,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 20,
  },
  buttonStyle3: {
    backgroundColor: COLORS.black,
    borderWidth: 0,
    color: COLORS.white,
    height: 30,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 20,
  },
  itemTextStyle: {
    color: COLORS.black,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemPriceStyle: {
    textDecorationLine: 'line-through',
    color: COLORS.third,
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemOfferStyle: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },

  headerText: {
    color: COLORS.black,
    fontSize: 15,
    width: SIZES.width * 0.5,
    textAlign: 'center',
  },
  sizeDot: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    width: 15,
    height: 15,
    marginLeft: 5,
    justifyContent: 'center',
    borderRadius: 30,
  },

  colorDot2: {
    backgroundColor: '#000000',
    width: 15,
    height: 15,
    marginLeft: 5,
    borderRadius: 30,
  },
});
