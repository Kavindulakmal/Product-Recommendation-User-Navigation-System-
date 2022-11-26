import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { icons, SIZES } from '../constants';
import styling from '../constants/styling';
import BASE_URL from '../shared/configs';

const Item = ({ item, navigation, removeItemFromCart, isCart, token }) => (
  <TouchableOpacity
    key={item.productId}
    onPress={() => navigation.navigate('ItemDetails', { item: item })}
    style={styling.bookItemContainer}>
    <Image
      source={{
        uri: 'https://picsum.photos/200/300',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }}
      resizeMode="contain"
      style={styling.thumbnail}
    />
    <View style={styling.bookItemMetaContainer}>
      <View
        style={{
          width: SIZES.width * 0.6,
          justifyContent: 'space-between',
          flexDirection: 'row',
          height: 25,
        }}>
        <Text style={styling.textTitle} numberOfLines={1}>
          {item.name}
        </Text>
        {isCart ? (
          <TouchableOpacity onPress={() => removeItemFromCart(item)}>
            <Image
              source={icons.deleteIcon}
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styling.rowFlex2}>
        <View
          style={{
            backgroundColor: item.colorCode,
            width: 15,
            height: 15,
            marginLeft: 5,
            borderRadius: 30,
            marginTop: 10,
          }}
        />
        <Text style={styling.sizeText}>{item.size}</Text>
      </View>
      <View style={styling.rowFlex22}>
        {isCart ? (
          <Text style={styling.sizeText}># {item.poNumber}</Text>
        ) : (
          <Text style={styling.sizeText}>{item.countryOfOrigin}</Text>
        )}
        <Text style={styling.sizeText}>${item.price}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default Item;
