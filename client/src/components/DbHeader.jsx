import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BsFillBellFill,
  BsToggles2,
  MdLogout,
  MdSearch,
} from "../assets/icons";
import { buttonClick } from "../animations";
import { motion } from "framer-motion";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase";
import { setUserDetails } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const DbHeader = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signOut = ()=>{
    auth.signOut().then(()=>{
      dispatch(setUserDetails(""))
      navigate("/login",{replace : true})
    })
  }
  return (
    <div className="w-full flex items-center justify-between gap-3 ">
      <p className="text-xl text-headingColor">
        Welcome
        {user?.name && (
          <span className="block text-base text-gray-500">
            {"Hello " + user?.name.split(" ")[0] + "... !"}
          </span>
        )}
      </p>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-gray-400 text-2xl" />
          <input
            type="text"
            placeholder="Search here..."
            className="border-none outline-none bg-lightOverlay
          "
          />
          <BsToggles2 className="text-gray-400 text-2xl" />
        </div>

        <motion.div
          {...buttonClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-400 text-xl" />
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 roud shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover "
              src={user?.picture ? user?.picture : Avatar}
              whileHover={{ scale: 1.2 }}
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div
            {...buttonClick}
            className="group flex items-center justify-center px-3 py-2 rounded-md hover:bg-gray-200 gap-3"
            onClick = {signOut}
          >
            <MdLogout className="text-2xl text-textColor group-hover:text-headingColor" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DbHeader;
