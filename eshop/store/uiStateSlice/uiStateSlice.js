import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: {
    open: false,
    message: "",
    severity: "success",
  },
  loading: false,
  drawer: false,
}


const uiStateSlice = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDrawer: (state, action) => {
      state.drawer = action.payload;
    },
  }
});

export const { setAlert, setLoading, setDrawer, setCart, setCartItems, setCartTotal, setCartCount } = uiStateSlice.actions;
export default uiStateSlice.reducer;