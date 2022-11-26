import { createSlice } from '@reduxjs/toolkit';

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState: {
    value: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    removeItemFromCart: (state, action) => {
      state.value = state.value.filter(
        item => item.productId !== action.payload.productId,
      );
    },
    clearCart: state => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToCart, removeItemFromCart, clearCart } =
  cartItemsSlice.actions;

export default cartItemsSlice.reducer;
