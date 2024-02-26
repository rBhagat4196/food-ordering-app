import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart : "",
  }
const CartSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        getItems: (state) => {
         return state.products
      },
      setItems : (state,action)=>{
        state.cart = action.payload;
      },
      clearItems : (state)=>{
        state.cart = ""
      }
    }
});

export const { setItems ,getItems , clearItems} = CartSlice.actions;
export default CartSlice.reducer;
