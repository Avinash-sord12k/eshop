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
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter(item => item._id !== action._id);
      state.cartItems = state.cartItems - 1;
      state.cartTotal = state.cartTotal - action.price;
    },
    resetCart: (state) => {
      state.cart = [];
      state.cartItems = 0;
      state.cartTotal = 0;
    },
  }
});

export const { setCart, setCartItems, setCartTotal } = cartSlice.actions;
export default cartSlice.reducer;