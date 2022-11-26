import AsyncStorage from '@react-native-community/async-storage';

export const storeUserToken = async value => {
  try {
    await AsyncStorage.setItem('@user_token', value);
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};

export const getUserToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@user_token');
    if (value !== null) {
      // After restoring token, we may need to validate it
      return value;
    }
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};

export const clearUserToken = async () => {
  try {
    await AsyncStorage.removeItem('@user_token');
  } catch (e) {
    console.log('Error!!!!! (Handle me properly) -> ', e);
  }
};
