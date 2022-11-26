import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from '../constants/styling';

export default function Discount({ discount, price }) {
  const [finalPrice, setFinalPrice] = useState('');

  useEffect(() => {
    getDiscount();
  }, []);
  const getDiscount = () => {
    let discountPrice = (price * discount) / 100;
    let newPrice = price - discountPrice;
    setFinalPrice(newPrice.toFixed(2));
  };
  return (
    <View>
      <View style={styles.rowFlex}>
        {discount > 0 ? (
          <Text style={styles.itemPriceStyle}>${price}</Text>
        ) : null}
        <View style={styles.buttonStyle2} activeOpacity={0.5}>
          <View style={styles.rowFlex}>
            <Text style={styles.itemOfferStyle}>${finalPrice}</Text>
            {discount > 0 ? (
              <Text style={styles.itemOfferStyle}> -{discount}%</Text>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}
