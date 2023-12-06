import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { _id, name, price, image, stock } = action.payload;
      console.log("action.payload: ", action.payload);
      const alreadyInWishlist = state.wishlist.find(item => item._id === _id);

      if (!alreadyInWishlist) {
        const newItem = { _id, name, price, image, dateAdded: new Date(), inStock: stock > 0};
        state.wishlist = [...state.wishlist, newItem];
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
