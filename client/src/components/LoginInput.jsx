/* eslint-disable react/prop-types */

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeOut } from "../animations";
/* eslint-disable no-unused-vars */
const LoginInput = ({
  placeHolder,
  icon,
  inputState,
  type,
  inputStateFunc,
  isSignUp,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <motion.div
      {...fadeOut}
      className={`flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${
        isFocus ? "shadow-md shadow-red-400" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="bg-transparent w-full h-full text-headingColor text-md font-semibold border-none outline-none p-0.5"
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
};
export default LoginInput;
