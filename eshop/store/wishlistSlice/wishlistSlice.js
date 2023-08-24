import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { id } = action.payload;
      const alreadyInWishlist = state.wishlist.find(item => item.id === id);

      if (!alreadyInWishlist) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      state.wishlist = state.wishlist.filter(item => item.id !== id);
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
