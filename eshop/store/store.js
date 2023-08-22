import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import persistStore from "redux-persist/es/persistStore";
import authReducer from './authSlice/authSlice'
import signinReducer from './signinSlice/signinSlice'
import signupReducer from './signupSlice/signupSlice'

const persistConfig = {
  key: 'root',
  storage: storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  signin: signinReducer,
  signup: signupReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
})
const persistor = persistStore(store);
export { persistor }
export default store;