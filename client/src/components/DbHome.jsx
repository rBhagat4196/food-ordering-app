import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api';
import { setAllProducts } from '../redux/productSlice';

const DbHome = () => {
  const products = useSelector(state => state.product.products);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(products == ""){
      getAllProducts().then(data => (
        dispatch(setAllProducts(data))
      ))
    }
  })
  console.log(products)
  return (
    <div>
      Home
    </div>
  )
}

export default DbHome
