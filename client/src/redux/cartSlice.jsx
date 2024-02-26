import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart : "",
    isVisible : false,
  }
const CartSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        getItems: (state) => {
         return state.cart;
      },
      setItems : (state,action)=>{
        state.cart = action.payload;
      },
      clearItems : (state)=>{
        state.cart = ""
      },
      setCartVisibility : (state)=>{
        state.isVisible = !state.isVisible
      }
    }
});

export const { setItems ,getItems , clearItems,setCartVisibility} = CartSlice.actions;
export default CartSlice.reducer;
