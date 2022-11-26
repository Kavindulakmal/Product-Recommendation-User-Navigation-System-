import React from 'react';
import { useDispatch } from 'react-redux';

import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { icons, SIZES } from '../constants';
import { authLogout } from '../redux/authSlice';
import { clearUserToken } from '../shared/asyncStorage';
import { ScreenNames } from '../navigation/MainNavigator';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(authLogout());
    clearUserToken()
      .then(() => {
        navigation.navigate(ScreenNames.Login);
      })
      .catch(() => {
        console.log('Handle me properly! Error clearing user token');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerFlex}>
        <Text style={styles.textStyle2}>My Account</Text>
      </View>
      <View style={{ marginLeft: 20, marginTop: 20 }}>
        <TouchableOpacity
          style={styles.btnAcc}
          onPress={() => navigation.navigate('MyDetails')}>
          <Image
            source={icons.user}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
            }}
          />
          <Text style={styles.textStyle}>My Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnAcc}
          onPress={() => navigation.navigate('MyItems')}>
          <Image
            source={icons.cart}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
            }}
          />
          <Text style={styles.textStyle}>My Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAcc}>
          <Image
            source={icons.setting}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
            }}
          />
          <Text style={styles.textStyle}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAcc}>
          <Image
            source={icons.help}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
            }}
          />
          <Text style={styles.textStyle}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAcc} onPress={onLogout}>
          <Image
            source={icons.logOut}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
            }}
          />
          <Text style={styles.textStyle}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerFlex: {
    marginTop: SIZES.height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  textStyle: {
    fontSize: 18,
  },
  textStyle2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: SIZES.height * 0.05,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  btnAcc: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
});
