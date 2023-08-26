import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  cartItems: 0,
  cartTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const { id, price } = action.payload;
      const existingItem = state.cart.find(item => item.id === id);
      if (existingItem) {
        state.cart = state.cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      } else state.cart.push(action.payload);
      state.cartItems++;
      state.cartTotal += price;
    },
    removeCartItem: (state, action) => {
      const selectedItem = action.payload;
      if (selectedItem.quantity > 1) {
        state.cart = state.cart.map(item => item.id === selectedItem.id ? {
          ...item, quantity: item.quantity - 1} : item);
      } else {
        state.cart = state.cart.filter(item => item.id !== selectedItem.id);
      }
      state.cartItems = state.cartItems - 1;
      state.cartTotal = state.cartTotal - selectedItem.price;
    },
    deleteCartItem: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
      state.cartItems = state.cartItems - action.payload.quantity;
      state.cartTotal = state.cartTotal - action.payload.price * action.payload.quantity;
    },
    resetCart: (state) => {
      state.cart = [];
      state.cartItems = 0;
      state.cartTotal = 0;
    },
  }
});

export const { addCartItem, removeCartItem, deleteCartItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;