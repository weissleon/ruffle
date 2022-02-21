import StartButton from "@components/StartButton";
import { NextPage } from "next";
import React from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";

type Props = {};

const startPageVariants: Variants = {};
const titleVariants: Variants = {
  hidden: {
    fontSize: "6rem",
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
};

const mainTitle = `Ruffle`;

const Start: NextPage<Props> = ({}) => {
  const router = useRouter();

  return (
    <motion.div
      variants={startPageVariants}
      className="flex flex-col items-center justify-center w-full min-h-screen gap-y-16"
      initial="hidden"
      animate="show"
    >
      <motion.h1
        layoutId="title"
        transition={{
          layout: { ease: "easeInOut", duration: 0.5 },
        }}
        variants={titleVariants}
        className="font-bold text-transparent select-none bg-slate-500 bg-clip-text from-purple-400 to-blue-400 bg-gradient-to-r"
      >
        {mainTitle}
      </motion.h1>
      <StartButton onClick={() => router.push("/")}>Start!</StartButton>
    </motion.div>
  );
};

export default Start;
