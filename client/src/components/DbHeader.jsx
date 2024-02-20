import React from "react";
import { useSelector } from "react-redux";
import { BsToggles2, MdSearch } from "../assets/icons";
const DbHeader = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <div className="w-full flex items-center justify-between gap-3 ">
      <p className="text-xl text-headingColor">
        Welcome
        {user?.name && (
          <span className="block text-base text-gray-500">
            {"Hello " + user?.name.split(" ")[0] + "...!"}
          </span>
        )}
      </p>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-gray-400 text-2xl" />
          <input type="text" placeholder="Search here..." className="border-none outline-none bg-lightOverlay
          " />
          <BsToggles2 className="text-gray-400 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default DbHeader;
