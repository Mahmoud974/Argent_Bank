import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../slice/userSlice';

// Configuration de redux-persist
const persistConfig = {
  key: 'user',
  storage,
};

// Création du reducer persistant
const persistedReducer = persistReducer(persistConfig, userReducer);

// Configuration du store
const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
     
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Création du persistor
const persistor = persistStore(store);

export default store;
export { persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
