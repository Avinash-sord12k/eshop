import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  showPassword: false,
  otp: '',
}

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    setEmail: (state, action) => {state.email = action.payload},
    setPassword: (state, action) => {state.password = action.payload},
    setShowPassword: (state, action) => {state.showPassword = action.payload},
    setOtp: (state, action) => {state.otp = action.payload},
  }
});

export const { setEmail, setPassword, setShowPassword, setOtp } = signinSlice.actions;
export default signinSlice.reducer;
