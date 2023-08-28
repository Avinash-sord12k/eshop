import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: {
    open: false,
    message: "",
    severity: "success",
  },
  loading: false,
  disabledLoading: false,
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
    setDisabledLoading: (state, action) => {
      state.disabledLoading = action.payload;
    },
    setDrawer: (state, action) => {
      state.drawer = action.payload;
    },
  }
});

export const { setAlert, setLoading, setDrawer, setCart, setCartItems, setCartTotal, setCartCount, setDisabledLoading } = uiStateSlice.actions;
export default uiStateSlice.reducer;