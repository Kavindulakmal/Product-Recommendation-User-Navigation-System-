import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

import NoItemsMessage from '../components/NoItemsMessage';
import Item from '../components/Item';

import { icons, COLORS } from '../constants';
import styles from '../constants/styling';
import { getMyItems } from '../api/myItemsAPI';

function MyBag({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const userAuthToken = useSelector(state => state.auth.token);

  useEffect(() => {
    getMyItems()
      .then(response => {
        if (response.error) {
          showToast(response.error);

          return;
        }
        const { data } = response;
        setCartItems(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const showToast = message => {
    Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.headerText}>My Items</Text>
        <View
          style={{
            width: 25,
            height: 25,
          }}
        />
      </View>
      {cartItems.length !== 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <Item
              key={index}
              item={item}
              navigation={navigation}
              isCart={false}
              token={userAuthToken}
            />
          )}
        />
      ) : (
        <NoItemsMessage />
      )}
    </View>
  );
}

export default MyBag;
