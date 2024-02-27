
import { useDispatch, useSelector } from "react-redux"
import {Header,LandingPage,HomeSlider, FilterSection, Cart} from "../components"
import { useEffect } from "react";
import { getAllProducts } from "../api";
import { setAllProducts } from "../redux/productSlice";

const Home = () => {
  const products = useSelector((state => state.product.products));
  const isCartVisible = useSelector((state) => state.cart.isVisible)
  const dispatch = useDispatch();
  // console.log(isCartVisible)
  // console.log(products)
  useEffect(()=>{
    if(!products){
      getAllProducts().then(data => dispatch(setAllProducts(data)))
    }
  },[])
  return (
    <main className= "w-full h-auto flex items-center justify-center flex-col bg-primary">
      <Header/>
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 lg:px-36 xl-48 gap-12 pb-24">
        <LandingPage/>
        <HomeSlider/>
        <FilterSection/>
      </div>
      {
        isCartVisible && <Cart/>
      }
    </main>
  )
}

export default Home
