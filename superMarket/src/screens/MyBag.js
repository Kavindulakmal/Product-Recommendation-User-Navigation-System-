import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';

import DoneModal from '../components/DoneModal';
import NoItemsMessage from '../components/NoItemsMessage';
import Item from '../components/Item';

import { removeItemFromCart as removeItemFromCartActionCreator } from '../redux/cartItemsSlice';
import { SIZES } from '../constants';
import styles from '../constants/styling';
import { checkout } from '../api/checkoutAPI';

function MyBag({ navigation }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartItems.value);
  const userAuth = useSelector(state => state.auth.token);
  const [modalVisible, setModalVisible] = useState(false);

  const checkOut = () => {
    setModalVisible(true);

    var result = cartItems.map(function (a) {
      return a.productId;
    });

    checkoutOrder(result);
  };
  const checkoutOrder = result => {
    const payload = {
      items: [
        {
          productId: result[0],
        },
      ],
    };
    checkout(payload)
      .then(response => {
        if (response.error || !response.data.token) {
          showToast(response.error);
          return;
        }
        const { data } = response;
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const showToast = message => {
    Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
  };
  const getSum = items => {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      sum += items[i].price;
    }
    return sum;
  };

  const removeItemFromCart = item =>
    dispatch(removeItemFromCartActionCreator(item));

  return (
    <View style={styles.container}>
      <View style={styles.rowFlex1}>
        <Text style={styles.headerText}>My Bag</Text>
      </View>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <Item
              key={index}
              item={item}
              navigation={navigation}
              removeItemFromCart={removeItemFromCart}
              isCart={true}
              token={userAuth}
            />
          )}
        />
      ) : (
        <NoItemsMessage />
      )}
      {cartItems.length > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 9,
            width: SIZES.width,
            height: SIZES.height * 0.22,
            backgroundColor: '#fafafa',
            opacity: 0.9,
          }}>
          <View style={styles.centerFlex}>
            <View style={styles.rowFlex2}>
              <Text style={styles.headerText2}>Subtotal</Text>
              <Text style={styles.headerText2}>$ {getSum(cartItems)}</Text>
            </View>
            <DoneModal onPress={checkOut} doneModal={modalVisible} />
          </View>
        </View>
      )}
    </View>
  );
}

export default MyBag;
