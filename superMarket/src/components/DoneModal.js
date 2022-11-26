import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

import Button from './Button';

import { icons, SIZES, COLORS } from '../constants';
import style from '../constants/styling';
import { clearCart as clearCartActionCreator } from '../redux/cartItemsSlice';

const DoneModal = ({ onPress, doneModal = false }) => {
  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch(clearCartActionCreator());
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={doneModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={icons.done}
              resizeMode="contain"
              style={{
                width: SIZES.width * 0.36,
                height: SIZES.width * 0.36,
              }}
            />
            <Text style={styles.modalText2}>Payment Successful</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => clearCart()}>
              <Text style={style.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={style.centerFlex}>
        <Button text="Checkout" onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: SIZES.width * 0.8,
    height: SIZES.width * 0.8,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    color: COLORS.black,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    width: 140,
  },

  modalText: {
    marginBottom: 20,
    textAlign: 'left',
    color: '#C54F4F',
  },
  modalText2: {
    marginBottom: 25,
    marginTop: 25,
    textAlign: 'left',
    color: '#000000',
  },
});

export default DoneModal;
