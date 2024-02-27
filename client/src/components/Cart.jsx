import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonClick, slideIn, staggerFadeInOut } from "../animations";
import {
  BiChevronRight,
  FcClearFilters,
  HiCurrencyRupee,
} from "../assets/icons";
import { baseUrl, getAllCartItems, increaseItemQuantity } from "../api";
import { alertMsg } from "../redux/alertSlice";
import {setItems,clearItems,setCartVisibility} from "../redux/cartSlice"
import { EmptyCart } from "../img";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  // const viaible = useSelector((state) => state.cart.isVisible);
  const user = useSelector((state) => state.user.user);
  const [total, setTotal] = useState(0);
  // console.log(viaible)
  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.map((item) => {
        tot += item.product_price * item.quantity;
        setTotal(tot);
      });
    }
  }, [cart]);

  const handleCheckOut = () => {
    // const data = {
    //   user: user,
    //   cart: cart,
    //   total: total,
    // };
    axios
      .post(`${baseUrl}/api/products/create-checkout-session`)
      .then((res) => {
        console.log(res)
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-300 md:w-508 bg-lightOverlay backdrop-blur-md shadow-md h-screen"
    >
      <div className="w-full flex items-center justify-between py-4 pb-12 px-6">
        <motion.div
          {...buttonClick}
          className="cursor-pointer"
          onClick={() => dispatch(setCartVisibility())}
        >
          <BiChevronRight className="text-[50px] text-textColor" />
        </motion.div>
        <p className="text-2xl text-headingColor font-semibold">Your Cart</p>
        <motion.div {...buttonClick} className="cursor-pointer" onClick={()=>{}}>
          <FcClearFilters className="text-[30px] text-textColor" />
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-zinc-900 h-full py-2  gap-3 relative">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>
            <div className="bg-zinc-800 rounded-t-[60px] w-full h-[15%] flex flex-col items-center justify-center px-4 py-6 gap-2">
              <div className="w-full flex items-center justify-evenly">
                <p className="text-3xl text-zinc-500 font-semibold">Total</p>
                <p className="text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1">
                  <HiCurrencyRupee className="text-primary" />
                  {total}
                </p>
              </div>

              <motion.button
                {...buttonClick}
                className="bg-orange-400 w-[50%] text-xl text-headingColor font-semibold hover:bg-orange-500 drop-shadow-md rounded-2xl"
                onClick={handleCheckOut}
              >
                Check Out
              </motion.button>
            </div>
          </>
        ) : (
          <>
          <div className="w-full h-full flex flex-col items-center justify-center gap-10 ">

          <h1 className="text-red-400 text-3xl text-center ">Empty Cart</h1>
          <img src={EmptyCart} className="w-full object-contain p-4"/>
          </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  
  // console.log(cart)
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId) => {
    dispatch(alertMsg({ type: "success", message: "Updated the cart item" }));

    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setItems(items));
        dispatch(alertMsg({ type: "", message: "" }));
      });
    });
  };

  const incrementCart = (productId) => {
    dispatch(alertMsg({ type: "success", message: "Updated the cart item" }));
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setItems(items));
        dispatch(alertMsg({type : "" , message :""}));
      });
    });
  };

  useEffect(() => {
    const itemTotal = data.product_price * data.quantity;
    setItemTotal(itemTotal);
  }, [itemTotal, cart]);

  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      className="w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-4 gap-4"
    >
      <img
        src={data?.imageURL}
        className=" w-24 min-w-[94px] h-24 object-contain"
        alt=""
      />

      <div className="flex items-center justify-start gap-1 w-full">
        <p className="text-lg text-primary font-semibold">
          {data?.product_name}
          <span className="text-sm block capitalize text-gray-400">
            {data?.product_category}
          </span>
        </p>
        <p className="text-sm flex items-center justify-center gap-1 font-semibold text-red-400 ml-auto">
          <HiCurrencyRupee className="text-red-400" /> {itemTotal}
        </p>
      </div>

      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClick}
          onClick={() => decrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-xl font-semibold text-primary">--</p>
        </motion.div>
        <p className="text-lg text-primary font-semibold">{data?.quantity}</p>
        <motion.div
          {...buttonClick}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
          onClick={() => incrementCart(data?.productId)}
        >
          <p className="text-xl font-semibold text-primary">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Cart;
