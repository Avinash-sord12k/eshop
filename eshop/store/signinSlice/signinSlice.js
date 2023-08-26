import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "avinash2002a@gmail.com",
  password: "123",
  showPassword: false,
}

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    setEmail: (state, action) => {state.email = action.payload},
    setPassword: (state, action) => {state.password = action.payload},
    setShowPassword: (state, action) => {state.showPassword = action.payload},
  }
});

export const { setEmail, setPassword, setShowPassword } = signinSlice.actions;
export default signinSlice.reducer;
