import { configureStore } from '@reduxjs/toolkit';

import cartItemsReducer from './cartItemsSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    cartItems: cartItemsReducer,
    auth: authReducer,
  },
});
