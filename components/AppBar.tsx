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
      className="relative flex h-14 flex-row items-center justify-center"
      initial="hidden"
      animate="show"
      exit={"exit"}
    >
      <motion.div
        variants={appBarVariants}
        className="relative z-50 h-full w-full shadow-sm shadow-slate-300"
      ></motion.div>
      <motion.h1
        layoutId="title"
        transition={{
          layout: { ease: "easeInOut", duration: 0.5 },
        }}
        className="absolute z-50 h-min w-min bg-slate-500 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-bold text-transparent"
      >
        {title}
      </motion.h1>
    </motion.div>
  );
};

export default AppBar;
