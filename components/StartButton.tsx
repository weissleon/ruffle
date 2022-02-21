import React, { ReactNode, VFC, MouseEvent, useState } from "react";
import { motion, Variants } from "framer-motion";

type Props = {
  leftIcon?: ReactNode;
  children?: ReactNode;
  onClick?: (event: MouseEvent) => void;
};

const startButtonVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
    scale: 1,
  },

  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },

  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
  exit: { y: 0, opacity: 0, scale: 2 },
};

const StartButton: VFC<Props> = ({
  children,
  onClick = () => {},
  leftIcon = null,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  function handleOnClick(event: MouseEvent) {
    setIsExiting(true);
    onClick(event);
  }
  return (
    <motion.button
      onClick={handleOnClick}
      className="relative flex flex-row items-center justify-center px-8 py-4 text-xl text-white w-min h-min bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl"
      variants={startButtonVariants}
      initial="hidden"
      animate={isExiting ? "exit" : "show"}
      whileHover={"hover"}
      whileTap={"tap"}
      exit={"exit"}
    >
      {leftIcon ? <div className="relative w-8 h-8">{leftIcon}</div> : null}
      {children}
    </motion.button>
  );
};

export default StartButton;
