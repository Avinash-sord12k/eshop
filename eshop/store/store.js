import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import persistStore from "redux-persist/es/persistStore";
import authReducer from './authSlice/authSlice'
import signinReducer from './signinSlice/signinSlice'
import signupReducer from './signupSlice/signupSlice'
import uiReducer from './uiStateSlice/uiStateSlice'
import cartReducer from './cartSlice/cartSlice'
import wishlistReducer from './wishlistSlice/wishlistSlice'

const persistConfig = {
  key: 'auth',
  storage
}

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  signin: signinReducer,
  signup: signupReducer,
  ui: uiReducer,
  cart: persistReducer(persistConfig, cartReducer),
  wishlist: persistReducer(persistConfig, wishlistReducer),
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
})
const persistor = persistStore(store);
export { persistor }
export default store;