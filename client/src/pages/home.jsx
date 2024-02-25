
import { useDispatch, useSelector } from "react-redux"
import {Header,LandingPage,HomeSlider} from "../components"
import { useEffect } from "react";
import { getAllProducts } from "../api";
import { setAllProducts } from "../redux/productSlice";

const Home = () => {
  const products = useSelector((state => state.product.products));
  const dispatch = useDispatch();

  // console.log(products)
  useEffect(()=>{
    if(!products){
      getAllProducts().then(data => dispatch(setAllProducts(data)))
    }
  },[])
  return (
    <main className= "w-screen h-screen flex items-center justify-center flex-col bg-primary">
      <Header/>
      <div className="w-full flex flex-col items-start justify-center mt-60 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <LandingPage/>
        <HomeSlider/>
      </div>
    </main>
  )
}

export default Home
