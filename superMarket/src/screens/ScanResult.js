/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';

import Button from '../components/Button';
import ShoppingCartIcon from '../components/ShoppingCartIcon';
import Description from '../components/Description';
import Discount from '../components/Discount';

import { addItemToCart as addItemToCartActionCreator } from '../redux/cartItemsSlice';
import { COLORS, icons, SIZES } from '../constants';
import styles from '../constants/styling';
import { authenticateProduct } from '../api/getProductAPI';
import BASE_URL from '../shared/configs';
import { getOffers } from '../api/offersAPI';

const initialData = {
  productId: '4baa331e-9f43-473a-af9e-3839e9f2101e',
  code: '298KDF679',
  name: "Men's Dry-FIT Tee",
  colorCode: '#141414',
  colorName: 'Black',
  size: 'S',
  desc: "The Nike Dri-FIT Men's T-Shirt delivers a soft feel, workout in total comfort.The Nike men's workout shirt has a standard fit for a \nrelaxed, easy feel during physical activity.The Nike Dry fabric material moves \nwith you for optimal range while you play. The Nike t-shirt for men has a ribbed\ncrew neck that gives you a comfortable fit when active. The cut is designed to \nlay smoothly against the skin. ",
  images: ['298KDF679-1.jpeg', '298KDF679-2.jpeg'],
  price: 16.81,
  discount: 10,
  poNumber: '4537DF0978',
  countryOfOrigin: 'Sri Lanka',
  dateCode: '3121',
};

export default function ScanResult({ navigation, route }) {
  const dispatch = useDispatch();
  const userAuthToken = useSelector(state => state.auth.token);

  const [scanResult, setScanResult] = useState(initialData);

  const { nfcData } = route.params;

  const addItemToCart = () => {
    dispatch(addItemToCartActionCreator(scanResult));
    navigation.navigate('Location', { nfcData });
  };
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    const payload = {
      nfc: {
        uuid: nfcData.uuid,
        signature: nfcData.signature,
      },
      location: {
        lat: '123',
        lon: '123',
      },
    };
    //TODO: extract this to the shared directory
    const showToast = message => {
      Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
    };
    setScanResult({
      name: 'item3',
      price: 340,
      image: 'https://picsum.photos/200/300',
    });
    getOffers(nfcData.id)
      .then(response => {
        if (response.error) {
          showToast(response.error);
          return;
        }
        const { data } = response;
        console.log('🚀 ~useefect data', data);
        setOffers(data.products);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const onScanDummyButtonClick = nfcData => {
    navigation.navigate('ScanResult', {
      nfcData,
    });
    getOffers(nfcData.id)
      .then(response => {
        if (response.error) {
          return;
        }
        const { data } = response;
        console.log('🚀 ~useefect data', data);
        setOffers(data.products);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const care = [
    {
      icon: icons.wash,
      text: 'Machine wash at max. 300C/860F with short spin cycle',
    },
    {
      icon: icons.doNot,
      text: 'Do not use bleach',
    },
    {
      icon: icons.iron,
      text: 'Iron at a maximum of 11OC/230F',
    },
  ];
  const header = (
    <View style={styles.rowFlexScanResHed}>
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {header}
        <View style={styles.centerFlex}>
          {scanResult.image && (
            <View
              style={{
                marginLeft: 10,
              }}>
              <Image
                source={{
                  uri: 'https://picsum.photos/200/300',
                  headers: {
                    Authorization: `Bearer ${userAuthToken}`,
                  },
                }}
                resizeMode="cover"
                style={{
                  height: SIZES.width * 0.5,
                  width: SIZES.width * 0.8,
                  marginLeft: SIZES.width * 0.05,
                  marginRight: SIZES.width * 0.05,
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.rowFlexScanRes}>
          <Text style={styles.itemTextStyle}>{nfcData.name}</Text>
          <View style={styles.rowFlex}>
            <TouchableOpacity
              style={{
                backgroundColor: scanResult.colorCode,
                width: 15,
                height: 15,
                borderRadius: 30,
              }}
            />
            <TouchableOpacity style={styles.sizeDot2}>
              <Text style={styles.itemSizeText}>{scanResult.size}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowFlexScanRes}>
          <Discount discount={nfcData.discount} price={nfcData.price} />
        </View>
        <Text style={styles.desTitle}>Details</Text>
        <Description text={nfcData.description} />

        <View style={styles.centerFlex}>
          <Button text="Browse Location" onPress={() => addItemToCart()} />
        </View>
        <View>
          <Text style={styles.desTitle}>Similar Products</Text>
        </View>
        <View style={styles.centerFlex}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            horizontal
            pagingEnabled
            decelerationRate={0}
            snapToInterval={SIZES.width * 0.8 + 25}
            snapToAlignment="center"
            contentInset={{
              top: 0,
              left: 20,
              bottom: 0,
              right: 20,
            }}>
            {offers
              ? offers.map(data => {
                  return (
                    <TouchableOpacity
                      key={data.id}
                      onPress={() => onScanDummyButtonClick(data)}
                      style={{
                        width: SIZES.width * 0.8,
                        marginLeft: 20,
                      }}>
                      <Image
                        // source={images.shoe}
                        source={{
                          uri: `https://picsum.photos/200/300`,
                          headers: {
                            // Authorization:
                            //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2MzE2MzA1ODMsImV4cCI6MTYzMjg0MDE4M30.Pbw9-GCTYCNV-WyC7MOHw1UzN20LLVdbGWU3yNm0qyY',
                            Authorization: `Bearer ${userAuthToken}`,
                          },
                        }}
                        resizeMode="cover"
                        style={{
                          width: SIZES.width * 0.8,
                          height: SIZES.width * 0.3,
                          marginBottom: SIZES.height * 0.05,
                        }}
                      />
                      <View style={styles.centerFlex}>
                        <View style={styles2.banner}>
                          <Text style={styles.offerText}>{data.name}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : null}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles2 = StyleSheet.create({
  banner: {
    marginTop: -30,
    backgroundColor: COLORS.primary,
    width: SIZES.width * 0.8,
    height: 40,
    overflow: 'hidden',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    // flex: 1,
    alignItems: 'center',
  },
});
