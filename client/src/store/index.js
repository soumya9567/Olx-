import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import productReducer from './productSlice'; // Import product slice

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Persist only auth state, NOT products (optional)
};

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer, // Add products to Redux
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
