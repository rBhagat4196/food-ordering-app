import { motion } from "framer-motion";
import React from "react";
import { Delivery } from "../img";
import { buttonClick } from "../animations";

const LandingPage = () => {
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="flex flex-col items-start justify-center gap-6">
        <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full">
          <p className="text-lg font-semibold text-orange-500">Free Delivery</p>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
            <img src={Delivery} className="w-full h-full object-cover" />
          </div>
        </div>
        <p className="text-[40px] text-headingColor md:text-[72px] font-sans font-extrabold tracking-wider">
          The Fastest Delivery in{" "}
          <span className="text-orange-600">FlavorFleet</span>
        </p>
        <p className="text-textColor text-lg">
          Set sail with FlavorFleet: your passport to a world of culinary
          wonders. From tantalizing street food to gourmet delights, explore
          diverse cuisines with ease. With seamless ordering, embark on a
          flavor-filled journey at your fingertips
        </p>
        <motion.button
          {...buttonClick}
          className="bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold"
        >
          Order Now
        </motion.button>{" "}
      </div>
      <div></div>
    </motion.div>
  );
};

export default LandingPage;
