import React, { FC } from "react";
import { motion } from "framer-motion";

interface LoadingProps {
  text: string;
}

const Loading: FC<LoadingProps> = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <motion.div
        className="spinner animate-spin"
        style={{
          width: 60,
          height: 60,
          borderTop: "4px solid #fff",
          borderRight: "4px solid #f5bc51",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p className="text-sm text-white p-2">{text + "..."}</p>
    </div>
  );
};

export default Loading;
