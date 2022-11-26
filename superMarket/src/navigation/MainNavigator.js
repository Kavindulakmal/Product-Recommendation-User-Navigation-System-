import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/LogIn';
import BottomNavigator from './BottomNavigation/BottomNavigator';
import ScanResult from '../screens/ScanResult';
import Location from '../screens/Location';
import ItemDetails from '../screens/ItemDetails';
import ContactUs from '../screens/ContactUs';
import ScanFail from '../screens/ScanFail';
import MyItems from '../screens/MyItems';
import MyDetails from '../screens/MyDetails';
import ShoppingCartIcon from '../components/ShoppingCartIcon';

export const ScreenNames = {
  Login: 'Login',
  Home: 'Home',
  MyItems: 'MyItems',
  MyDetails: 'MyDetails',
  ItemDetails: 'ItemDetails',
  ContactUs: 'ContactUs',
  ScanFail: 'ScanFail',
  ScanResult: 'ScanResult',
  Items: 'Items',
  ItemsScreen: 'ItemsScreen',
  Location: 'Location',
  Profile: 'Profile',
};

export const { Navigator, Screen } = createStackNavigator();

export default function MainStackNavigator() {
  const userAuthToken = useSelector(state => state.auth.token);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!userAuthToken || userAuthToken === '' ? (
        <Screen name={ScreenNames.Login} component={LoginScreen} />
      ) : (
        <>
          <Screen
            name={ScreenNames.Home}
            component={BottomNavigator}
            options={{ headerShown: false }}
          />
          <Screen
            name={ScreenNames.MyItems}
            component={MyItems}
            options={{ headerShown: false }}
          />
          <Screen
            name={ScreenNames.MyDetails}
            component={MyDetails}
            options={{ headerShown: false }}
          />
          <Screen
            name={ScreenNames.ItemDetails}
            component={ItemDetails}
            options={{ headerShown: false }}
          />
          <Screen
            name={ScreenNames.ContactUs}
            component={ContactUs}
            options={{ headerShown: false }}
          />
          <Screen
            name={ScreenNames.ScanFail}
            component={ScanFail}
            options={{ headerShown: false }}
          />
          <Screen
            name={ScreenNames.ScanResult}
            component={ScanResult}
            options={{
              headerShown: false,
              headerRight: props => <ShoppingCartIcon {...props} />,
            }}
          />
          <Screen
            name={ScreenNames.Location}
            component={Location}
            options={{
              headerShown: false,
              headerRight: props => <ShoppingCartIcon {...props} />,
            }}
          />
        </>
      )}
    </Navigator>
  );
}
