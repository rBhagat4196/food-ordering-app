import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 
import alertReducer from "./alertSlice"
import productReducer from './productSlice';
import cartReducer from "./cartSlice"
const rootReducer = combineReducers({
  user: userReducer,
  alert : alertReducer,
  product : productReducer,
  cart : cartReducer
});

export {rootReducer};

