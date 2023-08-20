import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  username: '',
  role: '',
  permissions: {},
  email: '',
  userId: '',
  error: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => { state.isAuth = action.payload },
    setUsername: (state, action) => { state.username = action.payload },
    setRole: (state, action) => { state.role = action.payload },
    setPermissions: (state, action) => { state.permissions = action.payload },
    setEmail: (state, action) => { state.email = action.payload },
    setError: (state, action) => { state.error = action.payload },
  }
});

export const { setIsAuth, setUsername, setRole, setPermissions, setEmail, setError } = authSlice.actions;
export default authSlice.reducer;