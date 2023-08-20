import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
}

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    setEmail: (state, action) => {state.email = action.payload},
    setPassword: (state, action) => {state.password = action.payload},
  }
});

export const { setEmail, setPassword } = signinSlice.actions;
export default signinSlice.reducer;