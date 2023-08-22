import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  username: '',
  role: '',
  image: '',
  permissions: [],
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
    setImage: (state, action) => { state.image = action.payload },
    setPermissions: (state, action) => { state.permissions = action.payload },
    setEmail: (state, action) => { state.email = action.payload },
    setError: (state, action) => { state.error = action.payload },
  }
});

export const { setIsAuth, setUsername, setRole, setImage, setPermissions, setEmail, setError } = authSlice.actions;
export default authSlice.reducer;