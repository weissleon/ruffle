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
  exit: { y: 0, opacity: 0 },
};

const StartButton: VFC<Props> = ({
  children,
  onClick = () => {},
  leftIcon = null,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  function handleOnClick(event: MouseEvent) {
    // setIsExiting(true);
    onClick(event);
  }
  return (
    <motion.button
      onClick={handleOnClick}
      className="relative flex h-min w-min select-none flex-row items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 px-8 py-4 text-xl text-white"
      variants={startButtonVariants}
      initial="hidden"
      whileHover="hover"
      whileTap="tap"
      animate="show"
      exit="exit"
    >
      {leftIcon ? <div className="relative h-8 w-8">{leftIcon}</div> : null}
      {children}
    </motion.button>
  );
};

export default StartButton;
