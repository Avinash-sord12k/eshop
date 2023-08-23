import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemToAdd = action.payload;
      if (!state.wishlist.some(item => item._id === itemToAdd._id)) {
        state.wishlist.push(itemToAdd);
      }
    },
    removeFromWishlist: (state, action) => {
      const itemToRemove = action.payload;
      state.wishlist = state.wishlist.filter(item => item._id !== itemToRemove._id);
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
