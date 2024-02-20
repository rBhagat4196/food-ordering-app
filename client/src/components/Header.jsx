import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../animations";
import { MdLogout, MdShoppingCart } from "../assets/icons";
import { useSelector } from "react-redux";
import { Avatar } from "../img";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isMenu,setIsMenu] = useState(false);
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
          <>
            <div className="relative cursor-pointer"
            onMouseEnter={() => setIsMenu(true)}
            >
              <div
                className="w-12 h-12 rounded-full shadow-md cursor-pointer 
              overflow-hidden flex items-center justify-center"
              >
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.2 }}
                  referrerPolicy="no-referrer"
                />
              </div>
              {isMenu && (
                <motion.div
                {...slideTop}
                className="px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md 
              rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
              onMouseLeave={()=> setIsMenu(false)}
              >
                <Link
                  className="hover:text-red-500 text-xl text-textColor"
                  to={"/dashboard"}
                >
                  Dashboard
                </Link>
                <Link
                  className="hover:text-red-500 text-xl text-textColor"
                  to={"/dashboard"}
                >
                  Profile
                </Link>
                <Link
                  className="hover:text-red-500 text-xl text-textColor"
                  to={"/dashboard"}
                >
                  Orders
                </Link>
                <hr/>
                <motion.div {...buttonClick} className="group flex items-center justify-center px-3 py-2 rounded-md hover:bg-gray-200 gap-3">
                    <MdLogout className="text-2xl text-textColor group-hover:text-headingColor"/>
                    <p className="text-textColor text-xl group-hover:text-headingColor">
                        SignOut
                    </p>
                </motion.div>
              </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300"
              >
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
