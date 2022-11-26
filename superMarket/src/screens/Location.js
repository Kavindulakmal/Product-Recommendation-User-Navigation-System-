/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { FlatGrid } from 'react-native-super-grid';
import Button from '../components/Button';
import ShoppingCartIcon from '../components/ShoppingCartIcon';
import Description from '../components/Description';
import Discount from '../components/Discount';

import { addItemToCart as addItemToCartActionCreator } from '../redux/cartItemsSlice';
import { COLORS, icons, SIZES } from '../constants';
import styles from '../constants/styling';

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
  const [resp, setResp] = useState(initialData);
  const [resp2, setResp2] = useState('');
  const [items, setItems] = React.useState([
    { id: 1, name: 'TURQUOISE', code: '#e74c3c' },
    { id: 2, name: 'EMERALD', code: '#e74c3c' },
    { id: 3, name: 'PETER RIVER', code: '#e74c3c' },
    { id: 4, name: 'AMETHYST', code: '#e74c3c' },
    { id: 5, name: 'WET ASPHALT', code: '#e74c3c' },
    { id: 6, name: 'GREEN SEA', code: '#e74c3c' },
    { id: 7, name: 'NEPHRITIS', code: '#e74c3c' },
    { id: 8, name: 'BELIZE HOLE', code: '#e74c3c' },
    { id: 9, name: 'WISTERIA', code: '#e74c3c' },
    { id: 10, name: 'MIDNIGHT BLUE', code: '#e74c3c' },
    { id: 11, name: 'SUN FLOWER', code: '#e74c3c' },
    { id: 12, name: 'CARROT', code: '#e74c3c' },
    { id: 13, name: 'ALIZARIN', code: '#e74c3c' },
    { id: 14, name: 'CLOUDS', code: '#e74c3c' },
    { id: 15, name: 'CONCRETE', code: '#e74c3c' },
    { id: 16, name: 'ORANGE', code: '#e74c3c' },
    { id: 17, name: 'PUMPKIN', code: '#e74c3c' },
    { id: 18, name: 'POMEGRANATE', code: '#c0392b' },
  ]);
  const { nfcData } = route.params;

  useEffect(() => {
    //TODO: extract this to the shared directory
    const showToast = message => {
      Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
    };
    console.log(nfcData, 'sa');
    axios
      .get(
        `http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/shelf-detail/${nfcData.id}/`,
      )
      .then(response => {
        console.log(response.data);

        const slug = response.data.location.split('-').pop();
        console.log(slug);
        setResp(response.data);
        setResp2(parseInt(slug));
      });
    setScanResult({
      name: 'item3',
      price: 340,
      image: 'https://picsum.photos/200/300',
    });
  }, []);

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
      <Text style={styles.headerText}>Find Path</Text>
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
          <Text style={styles.itemTextStyle}>{resp.location}</Text>
        </View>
        <Text style={styles.desTitle}>Details</Text>
        <Description text={nfcData.description} />
        <View>
          <FlatGrid
            itemDimension={50}
            data={items}
            style={styles.gridView}
            // staticDimension={300}
            fixed
            spacing={10}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.itemContainer,
                  {
                    backgroundColor: item.id === resp2 ? '#2ecc71' : '#e74c3c',
                  },
                ]}>
                <Text style={styles.itemCode}>{item.id}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
