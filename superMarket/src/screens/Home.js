import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { searchProducts } from '../api/searchProducts';

import Button from '../components/Button';

import { images, SIZES, COLORS } from '../constants';
import { getOffers } from '../api/offersAPI';

export default function Home({ navigation }) {
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState('');
  const userAuthToken = useSelector(state => state.auth.token);

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: 'item1',
        price: 100,
        image: 'https://picsum.photos/200/300',
      },
      {
        id: 2,
        name: 'item2',
        price: 400,
        image: 'https://picsum.photos/200/300',
      },
      {
        id: 3,
        name: 'item3',
        price: 340,
        image: 'https://picsum.photos/200/300',
      },
    ];
    // setOffers(data);
    getOffers(1)
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
  const searchItem = () => {
    searchProducts(search)
      .then(response => {
        if (response.error) {
          showToast(response.error);
          return;
        }
        const { data } = response;
        console.log('🚀 ~ Search data', data);
        setOffers(data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const onScanDummyButtonClick = nfcData => {
    navigation.navigate('ScanResult', {
      nfcData,
    });
  };

  const showToast = message => {
    Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
  };

  // const onNFCTagRead = () => {
  //   NFCReader.beginScanning((uid, ecc_sig, session_cancelled) => {
  //     if (session_cancelled) {
  //       Toast.showWithGravity('Reading cancelled', Toast.SHORT, Toast.TOP);
  //     } else if (uid === UNKNOWN_UID || ecc_sig === UNKNOWN_ECC_SIG) {
  //       Toast.showWithGravity(
  //         'Invalid tag data or error reading tag data',
  //         Toast.SHORT,
  //         Toast.TOP,
  //       );
  //     } else {
  //       navigation.navigate('ScanResult', {
  //         nfcData: {
  //           uuid: uid,
  //           signature: ecc_sig,
  //         },
  //       });
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.centerFlex}>
        <Image
          source={images.silicaLogo}
          resizeMode="contain"
          style={{
            width: SIZES.width * 0.36,
            height: SIZES.width * 0.36,
          }}
        />
        <View style={styles.rowFlex}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                width: SIZES.width * 0.5,
                borderRadius: 30,
                paddingLeft: 25,
                // placeholderTextColor: 'gray',
              }}
              onChangeText={text => setSearch(text)}
              value={search}
              placeholder="Search here!"
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => searchItem()}>
            <Text style={styles.buttonTextStyle}>Search</Text>
          </TouchableOpacity>
        </View>
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
                  <View
                    key={data.id}
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
                        height: SIZES.width * 0.8,
                        marginBottom: SIZES.height * 0.05,
                      }}
                    />
                    <View style={styles.centerFlex}>
                      <View style={styles.banner}>
                        <Text style={styles.offerText}>{data.name}</Text>
                        <Text style={styles.offerText}>
                          Price: {data.price}LKR
                        </Text>
                      </View>
                      <Button
                        text="View Item"
                        onPress={() => onScanDummyButtonClick(data)}
                      />
                    </View>
                  </View>
                );
              })
            : null}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  centerFlex2: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  offerText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 30,
  },

  buttonStyle: {
    backgroundColor: COLORS.black,
    borderWidth: 0,
    color: COLORS.white,
    height: 40,
    width: 130,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 2,
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
