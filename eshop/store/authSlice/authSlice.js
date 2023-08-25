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
    setLogout: (state, action) => { state = initialState; },
    setLogin: (state, action) => {
      state.isAuth = true;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.image = action.payload.image;
      state.permissions = action.payload.permissions;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    }
  }
});

export const { setIsAuth, setUsername, setRole, setImage, setPermissions, setEmail, setError, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;