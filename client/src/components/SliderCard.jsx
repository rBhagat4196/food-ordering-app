import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonClick } from "../animations";
import { HiCurrencyRupee, IoMdBasket } from "../assets/icons";
import { addNewItemToCart, getAllCartItems } from "../api";
import { alertMsg } from "../redux/alertSlice";

const SliderCard = ({ data, index }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user)
  // console.log(user?.user_id)
  const sendToCard = ()=>{
    addNewItemToCart(user?.user_id , data).then(res=>{
      dispatch(alertMsg({type : "success" , message : "Item added to cart successfully"}))

      getAllCartItems(user?.user_id).then(items =>{
        console.log(items)
      })
      setTimeout(()=>{
        dispatch(alertMsg({type : "" , message : ""}))
      },3000)
    })
  }
  return (
    <div className="bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3">
      <img src={data.imageURL} className="w-40 h-40 object-contain" alt="" />
      <div className="relative pt-12">
        <p className="text-xl text-headingColor font-semibold">
          {data.product_name}
        </p>
        <p className="text-lg font-semibold text-red-500 flex items-center justify-center gap-1">
          <HiCurrencyRupee className="text-red-500" />{" "}
          {parseFloat(data.product_price).toFixed(2)}
        </p>

        <motion.div
          {...buttonClick}
          onClick={sendToCard}
          className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer"
        >
          <IoMdBasket className="text-2xl text-primary" />
        </motion.div>
      </div>
    </div>
  );
};

export default SliderCard;
