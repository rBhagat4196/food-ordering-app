import React from "react";
import { NavLink } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { MdShoppingCart } from "../assets/icons";
import { useSelector } from "react-redux";
const Header = () => {
  const user = useSelector((state) => state.user);
  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6">
      <NavLink to={"/"} className="flex items-center justify-between gap-4">
        <img src="/logo.png" className="w-12" alt="" />
        <p className="font-semibold text-xl">FlavorFleet</p>
      </NavLink>
      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden lg:flex items-center justify-center gap-16">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/menu"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Menu
          </NavLink>
          <NavLink
            to={"/services"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Services
          </NavLink>
          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            About Us
          </NavLink>
        </ul>
        <motion.div {...buttonClick} className="relative cursor-pointer">
          <MdShoppingCart className="text-3xl text-textColor" />
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-end justify-center absolute -top-4 -right-1">
            <p className="text-primary text-base font-semibold">2</p>
          </div>
        </motion.div>
        {user ? (
          <>User</>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button {...buttonClick} 
              className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300">
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
