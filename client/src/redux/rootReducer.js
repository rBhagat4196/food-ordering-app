import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 
import alertReducer from "./alertSlice"
import productReducer from './productSlice';

const rootReducer = combineReducers({
  user: userReducer,
  alert : alertReducer,
  product : productReducer
});

export {rootReducer};

