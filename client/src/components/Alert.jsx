import React from "react";
import { motion } from "framer-motion";
import { fadeOut } from "../animations";
import { BsExclamationTriangleFill, FaCheck } from "../assets/icons";
import { BsExclamation } from "react-icons/bs";
const Alert = ({ type, message }) => {
  if (type === "success")
    return (
      <motion.div
        {...fadeOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-md bg-green-300 shadow-md flex items-center gap-4"
      >
        <FaCheck className="text-xl text-emerald-600" />
        <p className="text-xl text-emerald-700">{message}</p>
      </motion.div>
    );

    if (type === "warning")
    return (
      <motion.div
        {...fadeOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md bg-orange-300 backdrop-blur-md   shadow-md flex items-center gap-4"
      >
        <BsExclamationTriangleFill className="text-xl text-red-600" />
        <p className="text-xl text-red-700">{message}</p>
      </motion.div>
    );

    if (type === "danger")
    return (
      <motion.div
        {...fadeOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-md bg-orange-300   shadow-md flex items-center gap-4"
      >
        <BsExclamationTriangleFill className="text-xl text-red-800" />
        <p className="text-xl text-red-800">{message}</p>
      </motion.div>
    );

    if (type === "info")
    return (
      <motion.div
        {...fadeOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md bg-cyan-300 backdrop-blur-md   shadow-md flex items-center gap-4"
      >
        <BsExclamation className="text-xl text-blue-600" />
        <p className="text-xl text-blue-700">{message}</p>
      </motion.div>
    );
};

export default Alert;
