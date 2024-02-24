import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products : "",
  }
const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        getAllProducts: (state) => {
         return state.products
      },
      setAllProducts : (state,action)=>{
        state.products = action.payload;
      }
    }
});

export const { setAllProducts ,getAllProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
