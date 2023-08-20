import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  role: "",
}

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setEmail: (state, action) => {state.email = action.payload},
    setPassword: (state, action) => {state.password = action.payload},
    setConfirmPassword: (state, action) => {state.confirmPassword = action.payload},
    setUsername: (state, action) => {state.username = action.payload},
    setRole: (state, action) => {state.role = action.payload},
  }
});

export const { setEmail, setPassword, setConfirmPassword, setUsername, setRole } = signupSlice.actions;
export default signupSlice.reducer;