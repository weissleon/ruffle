import React, { VFC } from "react";
import { motion, Variants } from "framer-motion";

type Props = {
  title: string;
  showTitle?: boolean;
};

const appBarVariants: Variants = {
  hidden: {
    fontSize: "4rem",
    opacity: 0,
  },

  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const AppBar: VFC<Props> = ({ title, showTitle = true }) => {
  return (
    <motion.div
      layout
      className="relative flex flex-row items-center justify-center h-14 overflow "
      initial="hidden"
      animate="show"
      exit={"exit"}
    >
      <motion.div
        variants={appBarVariants}
        className="w-full h-full shadow-sm shadow-slate-300"
      ></motion.div>
      <motion.h1
        layoutId="title"
        transition={{
          layout: { ease: "easeInOut", duration: 0.5 },
        }}
        className="absolute font-bold text-transparent bg-slate-500 bg-clip-text from-purple-400 to-blue-400 bg-gradient-to-r"
      >
        {title}
      </motion.h1>
    </motion.div>
  );
};

export default AppBar;
