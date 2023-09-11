import {configureStore, combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSlice from './userSlice';

const persistConfig = {
  key: 'root',
  user: AsyncStorage,
};

let rootReducer = combineReducers({
  user: userSlice,
});

let reducerPersisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: reducerPersisted,
});
